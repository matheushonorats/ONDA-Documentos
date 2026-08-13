import { PrismaClient } from '@prisma/client';
import * as xlsx from 'xlsx';
import path from 'path';

const prisma = new PrismaClient();

async function main() {
  const excelPath = path.resolve(__dirname, '../../Controle _ Notas a Receber.xlsx');
  console.log('Lendo planilha:', excelPath);
  
  const workbook = xlsx.readFile(excelPath);
  const sheetName = workbook.SheetNames[0];
  const data = xlsx.utils.sheet_to_json<any>(workbook.Sheets[sheetName]);
  
  let fixes = 0;

  for (const row of data) {
    const id = String(row['Id'] || '').trim();
    const clienteNome = String(row['CLIENTE'] || '').trim();
    
    if (!id.startsWith('CR') || !clienteNome) continue;

    // Buscar ou criar o cliente correto
    let cliente = await prisma.cliente.findFirst({
      where: {
        OR: [
          { razaoSocial: clienteNome },
          { nomeFantasia: clienteNome }
        ]
      }
    });

    if (!cliente) {
      cliente = await prisma.cliente.create({
        data: {
          razaoSocial: clienteNome,
          nomeFantasia: clienteNome
        }
      });
      console.log(`Cliente novo criado: ${clienteNome}`);
    }

    // Atualizar o lançamento garantindo que é RECEITA e apontando pro cliente certo
    const updated = await prisma.lancamento.updateMany({
      where: { appSheetId: id },
      data: {
        tipoLancamento: 'RECEITA',
        clienteId: cliente.id,
        colaboradorId: null // Remove qualquer associação incorreta com colaborador
      }
    });

    if (updated.count > 0) {
      fixes += updated.count;
      console.log(`Corrigido: ${id} -> ${clienteNome}`);
    }
  }

  console.log(`\nTotal de lançamentos CR corrigidos para os clientes reais: ${fixes}`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
/* eslint-disable */