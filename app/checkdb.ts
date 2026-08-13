import { PrismaClient } from './src/generated/prisma';
const prisma = new PrismaClient();
async function main() {
  console.log('Clientes:', await prisma.cliente.count());
  console.log('Colaboradores:', await prisma.colaborador.count());
  console.log('Receitas:', await prisma.lancamento.count({where: {tipoLancamento: 'RECEITA'}}));
  console.log('Despesas:', await prisma.lancamento.count({where: {tipoLancamento: 'DESPESA'}}));
  console.log('Documentos:', await prisma.documento.count());
}
main().finally(() => prisma.$disconnect());
