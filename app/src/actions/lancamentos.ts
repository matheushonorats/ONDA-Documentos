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
  try {
    revalidatePath('/');
    revalidatePath('/lancamentos');
    revalidatePath('/clientes');
    revalidatePath('/colaboradores');
    if (id) revalidatePath(`/lancamento/${id}`);
  } catch {
    // Ignora revalidatePath quando executado via CLI/script standalone
  }
}

export async function searchLancamentos(
  query = '',
  tipo = 'RECEITA',
  page = 1,
  filters?: { statusDoc?: string; veiculoId?: string }
) {
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

  const andConditions: Prisma.LancamentoWhereInput[] = [];

  if (filters?.statusDoc === 'SEM_NF') {
    andConditions.push({
      OR: [{ numeroNotaFiscal: null }, { numeroNotaFiscal: '' }],
    });
  } else if (filters?.statusDoc === 'COM_NF') {
    andConditions.push({
      AND: [{ numeroNotaFiscal: { not: null } }, { numeroNotaFiscal: { not: '' } }],
    });
  } else if (filters?.statusDoc === 'COM_DOCS') {
    andConditions.push({ documentos: { some: {} } });
  } else if (filters?.statusDoc === 'SEM_DOCS') {
    andConditions.push({ documentos: { none: {} } });
  }

  if (filters?.veiculoId && filters.veiculoId !== 'TODOS') {
    andConditions.push({ veiculoId: filters.veiculoId });
  }

  const take = 50;
  const skip = (page - 1) * take;

  const whereClause: Prisma.LancamentoWhereInput = {
    ...(validType ? { tipoLancamento: validType } : {}),
    ...(or.length ? { OR: or } : {}),
    ...(andConditions.length ? { AND: andConditions } : {}),
  };

  const lancamentos = await db.lancamento.findMany({
    take: take + 1,
    skip,
    where: whereClause,
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

async function saveDocuments(lancamento: { id: string; tipoLancamento: string }, formData: FormData, targetIds?: string[]) {
  const raw = formData.get('arquivosMeta');
  if (!raw) return 0;
  const metadata = JSON.parse(String(raw)) as UploadMeta[];
  if (!metadata.length) return 0;

  const folderId = lancamento.tipoLancamento === 'RECEITA' ? process.env.GOOGLE_DRIVE_FOLDER_RECEBER : process.env.GOOGLE_DRIVE_FOLDER_PAGAR;
  if (!folderId || (!process.env.GOOGLE_CLIENT_EMAIL && !process.env.GOOGLE_REFRESH_TOKEN)) {
    throw new Error('O Google Drive ainda não está configurado para receber arquivos.');
  }

  const uploaded: Array<{ driveId: string; webViewLink: string | null; typeId: string; typeName: string; file: File; name: string }> = [];
  try {
    for (let index = 0; index < metadata.length; index += 1) {
      const meta = metadata[index];
      const file = formData.get(`file_${index}`);
      if (!(file instanceof File) || file.size === 0) throw new Error('Um dos arquivos selecionados está vazio ou indisponível.');
      if (file.size > 50 * 1024 * 1024) throw new Error(`O arquivo ${file.name} ultrapassa o limite de 50 MB.`);
      const type = await resolveType(meta);
      const response = await uploadToGoogleDrive(Buffer.from(await file.arrayBuffer()), file.name, file.type || 'application/octet-stream', folderId);
      if (!response.id) throw new Error(`O Drive não retornou a identificação de ${file.name}.`);
      uploaded.push({ driveId: response.id, webViewLink: response.webViewLink ?? null, typeId: type.id, typeName: type.nome, file, name: meta.nomeOriginal || file.name });
    }

    const documentsToCreate: Prisma.DocumentoCreateManyInput[] = [];
    const mainTargetId = lancamento.id;

    for (const item of uploaded) {
      // Notas Fiscais, Boletos e Comprovantes pertencem APENAS a parcela individual em que foram anexados
      const isSpecificDoc = /nota fiscal|\bnf\b|boleto|comprovante/i.test(item.typeName) || /nota fiscal|\bnf\b|boleto|comprovante/i.test(item.name);
      const idsForThisDoc = !isSpecificDoc && targetIds && targetIds.length > 0 ? targetIds : [mainTargetId];

      for (const targetId of idsForThisDoc) {
        documentsToCreate.push({
          lancamentoId: targetId,
          tipoDocumentoId: item.typeId,
          nomeOriginal: item.name,
          caminhoOriginal: item.driveId,
          urlPublica: item.webViewLink,
          tamanhoBytes: item.file.size,
          usuarioResponsavel: 'Inclusão pelo sistema',
        });
      }
    }

    await db.documento.createMany({
      data: documentsToCreate,
    });

    const affectedIds = Array.from(new Set(documentsToCreate.map(d => d.lancamentoId)));

    await db.historicoLancamento.createMany({
      data: affectedIds.map(targetId => ({
        lancamentoId: targetId,
        acao: 'INCLUSAO_DOCUMENTO',
        descricao: `${uploaded.length} novo(s) documento(s) adicionado(s): ${uploaded.map(u => u.name).join(', ')}.`,
        usuario: 'Usuário',
      })),
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

    // Cálculo exato de parcelas em centavos para eliminar qualquer perda residual
    const totalCents = valorTotalNum !== null ? Math.round(valorTotalNum * 100) : null;
    const baseCents = (totalCents !== null && qtdParcelas > 0) ? Math.floor(totalCents / qtdParcelas) : null;
    const remainderCents = (totalCents !== null && baseCents !== null) ? totalCents - (baseCents * qtdParcelas) : 0;

    const dataEmissaoBase = parseDate(formData.get('dataEmissao'));
    const vencimentoBase = parseDate(formData.get('vencimento'));
    
    let rawPi = String(formData.get('numeroPi') || '').trim();
    let rawContrato = String(formData.get('numeroContrato') || '').trim();

    let numeroPi = (rawPi && !/^[-_.\s]+$/.test(rawPi) && !/^(?:NENHUM|SEM|NAO|N\/A)$/i.test(rawPi))
      ? rawPi
      : null;

    let numeroContrato = (rawContrato && !/^[-_.\s]+$/.test(rawContrato) && !/^(?:PUBLICIDADE|SERVI[ÇC]O|NENHUM|SEM|NAO|N\/A)$/i.test(rawContrato))
      ? rawContrato
      : null;

    // Garante que grupos de parcelas tenham sempre um identificador comum
    if (gerarParcelas && !numeroPi && !numeroContrato) {
      const datePart = new Date().toISOString().slice(0, 10).replace(/-/g, '');
      const randPart = Math.random().toString(36).substring(2, 6).toUpperCase();
      numeroContrato = `PARC-${datePart}-${randPart}`;
    }
    
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

    let agenciaId = String(formData.get('agenciaId') || '') || null;
    const agenciaNome = String(formData.get('agenciaNome') || '').trim();
    const agenciaCnpj = String(formData.get('agenciaCnpj') || '').trim() || null;
    if (!agenciaId && agenciaNome) {
      const existingAgencia = await db.agencia.findFirst({
        where: {
          OR: [
            { nome: { equals: agenciaNome } },
            ...(agenciaCnpj ? [{ cnpj: { contains: agenciaCnpj.replace(/\D/g, '') } }] : []),
          ],
        },
      });
      if (existingAgencia) {
        agenciaId = existingAgencia.id;
      } else {
        const newAgencia = await db.agencia.create({
          data: {
            nome: agenciaNome,
            cnpj: agenciaCnpj,
          },
        });
        agenciaId = newAgencia.id;
      }
    }

    let veiculoId = String(formData.get('veiculoId') || '') || null;
    const veiculoNome = String(formData.get('veiculoNome') || '').trim();
    if (!veiculoId && veiculoNome) {
      const existingVeiculo = await db.veiculo.findFirst({
        where: {
          nome: { equals: veiculoNome },
        },
      });
      if (existingVeiculo) {
        veiculoId = existingVeiculo.id;
      }
    }

    let primeiroLancamentoId: string | null = null;
    const idsCriados: string[] = [];

    try {
      for (let i = 0; i < qtdParcelas; i++) {
        const currentVencimento = addMonthsDate(vencimentoBase, i);
        const currentRef = addMonthsRef(mesAnoReferenciaBase, i);
        
        // Ajusta os centavos restantes na última parcela para soma exata (100.00%)
        const parcelCents = (totalCents !== null && baseCents !== null)
          ? (i === qtdParcelas - 1 ? baseCents + remainderCents : baseCents)
          : null;
        const valorParcela = parcelCents !== null ? parcelCents / 100 : null;
        
        const lancamento = await db.lancamento.create({ data: {
          tipoLancamento,
          clienteId,
          colaboradorId,
          agenciaId,
          veiculoId,
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
        } else {
          await db.historicoLancamento.create({
            data: {
              lancamentoId: lancamento.id,
              acao: 'CRIACAO',
              descricao: `Lançamento criado via parcelamento (Parcela ${i + 1} de ${qtdParcelas}).`,
              usuario: 'Usuário',
            },
          });
        }
      }

      // Salva os documentos anexados em TODAS as parcelas geradas
      if (idsCriados.length > 0) {
        await saveDocuments({ id: idsCriados[0], tipoLancamento }, formData, idsCriados);
      }

      const urlNf = String(formData.get('urlNotaFiscal') || '').trim();
      if (urlNf && primeiroLancamentoId) {
        const urlFormatada = urlNf.startsWith('http') ? urlNf : `https://${urlNf}`;
        let tipoNfObj = await db.tipoDocumento.findFirst({ where: { nome: { contains: 'Nota Fiscal' } } });
        if (!tipoNfObj) {
          tipoNfObj = await db.tipoDocumento.create({ data: { nome: 'Nota Fiscal' } });
        }
        await db.documento.create({
          data: {
            lancamentoId: primeiroLancamentoId,
            tipoDocumentoId: tipoNfObj.id,
            nomeOriginal: nf ? `Link da NF ${nf}` : 'Link da Nota Fiscal Emitida',
            urlPublica: urlFormatada,
            caminhoOriginal: null,
            tamanhoBytes: 0,
            usuarioResponsavel: 'Inclusão pelo formulário',
          },
        });
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
      include: {
        cliente: true,
        colaborador: true,
        agencia: true,
        veiculo: true,
        documentos: { include: { tipoDocumento: true } },
      },
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

    // Gerenciamento sincronizado do Link / URL da Nota Fiscal
    if (formData.has('urlNotaFiscal')) {
      const rawUrl = String(formData.get('urlNotaFiscal') || '').trim();
      const existingNfDoc = current.documentos.find(
        (d) => (d.urlPublica && !d.caminhoOriginal) || d.tipoDocumento?.nome?.toLowerCase().includes('nota')
      );

      if (rawUrl) {
        const urlFormatada = rawUrl.startsWith('http') ? rawUrl : `https://${rawUrl}`;
        const nomeDoc = newNf ? `Link da NF ${newNf}` : 'Link da Nota Fiscal Emitida';

        if (existingNfDoc) {
          if (existingNfDoc.urlPublica !== urlFormatada || existingNfDoc.nomeOriginal !== nomeDoc) {
            await db.documento.update({
              where: { id: existingNfDoc.id },
              data: {
                urlPublica: urlFormatada,
                nomeOriginal: nomeDoc,
              },
            });
            changes.push(`Link da Nota Fiscal atualizado`);
          }
        } else {
          let tipoNfObj = await db.tipoDocumento.findFirst({ where: { nome: { contains: 'Nota Fiscal' } } });
          if (!tipoNfObj) {
            tipoNfObj = await db.tipoDocumento.create({ data: { nome: 'Nota Fiscal' } });
          }
          await db.documento.create({
            data: {
              lancamentoId: id,
              tipoDocumentoId: tipoNfObj.id,
              nomeOriginal: nomeDoc,
              urlPublica: urlFormatada,
              caminhoOriginal: null,
              tamanhoBytes: 0,
              usuarioResponsavel: 'Edição de lançamento',
            },
          });
          changes.push(`Link da Nota Fiscal adicionado`);
        }
      } else if (existingNfDoc && existingNfDoc.urlPublica && !existingNfDoc.caminhoOriginal) {
        await db.documento.delete({ where: { id: existingNfDoc.id } });
        changes.push(`Link da Nota Fiscal removido`);
      }
    }

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

    // Excluir arquivos associados do Google Drive de forma resiliente
    if (lancamento.documentos && lancamento.documentos.length > 0) {
      await Promise.allSettled(
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

export async function sincronizarDocumentosPI() {
  try {
    const lancamentos = await db.lancamento.findMany({
      include: { documentos: { include: { tipoDocumento: true } } },
    });

    const piGroups = new Map<string, typeof lancamentos>();

    const cleanKey = (k?: string | null) =>
      k && !/^[-_.\s]+$/.test(k.trim()) && !/^(?:NENHUM|SEM|NAO|N\/A|PUBLICIDADE|SERVICO)$/i.test(k.trim())
        ? k.trim().toLowerCase()
        : null;

    for (const l of lancamentos) {
      const piVal = cleanKey(l.numeroPi);
      const contratoVal = cleanKey(l.numeroContrato);
      const ownerScope = l.clienteId ? `CLI_${l.clienteId}` : l.colaboradorId ? `COL_${l.colaboradorId}` : 'GERAL';

      const piKey = piVal ? `${ownerScope}_PI_${piVal}` : null;
      const contratoKey = contratoVal ? `${ownerScope}_CTR_${contratoVal}` : null;
      const appSheetKey = l.appSheetId && l.appSheetId.includes('-') 
        ? `${ownerScope}_APP_${l.appSheetId.split('-').slice(0, -1).join('-')}` 
        : null;

      const groupKey = piKey || contratoKey || appSheetKey;
      if (!groupKey) continue;

      if (!piGroups.has(groupKey)) {
        piGroups.set(groupKey, []);
      }
      piGroups.get(groupKey)!.push(l);
    }

    let totalCopiados = 0;

    for (const [, group] of piGroups.entries()) {
      if (group.length < 2) continue;

      const allDocsMap = new Map<string, typeof group[0]['documentos'][0]>();
      for (const item of group) {
        for (const doc of item.documentos) {
          // Apenas documentos gerais do PI (PI, Contrato, Autorização, Orçamento) são compartilhados.
          // Notas Fiscais, Boletos e Comprovantes NUNCA são copiados entre parcelas.
          const typeName = doc.tipoDocumento?.nome || '';
          const isSpecificDoc = /nota fiscal|\bnf\b|boleto|comprovante/i.test(typeName) || /nota fiscal|\bnf\b|boleto|comprovante/i.test(doc.nomeOriginal);
          if (isSpecificDoc) continue;

          const docKey = doc.caminhoOriginal || doc.urlPublica || doc.nomeOriginal;
          if (docKey && !allDocsMap.has(docKey)) {
            allDocsMap.set(docKey, doc);
          }
        }
      }

      if (allDocsMap.size === 0) continue;

      for (const targetLancamento of group) {
        const existingKeys = new Set(
          targetLancamento.documentos.map(d => d.caminhoOriginal || d.urlPublica || d.nomeOriginal)
        );

        for (const [key, sourceDoc] of allDocsMap.entries()) {
          if (!existingKeys.has(key)) {
            await db.documento.create({
              data: {
                lancamentoId: targetLancamento.id,
                tipoDocumentoId: sourceDoc.tipoDocumentoId,
                nomeOriginal: sourceDoc.nomeOriginal,
                caminhoOriginal: sourceDoc.caminhoOriginal,
                urlPublica: sourceDoc.urlPublica,
                tamanhoBytes: sourceDoc.tamanhoBytes,
                observacao: sourceDoc.observacao,
                status: sourceDoc.status,
                planilhaOrigem: sourceDoc.planilhaOrigem,
                colunaOrigem: sourceDoc.colunaOrigem,
                usuarioResponsavel: 'Sincronização PI/Lote',
              },
            });
            totalCopiados++;
          }
        }
      }
    }

    refreshLancamento();
    return { success: true, count: totalCopiados };
  } catch (error) {
    console.error('Erro ao sincronizar documentos de PI:', error);
    return { success: false, error: 'Não foi possível sincronizar os anexos.' };
  }
}


