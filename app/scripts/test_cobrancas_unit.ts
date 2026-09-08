import {
  parseCSV,
  parseCurrency,
  formatCurrency,
  parseBrazilianDate,
  extractEmails,
  calculateDaysOverdue,
  buildEmailData,
  AgenciaGrupo,
} from '../src/lib/cobrancasTypes';

function assert(condition: boolean, message: string) {
  if (!condition) {
    throw new Error(`Assertion failed: ${message}`);
  }
}

console.log('--- EXECUTANDO TESTES UNITÁRIOS DE COBRANÇAS ---');

// 1. Teste de parseCSV
console.log('1. Testando parseCSV...');
const csvSample = `PI,Agência,Valor,Obs\n12345,"Agência ABC, LTDA","R$ 1.200,00","Texto com, vírgula"\n67890,"Agência ""Especial""","R$ 500,00",Sem obs\n\n`;
const parsed = parseCSV(csvSample);
assert(parsed.length === 3, `Esperava 3 linhas no CSV, obteve ${parsed.length}`);
assert(parsed[1][1] === 'Agência ABC, LTDA', `Esperava agência com vírgula tratada corretamente, obteve "${parsed[1][1]}"`);
assert(parsed[1][2] === 'R$ 1.200,00', `Esperava valor tratado com aspas, obteve "${parsed[1][2]}"`);
assert(parsed[2][1] === 'Agência "Especial"', `Esperava aspas escapadas tratadas, obteve "${parsed[2][1]}"`);
console.log('✓ parseCSV passou!');

// 2. Teste de parseCurrency
console.log('2. Testando parseCurrency...');
assert(parseCurrency('R$ 1.680,00') === 1680.00, 'R$ 1.680,00 falhou');
assert(parseCurrency('R$ 343,20') === 343.20, 'R$ 343,20 falhou');
assert(parseCurrency('9.094,80') === 9094.80, '9.094,80 falhou');
assert(parseCurrency('0,00') === 0, '0,00 falhou');
assert(parseCurrency('') === 0, 'vazio falhou');
assert(parseCurrency(null) === 0, 'null falhou');
console.log('✓ parseCurrency passou!');

// 3. Teste de parseBrazilianDate
console.log('3. Testando parseBrazilianDate...');
const d1 = parseBrazilianDate('30/09/2026');
assert(d1 !== null && d1.getFullYear() === 2026 && d1.getMonth() === 8 && d1.getDate() === 30, '30/09/2026 falhou');
assert(parseBrazilianDate('') === null, 'data vazia falhou');
assert(parseBrazilianDate('invalid') === null, 'data invalida falhou');
console.log('✓ parseBrazilianDate passou!');

// 4. Teste de extractEmails
console.log('4. Testando extractEmails...');
const emailsStr = 'financeiro@empresa.com, contato@empresa.com; FINANCEIRO@EMPRESA.COM\noutro@empresa.com, invalido-sem-arroba';
const extracted = extractEmails(emailsStr);
assert(extracted.length === 3, `Esperava 3 emails deduplicados, obteve ${extracted.length}`);
assert(extracted.includes('financeiro@empresa.com'), 'Email normalizado falhou');
assert(extracted.includes('contato@empresa.com'), 'Email com ponto-e-vírgula falhou');
assert(extracted.includes('outro@empresa.com'), 'Email com quebra de linha falhou');
assert(!extracted.includes('invalido-sem-arroba'), 'Email inválido não foi filtrado');
console.log('✓ extractEmails passou!');

// 5. Teste de calculateDaysOverdue
console.log('5. Testando calculateDaysOverdue...');
const hoje = new Date(2026, 8, 7); // 07/09/2026
const vencPassado = new Date(2026, 7, 23); // 23/08/2026 -> 15 dias atrás
assert(calculateDaysOverdue(vencPassado, hoje) === 15, `Esperava 15 dias de atraso, obteve ${calculateDaysOverdue(vencPassado, hoje)}`);
const vencFuturo = new Date(2026, 8, 30); // 30/09/2026 -> futuro
assert(calculateDaysOverdue(vencFuturo, hoje) === 0, 'Vencimento futuro deve retornar 0');
console.log('✓ calculateDaysOverdue passou!');

// 6. Teste de buildEmailData (Modo Teste vs Produção)
console.log('6. Testando buildEmailData...');
const dummyGrupo: AgenciaGrupo = {
  agencia: 'Agência Teste LTDA',
  emails: ['financeiro@teste.com', 'checking@teste.com'],
  emailsFormatados: 'financeiro@teste.com, checking@teste.com',
  quantidadeContratos: 1,
  totalValor: 1500,
  totalValorFormatado: 'R$ 1.500,00',
  debts: [
    {
      cobrancaNo: '1',
      pi: '99999',
      veiculo: 'Onda FM',
      valor: 1500,
      valorFormatado: 'R$ 1.500,00',
      dataOriginal: '01/08/2026',
      dataVenc: '01/08/2026',
      ultCobranca: '15/08/2026',
      link: '',
      obs: '',
      diasAtraso: 37,
    },
  ],
};

const emailTeste = buildEmailData(dummyGrupo, true);
assert(emailTeste.assunto.startsWith('[TESTE] '), 'Modo Teste deve adicionar prefixo [TESTE]');
assert(emailTeste.destinatarios.includes('adm@ondas985.com.br'), 'Modo Teste deve direcionar destinatário para adm@ondas985.com.br');
assert(emailTeste.html.includes('MODO TESTE ATIVADO'), 'HTML deve conter tarja de teste');
assert(emailTeste.texto.includes('MODO TESTE ATIVADO'), 'Texto deve conter cabeçalho de teste');

const emailProd = buildEmailData(dummyGrupo, false);
assert(!emailProd.assunto.startsWith('[TESTE] '), 'Modo Produção não deve ter prefixo [TESTE]');
assert(emailProd.destinatarios.includes('financeiro@teste.com'), 'Modo Produção deve ter destinatário real');
assert(!emailProd.html.includes('MODO TESTE ATIVADO'), 'Modo Produção não deve ter tarja de teste');
console.log('✓ buildEmailData passou!');

console.log('\n=============================================');
console.log('TODOS OS 6 TESTES UNITÁRIOS PASSARAM COM SUCESSO!');
console.log('=============================================');
