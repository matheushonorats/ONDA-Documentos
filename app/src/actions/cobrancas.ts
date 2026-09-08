'use server';

import { revalidatePath } from 'next/cache';
import {
  SPREADSHEET_CSV_URL,
  AgenciaGrupo,
  ContratoCompleto,
  CobrancasDataResponse,
  DebitoItem,
  EmailGerado,
  parseCSV,
  parseCurrency,
  formatCurrency,
  parseBrazilianDate,
  extractEmails,
  calculateDaysOverdue,
  buildEmailData,
  getBrasiliaToday,
} from '@/lib/cobrancasTypes';
import {
  COLS,
  findRowByCobrancaNo,
  updateCell,
  appendRow,
  getNextCobrancaNo,
} from '@/lib/gsheets';

// Re-exportação de tipos para conveniência no servidor
export type {
  DebitoItem,
  AgenciaGrupo,
  ContratoCompleto,
  CobrancasMetrics,
  CobrancasDataResponse,
  EmailGerado,
} from '@/lib/cobrancasTypes';

/**
 * Obtém os dados ao vivo da planilha de cobrança semanal do Google Sheets,
 * processa e agrupa de acordo com as regras de negócio da Ondas 985.
 */
export async function getCobrancasData(bypassCache = false): Promise<CobrancasDataResponse> {
  const fetchOptions: RequestInit = bypassCache
    ? { cache: 'no-store' }
    : { next: { revalidate: 300 } };

  const res = await fetch(SPREADSHEET_CSV_URL, fetchOptions);

  if (!res.ok) {
    throw new Error(`Falha ao carregar a planilha do Google Sheets: ${res.status} ${res.statusText}`);
  }

  const csvText = await res.text();
  const rows = parseCSV(csvText);

  if (rows.length === 0) {
    return {
      metrics: {
        totalVencido: 0,
        totalVencidoFormatado: 'R$ 0,00',
        totalPago: 0,
        totalPagoFormatado: 'R$ 0,00',
        totalAgenciasPendentes: 0,
        totalContratosPendentes: 0,
        totalContratosGeral: 0,
        totalContratosPagos: 0,
        totalAVencer: 0,
        totalAVencerFormatado: 'R$ 0,00',
      },
      agenciasGrupos: [],
      todosContratos: [],
      ultimaAtualizacao: new Date().toISOString(),
    };
  }

  // Mapeamento dinâmico de cabeçalhos
  const headerRow = rows[0].map((h) => h.toLowerCase().trim());
  const getCol = (name: string, fallback: number) => {
    const idx = headerRow.findIndex((h) => h.includes(name.toLowerCase()));
    return idx !== -1 ? idx : fallback;
  };

  const colCobranca = getCol('cobrança nº', 0);
  const colPi = getCol('pi', 1);
  const colVeiculo = getCol('veículo', 2);
  const colAgencia = getCol('agência', 3);
  const colValor = getCol('valor', 4);
  const colDataExp = getCol('expirada', 5);
  const colEmail = getCol('mail', 6);
  const colUltCob = getCol('ult', 7);
  const colLink = getCol('link', 8);
  const colNovaData = getCol('nova data', 9);
  const colObs = getCol('obs', 10);
  const colPago = getCol('pago', 11);

  const hoje = getBrasiliaToday();

  let totalPago = 0;
  let totalVencido = 0;
  let totalAVencer = 0;
  let totalContratosPagos = 0;

  const todosContratos: ContratoCompleto[] = [];
  const mapAgenciasVencidas = new Map<string, { agencyName: string; debts: DebitoItem[]; emailSet: Set<string> }>();

  // Processa as linhas de dados (ignorando o cabeçalho)
  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    const cobrancaNo = row[colCobranca] || '';
    const pi = row[colPi] || '';
    const veiculo = row[colVeiculo] || '';
    const agencia = (row[colAgencia] || '').trim();
    const valorStr = row[colValor] || '';
    const dataExpirada = row[colDataExp] || '';
    const emailStr = row[colEmail] || '';
    const ultCobranca = row[colUltCob] || '';
    const link = row[colLink] || '';
    const novaData = row[colNovaData] || '';
    const obs = row[colObs] || '';
    const pagoStr = (row[colPago] || '').trim().toUpperCase();

    // Pula linhas totalmente vazias ou de rodapé sem identificação
    if (!pi && !agencia && !valorStr) continue;

    const valor = parseCurrency(valorStr);
    const isPago = pagoStr === 'TRUE';
    const hasNovaData = Boolean(novaData && novaData.trim());
    const dataVencEfetivaStr = novaData || dataExpirada;
    const vencimentoDate = parseBrazilianDate(dataVencEfetivaStr);

    let status: 'PAGO' | 'VENCIDO' | 'A_VENCER' = 'A_VENCER';
    let diasAtraso = 0;

    if (isPago) {
      status = 'PAGO';
      totalPago += valor;
      totalContratosPagos++;
    } else {
      const isVencido = vencimentoDate ? vencimentoDate.getTime() <= hoje.getTime() : false;
      if (isVencido) {
        status = 'VENCIDO';
        totalVencido += valor;
        diasAtraso = calculateDaysOverdue(vencimentoDate, hoje);

        // Regra do Google Apps Script: elegível para notificação semanal se:
        // 1. Possui novaData (vencimento configurado) e dataVenc <= hoje
        // 2. Possui PI, Agência e E-mail
        if (hasNovaData && agencia && pi && emailStr) {
          if (!mapAgenciasVencidas.has(agencia)) {
            mapAgenciasVencidas.set(agencia, {
              agencyName: agencia,
              debts: [],
              emailSet: new Set<string>(),
            });
          }

          const entry = mapAgenciasVencidas.get(agencia)!;
          entry.debts.push({
            cobrancaNo,
            pi,
            veiculo,
            valor,
            valorFormatado: formatCurrency(valor),
            dataOriginal: dataExpirada,
            dataVenc: dataVencEfetivaStr,
            ultCobranca,
            link,
            obs,
            diasAtraso,
          });

          extractEmails(emailStr).forEach((e) => entry.emailSet.add(e));
        }
      } else {
        status = 'A_VENCER';
        totalAVencer += valor;
      }
    }

    todosContratos.push({
      cobrancaNo,
      pi,
      veiculo,
      agencia,
      valor,
      valorFormatado: formatCurrency(valor),
      dataExpirada,
      novaData,
      dataVencEfetiva: dataVencEfetivaStr,
      email: emailStr,
      ultCobranca,
      link,
      obs,
      pago: isPago,
      status,
      diasAtraso,
    });
  }

  // Monta lista agrupada de agências
  const agenciasGrupos: AgenciaGrupo[] = Array.from(mapAgenciasVencidas.values()).map((entry) => {
    // Ordena débitos da agência do mais antigo para o mais recente
    entry.debts.sort((a, b) => {
      const dateA = parseBrazilianDate(a.dataVenc)?.getTime() || 0;
      const dateB = parseBrazilianDate(b.dataVenc)?.getTime() || 0;
      return dateA - dateB;
    });

    const totalValor = entry.debts.reduce((acc, curr) => acc + curr.valor, 0);
    const emails = Array.from(entry.emailSet);

    return {
      agencia: entry.agencyName,
      emails,
      emailsFormatados: emails.join(', '),
      debts: entry.debts,
      totalValor,
      totalValorFormatado: formatCurrency(totalValor),
      quantidadeContratos: entry.debts.length,
    };
  });

  // Ordena os grupos de agência pelo maior valor total devido (prioridade de cobrança)
  agenciasGrupos.sort((a, b) => b.totalValor - a.totalValor);

  const totalContratosPendentes = agenciasGrupos.reduce((acc, curr) => acc + curr.quantidadeContratos, 0);

  return {
    metrics: {
      totalVencido,
      totalVencidoFormatado: formatCurrency(totalVencido),
      totalPago,
      totalPagoFormatado: formatCurrency(totalPago),
      totalAgenciasPendentes: agenciasGrupos.length,
      totalContratosPendentes,
      totalContratosGeral: todosContratos.length,
      totalContratosPagos,
      totalAVencer,
      totalAVencerFormatado: formatCurrency(totalAVencer),
    },
    agenciasGrupos,
    todosContratos,
    ultimaAtualizacao: new Date().toISOString(),
  };
}

