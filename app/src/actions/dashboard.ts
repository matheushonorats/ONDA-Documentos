'use server';

import { db } from '@/lib/db';

export async function getDashboardData() {
  const [countLancamentos, countDocumentos, countClientes, countColaboradores, recentLancamentos, recentDocumentos] = await Promise.all([
    db.lancamento.count(),
    db.documento.count(),
    db.cliente.count(),
    db.colaborador.count(),
    db.lancamento.findMany({
      take: 6,
      orderBy: { updatedAt: 'desc' },
      include: { cliente: true, colaborador: true, veiculo: true, documentos: true, agencia: true },
    }),
    db.documento.findMany({
      take: 6,
      orderBy: { dataInclusao: 'desc' },
      include: {
        tipoDocumento: true,
        lancamento: { include: { cliente: true, colaborador: true } },
      },
    }),
  ]);

  return { countLancamentos, countDocumentos, countClientes, countColaboradores, recentLancamentos, recentDocumentos };
}
