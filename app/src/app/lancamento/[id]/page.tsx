import { getLancamentoById } from '@/actions/lancamentos';
import { getTiposDocumento } from '@/actions/documentos';
import { CopyPageLinkButton } from '@/components/CopyPageLinkButton';
import { DocumentoCard } from '@/components/DocumentoCard';
import { HistoricoTimeline } from '@/components/HistoricoTimeline';
import { getVeiculoColor } from '@/app/lancamentos/LancamentosTable';
import { ArrowLeft, Building2, Calendar, Clock, FileText, Pencil, Radio, UploadCloud, Layers, Eye } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { db } from '@/lib/db';

function formatDate(value: Date | null) { return value ? value.toLocaleDateString('pt-BR') : '—'; }

export default async function LancamentoDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [lancamento, tiposDocumento] = await Promise.all([
    getLancamentoById(id),
    getTiposDocumento(),
  ]);
  if (!lancamento) notFound();
  
  const parcelas = lancamento.numeroPi ? await db.lancamento.findMany({
    where: { numeroPi: lancamento.numeroPi },
    orderBy: { vencimento: 'asc' },
    select: { id: true, valor: true, vencimento: true, numeroNotaFiscal: true, mesAnoReferencia: true }
  }) : [];

  const isClient = lancamento.tipoLancamento === 'RECEITA';
  const owner = isClient ? lancamento.cliente?.nomeFantasia || lancamento.cliente?.razaoSocial : lancamento.colaborador?.nome;

  return <div className="mx-auto max-w-6xl space-y-8">
    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center"><Link href={`/lancamentos?tipo=${isClient ? 'RECEITA' : 'DESPESA'}`} className="inline-flex items-center gap-1 text-sm font-bold text-slate-500 hover:text-indigo-700 active:scale-[0.98] transition-transform"><ArrowLeft className="h-4 w-4" /> Voltar aos lançamentos</Link><div className="grid grid-cols-1 gap-2 sm:flex"><CopyPageLinkButton /><Link href={`/lancamento/${id}/editar`} className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 shadow-sm hover:bg-slate-50 active:scale-[0.98] transition-transform"><Pencil className="h-4 w-4" /> Editar dados</Link><Link href={`/novo-documento?lancamento=${id}`} className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-indigo-700 active:scale-[0.98] transition-transform"><UploadCloud className="h-4 w-4" /> Adicionar documento</Link></div></div>

    <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"><div className="border-b border-slate-200 bg-slate-950 px-6 py-8 text-white sm:px-10 relative"><div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" /><div className="flex flex-wrap items-center gap-2 relative z-10"><span className="rounded-lg bg-white/10 ring-1 ring-white/10 px-2.5 py-1 font-mono text-[11px] font-bold tracking-wide">{lancamento.appSheetId || lancamento.id.slice(0, 8)}</span><span className="rounded-lg bg-indigo-500/20 ring-1 ring-indigo-500/30 px-2.5 py-1 text-[11px] font-bold tracking-wide text-indigo-200">{isClient ? 'Cliente' : 'Colaborador / fornecedor'}</span></div><Link href={isClient && lancamento.clienteId ? `/clientes/${lancamento.clienteId}` : !isClient && lancamento.colaboradorId ? `/colaboradores/${lancamento.colaboradorId}` : '#'} className="inline-block mt-5 text-3xl font-black tracking-tight sm:text-4xl hover:text-indigo-300 transition-colors relative z-10">{owner || 'Sem identificação'}</Link>{lancamento.descricao && <p className="mt-3 max-w-3xl text-slate-400 font-medium leading-relaxed relative z-10">{lancamento.descricao}</p>}</div><dl className="grid grid-cols-2 gap-4 p-6 sm:grid-cols-3 sm:p-8 lg:grid-cols-6">{[
      ['Nota fiscal', lancamento.numeroNotaFiscal || '—', FileText],
      ['Emissão', formatDate(lancamento.dataEmissao), Calendar],
      ['Vencimento', formatDate(lancamento.vencimento), Calendar],
      ['Veículo', lancamento.veiculo?.nome ? <span className={`inline-block rounded-md px-2 py-0.5 text-xs font-bold ${getVeiculoColor(lancamento.veiculo.nome)}`}>{lancamento.veiculo.nome}</span> : '—', Radio],
      ['Agência', lancamento.agencia ? <Link href={`/agencias/${lancamento.agencia.id}`} className="hover:text-indigo-600 underline decoration-indigo-200 underline-offset-2">{lancamento.agencia.nome}</Link> : '—', Building2],
      ['Valor', lancamento.valor !== null ? <span className="text-emerald-700">R$ {lancamento.valor.toLocaleString('pt-BR',{minimumFractionDigits:2})}</span> : '—', FileText],
    ].map(([label,value,Icon]) => { const MetaIcon = Icon as typeof FileText; return <div key={String(label)} className="bg-slate-50/50 rounded-2xl p-4 border border-slate-100"><dt className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2"><MetaIcon className="h-4 w-4 text-slate-400" />{String(label)}</dt><dd className="break-words text-sm font-bold text-slate-900">{value as React.ReactNode}</dd></div>; })}</dl>{(lancamento.numeroPi || lancamento.numeroContrato || lancamento.mesAnoReferencia) && <div className="flex flex-wrap gap-x-8 gap-y-3 border-t border-slate-100 bg-slate-50/30 px-6 py-5 text-sm sm:px-8">{lancamento.numeroPi && <span><b className="text-slate-500 mr-1.5 font-semibold">PI:</b><span className="font-bold text-slate-800">{lancamento.numeroPi}</span></span>}{lancamento.numeroContrato && <span><b className="text-slate-500 mr-1.5 font-semibold">Contrato:</b><span className="font-bold text-slate-800">{lancamento.numeroContrato}</span></span>}{lancamento.mesAnoReferencia && <span><b className="text-slate-500 mr-1.5 font-semibold">Referência:</b><span className="font-bold text-slate-800">{lancamento.mesAnoReferencia}</span></span>}</div>}</section>
    {parcelas.length > 1 && (
      <section className="overflow-hidden rounded-3xl border border-indigo-200 bg-white shadow-sm">
        <div className="border-b border-indigo-100 bg-indigo-50/50 px-6 py-4 sm:px-8 flex items-center justify-between flex-wrap gap-4">
          <div>
            <h2 className="text-lg font-bold text-indigo-900 flex items-center gap-2">
              <Layers className="h-5 w-5" /> Lançamentos Vinculados (Mesmo PI)
            </h2>
            <p className="text-sm text-indigo-700 mt-1">Este PI possui {parcelas.length} parcelas registradas.</p>
          </div>
          <div className="text-right">
            <span className="text-sm font-semibold text-slate-500 uppercase tracking-wide">Valor Total Agrupado</span>
            <p className="text-lg font-black text-indigo-900">
              R$ {parcelas.reduce((acc, p) => acc + (p.valor || 0), 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </p>
          </div>
        </div>
        <div className="divide-y divide-slate-100">
          {parcelas.map((p, i) => (
            <Link key={p.id} href={`/lancamento/${p.id}`} className={`flex items-center justify-between p-4 px-6 sm:px-8 hover:bg-slate-50 active:scale-[0.995] transition-all ${p.id === lancamento.id ? 'bg-indigo-50/30' : ''}`}>
              <div className="flex items-center gap-4">
                <span className={`flex h-8 w-8 items-center justify-center rounded-full font-bold text-sm ${p.id === lancamento.id ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                  {i + 1}
                </span>
                <div>
                  <p className={`font-bold ${p.id === lancamento.id ? 'text-indigo-900' : 'text-slate-800'}`}>
                    Vencimento: {formatDate(p.vencimento)}
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {p.numeroNotaFiscal ? `NF: ${p.numeroNotaFiscal}` : 'NF Pendente'} • Ref: {p.mesAnoReferencia || '—'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-bold text-slate-900">
                  {p.valor !== null ? `R$ ${p.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : '—'}
                </span>
                <Eye className="h-4 w-4 text-slate-400" />
              </div>
            </Link>
          ))}
        </div>
      </section>
    )}

    <section className="grid gap-6 lg:grid-cols-5 min-w-0 items-start">
      <div className="lg:col-span-3 space-y-4 min-w-0">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end min-w-0">
          <div>
            <h2 className="text-xl font-black text-slate-900">Documentos relacionados</h2>
            <p className="mt-1 text-sm text-slate-500">{lancamento.documentos.length} arquivo(s) vinculados a este lançamento.</p>
          </div>
          <Link href={`/novo-documento?lancamento=${id}`} className="inline-flex items-center gap-1.5 text-sm font-bold text-indigo-600 hover:text-indigo-800 shrink-0">
            <UploadCloud className="h-4 w-4" /> Adicionar documento
          </Link>
        </div>
        <div className="grid gap-3 min-w-0">
          {lancamento.documentos.map((doc) => <DocumentoCard key={doc.id} doc={doc} tiposDocumento={tiposDocumento} />)}
          {lancamento.documentos.length === 0 && (
            <div className="rounded-3xl border-2 border-dashed border-slate-200 bg-slate-50 p-12 text-center flex flex-col items-center justify-center space-y-3">
              <div className="h-12 w-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mb-1">
                <FileText className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-700">Nenhum documento anexado</h3>
              <p className="text-sm text-slate-500 max-w-sm">Este lançamento ainda não possui notas fiscais, boletos ou comprovantes vinculados.</p>
              <Link href={`/novo-documento?lancamento=${id}`} className="mt-4 inline-flex rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-indigo-700 active:scale-[0.98] transition-transform">
                Adicionar documento
              </Link>
            </div>
          )}
        </div>
      </div>

      <div className="lg:col-span-2 space-y-4 min-w-0">
        <div>
          <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <Clock className="h-5 w-5 text-indigo-600" /> Histórico de alterações
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Registro de edições, inclusões e mudanças.
          </p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-slate-50/50 p-3 sm:p-4 shadow-sm min-w-0">
          <HistoricoTimeline items={lancamento.historico || []} />
        </div>
      </div>
    </section>
  </div>;
}
