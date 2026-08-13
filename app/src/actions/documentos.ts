'use server';

import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { deleteFromGoogleDrive } from '@/lib/gdrive';

export async function getTiposDocumento() {
  return db.tipoDocumento.findMany({
    orderBy: { nome: 'asc' },
  });
}

export async function deleteDocumento(id: string) {
  try {
    const doc = await db.documento.findUnique({ where: { id } });
    if (!doc) {
      return { success: false, error: 'Documento não encontrado.' };
    }

    if (doc.caminhoOriginal) {
      try {
        await deleteFromGoogleDrive(doc.caminhoOriginal);
      } catch (err) {
        console.warn('Erro ao deletar arquivo do Drive:', err);
      }
    }

    await db.documento.delete({ where: { id } });

    if (doc.lancamentoId) {
      await db.historicoLancamento.create({
        data: {
          lancamentoId: doc.lancamentoId,
          acao: 'EXCLUSAO_DOCUMENTO',
          descricao: `Documento "${doc.nomeOriginal}" foi excluído.`,
          usuario: 'Usuário',
        },
      });
      revalidatePath(`/lancamento/${doc.lancamentoId}`);
    }
    revalidatePath('/lancamentos');
    return { success: true };
  } catch (error) {
    console.error('Erro ao excluir documento:', error);
    return { success: false, error: 'Não foi possível excluir o documento.' };
  }
}

export async function updateDocumento(
  id: string,
  data: { tipoDocumentoId?: string; nomeOriginal?: string; observacao?: string | null; status?: string }
) {
  try {
    const currentDoc = await db.documento.findUnique({ where: { id } });
    if (!currentDoc) {
      return { success: false, error: 'Documento não encontrado.' };
    }

    const updatedDoc = await db.documento.update({
      where: { id },
      data: {
        tipoDocumentoId: data.tipoDocumentoId || undefined,
        nomeOriginal: data.nomeOriginal || undefined,
        observacao: data.observacao !== undefined ? data.observacao : undefined,
        status: data.status || undefined,
      },
    });

    if (updatedDoc.lancamentoId) {
      const changes: string[] = [];
      if (data.status && data.status !== currentDoc.status) {
        changes.push(`Situação alterada de "${currentDoc.status}" para "${data.status === 'CANCELADO' ? 'CANCELADO / SUSPENSO' : 'ATIVO'}"`);
      }
      if (data.nomeOriginal && data.nomeOriginal !== currentDoc.nomeOriginal) {
        changes.push(`Nome alterado de "${currentDoc.nomeOriginal}" para "${data.nomeOriginal}"`);
      }
      if (data.observacao !== undefined && data.observacao !== currentDoc.observacao) {
        changes.push(`Observação atualizada`);
      }

      if (changes.length > 0) {
        await db.historicoLancamento.create({
          data: {
            lancamentoId: updatedDoc.lancamentoId,
            acao: data.status && data.status !== currentDoc.status ? 'STATUS_DOCUMENTO' : 'EDICAO_DOCUMENTO',
            descricao: `Documento "${updatedDoc.nomeOriginal}": ${changes.join(' | ')}.`,
            usuario: 'Usuário',
          },
        });
      }

      revalidatePath(`/lancamento/${updatedDoc.lancamentoId}`);
    }
    return { success: true };
  } catch (error) {
    console.error('Erro ao atualizar documento:', error);
    return { success: false, error: 'Não foi possível atualizar o documento.' };
  }
}

export async function adicionarLinkDocumento(
  lancamentoId: string,
  data: {
    urlPublica: string;
    nomeOriginal?: string;
    tipoDocumentoId?: string;
    novoTipoDocumento?: string;
    observacao?: string;
  }
) {
  try {
    const lancamento = await db.lancamento.findUnique({ where: { id: lancamentoId } });
    if (!lancamento) throw new Error('Lançamento não encontrado.');

    if (!data.urlPublica || !data.urlPublica.trim()) {
      throw new Error('Informe o link/URL da Nota Fiscal.');
    }

    let typeId = data.tipoDocumentoId;
    if (!typeId || typeId === 'NOVO') {
      const typeName = data.novoTipoDocumento?.trim() || 'Nota Fiscal';
      const typeObj = await db.tipoDocumento.upsert({
        where: { nome: typeName },
        update: {},
        create: { nome: typeName },
      });
      typeId = typeObj.id;
    }

    const nome = data.nomeOriginal?.trim() || 'Link da Nota Fiscal';
    const urlFormatada = data.urlPublica.trim().startsWith('http') 
      ? data.urlPublica.trim() 
      : `https://${data.urlPublica.trim()}`;

    const doc = await db.documento.create({
      data: {
        lancamentoId,
        tipoDocumentoId: typeId,
        nomeOriginal: nome,
        urlPublica: urlFormatada,
        caminhoOriginal: null,
        tamanhoBytes: 0,
        observacao: data.observacao?.trim() || null,
        usuarioResponsavel: 'Inclusão de Link',
      },
    });

    await db.historicoLancamento.create({
      data: {
        lancamentoId,
        acao: 'INCLUSAO_DOCUMENTO',
        descricao: `Link da Nota Fiscal/Documento adicionado: "${doc.nomeOriginal}" (${urlFormatada}).`,
        usuario: 'Usuário',
      },
    });

    revalidatePath(`/lancamento/${lancamentoId}`);
    revalidatePath('/lancamentos');
    return { success: true };
  } catch (error) {
    console.error('Erro ao adicionar link de documento:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Não foi possível salvar o link.' };
  }
}