/**
 * Força a revalidação do cache da planilha Next.js e da página de cobranças.
 */
export async function revalidateCobrancasCache() {
  try {
    revalidatePath('/cobrancas');
  } catch {
    // Ignora se revalidatePath não estiver disponível no runtime
  }
}

/**
 * Força a sincronização ao vivo sem cache e retorna os dados atualizados imediatamente.
 */
export async function refreshCobrancasLive(): Promise<CobrancasDataResponse> {
  await revalidateCobrancasCache();
  return getCobrancasData(true);
}

/**
 * Server action para gerar o e-mail em formato HTML responsivo e Texto Plano para uma agência.
 */
export async function generateEmailForAgencia(
  grupo: AgenciaGrupo,
  modoTeste: boolean
): Promise<EmailGerado> {
  return buildEmailData(grupo, modoTeste);
}

export interface NovaCobrancaInput {
  pi: string;
  veiculo: string;
  agencia: string;
  valor: string | number;
  dataVencimento: string; // DD/MM/YYYY
  email: string;
  obs?: string;
  link?: string;
}

/**
 * Marca um contrato como PAGO na planilha Google Sheets.
 */
export async function marcarComoPago(
  cobrancaNo: string,
  pi: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const row = await findRowByCobrancaNo(cobrancaNo, pi);
    if (!row) {
      return { success: false, error: `Contrato não localizado na planilha (Cobrança #${cobrancaNo}, PI ${pi}).` };
    }
    await updateCell(row, COLS.PAGO, 'TRUE');
    await revalidateCobrancasCache();
    return { success: true };
  } catch (error: any) {
    console.error('Erro ao marcar como pago:', error);
    return { success: false, error: error?.message || 'Erro ao comunicar com Google Sheets.' };
  }
}

