'use server';

import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';

function gerarCodigoLote(): string {
  const agora = new Date();
  const dataStr = agora.toISOString().slice(0, 10).replace(/-/g, '');
  const rand = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `LOTE-${dataStr}-${rand}`;
}

export async function criarLote(data: {
  titulo?: string;
  observacao?: string;
  lancamentoIds: string[];
}) {
  try {
    const ids = Array.from(new Set(data.lancamentoIds.filter(Boolean)));
    if (ids.length === 0) {
      return { success: false, error: 'Selecione ao menos um lançamento para criar o lote.' };
    }

    const agora = new Date();
    const dataFormatada = agora.toLocaleDateString('pt-BR');
    const titulo = data.titulo?.trim() || `Lote de Notas - ${dataFormatada}`;
    const codigo = gerarCodigoLote();

    const lote = await db.lote.create({
      data: {
        codigo,
        titulo,
        observacao: data.observacao?.trim() || null,
        itens: {
          create: ids.map((id, index) => ({
            lancamentoId: id,
            ordem: index,
          })),
        },
      },
      include: {
        itens: true,
      },
    });

    revalidatePath('/lancamentos');
    revalidatePath('/lotes');

    return {
      success: true,
      loteId: lote.id,
      codigo: lote.codigo,
      totalNotas: ids.length,
    };
  } catch (err: any) {
    console.error('Erro ao criar lote:', err);
    return { success: false, error: err?.message || 'Falha ao criar o lote.' };
  }
}

export async function adicionarAoLote(loteId: string, lancamentoIds: string[]) {
  try {
    const ids = Array.from(new Set(lancamentoIds.filter(Boolean)));
    if (!loteId || ids.length === 0) {
      return { success: false, error: 'Dados inválidos para vincular ao lote.' };
    }

    const lote = await db.lote.findUnique({
      where: { id: loteId },
      include: { itens: true },
    });

    if (!lote) {
      return { success: false, error: 'Lote não encontrado.' };
    }

    const existentes = new Set(lote.itens.map((it) => it.lancamentoId));
    const novos = ids.filter((id) => !existentes.has(id));

    if (novos.length > 0) {
      await db.loteItem.createMany({
        data: novos.map((id, index) => ({
          loteId,
          lancamentoId: id,
          ordem: lote.itens.length + index,
        })),
      });
    }

    revalidatePath(`/lote/${loteId}`);
    revalidatePath('/lancamentos');
    revalidatePath('/lotes');

    return { success: true, adicionados: novos.length };
  } catch (err: any) {
    console.error('Erro ao adicionar ao lote:', err);
    return { success: false, error: err?.message || 'Falha ao vincular ao lote.' };
  }
}

export async function getLotesRecentes() {
  try {
    return await db.lote.findMany({
      orderBy: { createdAt: 'desc' },
      take: 10,
      select: {
        id: true,
        codigo: true,
        titulo: true,
        createdAt: true,
        _count: { select: { itens: true } },
      },
    });
  } catch (err) {
    console.error('Erro ao buscar lotes recentes:', err);
    return [];
  }
}

export async function getLotes() {
  try {
    const lotes = await db.lote.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        itens: {
          include: {
            lancamento: {
              select: {
                id: true,
                valor: true,
                numeroNotaFiscal: true,
                cliente: { select: { nomeFantasia: true, razaoSocial: true } },
              },
            },
          },
        },
      },
    });

    return lotes.map((lote) => {
      const valorTotal = lote.itens.reduce((acc, item) => acc + (item.lancamento?.valor || 0), 0);
      const clientesUnicos = new Set(
        lote.itens
          .map((item) => item.lancamento?.cliente?.nomeFantasia || item.lancamento?.cliente?.razaoSocial)
          .filter(Boolean)
      );

      return {
        id: lote.id,
        codigo: lote.codigo,
        titulo: lote.titulo,
        observacao: lote.observacao,
        createdAt: lote.createdAt,
        updatedAt: lote.updatedAt,
        totalItens: lote.itens.length,
        valorTotal,
        totalClientes: clientesUnicos.size,
      };
    });
  } catch (err) {
    console.error('Erro ao buscar lotes:', err);
    return [];
  }
}

export async function getLoteById(id: string) {
  try {
    const lote = await db.lote.findUnique({
      where: { id },
      include: {
        itens: {
          orderBy: { ordem: 'asc' },
          include: {
            lancamento: {
              include: {
                cliente: true,
                colaborador: true,
                agencia: true,
                veiculo: true,
                documentos: {
                  include: {
                    tipoDocumento: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!lote) return null;

    const valorTotal = lote.itens.reduce((acc, item) => acc + (item.lancamento?.valor || 0), 0);
    const clientesSet = new Set<string>();

    lote.itens.forEach((it) => {
      const nome = it.lancamento?.cliente?.nomeFantasia || it.lancamento?.cliente?.razaoSocial || it.lancamento?.colaborador?.nome;
      if (nome) clientesSet.add(nome);
    });

    return {
      ...lote,
      valorTotal,
      totalClientes: clientesSet.size,
    };
  } catch (err) {
    console.error(`Erro ao buscar lote ${id}:`, err);
    return null;
  }
}

export async function removerItemLote(loteId: string, lancamentoId: string) {
  try {
    await db.loteItem.deleteMany({
      where: {
        loteId,
        lancamentoId,
      },
    });

    revalidatePath(`/lote/${loteId}`);
    revalidatePath('/lotes');
    revalidatePath('/lancamentos');
    return { success: true };
  } catch (err: any) {
    console.error('Erro ao remover item do lote:', err);
    return { success: false, error: err?.message || 'Falha ao remover item.' };
  }
}

export async function excluirLote(loteId: string) {
  try {
    await db.lote.delete({
      where: { id: loteId },
    });

    revalidatePath('/lotes');
    revalidatePath('/lancamentos');
    return { success: true };
  } catch (err: any) {
    console.error('Erro ao excluir lote:', err);
    return { success: false, error: err?.message || 'Falha ao excluir lote.' };
  }
}
