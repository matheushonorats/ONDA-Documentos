'use server';

import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function registrarHistorico(
  lancamentoId: string,
  acao: 'CRIACAO' | 'EDICAO_DADOS' | 'INCLUSAO_DOCUMENTO' | 'EDICAO_DOCUMENTO' | 'EXCLUSAO_DOCUMENTO' | 'STATUS_DOCUMENTO',
  descricao: string,
  detalhes?: string | null,
  usuario?: string
) {
  try {
    await db.historicoLancamento.create({
      data: {
        lancamentoId,
        acao,
        descricao,
        detalhes: detalhes || null,
        usuario: usuario || 'Usuário',
      },
    });
  } catch (error) {
    console.error('Erro ao registrar histórico de alteração:', error);
  }
}

export async function getHistoricoLancamento(lancamentoId: string) {
  try {
    return await db.historicoLancamento.findMany({
      where: { lancamentoId },
      orderBy: { createdAt: 'desc' },
    });
  } catch (error) {
    console.error('Erro ao buscar histórico:', error);
    return [];
  }
}
