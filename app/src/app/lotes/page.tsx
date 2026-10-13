import { getLotes } from '@/actions/lotes';
import { Package, Plus, Calendar, DollarSign, FileText, ArrowRight, Download, Link as LinkIcon, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

function formatDate(date: Date | string | null | undefined) {
  if (!date) return '—';
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('pt-BR');
}

function formatCurrency(val: number | null | undefined) {
  if (val === null || val === undefined) return '—';
  return `R$ ${val.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export default async function LotesPage() {
  const lotes = await getLotes();

  return (
    <div className="mx-auto max-w-6xl space-y-6 pb-16">
      {/* Topo */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Link
            href="/lancamentos"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-indigo-700 transition-colors mb-2"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Voltar para Lançamentos
          </Link>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
            <Package className="h-7 w-7 text-indigo-600" />
            Lotes de Notas para o Financeiro
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Agrupamentos criados para compartilhamento rápido, download de pacotes ZIP e planilhas de conferência.
          </p>
        </div>

        <Link
          href="/lancamentos"
          className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs sm:text-sm font-bold text-white shadow-xs hover:bg-indigo-700 transition-all active:scale-[0.98]"
        >
          <Plus className="h-4 w-4" />
          Criar Novo Lote (via Seleção)
        </Link>
      </div>

      {/* Lista de Lotes */}
      {lotes.length === 0 ? (
        <div className="rounded-3xl border-2 border-dashed border-slate-200 bg-white p-12 text-center space-y-3">
          <div className="h-12 w-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto">
            <Package className="h-6 w-6" />
          </div>
          <h2 className="text-lg font-black text-slate-800">Nenhum lote criado ainda</h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
            Vá até a listagem de lançamentos, selecione as notas fiscais emitidas usando as caixinhas de seleção (checkbox) e clique em &quot;Criar Lote para o Financeiro&quot;.
          </p>
          <Link
            href="/lancamentos"
            className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-indigo-700 transition-all"
          >
            Ir para Lançamentos
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {lotes.map((lote) => (
            <div
              key={lote.id}
              className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-xs transition-all hover:border-indigo-300 hover:shadow-md"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-[11px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-md">
                    {lote.codigo || 'LOTE'}
                  </span>
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <Calendar className="h-3 w-3" /> {formatDate(lote.createdAt)}
                  </span>
                </div>

                <div>
                  <Link
                    href={`/lote/${lote.id}`}
                    className="text-base font-black text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-1"
                  >
                    {lote.titulo}
                  </Link>
                  {lote.observacao && (
                    <p className="text-xs text-slate-500 line-clamp-2 mt-1">
                      {lote.observacao}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-2 rounded-xl bg-slate-50 p-3 border border-slate-100">
                  <div>
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Notas
                    </span>
                    <p className="text-sm font-black text-slate-800">
                      {lote.totalItens} {lote.totalItens === 1 ? 'nota' : 'notas'}
                    </p>
                  </div>
                  <div>
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Total Somado
                    </span>
                    <p className="text-sm font-black text-emerald-700">
                      {formatCurrency(lote.valorTotal)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between pt-3 border-t border-slate-100">
                <a
                  href={`/api/lotes/${lote.id}/download-zip`}
                  className="inline-flex items-center gap-1 text-xs font-bold text-slate-600 hover:text-emerald-700 transition-colors"
                  title="Baixar ZIP do lote"
                >
                  <Download className="h-3.5 w-3.5" /> Baixar ZIP
                </a>

                <Link
                  href={`/lote/${lote.id}`}
                  className="inline-flex items-center gap-1 rounded-lg bg-indigo-50 px-2.5 py-1.5 text-xs font-bold text-indigo-700 hover:bg-indigo-100 transition-colors"
                >
                  Ver Lote <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