/**
 * Desmarca um contrato como PAGO (volta a ser pendente) na planilha Google Sheets.
 */
export async function desmarcarPago(
  cobrancaNo: string,
  pi: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const row = await findRowByCobrancaNo(cobrancaNo, pi);
    if (!row) {
      return { success: false, error: `Contrato não localizado na planilha (Cobrança #${cobrancaNo}, PI ${pi}).` };
    }
    await updateCell(row, COLS.PAGO, 'FALSE');
    await revalidateCobrancasCache();
    return { success: true };
  } catch (error: any) {
    console.error('Erro ao desmarcar pago:', error);
    return { success: false, error: error?.message || 'Erro ao comunicar com Google Sheets.' };
  }
}

/**
 * Atualiza a Nova Data de vencimento de um contrato na planilha Google Sheets.
 */
export async function atualizarNovaData(
  cobrancaNo: string,
  pi: string,
  novaData: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const row = await findRowByCobrancaNo(cobrancaNo, pi);
    if (!row) {
      return { success: false, error: `Contrato não localizado na planilha (Cobrança #${cobrancaNo}, PI ${pi}).` };
    }
    await updateCell(row, COLS.NOVA_DATA, novaData.trim());
    await revalidateCobrancasCache();
    return { success: true };
  } catch (error: any) {
    console.error('Erro ao atualizar nova data:', error);
    return { success: false, error: error?.message || 'Erro ao comunicar com Google Sheets.' };
  }
}

/**
 * Atualiza a observação de um contrato na planilha Google Sheets.
 */
export async function atualizarObs(
  cobrancaNo: string,
  pi: string,
  obs: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const row = await findRowByCobrancaNo(cobrancaNo, pi);
    if (!row) {
      return { success: false, error: `Contrato não localizado na planilha (Cobrança #${cobrancaNo}, PI ${pi}).` };
    }
    await updateCell(row, COLS.OBS, obs.trim());
    await revalidateCobrancasCache();
    return { success: true };
  } catch (error: any) {
    console.error('Erro ao atualizar observação:', error);
    return { success: false, error: error?.message || 'Erro ao comunicar com Google Sheets.' };
  }
}

/**
 * Adiciona uma nova cobrança como nova linha na planilha Google Sheets.
 */
export async function adicionarCobranca(
  dados: NovaCobrancaInput
): Promise<{ success: boolean; error?: string; cobrancaNo?: string }> {
  try {
    const proximoNumero = await getNextCobrancaNo();
    const rowValues = [
      proximoNumero,
      dados.pi.trim(),
      dados.veiculo.trim(),
      dados.agencia.trim(),
      typeof dados.valor === 'number' ? dados.valor.toFixed(2).replace('.', ',') : dados.valor.trim(),
      dados.dataVencimento.trim(),
      dados.email.trim(),
      '',
      dados.link?.trim() || '',
      dados.dataVencimento.trim(),
      dados.obs?.trim() || '',
      'FALSE',
    ];
    await appendRow(rowValues);
    await revalidateCobrancasCache();
    return { success: true, cobrancaNo: proximoNumero };
  } catch (error: any) {
    console.error('Erro ao adicionar cobrança:', error);
    return { success: false, error: error?.message || 'Erro ao adicionar linha na planilha.' };
  }
}

