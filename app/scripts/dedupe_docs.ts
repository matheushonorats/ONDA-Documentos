import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const lancamentos = await prisma.lancamento.findMany({
    include: {
      documentos: true
    }
  });

  let duplicateCount = 0;
  const deleteIds: string[] = [];

  for (const l of lancamentos) {
    const docs = l.documentos;
    if (docs.length <= 1) continue;

    // Group by base name or tipoDocumento
    // If we have a Drive doc (urlPublica != null) and a Spreadsheet doc (planilhaOrigem != null && urlPublica == null)
    // with similar names, delete the Spreadsheet doc.
    
    for (const driveDoc of docs.filter(d => d.urlPublica !== null)) {
      // Find a matching spreadsheet doc
      // Usually the spreadsheet doc has nomeOriginal containing the driveDoc.nomeOriginal or vice-versa
      // Or they have exactly the same name.
      const duplicates = docs.filter(d => 
        d.id !== driveDoc.id && 
        d.urlPublica === null && 
        (d.nomeOriginal === driveDoc.nomeOriginal || driveDoc.nomeOriginal.includes(d.nomeOriginal) || d.caminhoOriginal?.includes(driveDoc.nomeOriginal))
      );

      for (const dup of duplicates) {
        if (!deleteIds.includes(dup.id)) {
          deleteIds.push(dup.id);
          duplicateCount++;
        }
      }
    }
  }

  console.log(`Found ${duplicateCount} duplicates to delete.`);
  
  // Show a sample of mixed docs
  const mixed = lancamentos.filter(l => l.documentos.some(d => d.urlPublica !== null));
  if (mixed.length > 0) {
    console.log('Sample Lancamento with docs:');
    console.log(mixed[0].appSheetId);
    mixed[0].documentos.forEach(d => {
      console.log(`  - [${d.id}] ${d.nomeOriginal} (URL: ${d.urlPublica ? 'YES' : 'NO'}, Planilha: ${d.planilhaOrigem ? 'YES' : 'NO'})`);
    });
  }
}

main().finally(() => prisma.$disconnect());
