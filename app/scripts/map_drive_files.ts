import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
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

async function getAllFiles(folderId: string) {
  let allFiles: any[] = [];
  let pageToken: string | undefined = undefined;

  do {
    const res = await driveClient.files.list({
      q: `'${folderId}' in parents and trashed = false`,
      fields: 'nextPageToken, files(id, name, mimeType, webViewLink, size)',
      pageSize: 1000,
      pageToken: pageToken,
    });
    
    if (res.data.files) {
      allFiles = allFiles.concat(res.data.files);
    }
    pageToken = res.data.nextPageToken || undefined;
  } while (pageToken);

  return allFiles;
}

async function mapFiles() {
  const pagarId = process.env.GOOGLE_DRIVE_FOLDER_PAGAR;
  const receberId = process.env.GOOGLE_DRIVE_FOLDER_RECEBER;

  console.log('Buscando arquivos do Google Drive...');
  const [pagarFiles, receberFiles] = await Promise.all([
    pagarId ? getAllFiles(pagarId) : [],
    receberId ? getAllFiles(receberId) : []
  ]);

  const allDriveFiles = [...pagarFiles, ...receberFiles];
  console.log(`Total de arquivos encontrados no Drive: ${allDriveFiles.length}`);

  let mappedCount = 0;
  let skippedCount = 0;
  let notFoundCount = 0;

  for (const file of allDriveFiles) {
    if (!file.name) continue;

    // A extração: CP451.ANEXO COMPROVANTE.153027.pdf
    const parts = file.name.split('.');
    if (parts.length < 2) {
      // Nome sem ponto ou formato desconhecido
      continue;
    }

    const appSheetId = parts[0]; // ex: CP451
    const tipoLabel = parts[1].replace('ANEXO ', '').replace('ANEXO_', '').replace('_', ' ').trim(); // ex: COMPROVANTE, NF-e, PI

    // Buscar o Lançamento correspondente
    const lancamento = await prisma.lancamento.findFirst({
      where: { appSheetId }
    });

    if (!lancamento) {
      notFoundCount++;
      continue;
    }

    // Buscar ou criar o TipoDocumento
    const tipoDocNome = tipoLabel.length > 1 ? tipoLabel.charAt(0).toUpperCase() + tipoLabel.slice(1).toLowerCase() : 'Anexo';
    let tipoDocumento = await prisma.tipoDocumento.findFirst({
      where: { nome: tipoDocNome }
    });

    if (!tipoDocumento) {
      tipoDocumento = await prisma.tipoDocumento.create({
        data: { nome: tipoDocNome }
      });
    }

    // Verifica se já existe um documento com esse Drive ID (caminhoOriginal)
    const existe = await prisma.documento.findFirst({
      where: { caminhoOriginal: file.id }
    });

    if (existe) {
      skippedCount++;
      continue;
    }

    // Criar o Documento
    await prisma.documento.create({
      data: {
        lancamentoId: lancamento.id,
        tipoDocumentoId: tipoDocumento.id,
        nomeOriginal: file.name,
        caminhoOriginal: file.id || '',
        urlPublica: file.webViewLink || null,
        tamanhoBytes: file.size ? parseInt(file.size, 10) : null,
        usuarioResponsavel: 'Mapeamento Automático',
      }
    });

    mappedCount++;
    if (mappedCount % 50 === 0) {
      console.log(`Mapeados: ${mappedCount}...`);
    }
  }

  console.log('\n--- Resumo ---');
  console.log(`Arquivos novos mapeados e criados: ${mappedCount}`);
  console.log(`Arquivos já existentes (ignorados): ${skippedCount}`);
  console.log(`Arquivos cujo Lançamento não foi encontrado: ${notFoundCount}`);
}

mapFiles()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
/* eslint-disable */