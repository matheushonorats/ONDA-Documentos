import * as XLSX from 'xlsx';
import path from 'path';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

function text(value: any) {
  if (value === undefined || value === null) return undefined;
  return String(value).trim();
}

async function main() {
  const filePath = path.resolve(__dirname, '../../Controle _ Notas a Pagar.xlsx');
  const workbook = XLSX.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const data = XLSX.utils.sheet_to_json<any>(sheet);

  console.log('Iniciando correção de Colaboradores e Fornecedores...');

  const colabNameMap = new Map<string, string>(); // nome -> id
  
  // Vamos buscar os colaboradores existentes para não duplicar, caso o nome seja idêntico
  const existingColabs = await prisma.colaborador.findMany();
  for (const c of existingColabs) {
    colabNameMap.set(c.nome.toLowerCase().trim(), c.id);
  }

  let updatedCount = 0;

  for (const row of data) {
    const keys = Object.keys(row);
    const opKey = keys.find(k => k.includes('OP'));
    const descKey = keys.find(k => k.includes('DESCRI'));

    if (!opKey || !descKey) {
      continue;
    }

    const appSheetId = text(row[opKey]);
    let nomeDescricao = text(row[descKey]);
    
    if (updatedCount === 0) {
      console.log('Sample Keys:', keys);
      console.log('Matched opKey:', opKey, 'appSheetId:', appSheetId);
      console.log('Matched descKey:', descKey, 'nomeDescricao:', nomeDescricao);
    }

    nomeDescricao = nomeDescricao.trim();
    const nomeKey = nomeDescricao.toLowerCase();

    let colaboradorId = colabNameMap.get(nomeKey);

    // Se o colaborador com esse exato nome não existe, a gente cria
    if (!colaboradorId) {
      const novoColab = await prisma.colaborador.create({
        data: {
          nome: nomeDescricao,
          tipificacao: 'Colaborador / Fornecedor',
          cargo: 'Fornecedor'
        }
      });
      colaboradorId = novoColab.id;
      colabNameMap.set(nomeKey, colaboradorId);
    }

    // Agora vinculamos o lançamento (Despesa) a esse Colaborador
    const lancamento = await prisma.lancamento.findFirst({
      where: { appSheetId }
    });

    if (lancamento && lancamento.colaboradorId !== colaboradorId) {
      await prisma.lancamento.update({
        where: { id: lancamento.id },
        data: {
          colaboradorId: colaboradorId,
          clienteId: null // Garantir que não está atrelado a cliente
        }
      });
      updatedCount++;
    }
  }

  console.log(`Lançamentos corrigidos/vinculados aos novos nomes: ${updatedCount}`);

  // Limpeza: remover colaboradores que ficaram sem nenhum lançamento
  console.log('Buscando colaboradores sem lançamentos para limpar a base...');
  const unusedColabs = await prisma.colaborador.findMany({
    where: {
      lancamentos: {
        none: {}
      }
    }
  });

  if (unusedColabs.length > 0) {
    console.log(`Apagando ${unusedColabs.length} colaboradores órfãos (antigos nomes errados)`);
    await prisma.colaborador.deleteMany({
      where: {
        id: { in: unusedColabs.map(c => c.id) }
      }
    });
  }

  console.log('Finalizado com sucesso.');
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
/* eslint-disable */