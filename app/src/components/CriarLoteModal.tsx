'use client';

import { useState } from 'react';
import { criarLote } from '@/actions/lotes';
import {
  Package,
  X,
  Check,
  Link as LinkIcon,
  Download,
  ExternalLink,
  Loader2,
  DollarSign,
  FileText,
} from 'lucide-react';
import Link from 'next/link';

interface CriarLoteModalProps {
  selectedIds: string[];
  totalValor: number;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function CriarLoteModal({
  selectedIds,
  totalValor,
  isOpen,
  onClose,
  onSuccess,
}: CriarLoteModalProps) {
  const [titulo, setTitulo] = useState(() => {
    const hoje = new Date().toLocaleDateString('pt-BR');
    return `Lote de Notas - ${hoje}`;
  });
  const [observacao, setObservacao] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [createdLote, setCreatedLote] = useState<{ id: string; codigo: string | null } | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  if (!isOpen) return null;

  const handleCriar = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const res = await criarLote({
      titulo: titulo.trim(),
      observacao: observacao.trim() || undefined,
      lancamentoIds: selectedIds,
    });

    setLoading(false);

    if (res.success && res.loteId) {
      setCreatedLote({ id: res.loteId, codigo: res.codigo || null });
      onSuccess();
    } else {
      setError(res.error || 'Não foi possível gerar o lote.');
    }
  };

  const getLoteUrl = () => {
    if (typeof window === 'undefined' || !createdLote) return '';
    return `${window.location.origin}/lote/${createdLote.id}`;
  };

  const handleCopyLink = async () => {
    const url = getLoteUrl();
    try {
      await navigator.clipboard.writeText(url);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    } catch {}
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl border border-slate-200">
        {/* Cabeçalho do Modal */}
        <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/80 px-6 py-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-100 text-indigo-700">
              <Package className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900">
                {createdLote ? 'Lote Criado com Sucesso!' : 'Criar Lote para o Financeiro'}
              </h3>
              <p className="text-xs text-slate-500">
                {createdLote
                  ? 'Pronto para compartilhamento e download'
                  : `${selectedIds.length} ${selectedIds.length === 1 ? 'nota selecionada' : 'notas selecionadas'}`}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-xl text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Conteúdo */}
        <div className="p-6">
          {createdLote ? (
            /* TELA DE SUCESSO APÓS CRIAÇÃO */
            <div className="space-y-5 text-center py-2">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600">
                <Check className="h-7 w-7 stroke-[3]" />
              </div>

              <div className="space-y-1">
                <h4 className="text-lg font-black text-slate-900">Lote Pronto!</h4>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  As notas foram agrupadas com sucesso. Você pode copiar o link para enviar no WhatsApp ou baixar o arquivo ZIP agora mesmo.
                </p>
              </div>

              {/* Caixa com o Link do Lote */}
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 space-y-3 text-left">
                <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Link de Envio para a Moça do Financeiro:
                </span>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    readOnly
                    value={getLoteUrl()}
                    className="flex-1 rounded-xl border border-slate-300 bg-white px-3 py-2 font-mono text-xs text-slate-700"
                  />
                  <button
                    onClick={handleCopyLink}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-3.5 py-2 text-xs font-bold text-white hover:bg-indigo-700 active:scale-95 transition-all"
                  >
                    {copiedLink ? (
                      <>
                        <Check className="h-3.5 w-3.5" /> Copiado!
                      </>
                    ) : (
                      <>
                        <LinkIcon className="h-3.5 w-3.5" /> Copiar Link
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Botões de Ação */}
              <div className="flex flex-col sm:flex-row gap-2 pt-2">
                <a
                  href={`/api/lotes/${createdLote.id}/download-zip`}
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-emerald-700 transition-all"
                >
                  <Download className="h-4 w-4" /> Baixar ZIP do Lote
                </a>

                <Link
                  href={`/lote/${createdLote.id}`}
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-all"
                >
                  <ExternalLink className="h-4 w-4" /> Abrir Página do Lote
                </Link>
              </div>
            </div>
          ) : (
            /* FORMULÁRIO DE CRIAÇÃO */
            <form onSubmit={handleCriar} className="space-y-4">
              {error && (
                <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-700 font-medium">
                  {error}
                </div>
              )}

              {/* Resumo Selecionado */}
              <div className="grid grid-cols-2 gap-3 rounded-2xl bg-slate-50 p-3.5 border border-slate-100">
                <div>
                  <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Notas Selecionadas
                  </span>
                  <p className="text-base font-black text-slate-800">
                    {selectedIds.length} {selectedIds.length === 1 ? 'nota' : 'notas'}
                  </p>
                </div>
                <div>
                  <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Valor Total
                  </span>
                  <p className="text-base font-black text-emerald-700">
                    R$ {totalValor.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </p>
                </div>
              </div>

              {/* Título do Lote */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Título / Identificação do Lote <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                  placeholder="Ex: Lote de Notas - 13/10/2026"
                  className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>

              {/* Observação */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Observações para o Financeiro (opcional)
                </label>
                <textarea
                  rows={2}
                  value={observacao}
                  onChange={(e) => setObservacao(e.target.value)}
                  placeholder="Ex: Notas emitidas pela manhã referente às veiculações de outubro."
                  className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-sm text-slate-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>

              {/* Botões do Rodapé */}
              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors"
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-indigo-700 active:scale-[0.98] transition-all disabled:opacity-70"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Criando Lote...
                    </>
                  ) : (
                    <>
                      <Package className="h-4 w-4" />
                      Confirmar e Gerar Lote
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
