import { PrismaClient } from '../src/generated/prisma';
import * as xlsx from 'xlsx';
import fs from 'node:fs';
import path from 'node:path';

type Row = Record<string, unknown>;

const prisma = new PrismaClient();
const sourceRoot = process.env.ONDA_SOURCE_ROOT
  ? path.resolve(process.env.ONDA_SOURCE_ROOT)
  : path.resolve(__dirname, '../..');
const replaceMode = process.argv.includes('--replace');

const RECEBER_DOCS: Record<string, string> = {
  'ANEXO DOC_COBR': 'Documento de cobrança',
  'ANEXO PAGTO': 'Comprovante de pagamento',
  'ANEXO NF-e': 'Nota fiscal',
  'ANEXO_CARTA': 'Carta',
  'ANEXO_DECLARAÇÃO': 'Declaração',
  'ANEXO_COMPROVANTE VEICULAÇÃO': 'Comprovante de veiculação',
  'ANEXO_PI': 'PI',
};

const PAGAR_DOCS: Record<string, string> = {
  'ANEXO COBRANÇA': 'Documento de cobrança',
  'ANEXO COMPROVANTE': 'Comprovante de pagamento',
  'ANEXO NF-e': 'Nota fiscal',
};

function normalize(value: unknown) {
  return String(value ?? '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .replace(/\s+/g, ' ')
    .toLocaleUpperCase('pt-BR');
}

function text(value: unknown) {
  const result = String(value ?? '').trim();
  return result || null;
}

function number(value: unknown) {
  if (value === null || value === undefined || value === '') return null;
  if (typeof value === 'number') return Number.isFinite(value) ? value : null;
  const normalized = String(value)
    .replace(/R\$/gi, '')
    .replace(/\s/g, '')
    .replace(/\.(?=\d{3}(?:\D|$))/g, '')
    .replace(',', '.');
  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : null;
}

function date(value: unknown) {
  if (value instanceof Date && !Number.isNaN(value.getTime())) return value;
  if (typeof value === 'number') {
    const parsed = xlsx.SSF.parse_date_code(value);
    if (parsed) return new Date(parsed.y, parsed.m - 1, parsed.d, parsed.H, parsed.M, Math.floor(parsed.S));
  }
  if (typeof value === 'string' && value.trim()) {
    const parsed = new Date(value);
    if (!Number.isNaN(parsed.getTime())) return parsed;
  }
  return null;
}

function readRows(fileName: string, sheetName?: string): Row[] {
  const filePath = path.join(sourceRoot, fileName);
  if (!fs.existsSync(filePath)) throw new Error(`Arquivo não encontrado: ${filePath}`);
  const workbook = xlsx.readFile(filePath, { cellDates: true });
  const selected = sheetName ?? workbook.SheetNames[0];
  const sheet = workbook.Sheets[selected];
  if (!sheet) throw new Error(`Aba não encontrada: ${selected}`);
  return xlsx.utils.sheet_to_json<Row>(sheet, { defval: null });
}

function attachmentName(value: string) {
  return value.replace(/\\/g, '/').split('/').pop() || value;
}

async function backupDatabase() {
  const dbPath = path.resolve(__dirname, 'dev.db');
  if (!fs.existsSync(dbPath)) return null;
  const backupDir = path.resolve(__dirname, 'backups');
  fs.mkdirSync(backupDir, { recursive: true });
  const stamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backupPath = path.join(backupDir, `dev-${stamp}.db`);
  fs.copyFileSync(dbPath, backupPath);
  return backupPath;
}

async function clearDatabase() {
  await prisma.$transaction([
    prisma.marcacaoComplementacao.deleteMany(),
    prisma.documento.deleteMany(),
    prisma.lancamento.deleteMany(),
    prisma.tipoDocumento.deleteMany(),
    prisma.cliente.deleteMany(),
    prisma.agencia.deleteMany(),
    prisma.veiculo.deleteMany(),
    prisma.colaborador.deleteMany(),
  ]);
}

async function ensureDocumentTypes() {
  const names = [...new Set([...Object.values(RECEBER_DOCS), ...Object.values(PAGAR_DOCS)])];
  const result = new Map<string, string>();
  for (const name of names) {
    const type = await prisma.tipoDocumento.upsert({
      where: { nome: name },
      update: {},
      create: { nome: name },
    });
    result.set(name, type.id);
  }
  return result;
}

async function importCadastros(rows: Row[]) {
  for (const row of rows) {
    const legacyId = text(row.Id);
    const razaoSocial = text(row['Razão Social']);
    if (!legacyId || !razaoSocial) continue;
    const tipificacao = text(row['Tipificação']) ?? 'Não classificado';
    const isColaborador = ['PRESTADOR', 'FORNECEDOR'].includes(normalize(tipificacao));
    if (isColaborador) {
      await prisma.colaborador.upsert({
        where: { legacyId },
        update: {
          nome: razaoSocial,
          cpfCnpj: text(row.CNPJ) ?? text(row.CPF),
          cargo: tipificacao,
          tipificacao,
        },
        create: {
          legacyId,
          nome: razaoSocial,
          cpfCnpj: text(row.CNPJ) ?? text(row.CPF),
          cargo: tipificacao,
          tipificacao,
        },
      });
    } else {
      await prisma.cliente.upsert({
        where: { legacyId },
        update: {
          razaoSocial,
          nomeFantasia: text(row['Nome Fantasia']),
          cnpj: text(row.CNPJ),
          cidade: text(row.Cidade),
          tipificacao,
        },
        create: {
          legacyId,
          razaoSocial,
          nomeFantasia: text(row['Nome Fantasia']),
          cnpj: text(row.CNPJ),
          cidade: text(row.Cidade),
          tipificacao,
        },
      });
    }
  }
}

async function buildEntityMaps() {
  const clients = await prisma.cliente.findMany();
  const collaborators = await prisma.colaborador.findMany();
  const clientMap = new Map<string, string>();
  const collaboratorMap = new Map<string, string>();
  for (const client of clients) {
    clientMap.set(normalize(client.razaoSocial), client.id);
    if (client.nomeFantasia) clientMap.set(normalize(client.nomeFantasia), client.id);
  }
  for (const collaborator of collaborators) collaboratorMap.set(normalize(collaborator.nome), collaborator.id);
  return { clientMap, collaboratorMap };
}

async function resolveVehicle(nameValue: unknown, map: Map<string, string>) {
  const name = text(nameValue);
  if (!name) return null;
  const key = normalize(name);
  const cached = map.get(key);
  if (cached) return cached;
  const vehicle = await prisma.veiculo.upsert({ where: { nome: name }, update: {}, create: { nome: name } });
  map.set(key, vehicle.id);
  return vehicle.id;
}

async function addImportedDocuments(
  lancamentoId: string,
  row: Row,
  columns: Record<string, string>,
  typeIds: Map<string, string>,
  workbook: string,
  sheet: string,
) {
  for (const [column, typeName] of Object.entries(columns)) {
    const originalPath = text(row[column]);
    if (!originalPath) continue;
    const tipoDocumentoId = typeIds.get(typeName);
    if (!tipoDocumentoId) throw new Error(`Tipo de documento ausente: ${typeName}`);
    await prisma.documento.create({
      data: {
        lancamentoId,
        tipoDocumentoId,
        caminhoOriginal: originalPath,
        nomeOriginal: attachmentName(originalPath),
        colunaOrigem: column,
        planilhaOrigem: `${workbook} :: ${sheet}`,
      },
    });
  }
}

async function importReceber(rows: Row[], typeIds: Map<string, string>, clientMap: Map<string, string>, vehicleMap: Map<string, string>) {
  let count = 0;
  for (const row of rows.filter((item) => text(item.Id)?.startsWith('CR'))) {
    const appSheetId = text(row.Id)!;
    const clientName = text(row.CLIENTE) ?? 'Cliente não identificado';
    const clientKey = normalize(clientName);
    let clienteId = clientMap.get(clientKey);
    if (!clienteId) {
      const client = await prisma.cliente.create({
        data: { razaoSocial: clientName, nomeFantasia: clientName, tipificacao: 'Importado de recebimentos' },
      });
      clienteId = client.id;
      clientMap.set(clientKey, client.id);
    }
    const veiculoId = await resolveVehicle(row['VEÍCULO'], vehicleMap);
    const lancamento = await prisma.lancamento.create({
      data: {
        appSheetId,
        tipoLancamento: 'RECEITA',
        clienteId,
        veiculoId,
        numeroNotaFiscal: text(row['Nº NFe']),
        dataEmissao: date(row['DATA ENVIO_NF-e']),
        valor: number(row['VALOR (R$)']),
        vencimento: date(row.VENCIMENTO),
        descricao: text(row['DESCRIÇÃO']),
        numeroPi: text(row['Nº PI']),
        numeroContrato: text(row['Nº Contrato Pulsar']),
        mesAnoReferencia: [text(row['MÊS_REF']), text(row['ANO_REF'])].filter(Boolean).join('/') || null,
        statusPagto: text(row['STATUS PAGTO']),
        statusCobranca: text(row['STATUS COBRANÇA']),
        statusNfe: text(row['STATUS NF-e']),
        dataEnvio: date(row['DATA ENVIO']),
        valorPagto: number(row['VALOR PAGTO']),
        dataPagamento: date(row['DATA PAGAMENTO']),
        dataEnvioNfe: date(row['DATA ENVIO_NF-e']),
        canalCobranca: text(row['Canal de Cobrança']),
      },
    });
    await addImportedDocuments(lancamento.id, row, RECEBER_DOCS, typeIds, 'Controle _ Notas a Receber.xlsx', 'Página1');
    count += 1;
  }
  return count;
}

async function importPagar(rows: Row[], typeIds: Map<string, string>, collaboratorMap: Map<string, string>, vehicleMap: Map<string, string>) {
  let count = 0;
  for (const row of rows.filter((item) => text(item['Nº OP'])?.startsWith('CP'))) {
    const appSheetId = text(row['Nº OP'])!;
    const collaboratorName = text(row['DESCRIÇÃO']) ?? 'Fornecedor não identificado';
    const collaboratorKey = normalize(collaboratorName);
    let colaboradorId = collaboratorMap.get(collaboratorKey);
    if (!colaboradorId) {
      const collaborator = await prisma.colaborador.create({
        data: { nome: collaboratorName, tipificacao: 'Importado de pagamentos', cargo: 'Fornecedor' },
      });
      colaboradorId = collaborator.id;
      collaboratorMap.set(collaboratorKey, collaborator.id);
    }
    const veiculoId = await resolveVehicle(row['VEÍCULO'], vehicleMap);
    const lancamento = await prisma.lancamento.create({
      data: {
        appSheetId,
        tipoLancamento: 'DESPESA',
        colaboradorId,
        veiculoId,
        descricao: text(row.TIPO) ?? collaboratorName,
        valor: number(row['VALOR (R$)']),
        vencimento: date(row.VENCIMENTO),
        statusPagto: text(row.STATUS),
        valorPagto: number(row['VALOR PAGO']),
        dataPagamento: date(row['DATA PAGAMENTO']),
      },
    });
    await addImportedDocuments(lancamento.id, row, PAGAR_DOCS, typeIds, 'Controle _ Notas a Pagar.xlsx', 'Controle interno');
    count += 1;
  }
  return count;
}

async function main() {
  const cadastros = readRows('Documentação _ Clientes.xlsx', 'Página1');
  const receber = readRows('Controle _ Notas a Receber.xlsx', 'Página1').filter((row) => text(row.Id)?.startsWith('CR'));
  const pagar = readRows('Controle _ Notas a Pagar.xlsx', 'Controle interno').filter((row) => text(row['Nº OP'])?.startsWith('CP'));
  const attachmentCount = (rows: Row[], columns: Record<string, string>) =>
    rows.reduce((total, row) => total + Object.keys(columns).filter((column) => text(row[column])).length, 0);

  console.log(JSON.stringify({
    mode: replaceMode ? 'replace' : 'dry-run',
    sourceRoot,
    cadastros: cadastros.filter((row) => text(row.Id)).length,
    receber: receber.length,
    pagar: pagar.length,
    anexosReceber: attachmentCount(receber, RECEBER_DOCS),
    anexosPagar: attachmentCount(pagar, PAGAR_DOCS),
  }, null, 2));

  if (!replaceMode) {
    console.log('Simulação concluída. Nenhum dado foi alterado. Use --replace somente após conferir o backup.');
    return;
  }

  const backupPath = await backupDatabase();
  console.log(`Backup criado em: ${backupPath ?? 'banco ainda não existente'}`);
  await clearDatabase();
  await importCadastros(cadastros);
  const { clientMap, collaboratorMap } = await buildEntityMaps();
  const vehicleMap = new Map<string, string>();
  const typeIds = await ensureDocumentTypes();
  const receberCount = await importReceber(receber, typeIds, clientMap, vehicleMap);
  const pagarCount = await importPagar(pagar, typeIds, collaboratorMap, vehicleMap);

  const totals = {
    clientes: await prisma.cliente.count(),
    colaboradores: await prisma.colaborador.count(),
    veiculos: await prisma.veiculo.count(),
    lancamentosReceber: await prisma.lancamento.count({ where: { tipoLancamento: 'RECEITA' } }),
    lancamentosPagar: await prisma.lancamento.count({ where: { tipoLancamento: 'DESPESA' } }),
    documentos: await prisma.documento.count(),
  };
  console.log(JSON.stringify({ imported: { receberCount, pagarCount }, totals }, null, 2));
}

main()
  .catch((error) => {
    console.error('Importação interrompida:', error);
    process.exitCode = 1;
  })
  .finally(async () => prisma.$disconnect());
