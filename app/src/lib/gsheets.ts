import { google } from 'googleapis';

const SPREADSHEET_ID = '10k5RPhYeevzWsp0eSRb8UWwnEDRsO5yn1mMSqhNlvOs';

export const COLS = {
  COBRANCA_NO: 0,
  PI: 1,
  VEICULO: 2,
  AGENCIA: 3,
  VALOR: 4,
  DATA_EXP: 5,
  EMAIL: 6,
  ULT_COB: 7,
  LINK: 8,
  NOVA_DATA: 9,
  OBS: 10,
  PAGO: 11,
} as const;

function colIndexToLetter(index: number): string {
  let letter = '';
  let n = index + 1;
  while (n > 0) {
    const rem = (n - 1) % 26;
    letter = String.fromCharCode(65 + rem) + letter;
    n = Math.floor((n - 1) / 26);
  }
  return letter;
}

function getFormattedPrivateKey(): string | undefined {
  let pk = process.env.GOOGLE_PRIVATE_KEY;
  if (!pk) return undefined;
  if (pk.startsWith('"') && pk.endsWith('"')) pk = pk.slice(1, -1);
  pk = pk.replace('7NJ8MUZf7NJ8MUZf', '7NJ8MUZf');
  return pk.replace(/\\n/g, '\n');
}

function getSheetsAuth() {
  const privateKey = getFormattedPrivateKey();
  if (process.env.GOOGLE_CLIENT_EMAIL && privateKey) {
    return new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: privateKey,
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
  }

  if (process.env.GOOGLE_REFRESH_TOKEN && process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET
    );
    oauth2Client.setCredentials({ refresh_token: process.env.GOOGLE_REFRESH_TOKEN });
    return oauth2Client;
  }

  throw new Error('Credenciais do Google Sheets não configuradas no ambiente.');
}

function getSheetsClient() {
  return google.sheets({ version: 'v4', auth: getSheetsAuth() });
}

export async function findRowByCobrancaNo(cobrancaNo: string, pi: string): Promise<number | null> {
  const sheets = getSheetsClient();
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: 'A:B',
  });
  const rows = response.data.values ?? [];
  for (let i = 1; i < rows.length; i++) {
    const rowNo = (rows[i]?.[0] ?? '').toString().trim();
    const rowPi = (rows[i]?.[1] ?? '').toString().trim();
    if (rowNo === cobrancaNo && rowPi === pi) return i + 1;
  }
  return null;
}

export async function updateCell(rowNumber: number, colIndex: number, value: string): Promise<void> {
  const sheets = getSheetsClient();
  const col = colIndexToLetter(colIndex);
  await sheets.spreadsheets.values.update({
    spreadsheetId: SPREADSHEET_ID,
    range: col + rowNumber.toString(),
    valueInputOption: 'USER_ENTERED',
    requestBody: { values: [[value]] },
  });
}

export async function findFirstAvailableRow(): Promise<{ rowNumber: number; cobrancaNo: string }> {
  const sheets = getSheetsClient();
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: 'A:D',
  });
  const rows = res.data.values ?? [];
  for (let i = 1; i < rows.length; i++) {
    const pi = (rows[i]?.[1] ?? '').toString().trim();
    const agencia = (rows[i]?.[3] ?? '').toString().trim();
    if (!pi && !agencia) {
      const existingNo = (rows[i]?.[0] ?? '').toString().trim();
      return {
        rowNumber: i + 1,
        cobrancaNo: existingNo || String(i),
      };
    }
  }
  return {
    rowNumber: rows.length + 1,
    cobrancaNo: String(rows.length),
  };
}

export async function appendRow(rowValues: string[]): Promise<string> {
  const sheets = getSheetsClient();
  const { rowNumber, cobrancaNo } = await findFirstAvailableRow();
  
  // Garante que o número da cobrança seja preenchido com o número da linha correspondente
  rowValues[0] = cobrancaNo;

  await sheets.spreadsheets.values.update({
    spreadsheetId: SPREADSHEET_ID,
    range: `A${rowNumber}:L${rowNumber}`,
    valueInputOption: 'USER_ENTERED',
    requestBody: { values: [rowValues] },
  });

  return cobrancaNo;
}

export async function getNextCobrancaNo(): Promise<string> {
  const { cobrancaNo } = await findFirstAvailableRow();
  return cobrancaNo;
}