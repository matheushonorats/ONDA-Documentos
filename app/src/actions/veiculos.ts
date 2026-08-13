'use server';

import { db } from '@/lib/db';

export async function getVeiculos() {
  return db.veiculo.findMany({ orderBy: { nome: 'asc' } });
}

import { revalidatePath } from 'next/cache';

export async function deleteVeiculo(id: string) {
  try {
    const lancamentos = await db.lancamento.count({ where: { veiculoId: id } });
    if (lancamentos > 0) {
      return { success: false, error: 'Este veículo possui lançamentos associados. Remova os lançamentos primeiro.' };
    }
    await db.veiculo.delete({ where: { id } });
    revalidatePath('/veiculos');
    return { success: true };
  } catch (error) {
    console.error('Erro ao excluir veículo:', error);
    return { success: false, error: 'Não foi possível excluir o veículo.' };
  }
}
