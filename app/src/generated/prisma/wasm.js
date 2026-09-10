
Object.defineProperty(exports, "__esModule", { value: true });

const {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientRustPanicError,
  PrismaClientInitializationError,
  PrismaClientValidationError,
  NotFoundError,
  getPrismaClient,
  sqltag,
  empty,
  join,
  raw,
  skip,
  Decimal,
  Debug,
  objectEnumValues,
  makeStrictEnum,
  Extensions,
  warnOnce,
  defineDmmfProperty,
  Public,
  getRuntime
} = require('./runtime/wasm.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 5.22.0
 * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
 */
Prisma.prismaVersion = {
  client: "5.22.0",
  engine: "605197351a3c8bdd595af2d2a9bc3025bca48ea2"
}

Prisma.PrismaClientKnownRequestError = PrismaClientKnownRequestError;
Prisma.PrismaClientUnknownRequestError = PrismaClientUnknownRequestError
Prisma.PrismaClientRustPanicError = PrismaClientRustPanicError
Prisma.PrismaClientInitializationError = PrismaClientInitializationError
Prisma.PrismaClientValidationError = PrismaClientValidationError
Prisma.NotFoundError = NotFoundError
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = sqltag
Prisma.empty = empty
Prisma.join = join
Prisma.raw = raw
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = Extensions.getExtensionContext
Prisma.defineExtension = Extensions.defineExtension

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}





/**
 * Enums
 */
exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  Serializable: 'Serializable'
});

