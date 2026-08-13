import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // 1. Apagar documentos antigos (da planilha) que não tem URL e possuem nome parecido com algum que tem URL
  const lancamentos = await prisma.lancamento.findMany({ include: { documentos: true } });
  const deleteIds: string[] = [];

  for (const l of lancamentos) {
    const docs = l.documentos;
    for (const driveDoc of docs.filter(d => d.urlPublica !== null)) {
      const duplicates = docs.filter(d => 
        d.id !== driveDoc.id && 
        d.urlPublica === null && 
        (d.nomeOriginal === driveDoc.nomeOriginal || driveDoc.nomeOriginal.includes(d.nomeOriginal) || d.caminhoOriginal?.includes(driveDoc.nomeOriginal))
      );
      for (const dup of duplicates) {
        if (!deleteIds.includes(dup.id)) {
          deleteIds.push(dup.id);
        }
      }
    }
  }

  console.log(`Apagando ${deleteIds.length} documentos duplicados legados (sem URL)...`);
  await prisma.documento.deleteMany({
    where: { id: { in: deleteIds } }
  });

  // 2. Unificar Tipos de Documento
  const tipoMapping = {
    'Nf-e': 'Nota fiscal',
    'Comprovante': 'Comprovante de pagamento',
    'Pagto': 'Comprovante de pagamento',
    'Comprovante veiculação': 'Comprovante de veiculação',
    'Pi': 'PI',
    'Doc cobr': 'Documento de cobrança'
  };

  const tipos = await prisma.tipoDocumento.findMany();
  for (const [oldName, newName] of Object.entries(tipoMapping)) {
    const oldType = tipos.find(t => t.nome === oldName);
    const newType = tipos.find(t => t.nome === newName);
    
    if (oldType && newType) {
      // Move all docs to the new type
      const result = await prisma.documento.updateMany({
        where: { tipoDocumentoId: oldType.id },
        data: { tipoDocumentoId: newType.id }
      });
      console.log(`Movidos ${result.count} docs de '${oldName}' para '${newName}'`);
      
      // Apaga o tipo antigo se não houver mais nenhum documento associado
      const remaining = await prisma.documento.count({ where: { tipoDocumentoId: oldType.id } });
      if (remaining === 0) {
        await prisma.tipoDocumento.delete({ where: { id: oldType.id } });
        console.log(`Tipo de documento '${oldName}' excluído.`);
      }
    }
  }

  console.log('Limpeza finalizada com sucesso!');
}

main().finally(() => prisma.$disconnect());
