'use server';

import { db } from '@/lib/db';import { Prisma } from '@/generated/prisma';

export async function getColaboradores(query?: string, tipo?: string) {
  const where: Prisma.ColaboradorWhereInput = {};
  
  if (tipo && tipo !== 'TODOS') {
    where.tipificacao = tipo;
  }

  if (query) {
    where.AND = {
      OR: [
        { nome: { contains: query } },
        { cpfCnpj: { contains: query } },
        { cargo: { contains: query } },
      ]
    };
  }

  return db.colaborador.findMany({
    where,
    orderBy: { nome: 'asc' },
    include: {
      _count: {
        select: { lancamentos: true }
      }
    }
  });
}

export async function getColaboradorById(id: string) {
  return db.colaborador.findUnique({
    where: { id },
    include: {
      lancamentos: {
        orderBy: { dataEmissao: 'desc' },
        include: {
          documentos: { include: { tipoDocumento: true } },
        }
      }
    }
  });
}

import { revalidatePath } from 'next/cache';

export async function deleteColaborador(id: string) {
  try {
    const lancamentos = await db.lancamento.count({ where: { colaboradorId: id } });
    if (lancamentos > 0) {
      return { success: false, error: 'Este colaborador/fornecedor possui lançamentos associados. Remova os lançamentos primeiro.' };
    }
    await db.colaborador.delete({ where: { id } });
    revalidatePath('/colaboradores');
    return { success: true };
  } catch (error) {
    console.error('Erro ao excluir colaborador:', error);
    return { success: false, error: 'Não foi possível excluir o colaborador.' };
  }
}