exports.Prisma.ClienteScalarFieldEnum = {
  id: 'id',
  legacyId: 'legacyId',
  nomeFantasia: 'nomeFantasia',
  razaoSocial: 'razaoSocial',
  cnpj: 'cnpj',
  cidade: 'cidade',
  tipificacao: 'tipificacao',
  dadosCadastrais: 'dadosCadastrais',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.AgenciaScalarFieldEnum = {
  id: 'id',
  nome: 'nome',
  cnpj: 'cnpj',
  contatos: 'contatos',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.VeiculoScalarFieldEnum = {
  id: 'id',
  nome: 'nome',
  identificacao: 'identificacao',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ColaboradorScalarFieldEnum = {
  id: 'id',
  legacyId: 'legacyId',
  nome: 'nome',
  cpfCnpj: 'cpfCnpj',
  cargo: 'cargo',
  tipificacao: 'tipificacao',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.LancamentoScalarFieldEnum = {
  id: 'id',
  appSheetId: 'appSheetId',
  tipoLancamento: 'tipoLancamento',
  clienteId: 'clienteId',
  agenciaId: 'agenciaId',
  veiculoId: 'veiculoId',
  colaboradorId: 'colaboradorId',
  numeroNotaFiscal: 'numeroNotaFiscal',
  dataEmissao: 'dataEmissao',
  valor: 'valor',
  vencimento: 'vencimento',
  descricao: 'descricao',
  numeroPi: 'numeroPi',
  numeroContrato: 'numeroContrato',
  mesAnoReferencia: 'mesAnoReferencia',
  statusPagto: 'statusPagto',
  statusCobranca: 'statusCobranca',
  statusNfe: 'statusNfe',
  dataEnvio: 'dataEnvio',
  valorPagto: 'valorPagto',
  dataPagamento: 'dataPagamento',
  dataEnvioNfe: 'dataEnvioNfe',
  canalCobranca: 'canalCobranca',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.TipoDocumentoScalarFieldEnum = {
  id: 'id',
  nome: 'nome',
  icone: 'icone'
};

exports.Prisma.DocumentoScalarFieldEnum = {
  id: 'id',
  lancamentoId: 'lancamentoId',
  tipoDocumentoId: 'tipoDocumentoId',
  caminhoOriginal: 'caminhoOriginal',
  nomeOriginal: 'nomeOriginal',
  colunaOrigem: 'colunaOrigem',
  planilhaOrigem: 'planilhaOrigem',
  tamanhoBytes: 'tamanhoBytes',
  dataDocumento: 'dataDocumento',
  dataInclusao: 'dataInclusao',
  observacao: 'observacao',
  usuarioResponsavel: 'usuarioResponsavel',
  urlPublica: 'urlPublica',
  deletarApos: 'deletarApos',
  status: 'status'
};

exports.Prisma.HistoricoLancamentoScalarFieldEnum = {
  id: 'id',
  lancamentoId: 'lancamentoId',
  acao: 'acao',
  descricao: 'descricao',
  detalhes: 'detalhes',
  usuario: 'usuario',
  createdAt: 'createdAt'
};

exports.Prisma.MarcacaoComplementacaoScalarFieldEnum = {
  id: 'id',
  lancamentoId: 'lancamentoId',
  tipoDocumentoEsperado: 'tipoDocumentoEsperado',
  situacao: 'situacao',
  observacao: 'observacao'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};


exports.Prisma.ModelName = {
  Cliente: 'Cliente',
  Agencia: 'Agencia',
  Veiculo: 'Veiculo',
  Colaborador: 'Colaborador',
  Lancamento: 'Lancamento',
  TipoDocumento: 'TipoDocumento',
  Documento: 'Documento',
  HistoricoLancamento: 'HistoricoLancamento',
  MarcacaoComplementacao: 'MarcacaoComplementacao'
};
/**
 * Create the Client
 */
const config = {
  "generator": {
    "name": "client",
    "provider": {
      "fromEnvVar": null,
      "value": "prisma-client-js"
    },
    "output": {
      "value": "C:\\Users\\mathe\\Desktop\\Projetos Antigravity\\ONDA Documentos\\app\\src\\generated\\prisma",
      "fromEnvVar": null
    },
    "config": {
      "engineType": "library"
    },
    "binaryTargets": [
      {
        "fromEnvVar": null,
        "value": "windows",
        "native": true
      }
    ],
    "previewFeatures": [
      "driverAdapters"
    ],
    "sourceFilePath": "C:\\Users\\mathe\\Desktop\\Projetos Antigravity\\ONDA Documentos\\app\\prisma\\schema.prisma",
    "isCustomOutput": true
  },
  "relativeEnvPaths": {
    "rootEnvPath": null,
    "schemaEnvPath": "../../../.env"
  },
  "relativePath": "../../../prisma",
  "clientVersion": "5.22.0",
  "engineVersion": "605197351a3c8bdd595af2d2a9bc3025bca48ea2",
  "datasourceNames": [
    "db"
  ],
  "activeProvider": "sqlite",
  "postinstall": false,
  "inlineDatasources": {
    "db": {
      "url": {
        "fromEnvVar": "DATABASE_URL",
        "value": null
      }
    }
  },
  "inlineSchema": "// This is your Prisma schema file,\n// learn more about it in the docs: https://pris.ly/d/prisma-schema\n\ngenerator client {\n  provider        = \"prisma-client-js\"\n  output          = \"../src/generated/prisma\"\n  previewFeatures = [\"driverAdapters\"]\n}\n\ndatasource db {\n  provider = \"sqlite\"\n  url      = env(\"DATABASE_URL\")\n}\n\nmodel Cliente {\n  id              String       @id @default(uuid())\n  legacyId        String?      @unique\n  nomeFantasia    String?\n  razaoSocial     String\n  cnpj            String?\n  cidade          String?\n  tipificacao     String?\n  dadosCadastrais String?\n  createdAt       DateTime     @default(now())\n  updatedAt       DateTime     @updatedAt\n  lancamentos     Lancamento[]\n}\n\nmodel Agencia {\n  id          String       @id @default(uuid())\n  nome        String\n  cnpj        String?\n  contatos    String?\n  createdAt   DateTime     @default(now())\n  updatedAt   DateTime     @updatedAt\n  lancamentos Lancamento[]\n}\n\nmodel Veiculo {\n  id            String       @id @default(uuid())\n  nome          String       @unique\n  identificacao String?\n  createdAt     DateTime     @default(now())\n  updatedAt     DateTime     @updatedAt\n  lancamentos   Lancamento[]\n}\n\nmodel Colaborador {\n  id          String       @id @default(uuid())\n  legacyId    String?      @unique\n  nome        String\n  cpfCnpj     String?\n  cargo       String?\n  tipificacao String?\n  createdAt   DateTime     @default(now())\n  updatedAt   DateTime     @updatedAt\n  lancamentos Lancamento[]\n}\n\nmodel Lancamento {\n  id         String  @id @default(uuid())\n  appSheetId String? @unique\n\n  // Define se é RECEITA (Contas a Receber) ou DESPESA (Contas a Pagar)\n  tipoLancamento String @default(\"RECEITA\")\n\n  clienteId String?\n  cliente   Cliente? @relation(fields: [clienteId], references: [id])\n\n  agenciaId String?\n  agencia   Agencia? @relation(fields: [agenciaId], references: [id])\n\n  veiculoId String?\n  veiculo   Veiculo? @relation(fields: [veiculoId], references: [id])\n\n  colaboradorId String?\n  colaborador   Colaborador? @relation(fields: [colaboradorId], references: [id])\n\n  // Campos principais\n  numeroNotaFiscal String?\n  dataEmissao      DateTime?\n  valor            Float?\n  vencimento       DateTime?\n  descricao        String?\n\n  // Campos complementares\n  numeroPi         String?\n  numeroContrato   String?\n  mesAnoReferencia String?\n\n  // Campos de Controle legados da Planilha (Retrocompatibilidade)\n  statusPagto    String?\n  statusCobranca String?\n  statusNfe      String?\n  dataEnvio      DateTime?\n  valorPagto     Float?\n  dataPagamento  DateTime?\n  dataEnvioNfe   DateTime?\n  canalCobranca  String?\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  documentos Documento[]\n  marcacoes  MarcacaoComplementacao[]\n  historico  HistoricoLancamento[]\n\n  @@index([tipoLancamento, updatedAt])\n  @@index([numeroNotaFiscal])\n  @@index([clienteId])\n  @@index([colaboradorId])\n  @@index([veiculoId])\n}\n\nmodel TipoDocumento {\n  id         String      @id @default(uuid())\n  nome       String      @unique // ex: 'Nota Fiscal', 'Cobrança', 'Censura/Áudio'\n  icone      String?\n  documentos Documento[]\n}\n\nmodel Documento {\n  id String @id @default(uuid())\n\n  lancamentoId String\n  lancamento   Lancamento @relation(fields: [lancamentoId], references: [id], onDelete: Cascade)\n\n  tipoDocumentoId String\n  tipoDocumento   TipoDocumento @relation(fields: [tipoDocumentoId], references: [id])\n\n  caminhoOriginal String?\n  nomeOriginal    String\n  colunaOrigem    String?\n  planilhaOrigem  String?\n  tamanhoBytes    Int     @default(0)\n\n  dataDocumento      DateTime?\n  dataInclusao       DateTime  @default(now())\n  observacao         String?\n  usuarioResponsavel String?\n\n  urlPublica  String?\n  deletarApos DateTime?\n  status      String    @default(\"ATIVO\") // ATIVO, CANCELADO\n\n  @@index([lancamentoId, dataInclusao])\n  @@index([nomeOriginal])\n}\n\nmodel HistoricoLancamento {\n  id           String     @id @default(uuid())\n  lancamentoId String\n  lancamento   Lancamento @relation(fields: [lancamentoId], references: [id], onDelete: Cascade)\n\n  acao      String // 'CRIACAO', 'EDICAO_DADOS', 'INCLUSAO_DOCUMENTO', 'EDICAO_DOCUMENTO', 'EXCLUSAO_DOCUMENTO', 'STATUS_DOCUMENTO'\n  descricao String // Descrição clara do que foi alterado\n  detalhes  String? // Detalhes adicionais (ex: campo X de 'A' para 'B')\n  usuario   String?  @default(\"Sistema\")\n  createdAt DateTime @default(now())\n\n  @@index([lancamentoId, createdAt])\n}\n\nmodel MarcacaoComplementacao {\n  id String @id @default(uuid())\n\n  lancamentoId String\n  lancamento   Lancamento @relation(fields: [lancamentoId], references: [id], onDelete: Cascade)\n\n  tipoDocumentoEsperado String\n  situacao              String  @default(\"PENDENTE\")\n  observacao            String?\n}\n",
  "inlineSchemaHash": "fc1d2403354482971cadda4b72347f98ea12ba4b84fde0681baece88a394d7e5",
  "copyEngine": true
}
config.dirname = '/'

config.runtimeDataModel = JSON.parse("{\"models\":{\"Cliente\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"legacyId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"nomeFantasia\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"razaoSocial\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"cnpj\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"cidade\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"tipificacao\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"dadosCadastrais\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"lancamentos\",\"kind\":\"object\",\"type\":\"Lancamento\",\"relationName\":\"ClienteToLancamento\"}],\"dbName\":null},\"Agencia\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"nome\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"cnpj\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"contatos\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"lancamentos\",\"kind\":\"object\",\"type\":\"Lancamento\",\"relationName\":\"AgenciaToLancamento\"}],\"dbName\":null},\"Veiculo\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"nome\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"identificacao\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"lancamentos\",\"kind\":\"object\",\"type\":\"Lancamento\",\"relationName\":\"LancamentoToVeiculo\"}],\"dbName\":null},\"Colaborador\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"legacyId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"nome\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"cpfCnpj\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"cargo\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"tipificacao\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"lancamentos\",\"kind\":\"object\",\"type\":\"Lancamento\",\"relationName\":\"ColaboradorToLancamento\"}],\"dbName\":null},\"Lancamento\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"appSheetId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"tipoLancamento\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"clienteId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"cliente\",\"kind\":\"object\",\"type\":\"Cliente\",\"relationName\":\"ClienteToLancamento\"},{\"name\":\"agenciaId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"agencia\",\"kind\":\"object\",\"type\":\"Agencia\",\"relationName\":\"AgenciaToLancamento\"},{\"name\":\"veiculoId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"veiculo\",\"kind\":\"object\",\"type\":\"Veiculo\",\"relationName\":\"LancamentoToVeiculo\"},{\"name\":\"colaboradorId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"colaborador\",\"kind\":\"object\",\"type\":\"Colaborador\",\"relationName\":\"ColaboradorToLancamento\"},{\"name\":\"numeroNotaFiscal\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"dataEmissao\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"valor\",\"kind\":\"scalar\",\"type\":\"Float\"},{\"name\":\"vencimento\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"descricao\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"numeroPi\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"numeroContrato\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"mesAnoReferencia\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"statusPagto\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"statusCobranca\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"statusNfe\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"dataEnvio\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"valorPagto\",\"kind\":\"scalar\",\"type\":\"Float\"},{\"name\":\"dataPagamento\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"dataEnvioNfe\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"canalCobranca\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"documentos\",\"kind\":\"object\",\"type\":\"Documento\",\"relationName\":\"DocumentoToLancamento\"},{\"name\":\"marcacoes\",\"kind\":\"object\",\"type\":\"MarcacaoComplementacao\",\"relationName\":\"LancamentoToMarcacaoComplementacao\"},{\"name\":\"historico\",\"kind\":\"object\",\"type\":\"HistoricoLancamento\",\"relationName\":\"HistoricoLancamentoToLancamento\"}],\"dbName\":null},\"TipoDocumento\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"nome\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"icone\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"documentos\",\"kind\":\"object\",\"type\":\"Documento\",\"relationName\":\"DocumentoToTipoDocumento\"}],\"dbName\":null},\"Documento\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"lancamentoId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"lancamento\",\"kind\":\"object\",\"type\":\"Lancamento\",\"relationName\":\"DocumentoToLancamento\"},{\"name\":\"tipoDocumentoId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"tipoDocumento\",\"kind\":\"object\",\"type\":\"TipoDocumento\",\"relationName\":\"DocumentoToTipoDocumento\"},{\"name\":\"caminhoOriginal\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"nomeOriginal\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"colunaOrigem\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"planilhaOrigem\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"tamanhoBytes\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"dataDocumento\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"dataInclusao\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"observacao\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"usuarioResponsavel\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"urlPublica\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"deletarApos\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"status\",\"kind\":\"scalar\",\"type\":\"String\"}],\"dbName\":null},\"HistoricoLancamento\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"lancamentoId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"lancamento\",\"kind\":\"object\",\"type\":\"Lancamento\",\"relationName\":\"HistoricoLancamentoToLancamento\"},{\"name\":\"acao\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"descricao\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"detalhes\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"usuario\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":null},\"MarcacaoComplementacao\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"lancamentoId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"lancamento\",\"kind\":\"object\",\"type\":\"Lancamento\",\"relationName\":\"LancamentoToMarcacaoComplementacao\"},{\"name\":\"tipoDocumentoEsperado\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"situacao\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"observacao\",\"kind\":\"scalar\",\"type\":\"String\"}],\"dbName\":null}},\"enums\":{},\"types\":{}}")
defineDmmfProperty(exports.Prisma, config.runtimeDataModel)
config.engineWasm = {
  getRuntime: () => require('./query_engine_bg.js'),
  getQueryEngineWasmModule: async () => {
    const loader = (await import('#wasm-engine-loader')).default
    const engine = (await loader).default
    return engine 
  }
}

config.injectableEdgeEnv = () => ({
  parsed: {
    DATABASE_URL: typeof globalThis !== 'undefined' && globalThis['DATABASE_URL'] || typeof process !== 'undefined' && process.env && process.env.DATABASE_URL || undefined
  }
})

if (typeof globalThis !== 'undefined' && globalThis['DEBUG'] || typeof process !== 'undefined' && process.env && process.env.DEBUG || undefined) {
  Debug.enable(typeof globalThis !== 'undefined' && globalThis['DEBUG'] || typeof process !== 'undefined' && process.env && process.env.DEBUG || undefined)
}

const PrismaClient = getPrismaClient(config)
exports.PrismaClient = PrismaClient
Object.assign(exports, Prisma)

