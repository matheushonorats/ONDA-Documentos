'use server';

import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { deleteFromGoogleDrive } from '@/lib/gdrive';

export async function getTiposDocumento() {
  return db.tipoDocumento.findMany({
    orderBy: { nome: 'asc' },
  });
}

export async function deleteDocumento(id: string) {
  try {
    const doc = await db.documento.findUnique({ where: { id } });
    if (!doc) {
      return { success: false, error: 'Documento não encontrado.' };
    }

    if (doc.caminhoOriginal) {
      try {
        await deleteFromGoogleDrive(doc.caminhoOriginal);
      } catch (err) {
        console.warn('Erro ao deletar arquivo do Drive:', err);
      }
    }

    await db.documento.delete({ where: { id } });

    if (doc.lancamentoId) {
      await db.historicoLancamento.create({
        data: {
          lancamentoId: doc.lancamentoId,
          acao: 'EXCLUSAO_DOCUMENTO',
          descricao: `Documento "${doc.nomeOriginal}" foi excluído.`,
          usuario: 'Usuário',
        },
      });
      revalidatePath(`/lancamento/${doc.lancamentoId}`);
    }
    revalidatePath('/lancamentos');
    return { success: true };
  } catch (error) {
    console.error('Erro ao excluir documento:', error);
    return { success: false, error: 'Não foi possível excluir o documento.' };
  }
}

export async function updateDocumento(
  id: string,
  data: { tipoDocumentoId?: string; nomeOriginal?: string; observacao?: string | null; status?: string }
) {
  try {
    const currentDoc = await db.documento.findUnique({ where: { id } });
    if (!currentDoc) {
      return { success: false, error: 'Documento não encontrado.' };
    }

    const updatedDoc = await db.documento.update({
      where: { id },
      data: {
        tipoDocumentoId: data.tipoDocumentoId || undefined,
        nomeOriginal: data.nomeOriginal || undefined,
        observacao: data.observacao !== undefined ? data.observacao : undefined,
        status: data.status || undefined,
      },
    });

    if (updatedDoc.lancamentoId) {
      const changes: string[] = [];
      if (data.status && data.status !== currentDoc.status) {
        changes.push(`Situação alterada de "${currentDoc.status}" para "${data.status === 'CANCELADO' ? 'CANCELADO / SUSPENSO' : 'ATIVO'}"`);
      }
      if (data.nomeOriginal && data.nomeOriginal !== currentDoc.nomeOriginal) {
        changes.push(`Nome alterado de "${currentDoc.nomeOriginal}" para "${data.nomeOriginal}"`);
      }
      if (data.observacao !== undefined && data.observacao !== currentDoc.observacao) {
        changes.push(`Observação atualizada`);
      }

      if (changes.length > 0) {
        await db.historicoLancamento.create({
          data: {
            lancamentoId: updatedDoc.lancamentoId,
            acao: data.status && data.status !== currentDoc.status ? 'STATUS_DOCUMENTO' : 'EDICAO_DOCUMENTO',
            descricao: `Documento "${updatedDoc.nomeOriginal}": ${changes.join(' | ')}.`,
            usuario: 'Usuário',
          },
        });
      }

      revalidatePath(`/lancamento/${updatedDoc.lancamentoId}`);
    }
    return { success: true };
  } catch (error) {
    console.error('Erro ao atualizar documento:', error);
    return { success: false, error: 'Não foi possível atualizar o documento.' };
  }
}

export async function adicionarLinkDocumento(
  lancamentoId: string,
  data: {
    urlPublica: string;
    nomeOriginal?: string;
    tipoDocumentoId?: string;
    novoTipoDocumento?: string;
    observacao?: string;
    replicarContrato?: boolean;
  }
) {
  try {
    const lancamento = await db.lancamento.findUnique({
      where: { id: lancamentoId },
      include: { veiculo: true },
    });
    if (!lancamento) throw new Error('Lançamento não encontrado.');

    if (!data.urlPublica || !data.urlPublica.trim()) {
      throw new Error('Informe o link/URL da Nota Fiscal.');
    }

    let typeId = data.tipoDocumentoId;
    if (!typeId || typeId === 'NOVO') {
      const typeName = data.novoTipoDocumento?.trim() || 'Nota Fiscal';
      const typeObj = await db.tipoDocumento.upsert({
        where: { nome: typeName },
        update: {},
        create: { nome: typeName },
      });
      typeId = typeObj.id;
    }

    const nome = data.nomeOriginal?.trim() || 'Link da Nota Fiscal';
    const urlFormatada = data.urlPublica.trim().startsWith('http') 
      ? data.urlPublica.trim() 
      : `https://${data.urlPublica.trim()}`;

    // Identificar parcelas do mesmo contrato (PI + Veículo)
    let targetIds: string[] = [lancamentoId];
    if (data.replicarContrato) {
      const cleanKey = (k?: string | null) =>
        k && !/^[-_.\s]+$/.test(k.trim()) && !/^(?:NENHUM|SEM|NAO|N\/A)$/i.test(k.trim()) ? k.trim() : null;
      const validPi = cleanKey(lancamento.numeroPi);
      const validContrato = cleanKey(lancamento.numeroContrato);

      if (validPi || validContrato) {
        const where: any = {
          tipoLancamento: lancamento.tipoLancamento,
          ...(lancamento.clienteId ? { clienteId: lancamento.clienteId } : {}),
          ...(lancamento.colaboradorId ? { colaboradorId: lancamento.colaboradorId } : {}),
        };
        if (lancamento.veiculoId) where.veiculoId = lancamento.veiculoId;
        if (validPi) where.numeroPi = validPi;
        else if (validContrato) where.numeroContrato = validContrato;

        const parcelas = await db.lancamento.findMany({ where, select: { id: true } });
        if (parcelas.length > 0) {
          targetIds = Array.from(new Set([lancamentoId, ...parcelas.map(p => p.id)]));
        }
      }
    }

    for (const targetId of targetIds) {
      await db.documento.create({
        data: {
          lancamentoId: targetId,
          tipoDocumentoId: typeId,
          nomeOriginal: nome,
          urlPublica: urlFormatada,
          caminhoOriginal: null,
          tamanhoBytes: 0,
          observacao: data.observacao?.trim() || null,
          usuarioResponsavel: targetIds.length > 1 ? 'Link Contrato/PI' : 'Inclusão de Link',
        },
      });

      await db.historicoLancamento.create({
        data: {
          lancamentoId: targetId,
          acao: 'INCLUSAO_DOCUMENTO',
          descricao: `Link da Nota Fiscal/Documento adicionado: "${nome}" (${urlFormatada})${targetIds.length > 1 ? ' (vinculado a todas as parcelas do contrato)' : ''}.`,
          usuario: 'Usuário',
        },
      });

      revalidatePath(`/lancamento/${targetId}`);
    }

    revalidatePath('/');
    revalidatePath('/lancamentos');
    return { success: true, parcelasAfetadas: targetIds.length };
  } catch (error) {
    console.error('Erro ao adicionar link de documento:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Não foi possível salvar o link.' };
  }
}

