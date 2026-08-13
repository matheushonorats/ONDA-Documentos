'use server';

import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function getClientes(query?: string) {
  return db.cliente.findMany({
    where: query ? {
      OR: [
        { razaoSocial: { contains: query } },
        { nomeFantasia: { contains: query } },
        { cnpj: { contains: query } },
      ]
    } : undefined,
    orderBy: { razaoSocial: 'asc' },
    include: {
      _count: {
        select: { lancamentos: true }
      }
    }
  });
}

export async function getClienteById(id: string) {
  return db.cliente.findUnique({
    where: { id },
    include: {
      lancamentos: {
        orderBy: { dataEmissao: 'desc' },
        include: {
          agencia: true,
          veiculo: true,
          documentos: true,
          marcacoes: true,
        }
      }
    }
  });
}

export async function createCliente(formData: FormData) {
  const razaoSocial = formData.get('razaoSocial') as string;
  const nomeFantasia = formData.get('nomeFantasia') as string | null;
  const cnpj = formData.get('cnpj') as string | null;
  const cidade = formData.get('cidade') as string | null;

  if (!razaoSocial) return;

  await db.cliente.create({ 
    data: {
      razaoSocial,
      nomeFantasia: nomeFantasia || null,
      cnpj: cnpj || null,
      cidade: cidade || null,
      tipificacao: 'Cliente'
    }
  });
  revalidatePath('/clientes');
  redirect('/clientes');
}

export async function deleteCliente(id: string) {
  try {
    const lancamentos = await db.lancamento.count({ where: { clienteId: id } });
    if (lancamentos > 0) {
      return { success: false, error: 'Este cliente possui lançamentos associados. Remova os lançamentos primeiro.' };
    }
    await db.cliente.delete({ where: { id } });
    revalidatePath('/clientes');
    return { success: true };
  } catch (error) {
    console.error('Erro ao excluir cliente:', error);
    return { success: false, error: 'Não foi possível excluir o cliente.' };
  }
}
