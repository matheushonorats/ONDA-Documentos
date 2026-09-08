import { getCobrancasData, generateEmailForAgencia } from '../src/actions/cobrancas';

async function main() {
  console.log('Testando getCobrancasData()...');
  const data = await getCobrancasData();
  console.log('Metricas recebidas:', data.metrics);
  console.log('Total agencias com pendencias vencidas:', data.agenciasGrupos.length);
  
  if (data.agenciasGrupos.length > 0) {
    const primeiraAgencia = data.agenciasGrupos[0];
    console.log('\n--- Primeira Agencia:', primeiraAgencia.agencia, '---');
    console.log('Emails:', primeiraAgencia.emails);
    console.log('Debitos (qtd):', primeiraAgencia.debts.length);
    console.log('Valor Total:', primeiraAgencia.totalValorFormatado);

    console.log('\nGerando e-mail (Modo Teste = true)...');
    const emailTeste = await generateEmailForAgencia(primeiraAgencia, true);
    console.log('Assunto Teste:', emailTeste.assunto);
    console.log('Destinatarios:', emailTeste.destinatarios);
    console.log('HTML contem banner teste?', emailTeste.html.includes('MODO TESTE ATIVADO'));
    console.log('Texto contem banner teste?', emailTeste.texto.includes('MODO TESTE ATIVADO'));
    console.log('Mailto URL gerada:', emailTeste.mailtoUrl.slice(0, 100) + '...');

    console.log('\nGerando e-mail (Modo Teste = false)...');
    const emailProd = await generateEmailForAgencia(primeiraAgencia, false);
    console.log('Assunto Prod:', emailProd.assunto);
    console.log('Destinatarios:', emailProd.destinatarios);
    console.log('HTML contem banner teste?', emailProd.html.includes('MODO TESTE ATIVADO'));
  }

  console.log('\nTotal contratos na planilha:', data.todosContratos.length);
  const pagos = data.todosContratos.filter(c => c.status === 'PAGO').length;
  const vencidos = data.todosContratos.filter(c => c.status === 'VENCIDO').length;
  const aVencer = data.todosContratos.filter(c => c.status === 'A_VENCER').length;
  console.log({ pagos, vencidos, aVencer });
}

main().catch(console.error);
