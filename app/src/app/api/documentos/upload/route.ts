import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { uploadToGoogleDrive, deleteFromGoogleDrive } from '@/lib/gdrive';
import { revalidatePath } from 'next/cache';
import { Prisma } from '@/generated/prisma';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

interface UploadMetaItem {
  tipoId?: string;
  novoTipoDocumento?: string;
  nomeOriginal?: string;
}

export async function POST(req: NextRequest) {
  const uploadedDriveFiles: string[] = [];

  try {
    const formData = await req.formData();
    const lancamentoId = String(formData.get('lancamentoId') || '').trim();
    const replicarContrato = formData.get('replicarContrato') === 'true';

    if (!lancamentoId) {
      return NextResponse.json(
        { success: false, error: 'Identificador do lançamento não fornecido.' },
        { status: 400 }
      );
    }

    const lancamento = await db.lancamento.findUnique({
      where: { id: lancamentoId },
      include: {
        veiculo: true,
        cliente: true,
        colaborador: true,
      },
    });

    if (!lancamento) {
      return NextResponse.json(
        { success: false, error: 'Lançamento não encontrado no acervo.' },
        { status: 404 }
      );
    }

    const rawMeta = formData.get('arquivosMeta');
    const metadata: UploadMetaItem[] = rawMeta ? JSON.parse(String(rawMeta)) : [];

    if (!metadata.length) {
      return NextResponse.json(
        { success: false, error: 'Nenhum documento foi selecionado para upload.' },
        { status: 400 }
      );
    }

    // Identificar parcelas do mesmo contrato (PI + Veículo + Cliente/Colaborador)
    const cleanKey = (k?: string | null) =>
      k && !/^[-_.\s]+$/.test(k.trim()) && !/^(?:NENHUM|SEM|NAO|N\/A)$/i.test(k.trim())
        ? k.trim()
        : null;

    const validPi = cleanKey(lancamento.numeroPi);
    const validContrato = cleanKey(lancamento.numeroContrato);

    let targetIds = [lancamento.id];

    if (replicarContrato && (validPi || validContrato)) {
      const where: any = {
        tipoLancamento: lancamento.tipoLancamento,
        ...(lancamento.clienteId ? { clienteId: lancamento.clienteId } : {}),
        ...(lancamento.colaboradorId ? { colaboradorId: lancamento.colaboradorId } : {}),
      };

      if (lancamento.veiculoId) {
        where.veiculoId = lancamento.veiculoId;
      }

      if (validPi) {
        where.numeroPi = validPi;
      } else if (validContrato) {
        where.numeroContrato = validContrato;
      }

      const parcelas = await db.lancamento.findMany({
        where,
        select: { id: true },
      });

      if (parcelas.length > 0) {
        targetIds = Array.from(new Set([lancamento.id, ...parcelas.map(p => p.id)]));
      }
    }

    const folderId =
      lancamento.tipoLancamento === 'RECEITA'
        ? process.env.GOOGLE_DRIVE_FOLDER_RECEBER
        : process.env.GOOGLE_DRIVE_FOLDER_PAGAR;

    if (!folderId) {
      return NextResponse.json(
        {
          success: false,
          error: 'A pasta do Google Drive para upload não está configurada nas variáveis de ambiente.',
        },
        { status: 500 }
      );
    }

    // Processamento e upload de cada arquivo para o Google Drive
    const uploadedDocs: Array<{
      driveId: string;
      webViewLink: string | null;
      typeId: string;
      fileSize: number;
      name: string;
    }> = [];

    for (let index = 0; index < metadata.length; index++) {
      const meta = metadata[index];
      const file = formData.get(`file_${index}`);

      if (!(file instanceof File) || file.size === 0) {
        continue;
      }

      if (file.size > 25 * 1024 * 1024) {
        return NextResponse.json(
          {
            success: false,
            error: `O arquivo "${file.name}" tem ${(file.size / (1024 * 1024)).toFixed(1)} MB e ultrapassa o limite máximo de 25 MB.`,
          },
          { status: 400 }
        );
      }

      // Resolver TipoDocumento
      let resolvedTypeId: string;
      if (!meta.tipoId || meta.tipoId === 'NOVO') {
        const typeName = meta.novoTipoDocumento?.trim() || 'Outros';
        const typeObj = await db.tipoDocumento.upsert({
          where: { nome: typeName },
          update: {},
          create: { nome: typeName },
        });
        resolvedTypeId = typeObj.id;
      } else {
        const typeObj = await db.tipoDocumento.findUnique({ where: { id: meta.tipoId } });
        if (!typeObj) {
          const defaultType = await db.tipoDocumento.upsert({
            where: { nome: 'Outros' },
            update: {},
            create: { nome: 'Outros' },
          });
          resolvedTypeId = defaultType.id;
        } else {
          resolvedTypeId = typeObj.id;
        }
      }

      // Upload Google Drive
      const fileBuffer = Buffer.from(await file.arrayBuffer());
      const driveRes = await uploadToGoogleDrive(
        fileBuffer,
        file.name,
        file.type || 'application/octet-stream',
        folderId
      );

      if (!driveRes.id) {
        throw new Error(`O Google Drive não retornou a identificação de "${file.name}".`);
      }

      uploadedDriveFiles.push(driveRes.id);
      uploadedDocs.push({
        driveId: driveRes.id,
        webViewLink: driveRes.webViewLink ?? null,
        typeId: resolvedTypeId,
        fileSize: file.size,
        name: meta.nomeOriginal || file.name,
      });
    }

    if (uploadedDocs.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Nenhum arquivo válido encontrado para salvar.' },
        { status: 400 }
      );
    }

    // Inserção no banco de dados para os lançamentos alvo
    const documentsToCreate: Prisma.DocumentoCreateManyInput[] = [];

    for (const item of uploadedDocs) {
      for (const targetId of targetIds) {
        documentsToCreate.push({
          lancamentoId: targetId,
          tipoDocumentoId: item.typeId,
          nomeOriginal: item.name,
          caminhoOriginal: item.driveId,
          urlPublica: item.webViewLink,
          tamanhoBytes: item.fileSize,
          usuarioResponsavel: targetIds.length > 1 ? 'Anexo Contrato/PI' : 'Inclusão pelo sistema',
        });
      }
    }

    await db.documento.createMany({
      data: documentsToCreate,
    });

    // Registrar no histórico de auditoria
    const fileNamesList = uploadedDocs.map(d => d.name).join(', ');
    await db.historicoLancamento.createMany({
      data: targetIds.map(targetId => ({
        lancamentoId: targetId,
        acao: 'INCLUSAO_DOCUMENTO',
        descricao:
          targetIds.length > 1
            ? `${uploadedDocs.length} documento(s) adicionado(s) via Contrato/PI: ${fileNamesList}.`
            : `${uploadedDocs.length} novo(s) documento(s) adicionado(s): ${fileNamesList}.`,
        usuario: 'Usuário',
      })),
    });

    // Revalidar rotas no Next.js
    try {
      revalidatePath('/');
      revalidatePath('/lancamentos');
      for (const id of targetIds) {
        revalidatePath(`/lancamento/${id}`);
      }
    } catch {
      // Ignora erro de revalidação em ambientes onde não se aplica
    }

    const veiculoNome = lancamento.veiculo?.nome ? ` (${lancamento.veiculo.nome})` : '';
    const successMessage =
      targetIds.length > 1
        ? `${uploadedDocs.length} documento(s) anexado(s) e vinculado(s) automaticamente a todas as ${targetIds.length} parcelas deste Contrato (PI: ${validPi || validContrato}${veiculoNome})!`
        : `${uploadedDocs.length} documento(s) adicionado(s) com sucesso ao lançamento!`;

    return NextResponse.json({
      success: true,
      count: uploadedDocs.length,
      parcelasAfetadas: targetIds.length,
      message: successMessage,
    });
  } catch (err: any) {
    console.error('Erro no upload de documentos:', err);

    // Rollback de arquivos enviados para o Google Drive se o banco falhar
    if (uploadedDriveFiles.length > 0) {
      await Promise.allSettled(uploadedDriveFiles.map(id => deleteFromGoogleDrive(id)));
    }

    const errorMessage =
      err instanceof Error ? err.message : 'Falha inesperada ao processar o upload do documento.';

    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
      },
      { status: 500 }
    );
  }
}
