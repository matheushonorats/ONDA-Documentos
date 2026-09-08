export const SPREADSHEET_ID = '10k5RPhYeevzWsp0eSRb8UWwnEDRsO5yn1mMSqhNlvOs';
export const SPREADSHEET_URL = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/edit?gid=0#gid=0`;
export const SPREADSHEET_CSV_URL = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/export?format=csv&gid=0`;

export const FINANCEIRO_EMAIL = 'adm@ondas985.com.br';
export const FINANCEIRO_SENDER_NAME = 'Financeiro Ondas 985';

export interface DebitoItem {
  cobrancaNo: string;
  pi: string;
  veiculo: string;
  valor: number;
  valorFormatado: string;
  dataOriginal: string;
  dataVenc: string;
  ultCobranca: string;
  link: string;
  obs: string;
  diasAtraso: number;
}

export interface AgenciaGrupo {
  agencia: string;
  emails: string[];
  emailsFormatados: string;
  debts: DebitoItem[];
  totalValor: number;
  totalValorFormatado: string;
  quantidadeContratos: number;
}

export interface ContratoCompleto {
  cobrancaNo: string;
  pi: string;
  veiculo: string;
  agencia: string;
  valor: number;
  valorFormatado: string;
  dataExpirada: string;
  novaData: string;
  dataVencEfetiva: string;
  email: string;
  ultCobranca: string;
  link: string;
  obs: string;
  pago: boolean;
  status: 'PAGO' | 'VENCIDO' | 'A_VENCER';
  diasAtraso: number;
}

export interface CobrancasMetrics {
  totalVencido: number;
  totalVencidoFormatado: string;
  totalPago: number;
  totalPagoFormatado: string;
  totalAgenciasPendentes: number;
  totalContratosPendentes: number;
  totalContratosGeral: number;
  totalContratosPagos: number;
  totalAVencer: number;
  totalAVencerFormatado: string;
}

export interface CobrancasDataResponse {
  metrics: CobrancasMetrics;
  agenciasGrupos: AgenciaGrupo[];
  todosContratos: ContratoCompleto[];
  ultimaAtualizacao: string;
}

export interface EmailGerado {
  assunto: string;
  html: string;
  texto: string;
  destinatarios: string[];
  replyTo: string;
  bcc: string;
  mailtoUrl: string;
  modoTeste: boolean;
}

/**
 * Parser de CSV compatível com RFC 4180 que trata quebras de linha,
 * aspas duplas escapadas ("") e campos com vírgulas internas.
 */
export function parseCSV(csvText: string): string[][] {
  const rows: string[][] = [];
  let currentRow: string[] = [];
  let currentCell = '';
  let inQuotes = false;

  for (let i = 0; i < csvText.length; i++) {
    const char = csvText[i];
    const nextChar = csvText[i + 1];

    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        currentCell += '"';
        i++; // pula a aspa dupla escapada
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      currentRow.push(currentCell.trim());
      currentCell = '';
    } else if ((char === '\r' || char === '\n') && !inQuotes) {
      if (char === '\r' && nextChar === '\n') {
        i++;
      }
      currentRow.push(currentCell.trim());
      if (currentRow.some((c) => c.length > 0)) {
        rows.push(currentRow);
      }
      currentRow = [];
      currentCell = '';
    } else {
      currentCell += char;
    }
  }

  if (currentCell.length > 0 || currentRow.length > 0) {
    currentRow.push(currentCell.trim());
    if (currentRow.some((c) => c.length > 0)) {
      rows.push(currentRow);
    }
  }

  return rows;
}

/**
 * Converte valor em formato monetário brasileiro ("R$ 1.680,00" ou "1.680,00") para número float.
 */
export function parseCurrency(valStr: string | null | undefined): number {
  if (!valStr) return 0;
  const cleaned = valStr.replace(/[R$\s.]/g, '').replace(',', '.');
  const num = parseFloat(cleaned);
  return isNaN(num) ? 0 : num;
}

/**
 * Formata um número como moeda Real Brasileira (R$ 1.234,56).
 */
export function formatCurrency(val: number): string {
  return `R$ ${val.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

/**
 * Converte string DD/MM/YYYY em objeto Date à meia-noite local.
 */
export function parseBrazilianDate(dateStr: string | null | undefined): Date | null {
  if (!dateStr || !dateStr.trim()) return null;
  const parts = dateStr.trim().split('/');
  if (parts.length === 3) {
    const d = parseInt(parts[0], 10);
    const m = parseInt(parts[1], 10) - 1;
    const y = parseInt(parts[2], 10);
    if (!isNaN(d) && !isNaN(m) && !isNaN(y)) {
      return new Date(y, m, d, 0, 0, 0, 0);
    }
  }
  return null;
}

/**
 * Extrai, normaliza e deduplica endereços de e-mail separados por vírgula, ponto-e-vírgula ou quebras de linha.
 */
export function extractEmails(emailField: string | null | undefined): string[] {
  if (!emailField) return [];
  const parts = emailField.split(/[,;\n\r]+/);
  const emails = new Set<string>();
  for (const part of parts) {
    const clean = part.trim().toLowerCase();
    if (clean && clean.includes('@') && clean.includes('.')) {
      emails.add(clean);
    }
  }
  return Array.from(emails);
}

/**
 * Calcula a quantidade de dias em atraso entre a data de vencimento e hoje (meia-noite).
 */
export function calculateDaysOverdue(vencimentoDate: Date | null, hojeDate: Date): number {
  if (!vencimentoDate) return 0;
  const diffMs = hojeDate.getTime() - vencimentoDate.getTime();
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  return Math.max(0, days);
}

/**
 * Função pura para gerar o e-mail em formato HTML responsivo e Texto Plano para uma agência,
 * utilizável no servidor ou no cliente sem atraso de rede.
 */
export function buildEmailData(grupo: AgenciaGrupo, modoTeste: boolean): EmailGerado {
  const prefixoAssunto = modoTeste ? '[TESTE] ' : '';
  const assunto = `${prefixoAssunto}Pendência Financeira — Contratos em aberto | ${grupo.agencia}`;

  // Monta as linhas da tabela HTML
  const rowsHtml = grupo.debts
    .map(
      (d) => `
    <tr style="border-bottom: 1px solid #e2e8f0;">
      <td style="padding: 10px 14px; font-weight: 600; color: #1e293b;">${d.pi}</td>
      <td style="padding: 10px 14px; color: #334155;">${d.veiculo}</td>
      <td style="padding: 10px 14px; color: #475569;">${d.dataVenc}${d.diasAtraso > 0 ? ` <span style="font-size: 11px; color: #b91c1c; font-weight: 600;">(${d.diasAtraso}d em atraso)</span>` : ''}</td>
      <td style="padding: 10px 14px; text-align: right; font-weight: 600; color: #0f172a;">${d.valorFormatado}</td>
    </tr>`
    )
    .join('');

  // Banner do modo teste
  const testBannerHtml = modoTeste
    ? `
    <div style="background-color: #fef3c7; border-bottom: 2px solid #f59e0b; color: #92400e; padding: 12px 20px; font-size: 13px; font-weight: 600; line-height: 1.4;">
      🛡️ <strong>MODO TESTE ATIVADO:</strong> Este é um e-mail de simulação. Em produção, este e-mail será enviado para:<br/>
      <span style="font-family: monospace; font-size: 12px; color: #78350f;">${grupo.emails.join(', ')}</span>
    </div>
  `
    : '';

  const html = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${assunto}</title>
</head>
<body style="margin: 0; padding: 24px 12px; background-color: #f1f5f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
  <div style="max-width: 640px; margin: 0 auto; background-color: #ffffff; border: 1px solid #cbd5e1; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
    ${testBannerHtml}

    <!-- Cabeçalho Institucional Ondas 985 -->
    <div style="background-color: #003366; padding: 26px 28px; text-align: left;">
      <h1 style="color: #ffffff; margin: 0; font-size: 20px; font-weight: 700; letter-spacing: -0.5px;">
        Ondas 985 — Financeiro
      </h1>
      <p style="color: #93c5fd; margin: 4px 0 0 0; font-size: 13px; font-weight: 500;">
        Rádios Litoral FM &amp; Onda Livre FM
      </p>
    </div>

    <!-- Corpo da Mensagem -->
    <div style="padding: 28px; color: #334155; font-size: 14px; line-height: 1.6;">
      <p style="margin-top: 0; font-size: 15px; color: #0f172a;">
        Prezada equipe da <strong>${grupo.agencia}</strong>,
      </p>

      <p style="color: #475569;">
        Esperamos que este e-mail os encontre bem.
      </p>

      <p style="color: #475569;">
        Constatamos em nosso controle financeiro que consta(m) pendência(s) em aberto referente(s) à(s) veiculação(ões) publicitária(s) discriminada(s) abaixo:
      </p>

      <!-- Tabela de Débitos -->
      <table style="width: 100%; border-collapse: collapse; margin: 24px 0; font-size: 13px; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
        <thead>
          <tr style="background-color: #f8fafc; color: #475569; text-align: left; border-bottom: 2px solid #e2e8f0;">
            <th style="padding: 10px 14px; font-weight: 600;">PI</th>
            <th style="padding: 10px 14px; font-weight: 600;">Veículo</th>
            <th style="padding: 10px 14px; font-weight: 600;">Previsto para</th>
            <th style="padding: 10px 14px; font-weight: 600; text-align: right;">Valor</th>
          </tr>
        </thead>
        <tbody>
          ${rowsHtml}
        </tbody>
        <tfoot>
          <tr style="background-color: #f1f5f9; font-weight: bold; border-top: 2px solid #cbd5e1;">
            <td colspan="3" style="padding: 12px 14px; text-align: right; color: #1e293b; font-size: 14px;">Total em Aberto:</td>
            <td style="padding: 12px 14px; text-align: right; color: #003366; font-size: 15px; font-weight: 700;">${grupo.totalValorFormatado}</td>
          </tr>
        </tfoot>
      </table>

      <p style="color: #475569;">
        Solicitamos, por gentileza, a verificação interna junto ao setor financeiro.
      </p>

      <p style="color: #475569;">
        • Caso o pagamento já tenha sido efetuado, pedimos o envio do respectivo comprovante para que possamos providenciar a baixa imediata em nosso sistema.<br/>
        • Havendo necessidade de novo prazo, reprogramação ou esclarecimento de dados, pedimos a gentileza de nos responder informando a respectiva previsão de quitação.
      </p>

      <p style="color: #475569;">
        Permanecemos à inteira disposição para qualquer esclarecimento.
      </p>

      <!-- Assinatura -->
      <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0; font-size: 13px; color: #64748b;">
        <p style="margin: 0; font-weight: 600; color: #1e293b;">Atenciosamente,</p>
        <p style="margin: 2px 0 0 0; color: #003366; font-weight: 700; font-size: 14px;">Departamento Financeiro — Ondas 985</p>
        <p style="margin: 2px 0 0 0; color: #475569;">E-mail: <a href="mailto:${FINANCEIRO_EMAIL}" style="color: #0284c7; text-decoration: none;">${FINANCEIRO_EMAIL}</a></p>
        <p style="margin: 2px 0 0 0; font-size: 12px; color: #94a3b8;">Rádios Litoral FM &amp; Onda Livre FM</p>
      </div>
    </div>
  </div>
</body>
</html>`;

  // Monta a versão em Texto Simples (ideal para copiar ou ler sem formatação)
  const itensTexto = grupo.debts
    .map(
      (d) =>
        `• PI: ${d.pi} | Veículo: ${d.veiculo} | Previsto: ${d.dataVenc}${d.diasAtraso > 0 ? ` (${d.diasAtraso}d atraso)` : ''} | Valor: ${d.valorFormatado}`
    )
    .join('\n');

  const testBannerTexto = modoTeste
    ? `[MODO TESTE ATIVADO — Destinatários simulados: ${grupo.emails.join(', ')}]\n\n`
    : '';

  const texto = `${testBannerTexto}Prezada equipe da ${grupo.agencia},

Esperamos que este e-mail os encontre bem.

Constatamos em nosso controle financeiro que consta(m) pendência(s) em aberto referente(s) à(s) veiculação(ões) publicitária(s) discriminada(s) abaixo:

--------------------------------------------------------------------------------
${itensTexto}
--------------------------------------------------------------------------------
Total em Aberto: ${grupo.totalValorFormatado}

Solicitamos, por gentileza, a verificação interna junto ao setor financeiro:
- Caso o pagamento já tenha sido efetuado, pedimos o envio do respectivo comprovante para que possamos providenciar a baixa imediata.
- Havendo necessidade de novo prazo ou reprogramação, pedimos a gentileza de nos responder informando a previsão de quitação.

Permanecemos à inteira disposição para qualquer esclarecimento.

Atenciosamente,
Departamento Financeiro — Ondas 985
E-mail: ${FINANCEIRO_EMAIL}
Rádios Litoral FM & Onda Livre FM`;

  // Em Modo Teste, o destinatário direto do mailto é o financeiro da rádio com cópia de segurança
  const destinatarios = modoTeste ? [FINANCEIRO_EMAIL] : grupo.emails;
  const bcc = modoTeste ? '' : FINANCEIRO_EMAIL;

  const mailtoDest = destinatarios.join(',');
  const params = new URLSearchParams();
  params.set('subject', assunto);
  params.set('body', texto);
  if (bcc) {
    params.set('bcc', bcc);
  }

  const mailtoUrl = `mailto:${encodeURIComponent(mailtoDest).replace(/%40/g, '@').replace(/%2C/g, ',')}?${params.toString()}`;

  return {
    assunto,
    html,
    texto,
    destinatarios,
    replyTo: FINANCEIRO_EMAIL,
    bcc,
    mailtoUrl,
    modoTeste,
  };
}
