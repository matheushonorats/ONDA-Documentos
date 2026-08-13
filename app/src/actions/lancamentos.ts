'use server';

import { db } from '@/lib/db';
import { deleteFromGoogleDrive, uploadToGoogleDrive } from '@/lib/gdrive';
import { Prisma } from '@/generated/prisma';
import { revalidatePath } from 'next/cache';

type UploadMeta = { tipoId: string; novoTipoDocumento?: string; nomeOriginal: string };

function parseNumber(value: FormDataEntryValue | null) {
  if (!value) return null;
  const normalized = String(value).replace(/\s/g, '').replace(/\.(?=\d{3}(?:\D|$))/g, '').replace(',', '.');
  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : null;
}

function parseDate(value: FormDataEntryValue | null) {
  if (!value) return null;
  const parsed = new Date(String(value));
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

function dateSearch(query: string) {
  const match = query.match(/^(\d{2})\/(\d{2})\/(\d{4})$/) ?? query.match(/^(\d{4})-(\d{2})-(\d{2})$/)?.map((value, index, all) => index === 0 ? value : all[index]);
  let date: Date | null = null;
  if (query.match(/^\d{2}\/\d{2}\/\d{4}$/) && match) date = new Date(Number(match[3]), Number(match[2]) - 1, Number(match[1]));
  if (query.match(/^\d{4}-\d{2}-\d{2}$/)) {
    const [year, month, day] = query.split('-').map(Number);
    date = new Date(year, month - 1, day);
  }
  if (!date || Number.isNaN(date.getTime())) return null;
  const end = new Date(date);
  end.setDate(end.getDate() + 1);
  return { gte: date, lt: end };
}

function refreshLancamento(id?: string) {
  revalidatePath('/');
  revalidatePath('/lancamentos');
  revalidatePath('/clientes');
  revalidatePath('/colaboradores');
  if (id) revalidatePath(`/lancamento/${id}`);
}

export async function searchLancamentos(query = '', tipo = 'RECEITA', page = 1) {
  const cleaned = query.trim();
  const validType = tipo === 'DESPESA' ? 'DESPESA' : tipo === 'TODOS' ? null : 'RECEITA';
  const numericValue = cleaned ? parseNumber(cleaned) : null;
  const searchedDate = cleaned ? dateSearch(cleaned) : null;
  const or: Prisma.LancamentoWhereInput[] = cleaned ? [
    { appSheetId: { contains: cleaned } },
    { cliente: { razaoSocial: { contains: cleaned } } },
    { cliente: { nomeFantasia: { contains: cleaned } } },
    { cliente: { cnpj: { contains: cleaned } } },
    { agencia: { nome: { contains: cleaned } } },
    { veiculo: { nome: { contains: cleaned } } },
    { colaborador: { nome: { contains: cleaned } } },
    { colaborador: { cpfCnpj: { contains: cleaned } } },
    { numeroNotaFiscal: { contains: cleaned } },
    { numeroPi: { contains: cleaned } },
    { numeroPi: { contains: cleaned.replace(/[.\-\s]/g, '') } },
    { numeroContrato: { contains: cleaned } },
    { descricao: { contains: cleaned } },
    { mesAnoReferencia: { contains: cleaned } },
    { documentos: { some: { nomeOriginal: { contains: cleaned } } } },
    { documentos: { some: { caminhoOriginal: { contains: cleaned } } } },
  ] : [];
  if (numericValue !== null) or.push({ valor: { equals: numericValue } });
  if (searchedDate) or.push({ dataEmissao: searchedDate }, { vencimento: searchedDate }, { dataPagamento: searchedDate });

  const take = 50;
  const skip = (page - 1) * take;

  const lancamentos = await db.lancamento.findMany({
    take: take + 1,
    skip,
    where: {
      ...(validType ? { tipoLancamento: validType } : {}),
      ...(or.length ? { OR: or } : {}),
    },
    include: {
      cliente: true,
      agencia: true,
      veiculo: true,
      colaborador: true,
      documentos: { include: { tipoDocumento: true }, orderBy: { dataInclusao: 'desc' } },
    },
    orderBy: [{ updatedAt: 'desc' }, { createdAt: 'desc' }],
  });

  const hasMore = lancamentos.length > take;
  if (hasMore) lancamentos.pop();

  return { data: lancamentos, hasMore };
}

export async function getLancamentoById(id: string) {
  return db.lancamento.findUnique({
    where: { id },
    include: {
      cliente: true,
      agencia: true,
      veiculo: true,
      colaborador: true,
      documentos: { include: { tipoDocumento: true }, orderBy: { dataInclusao: 'desc' } },
      marcacoes: true,
      historico: { orderBy: { createdAt: 'desc' } },
    },
  });
}

async function resolveType(meta: UploadMeta) {
  if (meta.tipoId === 'NOVO') {
    const name = meta.novoTipoDocumento?.trim();
    if (!name) throw new Error('Informe o nome do novo tipo de documento.');
    return db.tipoDocumento.upsert({ where: { nome: name }, update: {}, create: { nome: name } });
  }
  const type = await db.tipoDocumento.findUnique({ where: { id: meta.tipoId } });
  if (!type) throw new Error('Selecione um tipo válido para cada arquivo.');
  return type;
}

async function saveDocuments(lancamento: { id: string; tipoLancamento: string }, formData: FormData) {
  const raw = formData.get('arquivosMeta');
  if (!raw) return 0;
  const metadata = JSON.parse(String(raw)) as UploadMeta[];
  if (!metadata.length) return 0;

  const folderId = lancamento.tipoLancamento === 'RECEITA' ? process.env.GOOGLE_DRIVE_FOLDER_RECEBER : process.env.GOOGLE_DRIVE_FOLDER_PAGAR;
  if (!folderId || (!process.env.GOOGLE_CLIENT_EMAIL && !process.env.GOOGLE_REFRESH_TOKEN)) {
    throw new Error('O Google Drive ainda não está configurado para receber arquivos.');
  }

  const uploaded: Array<{ driveId: string; webViewLink: string | null; typeId: string; file: File; name: string }> = [];
  try {
    for (let index = 0; index < metadata.length; index += 1) {
      const meta = metadata[index];
      const file = formData.get(`file_${index}`);
      if (!(file instanceof File) || file.size === 0) throw new Error('Um dos arquivos selecionados está vazio ou indisponível.');
      if (file.size > 50 * 1024 * 1024) throw new Error(`O arquivo ${file.name} ultrapassa o limite de 50 MB.`);
      const type = await resolveType(meta);
      const response = await uploadToGoogleDrive(Buffer.from(await file.arrayBuffer()), file.name, file.type || 'application/octet-stream', folderId);
      if (!response.id) throw new Error(`O Drive não retornou a identificação de ${file.name}.`);
      uploaded.push({ driveId: response.id, webViewLink: response.webViewLink ?? null, typeId: type.id, file, name: meta.nomeOriginal || file.name });
    }

    await db.$transaction(uploaded.map((item) => db.documento.create({
      data: {
        lancamentoId: lancamento.id,
        tipoDocumentoId: item.typeId,
        nomeOriginal: item.name,
        caminhoOriginal: item.driveId,
        urlPublica: item.webViewLink,
        tamanhoBytes: item.file.size,
        usuarioResponsavel: 'Inclusão pelo sistema',
      },
    })));

    // Registrar histórico da adição de documentos
    await db.historicoLancamento.create({
      data: {
        lancamentoId: lancamento.id,
        acao: 'INCLUSAO_DOCUMENTO',
        descricao: `${uploaded.length} novo(s) documento(s) adicionado(s): ${uploaded.map(u => u.name).join(', ')}.`,
        usuario: 'Usuário',
      },
    });

    return uploaded.length;
  } catch (error) {
    await Promise.all(uploaded.map((item) => deleteFromGoogleDrive(item.driveId)));
    throw error;
  }
}

export async function createLancamento(formData: FormData) {
  const tipoLancamento = formData.get('tipoLancamento') === 'DESPESA' ? 'DESPESA' : 'RECEITA';
  try {
    let clienteId: string | null = null;
    let colaboradorId: string | null = null;
    if (tipoLancamento === 'RECEITA') {
      clienteId = String(formData.get('clienteId') || '') || null;
      const newName = String(formData.get('novoClienteNome') || '').trim();
      if (newName) {
        const existing = await db.cliente.findFirst({ where: { OR: [{ razaoSocial: newName }, { nomeFantasia: newName }] } });
        const client = existing ?? await db.cliente.create({ data: {
          razaoSocial: newName,
          nomeFantasia: String(formData.get('novoClienteNomeFantasia') || '') || null,
          cnpj: String(formData.get('novoClienteCnpj') || '') || null,
          cidade: String(formData.get('novoClienteCidade') || '') || null,
          tipificacao: 'Cliente',
        } });
        clienteId = client.id;
      }
      if (!clienteId) throw new Error('Selecione um cliente cadastrado.');
    } else {
      colaboradorId = String(formData.get('colaboradorId') || '') || null;
      const newName = String(formData.get('novoColaboradorNome') || '').trim();
      if (newName) {
        const existing = await db.colaborador.findFirst({ where: { nome: newName } });
        const collaborator = existing ?? await db.colaborador.create({ data: { nome: newName, cargo: 'Fornecedor', tipificacao: 'Fornecedor' } });
        colaboradorId = collaborator.id;
      }
      if (!colaboradorId) throw new Error('Selecione um colaborador ou fornecedor cadastrado.');
    }

    const nf = String(formData.get('numeroNotaFiscal') || '') || null;
    const valorTotalNum = parseNumber(formData.get('valor'));
    const gerarParcelas = formData.get('gerarParcelas') === 'true';
    let qtdParcelas = gerarParcelas ? (parseInt(String(formData.get('qtdParcelas'))) || 1) : 1;
    if (qtdParcelas > 120) qtdParcelas = 120; // Cap de segurança (Max 10 anos)
    if (qtdParcelas < 1) qtdParcelas = 1;
    
    const valorParcela = valorTotalNum !== null ? parseFloat((valorTotalNum / qtdParcelas).toFixed(2)) : null;

    const dataEmissaoBase = parseDate(formData.get('dataEmissao'));
    const vencimentoBase = parseDate(formData.get('vencimento'));
    
    const numeroPi = String(formData.get('numeroPi') || '') || null;
    const numeroContrato = String(formData.get('numeroContrato') || '') || null;
    
    const mesAnoReferenciaBase = (() => {
      const val = String(formData.get('mesAnoReferencia') || '').trim();
      if (/^\d{4}-\d{2}$/.test(val)) {
        const [year, month] = val.split('-');
        return `${month}/${year}`;
      }
      return val || null;
    })();

    const addMonthsDate = (d: Date | null, m: number) => {
      if (!d) return null;
      const nd = new Date(d);
      nd.setMonth(nd.getMonth() + m);
      return nd;
    };

    const addMonthsRef = (ref: string | null, m: number) => {
      if (!ref || !/^\d{2}\/\d{4}$/.test(ref)) return ref;
      let [month, year] = ref.split('/').map(Number);
      month += m;
      while (month > 12) { month -= 12; year++; }
      return `${month.toString().padStart(2, '0')}/${year}`;
    };

    let primeiroLancamentoId: string | null = null;
    const idsCriados: string[] = [];

    try {
      for (let i = 0; i < qtdParcelas; i++) {
        const currentVencimento = addMonthsDate(vencimentoBase, i);
        const currentRef = addMonthsRef(mesAnoReferenciaBase, i);
        
        const lancamento = await db.lancamento.create({ data: {
          tipoLancamento,
          clienteId,
          colaboradorId,
          agenciaId: String(formData.get('agenciaId') || '') || null,
          veiculoId: String(formData.get('veiculoId') || '') || null,
          numeroNotaFiscal: i === 0 ? nf : null, // NF inicial informada fica apenas na 1ª parcela (demais ficam sem NF para emissão mensal)
          descricao: String(formData.get('descricao') || '') || null,
          valor: valorParcela,
          dataEmissao: dataEmissaoBase,
          vencimento: currentVencimento,
          numeroPi,
          numeroContrato,
          mesAnoReferencia: currentRef,
        } });

        idsCriados.push(lancamento.id);

        if (i === 0) {
          primeiroLancamentoId = lancamento.id;
          await db.historicoLancamento.create({
            data: {
              lancamentoId: lancamento.id,
              acao: 'CRIACAO',
              descricao: `Lançamento criado ${qtdParcelas > 1 ? `(Parcela 1 de ${qtdParcelas}) ` : ''}(${tipoLancamento === 'RECEITA' ? 'Receita' : 'Despesa'})${nf ? ` - NF ${nf}` : ''}.`,
              usuario: 'Usuário',
            },
          });
          // Salva os documentos anexados apenas na 1ª parcela
          await saveDocuments(lancamento, formData);
        } else {
          await db.historicoLancamento.create({
            data: {
              lancamentoId: lancamento.id,
              acao: 'CRIACAO',
              descricao: `Lançamento criado via parcelamento (Parcela ${i + 1} de ${qtdParcelas}). Documentos associados podem estar na 1ª parcela.`,
              usuario: 'Usuário',
            },
          });
        }
      }
      
      refreshLancamento(); // Revalida a tabela
      if (primeiroLancamentoId) refreshLancamento(primeiroLancamentoId);
      
      return { success: true, id: primeiroLancamentoId! };
    } catch (error) {
      // Rollback se falhar durante criação de parcelas
      for (const id of idsCriados) {
        await db.lancamento.delete({ where: { id } }).catch(() => {});
      }
      throw error;
    }
  } catch (error) {
    console.error('Erro ao criar lançamento:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Não foi possível salvar o lançamento.' };
  }
}

export async function adicionarDocumentos(lancamentoId: string, formData: FormData) {
  try {
    const lancamento = await db.lancamento.findUnique({ where: { id: lancamentoId } });
    if (!lancamento) throw new Error('Lançamento não encontrado.');
    const count = await saveDocuments(lancamento, formData);
    if (!count) throw new Error('Selecione ao menos um arquivo.');
    refreshLancamento(lancamento.id);
    return { success: true, count };
  } catch (error) {
    console.error('Erro ao adicionar documentos:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Não foi possível enviar os arquivos.' };
  }
}

export async function updateLancamento(id: string, formData: FormData) {
  try {
    const current = await db.lancamento.findUnique({
      where: { id },
      include: { cliente: true, colaborador: true, agencia: true, veiculo: true },
    });
    if (!current) throw new Error('Lançamento não encontrado.');

    const newNf = String(formData.get('numeroNotaFiscal') || '') || null;
    const newDesc = String(formData.get('descricao') || '') || null;
    const newValor = parseNumber(formData.get('valor'));
    const newPi = String(formData.get('numeroPi') || '') || null;
    const newContrato = String(formData.get('numeroContrato') || '') || null;
    const newRef = (() => {
      const val = String(formData.get('mesAnoReferencia') || '').trim();
      if (/^\d{4}-\d{2}$/.test(val)) {
        const [year, month] = val.split('-');
        return `${month}/${year}`;
      }
      return val || null;
    })();

    const changes: string[] = [];
    if (newNf !== current.numeroNotaFiscal) changes.push(`Nota Fiscal: de "${current.numeroNotaFiscal || 'vazio'}" para "${newNf || 'vazio'}"`);
    if (newValor !== current.valor) changes.push(`Valor: de "${current.valor !== null ? `R$ ${current.valor}` : 'vazio'}" para "${newValor !== null ? `R$ ${newValor}` : 'vazio'}"`);
    if (newDesc !== current.descricao) changes.push(`Descrição alterada`);
    if (newPi !== current.numeroPi) changes.push(`PI: de "${current.numeroPi || 'vazio'}" para "${newPi || 'vazio'}"`);
    if (newContrato !== current.numeroContrato) changes.push(`Contrato alterado`);
    if (newRef !== current.mesAnoReferencia) changes.push(`Referência: de "${current.mesAnoReferencia || 'vazio'}" para "${newRef || 'vazio'}"`);

    await db.lancamento.update({ where: { id }, data: {
      clienteId: String(formData.get('clienteId') || '') || null,
      colaboradorId: String(formData.get('colaboradorId') || '') || null,
      numeroNotaFiscal: newNf,
      descricao: newDesc,
      valor: newValor,
      dataEmissao: parseDate(formData.get('dataEmissao')),
      vencimento: parseDate(formData.get('vencimento')),
      numeroPi: newPi,
      numeroContrato: newContrato,
      mesAnoReferencia: newRef,
      veiculoId: String(formData.get('veiculoId') || '') || null,
      agenciaId: String(formData.get('agenciaId') || '') || null,
    } });

    if (changes.length > 0) {
      await db.historicoLancamento.create({
        data: {
          lancamentoId: id,
          acao: 'EDICAO_DADOS',
          descricao: `Informações atualizadas: ${changes.join(' | ')}.`,
          usuario: 'Usuário',
        },
      });
    }

    refreshLancamento(id);
    return { success: true };
  } catch (error) {
    console.error('Erro ao atualizar lançamento:', error);
    return { success: false, error: 'Não foi possível salvar as alterações.' };
  }
}

export async function deleteLancamento(id: string) {
  try {
    const lancamento = await db.lancamento.findUnique({
      where: { id },
      include: { documentos: true },
    });

    if (!lancamento) {
      return { success: false, error: 'Lançamento não encontrado.' };
    }

    // Excluir arquivos associados do Google Drive
    if (lancamento.documentos && lancamento.documentos.length > 0) {
      await Promise.all(
        lancamento.documentos
          .filter(doc => doc.caminhoOriginal)
          .map(doc => deleteFromGoogleDrive(doc.caminhoOriginal!))
      );
    }

    await db.lancamento.delete({ where: { id } });
    
    refreshLancamento();
    return { success: true };
  } catch (error) {
    console.error('Erro ao excluir lançamento:', error);
    return { success: false, error: 'Não foi possível excluir o lançamento.' };
  }
}

