import { google } from 'googleapis';
import { Readable } from 'stream';

function getFormattedPrivateKey(): string | undefined {
  let pk = process.env.GOOGLE_PRIVATE_KEY;
  if (!pk) return undefined;
  if (pk.startsWith('"') && pk.endsWith('"')) pk = pk.slice(1, -1);
  pk = pk.replace('7NJ8MUZf7NJ8MUZf', '7NJ8MUZf');
  return pk.replace(/\\n/g, '\n');
}

function getAuth() {
  // Drive: usa OAuth2 (conta pessoal) — Service Account não tem cota de armazenamento
  if (process.env.GOOGLE_REFRESH_TOKEN && process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET
    );
    oauth2Client.setCredentials({
      refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
    });
    return oauth2Client;
  }

  // Fallback: Service Account (só funciona em Shared Drives)
  const privateKey = getFormattedPrivateKey();
  if (process.env.GOOGLE_CLIENT_EMAIL && privateKey) {
    return new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: privateKey,
      },
      scopes: [
        'https://www.googleapis.com/auth/drive.file',
        'https://www.googleapis.com/auth/drive'
      ],
    });
  }

  throw new Error('Credenciais do Google Drive não configuradas no ambiente.');
}


export const driveClient = google.drive({
  version: 'v3',
  auth: getAuth(),
});

export async function uploadToGoogleDrive(
  fileBuffer: Buffer, 
  fileName: string, 
  mimeType: string, 
  folderId: string
) {
  try {
    // Transforma o Buffer num Stream que a API do Google exige
    const stream = new Readable();
    stream.push(fileBuffer);
    stream.push(null);

    // Faz o Upload
    const res = await driveClient.files.create({
      requestBody: {
        name: fileName,
        parents: [folderId],
      },
      media: {
        mimeType,
        body: stream,
      },
      fields: 'id, webViewLink, webContentLink',
      supportsAllDrives: true,
    });

    return {
      id: res.data.id,
      webViewLink: res.data.webViewLink, // Link para visualizar (abre no Drive)
      webContentLink: res.data.webContentLink, // Link para download direto
    };
  } catch (error: any) {
    console.error('Erro no upload pro Google Drive:', error);
    const msg = error?.message || error?.cause?.message || String(error);
    if (msg.includes('storage quota') || msg.includes('Service Accounts do not have storage quota')) {
      throw new Error(
        'O Google Drive bloqueou o upload: Contas de Serviço (bot) não possuem cota individual. As pastas (RECEBER e PAGAR) devem estar dentro de um "Drive Compartilhado" (Shared Drive) no Google Workspace com o e-mail do bot (ondas-bot@ondasdocumentos.iam.gserviceaccount.com) adicionado como Administrador de Conteúdo.'
      );
    }
    throw new Error(`Falha no Google Drive: ${msg}`);
  }
}

export async function deleteFromGoogleDrive(fileId: string) {
  try {
    await driveClient.files.delete({ fileId });
    return true;
  } catch (error) {
    console.error(`Erro ao deletar arquivo ${fileId} do Drive:`, error);
    return false;
  }
}
