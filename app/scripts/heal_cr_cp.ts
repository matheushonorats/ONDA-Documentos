import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const corruptedLancamentos = await prisma.lancamento.findMany({
    where: {
      appSheetId: { startsWith: 'CR' },
      tipoLancamento: 'DESPESA'
    },
    include: { colaborador: true }
  });

  console.log(`Encontrados ${corruptedLancamentos.length} lançamentos CR como DESPESA.`);

  let healedCount = 0;

  for (const l of corruptedLancamentos) {
    const colabName = l.colaborador?.nome || 'Cliente Restaurado';

    // Procura se já existe um Cliente com esse nome
    let cliente = await prisma.cliente.findFirst({
      where: {
        OR: [
          { razaoSocial: colabName },
          { nomeFantasia: colabName }
        ]
      }
    });

    // Se não existe, recria o cliente que foi deletado por engano no script de unificação
    if (!cliente) {
      cliente = await prisma.cliente.create({
        data: {
          razaoSocial: colabName,
          nomeFantasia: colabName
        }
      });
    }

    // Corrige o Lançamento para RECEITA e vincula ao Cliente
    await prisma.lancamento.update({
      where: { id: l.id },
      data: {
        tipoLancamento: 'RECEITA',
        clienteId: cliente.id,
        colaboradorId: null
      }
    });

    healedCount++;
  }

  console.log(`Lançamentos corrigidos com sucesso: ${healedCount}`);
}

main().finally(() => prisma.$disconnect());
