'use server';

// A exclusão automática foi deliberadamente desativada. Documentos do acervo
// só podem ser removidos após uma política de retenção e recuperação aprovada.
export async function getDocumentosExpirados() {
  return [];
}

export async function deletarDocumentosExpirados(documentIds: string[]) {
  return { sucesso: 0, falha: documentIds.length, disabled: true };
}
