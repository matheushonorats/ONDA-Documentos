import { db } from '../src/lib/db';
import fs from 'fs';
import path from 'path';

async function exportData() {
  console.log('Exportando banco de dados local para seed_data.json...');

  const clientes = await db.cliente.findMany();
  const agencias = await db.agencia.findMany();
  const veiculos = await db.veiculo.findMany();
  const colaboradores = await db.colaborador.findMany();
  const tiposDocumento = await db.tipoDocumento.findMany();
  const lancamentos = await db.lancamento.findMany();
  const documentos = await db.documento.findMany();
  const marcacoes = await db.marcacaoComplementacao.findMany();

  const exportObject = {
    clientes,
    agencias,
    veiculos,
    colaboradores,
    tiposDocumento,
    lancamentos,
    documentos,
    marcacoes,
  };

  const outputPath = path.join(__dirname, '../prisma/seed_data.json');
  fs.writeFileSync(outputPath, JSON.stringify(exportObject, null, 2), 'utf-8');

  console.log(`✅ Dados exportados com sucesso para ${outputPath}`);
  console.log(`- Clientes: ${clientes.length}`);
  console.log(`- Agências: ${agencias.length}`);
  console.log(`- Veículos: ${veiculos.length}`);
  console.log(`- Colaboradores: ${colaboradores.length}`);
  console.log(`- Tipos de Documento: ${tiposDocumento.length}`);
  console.log(`- Lançamentos: ${lancamentos.length}`);
  console.log(`- Documentos: ${documentos.length}`);
}

exportData()
  .catch((e) => {
    console.error('Erro na exportação:', e);
    process.exit(1);
  })
  .finally(async () => {
    process.exit(0);
  });
