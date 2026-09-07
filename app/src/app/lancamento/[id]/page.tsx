import { getLancamentoById } from '@/actions/lancamentos';
import { getTiposDocumento } from '@/actions/documentos';
import { CopyPageLinkButton } from '@/components/CopyPageLinkButton';
import { DocumentoCard } from '@/components/DocumentoCard';
import { HistoricoTimeline } from '@/components/HistoricoTimeline';
import { getVeiculoColor } from '@/app/lancamentos/LancamentosTable';
import {
  ArrowLeft,
  Building2,
  Calendar,
  Clock,
  FileText,
  Pencil,
  Radio,
  UploadCloud,
  Layers,
  Eye,
  Link as LinkIcon,
  AlertTriangle,
  CheckCircle2,
  PlusCircle,
  Hash,
  Wallet,
  Users,
} from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { db } from '@/lib/db';

function formatDate(value: Date | string | null | undefined) {
  if (!value) return '—';
  const d = typeof value === 'string' ? new Date(value) : value;
  return d.toLocaleDateString('pt-BR');
}

function formatCurrency(val: number | null | undefined) {
  if (val === null || val === undefined) return '—';
  return `R$ ${val.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export default async function LancamentoDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [lancamento, tiposDocumento] = await Promise.all([
    getLancamentoById(id),
    getTiposDocumento(),
  ]);

  if (!lancamento) notFound();

  // Parcelas do mesmo PI, Contrato ou Lote Comercial
  let parcelasWhere: Record<string, any> | null = null;
  if (lancamento.numeroPi) {
    parcelasWhere = { numeroPi: lancamento.numeroPi };
  } else if (lancamento.numeroContrato) {
    parcelasWhere = { numeroContrato: lancamento.numeroContrato };
  } else if (lancamento.appSheetId && lancamento.appSheetId.includes('-')) {
    const prefix = lancamento.appSheetId.split('-').slice(0, -1).join('-');
    parcelasWhere = { appSheetId: { startsWith: prefix } };
  }

  const parcelas = parcelasWhere
    ? await db.lancamento.findMany({
        where: parcelasWhere,
        orderBy: [{ vencimento: 'asc' }, { createdAt: 'asc' }],
        select: {
          id: true,
          valor: true,
          vencimento: true,
          numeroNotaFiscal: true,
          mesAnoReferencia: true,
          _count: { select: { documentos: true } },
        },
      })
    : [];

  const isClient = lancamento.tipoLancamento === 'RECEITA';
  const owner = isClient
    ? lancamento.cliente?.nomeFantasia || lancamento.cliente?.razaoSocial
    : lancamento.colaborador?.nome;
  const hasNf = Boolean(lancamento.numeroNotaFiscal);

  // Separar Documentos Mestres (PI, Contrato, Autorização) de Documentos da Parcela (NF, Boleto, Comprovante)
  const masterDocs = lancamento.documentos.filter((doc) => {
    const nomeTipo = doc.tipoDocumento.nome.toLowerCase();
    const nomeArq = doc.nomeOriginal.toLowerCase();
    return (
      nomeTipo.includes('pi') ||
      nomeTipo.includes('contrato') ||
      nomeTipo.includes('autoriza') ||
      nomeArq.includes('pi') ||
      nomeArq.includes('contrato')
    );
  });

  const parcelDocs = lancamento.documentos.filter((doc) => !masterDocs.includes(doc));

  const totalCampaignValue = parcelas.reduce((acc, p) => acc + (p.valor || 0), 0);
  const currentParcelIndex = parcelas.findIndex((p) => p.id === lancamento.id);

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      {/* Top Bar with Navigation & Actions */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <Link
          href={`/lancamentos?tipo=${isClient ? 'RECEITA' : 'DESPESA'}`}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-slate-500 hover:text-indigo-700 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar para {isClient ? 'Contas a Receber' : 'Contas a Pagar'}
        </Link>

        <div className="flex flex-wrap items-center gap-2">
          <CopyPageLinkButton />

          <Link
            href={`/lancamento/${id}/editar`}
            className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-xs font-bold text-slate-700 shadow-2xs hover:bg-slate-50 transition-all active:scale-[0.98]"
          >
            <Pencil className="h-3.5 w-3.5" />
            Editar Dados
          </Link>

          <Link
            href={`/novo-documento?lancamento=${id}`}
            className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-indigo-600 px-3.5 py-2 text-xs font-bold text-white shadow-xs hover:bg-indigo-700 transition-all active:scale-[0.98]"
          >
            <UploadCloud className="h-3.5 w-3.5" />
            Anexar Documento / Link
          </Link>
        </div>
      </div>

      {/* Main Header / Status Banner */}
      <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xs">
        {/* Banner Top */}
        <div className="relative border-b border-slate-200 bg-slate-950 px-6 py-8 text-white sm:px-10">
          <div className="relative z-10 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-xs font-bold text-slate-300 bg-white/10 ring-1 ring-white/15 px-2.5 py-0.5 rounded-md">
                {lancamento.appSheetId || lancamento.id.slice(0, 8)}
              </span>

              <span
                className={`rounded-md px-2.5 py-0.5 text-xs font-black uppercase tracking-wide ${
                  isClient ? 'bg-emerald-500/20 text-emerald-300 ring-1 ring-emerald-500/30' : 'bg-rose-500/20 text-rose-300 ring-1 ring-rose-500/30'
                }`}
              >
                {isClient ? 'Conta a Receber (Cliente)' : 'Conta a Pagar (Despesa)'}
              </span>

              {lancamento.veiculo && (
                <span className={`rounded-md px-2.5 py-0.5 text-xs font-bold ${getVeiculoColor(lancamento.veiculo.nome)}`}>
                  {lancamento.veiculo.nome}
                </span>
              )}

              {currentParcelIndex !== -1 && parcelas.length > 1 && (
                <span className="rounded-md bg-indigo-500/30 px-2.5 py-0.5 text-xs font-bold text-indigo-200 ring-1 ring-indigo-400/30">
                  Parcela {currentParcelIndex + 1} de {parcelas.length}
                </span>
              )}
            </div>

            <div>
              <Link
                href={
                  isClient && lancamento.clienteId
                    ? `/clientes/${lancamento.clienteId}`
                    : !isClient && lancamento.colaboradorId
                    ? `/colaboradores/${lancamento.colaboradorId}`
                    : '#'
                }
                className="inline-block text-2xl font-black tracking-tight sm:text-3xl lg:text-4xl text-white hover:text-indigo-300 transition-colors"
              >
                {owner || 'Sem identificação'}
              </Link>
            </div>

            {lancamento.descricao && (
              <p className="max-w-3xl text-sm font-medium leading-relaxed text-slate-300">
                {lancamento.descricao}
              </p>
            )}
          </div>
        </div>

        {/* Financial & Operational Metadata Grid */}
        <dl className="grid grid-cols-2 gap-4 p-6 sm:grid-cols-3 sm:p-8 lg:grid-cols-6">
          {/* Valor */}
          <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4">
            <dt className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
              Valor Desta Parcela
            </dt>
            <dd className="text-lg font-black text-slate-900">
              {formatCurrency(lancamento.valor)}
            </dd>
          </div>

          {/* Nota Fiscal */}
          <div className={`rounded-2xl border p-4 ${hasNf ? 'border-slate-100 bg-slate-50/70' : 'border-amber-200 bg-amber-50/50'}`}>
            <dt className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1 flex items-center gap-1">
              <FileText className="h-3.5 w-3.5 text-slate-400" /> Nota Fiscal
            </dt>
            <dd className="text-base font-black">
              {hasNf ? (
                <span className="text-slate-900">NF {lancamento.numeroNotaFiscal}</span>
              ) : isClient ? (
                <span className="text-amber-800 flex items-center gap-1 text-sm font-bold">
                  <AlertTriangle className="h-3.5 w-3.5 text-amber-600" /> Pendente
                </span>
              ) : (
                <span className="text-slate-400 text-sm">Não informada</span>
              )}
            </dd>
          </div>

          {/* Vencimento */}
          <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4">
            <dt className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1 flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5 text-slate-400" /> Vencimento
            </dt>
            <dd className="text-base font-black text-slate-900">
              {formatDate(lancamento.vencimento)}
            </dd>
          </div>

          {/* Emissão */}
          <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4">
            <dt className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1 flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5 text-slate-400" /> Emissão Base
            </dt>
            <dd className="text-base font-bold text-slate-700">
              {formatDate(lancamento.dataEmissao)}
            </dd>
          </div>

          {/* Veículo */}
          <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4">
            <dt className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1 flex items-center gap-1">
              <Radio className="h-3.5 w-3.5 text-slate-400" /> Veículo
            </dt>
            <dd className="text-sm font-bold text-slate-900 truncate">
              {lancamento.veiculo ? (
                <span className={`inline-block rounded-md px-2 py-0.5 text-xs font-bold ${getVeiculoColor(lancamento.veiculo.nome)}`}>
                  {lancamento.veiculo.nome}
                </span>
              ) : (
                '—'
              )}
            </dd>
          </div>

          {/* Agência */}
          <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4">
            <dt className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1 flex items-center gap-1">
              <Building2 className="h-3.5 w-3.5 text-slate-400" /> Agência
            </dt>
            <dd className="text-sm font-bold text-slate-900 truncate">
              {lancamento.agencia ? (
                <Link
                  href={`/agencias/${lancamento.agencia.id}`}
                  className="hover:text-indigo-600 underline decoration-indigo-200 underline-offset-2"
                >
                  {lancamento.agencia.nome}
                </Link>
              ) : (
                '—'
              )}
            </dd>
          </div>
        </dl>

        {/* Contract / PI Bar */}
        {(lancamento.numeroPi || lancamento.numeroContrato || lancamento.mesAnoReferencia) && (
          <div className="flex flex-wrap items-center gap-x-8 gap-y-2 border-t border-slate-100 bg-slate-50/50 px-6 py-4 text-xs sm:px-8 sm:text-sm">
            {lancamento.numeroPi && (
              <span>
                <b className="text-slate-500 mr-1.5 font-semibold">PI (Autorização de Mídia):</b>
                <span className="font-mono font-bold text-slate-900">{lancamento.numeroPi}</span>
              </span>
            )}
            {lancamento.numeroContrato && (
              <span>
                <b className="text-slate-500 mr-1.5 font-semibold">N.º Contrato:</b>
                <span className="font-mono font-bold text-slate-900">{lancamento.numeroContrato}</span>
              </span>
            )}
            {lancamento.mesAnoReferencia && (
              <span>
                <b className="text-slate-500 mr-1.5 font-semibold">Mês/Ano de Referência:</b>
                <span className="font-bold text-slate-900">{lancamento.mesAnoReferencia}</span>
              </span>
            )}
          </div>
        )}
      </section>

      {/* Grade de Parcelas do PI / Campanha (se houver múltiplas) */}
      {parcelas.length > 1 && (
        <section className="overflow-hidden rounded-3xl border border-indigo-200 bg-white shadow-xs">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-indigo-100 bg-linear-to-r from-indigo-50/80 to-white px-6 py-4 sm:px-8">
            <div>
              <h2 className="flex items-center gap-2 text-base sm:text-lg font-black text-indigo-950">
                <Layers className="h-5 w-5 text-indigo-600" /> Grade de Parcelas {lancamento.numeroPi ? `do PI (${lancamento.numeroPi})` : lancamento.numeroContrato ? `do Contrato (${lancamento.numeroContrato})` : 'da Campanha'}
              </h2>
              <p className="text-xs text-indigo-700 mt-0.5">
                Campanha parcelada em <strong>{parcelas.length} vezes</strong>. Clique em qualquer parcela para inspecionar ou anexar sua NF específica.
              </p>
            </div>
            <div className="text-right">
              <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-500">
                Valor Total da Campanha
              </span>
              <p className="text-lg font-black text-indigo-900">
                {formatCurrency(totalCampaignValue)}
              </p>
            </div>
          </div>

          <div className="divide-y divide-slate-100">
            {parcelas.map((p, i) => {
              const isCurrent = p.id === lancamento.id;
              const parcelHasNf = Boolean(p.numeroNotaFiscal);

              return (
                <Link
                  key={p.id}
                  href={`/lancamento/${p.id}`}
                  className={`flex items-center justify-between p-4 px-6 sm:px-8 transition-colors ${
                    isCurrent
                      ? 'bg-indigo-50/60 border-l-4 border-l-indigo-600'
                      : 'hover:bg-slate-50/80'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span
                      className={`flex h-8 w-8 items-center justify-center rounded-xl font-bold text-xs ${
                        isCurrent ? 'bg-indigo-600 text-white shadow-xs' : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {i + 1}ª
                    </span>

                    <div>
                      <div className="flex items-center gap-2">
                        <p className={`text-sm font-black ${isCurrent ? 'text-indigo-950' : 'text-slate-900'}`}>
                          Vencimento: {formatDate(p.vencimento)}
                        </p>
                        {isCurrent && (
                          <span className="rounded-full bg-indigo-200/80 px-2 py-0.5 text-[10px] font-black uppercase text-indigo-900">
                            Parcela Atual
                          </span>
                        )}
                      </div>

                      <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mt-0.5">
                        <span>Ref: {p.mesAnoReferencia || '—'}</span>
                        <span>•</span>
                        {parcelHasNf ? (
                          <span className="font-bold text-slate-700">NF: {p.numeroNotaFiscal}</span>
                        ) : (
                          <span className="font-bold text-amber-700">⚠️ NF Pendente</span>
                        )}
                        <span>•</span>
                        <span>{p._count.documentos} doc(s)</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="text-sm font-black text-slate-900">
                      {formatCurrency(p.valor)}
                    </span>
                    <Eye className="h-4 w-4 text-slate-400" />
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {/* Main Bottom Section: Document Gallery & History Timeline */}
      <section className="grid gap-8 lg:grid-cols-5 items-start">
        
        {/* Left: Documentos Anexados */}
        <div className="lg:col-span-3 space-y-6">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-xl font-black text-slate-900">Acervo Documental do Lançamento</h2>
              <p className="text-xs text-slate-500">
                {lancamento.documentos.length} documento(s) cadastrados entre arquivos físicos e links externos.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Link
                href={`/novo-documento?lancamento=${id}`}
                className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-3.5 py-2 text-xs font-bold text-white shadow-xs hover:bg-indigo-700 transition-all active:scale-[0.98]"
              >
                <UploadCloud className="h-4 w-4" />
                + Anexar Documento
              </Link>
            </div>
          </div>

          {/* Master Docs (PI / Contrato) */}
          {masterDocs.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-indigo-600"></span>
                <h3 className="text-xs font-black uppercase tracking-wider text-indigo-950">
                  Documentos Mestres da Campanha (PI / Contrato de Mídia)
                </h3>
              </div>
              <div className="grid gap-3">
                {masterDocs.map((doc) => (
                  <DocumentoCard key={doc.id} doc={doc} tiposDocumento={tiposDocumento} />
                ))}
              </div>
            </div>
          )}

          {/* Parcel Docs (NF, Boletos, Comprovantes) */}
          {parcelDocs.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-600"></span>
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-700">
                  Comprovantes e Faturamento Desta Parcela (NF / Boletos)
                </h3>
              </div>
              <div className="grid gap-3">
                {parcelDocs.map((doc) => (
                  <DocumentoCard key={doc.id} doc={doc} tiposDocumento={tiposDocumento} />
                ))}
              </div>
            </div>
          )}

          {/* Empty State */}
          {lancamento.documentos.length === 0 && (
            <div className="rounded-3xl border-2 border-dashed border-slate-200 bg-slate-50/70 p-12 text-center flex flex-col items-center justify-center space-y-3">
              <div className="h-12 w-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-1">
                <FileText className="h-6 w-6" />
              </div>
              <h3 className="text-base font-black text-slate-800">Nenhum documento anexado ainda</h3>
              <p className="text-xs text-slate-500 max-w-sm">
                Vincule o arquivo PDF ou o endereço de verificação da Nota Fiscal emitida na prefeitura.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                <Link
                  href={`/novo-documento?lancamento=${id}`}
                  className="inline-flex rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-indigo-700 transition-all active:scale-[0.98]"
                >
                  <UploadCloud className="mr-1.5 h-4 w-4" /> Anexar Arquivo ou Link
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Right: Histórico de Alterações */}
        <div className="lg:col-span-2 space-y-4">
          <div>
            <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <Clock className="h-5 w-5 text-indigo-600" /> Histórico de Alterações
            </h2>
            <p className="text-xs text-slate-500">
              Rastreabilidade de inclusões, edições e cancelamentos.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-xs">
            <HistoricoTimeline items={lancamento.historico || []} />
          </div>
        </div>
      </section>
    </div>
  );
}

