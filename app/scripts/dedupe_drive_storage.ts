import { db } from '../src/lib/db';
import { deleteFromGoogleDrive } from '../src/lib/gdrive';
import fs from 'fs';
import path from 'path';

// Carregar .env se não estiver no ambiente
const envPath = path.resolve(__dirname, '../.env');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf-8');
  for (const line of envContent.split('\n')) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
      const idx = trimmed.indexOf('=');
      const k = trimmed.slice(0, idx).trim();
      let v = trimmed.slice(idx + 1).trim();
      if (v.startsWith('"') && v.endsWith('"')) v = v.slice(1, -1);
      if (!process.env[k]) process.env[k] = v;
    }
  }
}

async function main() {
  const isExecute = process.argv.includes('--execute');
  console.log('===============================================================');
  console.log(`🧹 HIGIENIZAÇÃO E DEDUPLICAÇÃO DE ARMAZENAMENTO NO GOOGLE DRIVE`);
  const isDeep = process.argv.includes('--deep');
  console.log(`Modo: ${isExecute ? '🚀 EXECUÇÃO REAL (DELEÇÃO ATIVA)' : '🔍 DRY-RUN (SIMULAÇÃO SEM ALTERAÇÕES)'}${isDeep ? ' [ANÁLISE PROFUNDA DE PREFIXOS CR/CP]' : ''}`);
  console.log('===============================================================\n');

  // Buscar todos os documentos com link ativo no Google Drive
  const docs = await db.documento.findMany({
    where: {
      status: 'ATIVO',
      caminhoOriginal: { not: null },
      urlPublica: { not: null },
      tamanhoBytes: { gt: 1000 },
    },
    select: {
      id: true,
      nomeOriginal: true,
      tamanhoBytes: true,
      caminhoOriginal: true,
      urlPublica: true,
      lancamentoId: true,
      hashSha256: true,
    },
    orderBy: { dataInclusao: 'asc' },
  });

  console.log(`Total de documentos com arquivos no Drive: ${docs.length}`);

  // Normalizador de nome: remove prefixo AppSheet (ex: "CR556.ANEXO_PI.141106.pdf" -> "ANEXO_PI")
  const normalizeDocName = (name: string) => {
    let s = name.toLowerCase().trim();
    if (isDeep) {
      // Remove prefixos legados do tipo "CR123." ou "CP456."
      s = s.replace(/^(?:cr|cp)\d+\./i, '');
      // Remove timestamps legados do tipo ".141106"
      s = s.replace(/\.\d{6}(?=\.pdf|$)/i, '');
    }
    return s;
  };

  // Agrupamento por tamanhoBytes + nomeNormalizado
  const groups = new Map<string, typeof docs>();
  for (const d of docs) {
    const normName = normalizeDocName(d.nomeOriginal);
    const key = `${d.tamanhoBytes}__${normName}`;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key)!.push(d);
  }

  let totalGruposDuplicados = 0;
  let totalArquivosExcedentes = 0;
  let totalBytesEconomizados = 0;

  for (const [key, list] of groups.entries()) {
    const distinctDriveIds = Array.from(new Set(list.map(d => d.caminhoOriginal!)));
    if (distinctDriveIds.length <= 1) continue;

    totalGruposDuplicados++;
    const [tamanhoStr] = key.split('__');
    const tamanho = parseInt(tamanhoStr, 10);
    const nome = list[0].nomeOriginal;

    // O primeiro Drive ID (mais antigo) torna-se o canônico
    const canonicalDoc = list[0];
    const canonicalDriveId = canonicalDoc.caminhoOriginal!;
    const canonicalUrl = canonicalDoc.urlPublica!;

    const redundantDriveIds = distinctDriveIds.slice(1);
    const bytesEconomizados = redundantDriveIds.length * tamanho;
    totalArquivosExcedentes += redundantDriveIds.length;
    totalBytesEconomizados += bytesEconomizados;

    console.log(`\n📁 [${(tamanho / 1024).toFixed(1)} KB] ${nome}`);
    console.log(`   - Registros no banco: ${list.length}`);
    console.log(`   - Arquivos no Drive: ${distinctDriveIds.length} (Canônico: ${canonicalDriveId})`);
    console.log(`   - Duplicatas redundantes no Drive a eliminar: ${redundantDriveIds.length} (${(bytesEconomizados / 1024).toFixed(1)} KB)`);

    if (isExecute) {
      // 1. Atualizar registros no banco para apontarem para o arquivo canônico
      for (const d of list) {
        if (d.caminhoOriginal !== canonicalDriveId) {
          await db.documento.update({
            where: { id: d.id },
            data: {
              caminhoOriginal: canonicalDriveId,
              urlPublica: canonicalUrl,
            },
          });
        }
      }
      console.log(`   ✔ Registros no banco unificados para o Drive ID canônico.`);

      // 2. Excluir os arquivos duplicados excedentes do Google Drive
      for (const redId of redundantDriveIds) {
        try {
          const ok = await deleteFromGoogleDrive(redId);
          if (ok) {
            console.log(`   ✔ Arquivo duplicado excluído do Drive: ${redId}`);
          } else {
            console.warn(`   ⚠ Não foi possível excluir do Drive: ${redId}`);
          }
        } catch (err: any) {
          console.error(`   ❌ Falha ao excluir do Drive (${redId}):`, err.message);
        }
      }
    }
  }

  console.log('\n===============================================================');
  console.log(`RESULTADO FINAL:`);
  console.log(`- Grupos duplicados encontrados: ${totalGruposDuplicados}`);
  console.log(`- Arquivos excedentes no Drive: ${totalArquivosExcedentes}`);
  console.log(`- Espaço total economizado: ${(totalBytesEconomizados / (1024 * 1024)).toFixed(2)} MB (${totalBytesEconomizados.toLocaleString()} bytes)`);
  if (!isExecute) {
    console.log(`\n💡 Para aplicar estas exclusões e liberar o espaço no Drive, execute:`);
    console.log(`   npx tsx scripts/dedupe_drive_storage.ts --execute`);
  }
  console.log('===============================================================');
}

main().catch(console.error);
