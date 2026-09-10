
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
  skip
} = require('./runtime/index-browser.js')


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

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.NotFoundError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`NotFoundError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

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
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }
        
        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
