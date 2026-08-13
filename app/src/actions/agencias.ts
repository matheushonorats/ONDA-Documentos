'use server';

import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function getAgencias(query?: string) {
  return db.agencia.findMany({
    where: query ? {
      OR: [
        { nome: { contains: query } },
        { cnpj: { contains: query } },
      ]
    } : undefined,
    orderBy: { nome: 'asc' },
    include: {
      _count: {
        select: { lancamentos: true }
      }
    }
  });
}

export async function getAgenciaById(id: string) {
  return db.agencia.findUnique({
    where: { id },
    include: {
      lancamentos: {
        orderBy: { dataEmissao: 'desc' },
        include: {
          cliente: true,
          veiculo: true,
          documentos: true,
          marcacoes: true,
        }
      }
    }
  });
}

export async function createAgencia(formData: FormData) {
  const nome = formData.get('nome') as string;
  const cnpj = formData.get('cnpj') as string | null;
  const contatos = formData.get('contatos') as string | null;
  
  if (!nome) return;

  await db.agencia.create({ 
    data: { 
      nome, 
      cnpj: cnpj || null, 
      contatos: contatos || null 
    } 
  });
  revalidatePath('/agencias');
  redirect('/agencias');
}

export async function deleteAgencia(id: string) {
  try {
    const lancamentos = await db.lancamento.count({ where: { agenciaId: id } });
    if (lancamentos > 0) {
      return { success: false, error: 'Esta agência possui lançamentos associados. Remova os lançamentos primeiro.' };
    }
    await db.agencia.delete({ where: { id } });
    revalidatePath('/agencias');
    return { success: true };
  } catch (error) {
    console.error('Erro ao excluir agência:', error);
    return { success: false, error: 'Não foi possível excluir a agência.' };
  }
}

