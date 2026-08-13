import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';

const envPath = path.resolve(__dirname, '../.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
envContent.split('\n').forEach(line => {
  const match = line.match(/^([^=]+)="?(.*?)"?$/);
  if (match) process.env[match[1]] = match[2];
});

const driveClient = google.drive({
  version: 'v3',
  auth: new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/drive.readonly'],
  }),
});

async function listFiles(folderId: string, label: string) {
  console.log(`\n--- Listando arquivos em: ${label} ---`);
  try {
    const res = await driveClient.files.list({
      q: `'${folderId}' in parents and trashed = false`,
      fields: 'files(id, name, mimeType, webViewLink, size)',
      pageSize: 10,
    });
    const files = res.data.files || [];
    if (files.length === 0) {
      console.log('Nenhum arquivo encontrado.');
      return;
    }
    files.forEach((file) => {
      console.log(`${file.name} (${file.id})`);
    });
  } catch (error) {
    console.error('Erro ao listar:', error);
  }
}

async function main() {
  const pagarId = process.env.GOOGLE_DRIVE_FOLDER_PAGAR;
  const receberId = process.env.GOOGLE_DRIVE_FOLDER_RECEBER;
  
  if (pagarId) await listFiles(pagarId, 'PAGAR');
  if (receberId) await listFiles(receberId, 'RECEBER');
}

main();
