import { db as prisma } from '../src/lib/db';
import fs from 'fs';
import path from 'path';

async function main() {
  const seedPath = path.join(__dirname, 'seed_data.json');
  if (!fs.existsSync(seedPath)) {
    console.error('Arquivo seed_data.json não encontrado!');
    return;
  }

  const data = JSON.parse(fs.readFileSync(seedPath, 'utf-8'));

  console.log('Iniciando carga de dados no banco...');

  // 1. Clientes
  for (const c of data.clientes) {
    await prisma.cliente.upsert({
      where: { id: c.id },
      update: {},
      create: {
        ...c,
        createdAt: new Date(c.createdAt),
        updatedAt: new Date(c.updatedAt),
      },
    });
  }
  console.log(`- ${data.clientes.length} Clientes inseridos.`);

  // 2. Agências
  for (const a of data.agencias) {
    await prisma.agencia.upsert({
      where: { id: a.id },
      update: {},
      create: {
        ...a,
        createdAt: new Date(a.createdAt),
        updatedAt: new Date(a.updatedAt),
      },
    });
  }
  console.log(`- ${data.agencias.length} Agências inseridas.`);

  // 3. Veículos
  for (const v of data.veiculos) {
    await prisma.veiculo.upsert({
      where: { id: v.id },
      update: {},
      create: {
        ...v,
        createdAt: new Date(v.createdAt),
        updatedAt: new Date(v.updatedAt),
      },
    });
  }
  console.log(`- ${data.veiculos.length} Veículos inseridos.`);

  // 4. Colaboradores
  for (const col of data.colaboradores) {
    await prisma.colaborador.upsert({
      where: { id: col.id },
      update: {},
      create: {
        ...col,
        createdAt: new Date(col.createdAt),
        updatedAt: new Date(col.updatedAt),
      },
    });
  }
  console.log(`- ${data.colaboradores.length} Colaboradores inseridos.`);

  // 5. Tipos de Documento
  for (const td of data.tiposDocumento) {
    await prisma.tipoDocumento.upsert({
      where: { id: td.id },
      update: {},
      create: td,
    });
  }
  console.log(`- ${data.tiposDocumento.length} Tipos de Documento inseridos.`);

  // 6. Lançamentos
  for (const l of data.lancamentos) {
    await prisma.lancamento.upsert({
      where: { id: l.id },
      update: {},
      create: {
        ...l,
        dataEmissao: l.dataEmissao ? new Date(l.dataEmissao) : null,
        vencimento: l.vencimento ? new Date(l.vencimento) : null,
        dataEnvio: l.dataEnvio ? new Date(l.dataEnvio) : null,
        dataPagamento: l.dataPagamento ? new Date(l.dataPagamento) : null,
        dataEnvioNfe: l.dataEnvioNfe ? new Date(l.dataEnvioNfe) : null,
        createdAt: new Date(l.createdAt),
        updatedAt: new Date(l.updatedAt),
      },
    });
  }
  console.log(`- ${data.lancamentos.length} Lançamentos inseridos.`);

  // 7. Documentos
  for (const d of data.documentos) {
    await prisma.documento.upsert({
      where: { id: d.id },
      update: {},
      create: {
        ...d,
        dataDocumento: d.dataDocumento ? new Date(d.dataDocumento) : null,
        dataInclusao: new Date(d.dataInclusao),
        deletarApos: d.deletarApos ? new Date(d.deletarApos) : null,
      },
    });
  }
  console.log(`- ${data.documentos.length} Documentos inseridos.`);

  console.log('✅ Banco de dados populado com sucesso!');
}

main()
  .catch((e) => {
    console.error('Erro no seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
