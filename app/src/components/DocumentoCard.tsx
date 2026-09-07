'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  FileText,
  Download,
  Pencil,
  Trash2,
  Save,
  X,
  Loader2,
  ExternalLink,
  Radio,
  CreditCard,
  Link as LinkIcon,
  FileCheck,
} from 'lucide-react';
import { CopyButton } from '@/components/CopyButton';
import { deleteDocumento, updateDocumento } from '@/actions/documentos';
import { fixMojibake } from '@/lib/utils';


interface TipoDocumento {
  id: string;
  nome: string;
}

interface DocumentoWithTipo {
  id: string;
  nomeOriginal: string;
  caminhoOriginal: string | null;
  urlPublica: string | null;
  planilhaOrigem: string | null;
  colunaOrigem: string | null;
  dataInclusao: Date | string;
  observacao?: string | null;
  status?: string | null;
  tipoDocumentoId: string;
  tipoDocumento: {
    id: string;
    nome: string;
  };
}

interface DocumentoCardProps {
  doc: DocumentoWithTipo;
  tiposDocumento: TipoDocumento[];
}

export function DocumentoCard({ doc, tiposDocumento }: DocumentoCardProps) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  // Form state
  const [nomeOriginal, setNomeOriginal] = useState(doc.nomeOriginal);
  const [tipoDocumentoId, setTipoDocumentoId] = useState(doc.tipoDocumentoId);
  const [observacao, setObservacao] = useState(doc.observacao || '');
  const [status, setStatus] = useState(doc.status || 'ATIVO');

  const isCancelled = status === 'CANCELADO' || doc.status === 'CANCELADO';

  const handleDelete = async () => {
    if (!confirm(`Tem certeza que deseja excluir o documento "${doc.nomeOriginal}"?`)) {
      return;
    }

    setLoading(true);
    const res = await deleteDocumento(doc.id);
    setLoading(false);

    if (res.success) {
      router.refresh();
    } else {
      alert(res.error || 'Erro ao excluir documento.');
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await updateDocumento(doc.id, {
      nomeOriginal,
      tipoDocumentoId,
      observacao: observacao.trim() || null,
      status,
    });

    setLoading(false);

    if (res.success) {
      setIsEditing(false);
      router.refresh();
    } else {
      alert(res.error || 'Erro ao atualizar documento.');
    }
  };

  const dateStr = typeof doc.dataInclusao === 'string'
    ? new Date(doc.dataInclusao).toLocaleDateString('pt-BR')
    : doc.dataInclusao.toLocaleDateString('pt-BR');

  if (isEditing) {
    return (
      <form onSubmit={handleSave} className="rounded-2xl border border-indigo-200 bg-indigo-50/40 p-4 sm:p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-indigo-100 pb-3">
          <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
            <Pencil className="h-4 w-4 text-indigo-600" /> Editar Documento
          </h4>
          <button
            type="button"
            onClick={() => setIsEditing(false)}
            disabled={loading}
            className="text-slate-400 hover:text-slate-600 p-1"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="sm:col-span-1">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
              Situação do Documento
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-slate-900 font-bold"
            >
              <option value="ATIVO">🟢 Ativo / Válido</option>
              <option value="CANCELADO">🔴 Cancelado / Suspenso</option>
            </select>
          </div>

          <div className="sm:col-span-1">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
              Tipo de Documento
            </label>
            <select
              value={tipoDocumentoId}
              onChange={(e) => setTipoDocumentoId(e.target.value)}
              required
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-slate-900 font-medium"
            >
              {tiposDocumento.map((tipo) => (
                <option key={tipo.id} value={tipo.id}>
                  {tipo.nome}
                </option>
              ))}
            </select>
          </div>

          <div className="sm:col-span-1">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
              Nome do Documento / Arquivo
            </label>
            <input
              type="text"
              value={nomeOriginal}
              onChange={(e) => setNomeOriginal(e.target.value)}
              required
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-slate-900 font-medium"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
            Observações (Opcional)
          </label>
          <input
            type="text"
            value={observacao}
            onChange={(e) => setObservacao(e.target.value)}
            placeholder="Ex: Nota cancelada em razão de emissão da NF substituta..."
            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-slate-900"
          />
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={() => setIsEditing(false)}
            disabled={loading}
            className="px-3 py-1.5 border border-slate-300 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-100 transition-all active:scale-[0.95]"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-indigo-600 rounded-lg text-xs font-bold text-white hover:bg-indigo-700 disabled:opacity-50 transition-all active:scale-[0.95]"
          >
            {loading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Save className="h-3.5 w-3.5" />}
            Salvar
          </button>
        </div>
      </form>
    );
  }

  const isLink = Boolean(doc.urlPublica && !doc.caminhoOriginal);
  const tipoLower = doc.tipoDocumento.nome.toLowerCase();

  const getDocVisual = () => {
    if (isCancelled) {
      return { Icon: FileText, tone: 'bg-red-100 text-red-600' };
    }
    if (isLink) {
      return { Icon: LinkIcon, tone: 'bg-blue-100 text-blue-700' };
    }
    if (tipoLower.includes('nota') || tipoLower.includes('nf')) {
      return { Icon: FileText, tone: 'bg-emerald-100 text-emerald-700' };
    }
    if (tipoLower.includes('pi') || tipoLower.includes('contrato') || tipoLower.includes('autoriza')) {
      return { Icon: FileCheck, tone: 'bg-indigo-100 text-indigo-700' };
    }
    if (tipoLower.includes('boleto') || tipoLower.includes('cobranca') || tipoLower.includes('cobrança')) {
      return { Icon: CreditCard, tone: 'bg-amber-100 text-amber-700' };
    }
    if (tipoLower.includes('audio') || tipoLower.includes('áudio') || tipoLower.includes('censura')) {
      return { Icon: Radio, tone: 'bg-purple-100 text-purple-700' };
    }
    return { Icon: FileText, tone: 'bg-slate-100 text-slate-700' };
  };

  const { Icon: DocIcon, tone: docTone } = getDocVisual();

  return (
    <article className={`rounded-2xl border p-4 shadow-xs sm:p-5 transition-colors min-w-0 overflow-hidden ${
      isCancelled ? 'border-red-200 bg-red-50/30 opacity-90' : 'border-slate-200 bg-white'
    }`}>
      <div className="flex flex-col justify-between gap-4 xl:flex-row xl:items-center min-w-0">
        <div className="flex min-w-0 gap-3">
          <span className={`h-fit rounded-xl p-2.5 shrink-0 ${docTone}`}>
            <DocIcon className="h-5 w-5" />
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-bold text-slate-900">{doc.tipoDocumento.nome}</h3>
              {isCancelled && (
                <span className="rounded-full bg-red-100 border border-red-300 px-2.5 py-0.5 text-xs font-black text-red-700">
                  🚫 CANCELADO / SUSPENSO
                </span>
              )}
              {doc.planilhaOrigem && (
                <span className="rounded-full bg-amber-50 px-2.5 py-1 text-xs font-bold text-amber-700">
                  Importado e preservado
                </span>
              )}
              {isLink && (
                <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-bold text-blue-700 border border-blue-200">
                  🔗 Link Externo
                </span>
              )}
            </div>
            <p className={`mt-1 text-sm font-semibold truncate ${
              isCancelled ? 'text-slate-500 line-through' : 'text-slate-700'
            }`} title={fixMojibake(doc.nomeOriginal)}>
              {fixMojibake(doc.nomeOriginal)}
            </p>
            {doc.observacao && (
              <p className="mt-1 text-xs text-slate-600 italic font-medium break-words">
                Obs: {fixMojibake(doc.observacao)}
              </p>
            )}
            <p className="mt-1 text-xs text-slate-400">
              Incluído em {dateStr}
              {doc.colunaOrigem ? ` · origem: ${doc.colunaOrigem}` : ''}
            </p>
          </div>
        </div>


        <div className="flex shrink-0 flex-wrap items-center gap-2 pt-2 xl:pt-0 border-t xl:border-t-0 border-slate-100">
          {doc.urlPublica ? (
            <a
              href={doc.urlPublica}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-indigo-600 px-3 py-2 text-xs font-bold text-white hover:bg-indigo-700 transition-all active:scale-[0.95] shadow-sm"
            >
              {doc.caminhoOriginal ? <Download className="h-4 w-4" /> : <ExternalLink className="h-4 w-4" />}
              {doc.caminhoOriginal ? 'Abrir no Drive' : 'Abrir Link da Nota'}
            </a>
          ) : doc.caminhoOriginal ? (
            <CopyButton value={doc.caminhoOriginal} label="Copiar caminho original" />
          ) : (
            <span className="rounded-lg bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-500">
              Arquivo sem caminho
            </span>
          )}

          <button
            type="button"
            onClick={() => setIsEditing(true)}
            disabled={loading}
            title="Editar dados ou alterar situação"
            className="inline-flex items-center justify-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-all active:scale-[0.95]"
          >
            <Pencil className="h-3.5 w-3.5" /> Editar
          </button>

          <button
            type="button"
            onClick={handleDelete}
            disabled={loading}
            title="Excluir documento"
            className="inline-flex items-center justify-center gap-1 rounded-lg border border-red-200 bg-red-50 px-2.5 py-2 text-xs font-bold text-red-700 hover:bg-red-100 disabled:opacity-50 transition-all active:scale-[0.95]"
          >
            {loading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Trash2 className="h-3.5 w-3.5" />}
            Excluir
          </button>
        </div>
      </div>

      {doc.caminhoOriginal && doc.planilhaOrigem && (
        <p className="mt-3 break-all rounded-lg bg-slate-50 px-3 py-2 font-mono text-[11px] text-slate-500">
          {doc.caminhoOriginal}
        </p>
      )}
    </article>
  );
}
