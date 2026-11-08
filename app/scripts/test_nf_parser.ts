import fs from 'fs';
import path from 'path';
import { parseNfseTextContent } from '../src/lib/nfParser';

function assert(condition: boolean, msg: string) {
  if (!condition) {
    throw new Error(`Assertion failed: ${msg}`);
  }
}

console.log('--- TESTANDO PARSER DE NOTAS FISCAIS (NOVO MODELO DANFSE V2.0 + LEGADO) ---');

// Teste 1: Novo modelo DANFSe v2.0 (Padrão Nacional)
const newNfSample = `
SUBSTITUÍDA
DATACIENTIFICAÇÃO:IDENTIFICAÇÃOE ASSINATURAN°NFS-e / CHAVENFS-e
923/ 35507041243579370000138000000000092326105971234201
DANFSev2.0
DocumentoAuxiliardaNFS-e
Município:SãoSebastião- SP
AmbienteGerador:1
TipodeAmbiente:1
CHAVEDEACESSODANFS-e
35507041243579370000138000000000092326105971234201
NÚMERODANFS-e
923
COMPETÊNCIADANFS-e
29/10/2026
DATAE HORADAEMISSÃODANFS-e
29/10/202610:16:23
PRESTADOR/ FORNECEDOR
CNPJ/ CPF/ NIF
43.579.370/0001-38
Nome/ NomeEmpresarial
ONDASSISTEMADERADIODIFUSÃOLTDA
TOMADOR/ ADQUIRENTE
CNPJ/ CPF/ NIF
62.984.091/0001-02
Nome/ NomeEmpresarial
CRUZEIRODOSULEDUCACIONALS.A.
Município/ SiglaUF
SãoPaulo/ SP
DescriçãodoServiço
IRRADIAÇÕESCOMERCIAIS
RÁDIOONDAFM
SERVIÇOSEXECUTADOSSETEMBRO/2026
OBJETODOCONTRATO:PUBLICIDADE
CAMPANHA:MEDICINAUNIVERSIDADEMÓDULO
NºPI:32147
PERÍODODEVEICULAÇÃO:11/09/2026ATÉ30/09/2026
VENCIMENTO:30/10/2026
DESCRITIVODOSERVIÇO:SPOT30S
VALORBRUTO:R$5.024,00
VALORNEGOCIADO(LÍQUIDO):R$4.019,20
VALORDEREFERÊNCIADODESCONTOPADRÃOAPÓSREMUNERAÇÃODAAGÊNCIA(ITEM1.11DASNORMAS-PADRÃODAATIVIDADEPUBLICITÁRIA):R$1.004,80POR
ORDEME CONTADESEVENCOMUNICAÇÃOLTDA- CNPJ:01.341.333/0001-47.
DADOSBANCÁRIOS:
BANCO:ITAÚ
AGÊNCIA:2931
CONTA:99153-9
TRIBUTAÇÃOMUNICIPAL(ISSQN)
VALORTOTALDANFS-e
VALORDAOPERAÇÃO/ SERVIÇO
R$4.019,20
VALORLÍQUIDODANFS-e
R$4.019,20
`;

const resNew = parseNfseTextContent(newNfSample);
console.log('1. Novo modelo:', {
  nf: resNew.numeroNotaFiscal,
  chave: resNew.chaveAcesso?.slice(0, 15) + '...',
  emissao: resNew.dataEmissao,
  venc: resNew.vencimento,
  pi: resNew.numeroPi,
  ref: resNew.mesAnoReferencia,
  tomador: resNew.tomadorNome,
  cnpj: resNew.tomadorCnpj,
  agencia: resNew.agenciaNome,
  agenciaCnpj: resNew.agenciaCnpj,
  veiculo: resNew.veiculoNome,
  valor: resNew.valor,
});

assert(resNew.numeroNotaFiscal === '923', 'Deveria extrair NF 923');
assert(resNew.chaveAcesso === '35507041243579370000138000000000092326105971234201', 'Deveria extrair chave de acesso');
assert(resNew.dataEmissao === '2026-10-29', 'Deveria extrair emissão 2026-10-29');
assert(resNew.vencimento === '2026-10-30', 'Deveria extrair vencimento 2026-10-30');
assert(resNew.numeroPi === '32147', 'Deveria extrair PI 32147');
assert(resNew.mesAnoReferencia === '09/2026', 'Deveria extrair mês de veiculação 09/2026');
assert(resNew.tomadorCnpj === '62.984.091/0001-02', 'Deveria extrair CNPJ do tomador');
assert(resNew.agenciaCnpj === '01.341.333/0001-47', 'Deveria extrair CNPJ da agência');
assert(resNew.veiculoNome === 'ONDA FM', 'Deveria identificar veículo ONDA FM');
assert(resNew.valor === 4019.2, 'Deveria extrair valor 4019.2');

