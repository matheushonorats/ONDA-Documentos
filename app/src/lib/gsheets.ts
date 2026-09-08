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

function getSheetsAuth() {
  if (process.env.GOOGLE_REFRESH_TOKEN && process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET
    );
    oauth2Client.setCredentials({ refresh_token: process.env.GOOGLE_REFRESH_TOKEN });
    return oauth2Client;
  }
  return new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
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
    range: ${col},
    valueInputOption: 'USER_ENTERED',
    requestBody: { values: [[value]] },
  });
}

export async function appendRow(rowValues: string[]): Promise<void> {
  const sheets = getSheetsClient();
  await sheets.spreadsheets.values.append({
    spreadsheetId: SPREADSHEET_ID,
    range: 'A:L',
    valueInputOption: 'USER_ENTERED',
    insertDataOption: 'INSERT_ROWS',
    requestBody: { values: [rowValues] },
  });
}

export async function getNextCobrancaNo(): Promise<string> {
  const sheets = getSheetsClient();
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: 'A:A',
  });
  const rows = response.data.values ?? [];
  let maxNum = 0;
  for (let i = 1; i < rows.length; i++) {
    const num = parseInt((rows[i]?.[0] ?? '').toString().trim(), 10);
    if (!isNaN(num) && num > maxNum) maxNum = num;
  }
  return String(maxNum + 1);
}