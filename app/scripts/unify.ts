import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const colaboradores = await prisma.colaborador.findMany();
  const clientes = await prisma.cliente.findMany({
    include: {
      _count: {
        select: { lancamentos: true }
      }
    }
  });

  console.log(`Total Colaboradores: ${colaboradores.length}`);
  console.log(`Total Clientes: ${clientes.length}`);

  let unifiedCount = 0;

  for (const colab of colaboradores) {
    const colabNameTokens = colab.nome.trim().split(/\s+/);
    if (colabNameTokens.length === 0) continue;
    
    // Filtro heurístico: primeiro nome
    const firstName = colabNameTokens[0].toLowerCase();
    if (firstName.length <= 2) continue; // ignorar nomes muito curtos

    // Procurar clientes que tenham o mesmo primeiro nome E que pareçam pessoas (não empresas muito óbvias)
    const matches = clientes.filter(c => {
      const rs = (c.razaoSocial || '').toLowerCase();
      const nf = (c.nomeFantasia || '').toLowerCase();
      
      const rsFirst = rs.split(/\s+/)[0];
      const nfFirst = nf.split(/\s+/)[0];

      return (rsFirst === firstName || nfFirst === firstName) 
             && !rs.includes('ltda') 
             && !rs.includes(' s.a.') 
             && !rs.includes(' s/a') 
             && !rs.includes(' comércio')
             && !rs.includes(' comercio')
             && !rs.includes(' eireli');
    });

    for (const match of matches) {
      console.log(`UNIFICANDO: Cliente '${match.razaoSocial}' -> Colaborador '${colab.nome}' (${match._count.lancamentos} lançamentos)`);
      
      // Update lancamentos
      await prisma.lancamento.updateMany({
        where: { clienteId: match.id },
        data: {
          clienteId: null,
          colaboradorId: colab.id,
          tipoLancamento: 'DESPESA'
        }
      });

      // Delete cliente
      try {
        await prisma.cliente.delete({
          where: { id: match.id }
        });
      } catch (e) {
        console.log(`Erro ao deletar cliente ${match.id} (talvez ainda existam outros vinculos)`);
      }

      unifiedCount++;
    }
  }

  console.log(`\nUnificações realizadas: ${unifiedCount}`);
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