// Teste 2: Modelo Municipal IIBR (Legado)
const legacySample = `
PREFEITURA MUNICIPAL DE SÃO SEBASTIÃO
NFS-e NOTA FISCAL DE SERVIÇOS ELETRÔNICA
NÚMERO DA NOTA: 916
DATA DA EMISSÃO: 28/10/2026
TOMADOR DO SERVIÇO
NOME/RAZÃO SOCIAL: SECRETARIA ESPECIAL DE COMUNICACAO SOCIAL
CPF/CNPJ: 00.394.460/0058-87
MUNICÍPIO: BRASILIA - DF
DISCRIMINAÇÃO DO SERVIÇO
IRRADIAÇÕES COMERCIAIS
RÁDIO ONDA FM
SERVIÇOS EXECUTADOS OUTUBRO/2026
Nº PI: 144243
VENCIMENTO: 01/02/2026
VALOR NEGOCIADO (LÍQUIDO): R$ 907,20
POR ORDEM E CONTA DE CALIAY2 PROPAGANDA E MARKETING LTDA - CNPJ: 04.784.569/0002-27.
*** FIM DA DISCRIMINAÇÃO DO SERVIÇO ***
VALOR TOTAL DA NOTA = R$ 907,20
`;

const resLegacy = parseNfseTextContent(legacySample);
console.log('2. Modelo legado:', {
  nf: resLegacy.numeroNotaFiscal,
  emissao: resLegacy.dataEmissao,
  venc: resLegacy.vencimento,
  pi: resLegacy.numeroPi,
  ref: resLegacy.mesAnoReferencia,
  tomador: resLegacy.tomadorNome,
  cnpj: resLegacy.tomadorCnpj,
  agencia: resLegacy.agenciaNome,
  agenciaCnpj: resLegacy.agenciaCnpj,
  veiculo: resLegacy.veiculoNome,
  valor: resLegacy.valor,
});

assert(resLegacy.numeroNotaFiscal === '916', 'Deveria extrair NF 916 no legado');
assert(resLegacy.dataEmissao === '2026-10-28', 'Deveria extrair emissão 2026-10-28');
assert(resLegacy.vencimento === '2026-02-01', 'Deveria extrair vencimento 2026-02-01');
assert(resLegacy.numeroPi === '144243', 'Deveria extrair PI 144243');
assert(resLegacy.mesAnoReferencia === '10/2026', 'Deveria extrair mês 10/2026');
assert(resLegacy.tomadorCnpj === '00.394.460/0058-87', 'Deveria extrair CNPJ tomador');
assert(resLegacy.valor === 907.2, 'Deveria extrair valor 907.2');

// Teste 3: Formatação e separação de espaços e quebras de linha na descrição (caso do usuário)
import { formatarDescricaoServico } from '../src/lib/nfParser';

const userGluedText = `RADIOONDA FM SERVIÇOS EXECUTADOS OUTUBRO/2026 OBJETO DO CONTRATO:PUBLICIDADECAMPANHA:EAD2026N°PI:26862PERÍODODEVEICULAÇÃO: 26/10/2026A 31/10/2026DESCRITIVODOSERVIÇO:ROTATIVO06- 19H 20SEC VALORBRUTO:R$840,00VALORNEGOCIADO(LÍQUIDO):R$672,00VALORDE REFERENCIA`;
const formattedDesc = formatarDescricaoServico(userGluedText);

console.log('3. Formatação de Descrição com Texto Colado:\n', formattedDesc);

assert(formattedDesc.includes('RÁDIO ONDA FM'), 'Deveria separar RÁDIO ONDA FM');
assert(formattedDesc.includes('OBJETO DO CONTRATO: PUBLICIDADE'), 'Deveria conter OBJETO DO CONTRATO: PUBLICIDADE');
assert(formattedDesc.includes('CAMPANHA: EAD2026'), 'Deveria conter CAMPANHA: EAD2026');
assert(formattedDesc.includes('Nº PI: 26862'), 'Deveria conter Nº PI: 26862');
assert(formattedDesc.includes('PERÍODO DE VEICULAÇÃO: 26/10/2026 A 31/10/2026'), 'Deveria conter datas com A espaçado');
assert(formattedDesc.includes('VALOR BRUTO: R$ 840,00'), 'Deveria conter VALOR BRUTO: R$ 840,00');
assert(formattedDesc.includes('VALOR NEGOCIADO (LÍQUIDO): R$ 672,00'), 'Deveria conter VALOR NEGOCIADO (LÍQUIDO): R$ 672,00');

console.log('\n✔ TODOS OS TESTES PASSARAM COM 100% DE SUCESSO!');
