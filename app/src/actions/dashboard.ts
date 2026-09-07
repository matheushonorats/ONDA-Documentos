'use server';

import { db } from '@/lib/db';

export async function getDashboardData() {
  const [
    countLancamentos,
    countReceitas,
    countDespesas,
    countSemNf,
    countDocumentos,
    countClientes,
    countColaboradores,
    countAgencias,
    sumReceitas,
    sumDespesas,
    recentLancamentos,
    recentDocumentos,
  ] = await Promise.all([
    db.lancamento.count(),
    db.lancamento.count({ where: { tipoLancamento: 'RECEITA' } }),
    db.lancamento.count({ where: { tipoLancamento: 'DESPESA' } }),
    db.lancamento.count({
      where: {
        tipoLancamento: 'RECEITA',
        OR: [{ numeroNotaFiscal: null }, { numeroNotaFiscal: '' }],
      },
    }),
    db.documento.count(),
    db.cliente.count(),
    db.colaborador.count(),
    db.agencia.count(),
    db.lancamento.aggregate({
      _sum: { valor: true },
      where: { tipoLancamento: 'RECEITA' },
    }),
    db.lancamento.aggregate({
      _sum: { valor: true },
      where: { tipoLancamento: 'DESPESA' },
    }),
    db.lancamento.findMany({
      take: 8,
      orderBy: { updatedAt: 'desc' },
      include: { cliente: true, colaborador: true, veiculo: true, documentos: true, agencia: true },
    }),
    db.documento.findMany({
      take: 8,
      orderBy: { dataInclusao: 'desc' },
      include: {
        tipoDocumento: true,
        lancamento: { include: { cliente: true, colaborador: true } },
      },
    }),
  ]);

  return {
    countLancamentos,
    countReceitas,
    countDespesas,
    countSemNf,
    countDocumentos,
    countClientes,
    countColaboradores,
    countAgencias,
    totalValorReceitas: sumReceitas._sum.valor || 0,
    totalValorDespesas: sumDespesas._sum.valor || 0,
    recentLancamentos,
    recentDocumentos,
  };
}

