import { getDashboardData } from '@/actions/dashboard';
import {
  ArrowRight,
  Building2,
  FilePlus2,
  Files,
  ListChecks,
  Search,
  UploadCloud,
  UserRound,
  UsersRound,
  PlusCircle,
  AlertTriangle,
  FileText,
  Radio,
  ExternalLink,
  Download,
  Wallet,
  TrendingUp,
  Eye,
  Calendar,
} from 'lucide-react';
import Link from 'next/link';
import { TickerText } from '@/components/TickerText';
import { getVeiculoColor } from '@/app/lancamentos/LancamentosTable';

export const dynamic = 'force-dynamic';

function formatCurrency(val: number | null | undefined) {
  if (val === null || val === undefined) return 'R$ 0,00';
  return `R$ ${val.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function formatDate(date: Date | string | null | undefined) {
  if (!date) return '—';
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('pt-BR');
}

export default async function Home() {
  const data = await getDashboardData();

  return (
    <div className="space-y-8">
      {/* Top Banner / Hero */}
      <section className="relative overflow-hidden rounded-3xl bg-linear-to-r from-slate-950 via-slate-900 to-indigo-950 px-6 py-8 text-white shadow-xl sm:px-10 sm:py-10">
        <div className="relative z-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
          <div className="max-w-2xl space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-full bg-indigo-500/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-indigo-300 ring-1 ring-indigo-400/30">
                <Radio className="h-3 w-3" /> Sistema de Gestão Documental & Financeira
              </span>
              <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-xs font-semibold text-slate-300">
                Ondas Sistema de Radiodifusão LTDA
              </span>
            </div>
            <h1 className="text-2xl font-black tracking-tight sm:text-3xl lg:text-4xl text-white">
              Controle rápido de documentos, notas e contratos.
            </h1>
            <p className="text-sm text-slate-300 sm:text-base leading-relaxed">
              Consulte autorizações de mídia (PIs), notas fiscais emitidas, comprovantes e parcelas com agilidade.
            </p>
          </div>

          {/* Quick Search Link Box */}
          <div className="w-full lg:w-96 rounded-2xl bg-white/10 p-3 ring-1 ring-white/15 backdrop-blur-md">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">Busca Direta no Acervo</p>
            <form action="/lancamentos" method="GET" className="relative">
              <input
                type="text"
                name="q"
                placeholder="Cliente, NF, PI, valor..."
                className="w-full rounded-xl bg-white px-4 py-2.5 pr-10 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="submit"
                aria-label="Buscar"
                className="absolute right-1.5 top-1.5 rounded-lg bg-indigo-600 p-1.5 text-white hover:bg-indigo-700 transition-colors"
              >
                <Search className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Primary Action Hub - 4 Direct Cards */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-black text-slate-900">Operações Principais</h2>
            <p className="text-xs text-slate-500">O que você precisa registrar ou consultar agora?</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* Card 1: Nova Receita */}
          <Link
            href="/novo-lancamento?tipo=RECEITA"
            className="group relative overflow-hidden rounded-2xl border-2 border-emerald-500/20 bg-linear-to-b from-emerald-50/70 to-white p-5 shadow-xs transition-all hover:-translate-y-1 hover:border-emerald-500/50 hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <span className="rounded-xl bg-emerald-600 p-2.5 text-white shadow-xs">
                <PlusCircle className="h-5 w-5" />
              </span>
              <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[11px] font-black uppercase text-emerald-800">
                Receita
              </span>
            </div>
            <h3 className="mt-4 text-base font-black text-slate-900 group-hover:text-emerald-700 transition-colors">
              Nova Conta a Receber
            </h3>
            <p className="mt-1 text-xs text-slate-600">
              Registrar cliente, contrato, PI de rádio ou parcelamento mensal com anexos.
            </p>
            <div className="mt-4 flex items-center text-xs font-bold text-emerald-700 group-hover:translate-x-1 transition-transform">
              Registrar Cliente <ArrowRight className="ml-1 h-3.5 w-3.5" />
            </div>
          </Link>

          {/* Card 2: Nova Despesa */}
          <Link
            href="/novo-lancamento?tipo=DESPESA"
            className="group relative overflow-hidden rounded-2xl border-2 border-rose-500/20 bg-linear-to-b from-rose-50/70 to-white p-5 shadow-xs transition-all hover:-translate-y-1 hover:border-rose-500/50 hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <span className="rounded-xl bg-rose-600 p-2.5 text-white shadow-xs">
                <Wallet className="h-5 w-5" />
              </span>
              <span className="rounded-full bg-rose-100 px-2.5 py-0.5 text-[11px] font-black uppercase text-rose-800">
                Despesa
              </span>
            </div>
            <h3 className="mt-4 text-base font-black text-slate-900 group-hover:text-rose-700 transition-colors">
              Nova Conta a Pagar
            </h3>
            <p className="mt-1 text-xs text-slate-600">
              Registrar pagamento de colaboradores, fornecedores, comissões ou serviços.
            </p>
            <div className="mt-4 flex items-center text-xs font-bold text-rose-700 group-hover:translate-x-1 transition-transform">
              Registrar Despesa <ArrowRight className="ml-1 h-3.5 w-3.5" />
            </div>
          </Link>

          {/* Card 3: Anexar Documento */}
          <Link
            href="/novo-documento"
            className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-linear-to-b from-indigo-50/50 to-white p-5 shadow-xs transition-all hover:-translate-y-1 hover:border-indigo-300 hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <span className="rounded-xl bg-indigo-600 p-2.5 text-white shadow-xs">
                <UploadCloud className="h-5 w-5" />
              </span>
              <span className="rounded-full bg-indigo-100 px-2.5 py-0.5 text-[11px] font-black uppercase text-indigo-800">
                Anexo
              </span>
            </div>
            <h3 className="mt-4 text-base font-black text-slate-900 group-hover:text-indigo-700 transition-colors">
              Anexar Documento / Link
            </h3>
            <p className="mt-1 text-xs text-slate-600">
              Vincular PDF, comprovante ou link da prefeitura a um lançamento existente.
            </p>
            <div className="mt-4 flex items-center text-xs font-bold text-indigo-700 group-hover:translate-x-1 transition-transform">
              Localizar e Anexar <ArrowRight className="ml-1 h-3.5 w-3.5" />
            </div>
          </Link>

          {/* Card 4: Consultar Todos */}
          <Link
            href="/lancamentos?tipo=TODOS"
            className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-xs transition-all hover:-translate-y-1 hover:border-slate-300 hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <span className="rounded-xl bg-slate-900 p-2.5 text-white shadow-xs">
                <ListChecks className="h-5 w-5" />
              </span>
              <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-black uppercase text-slate-700">
                Acervo
              </span>
            </div>
            <h3 className="mt-4 text-base font-black text-slate-900 group-hover:text-indigo-700 transition-colors">
              Consultar Lançamentos
            </h3>
            <p className="mt-1 text-xs text-slate-600">
              Explorar tabela completa com filtros de NF pendente, veículo e vencimento.
            </p>
            <div className="mt-4 flex items-center text-xs font-bold text-slate-800 group-hover:translate-x-1 transition-transform">
              Abrir Acervo Geral <ArrowRight className="ml-1 h-3.5 w-3.5" />
            </div>
          </Link>
        </div>
      </section>

      {/* Operational Indicators / KPIs */}
      <section className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {/* Receitas */}
        <Link
          href="/lancamentos?tipo=RECEITA"
          className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-xs transition-all hover:border-emerald-300 hover:shadow-sm"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">Contas a Receber</span>
            <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
          </div>
          <p className="mt-3 text-2xl font-black text-slate-900">
            {data.countReceitas.toLocaleString('pt-BR')} <span className="text-xs font-normal text-slate-500">lançamentos</span>
          </p>
          <p className="mt-1 text-xs font-bold text-emerald-600">
            Total: {formatCurrency(data.totalValorReceitas)}
          </p>
        </Link>

        {/* Pendências de NF */}
        <Link
          href="/lancamentos?tipo=RECEITA&status=SEM_NF"
          className={`group rounded-2xl border p-5 shadow-xs transition-all hover:shadow-sm ${
            data.countSemNf > 0
              ? 'border-amber-300 bg-amber-50/50 hover:border-amber-400'
              : 'border-slate-200 bg-white hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800 flex items-center gap-1">
              <AlertTriangle className="h-3.5 w-3.5 text-amber-600" /> Sem Nota Fiscal
            </span>
            <span className="rounded-full bg-amber-200 px-2 py-0.5 text-[10px] font-black text-amber-900">
              Atenção
            </span>
          </div>
          <p className="mt-3 text-2xl font-black text-amber-950">
            {data.countSemNf.toLocaleString('pt-BR')} <span className="text-xs font-normal text-amber-800">pendentes</span>
          </p>
          <p className="mt-1 text-xs font-semibold text-amber-700">
            {data.countSemNf > 0 ? 'Requer emissão de NF no mês' : 'Todas com NF vinculada'}
          </p>
        </Link>

        {/* Despesas */}
        <Link
          href="/lancamentos?tipo=DESPESA"
          className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-xs transition-all hover:border-rose-300 hover:shadow-sm"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-700">Contas a Pagar</span>
            <span className="h-2 w-2 rounded-full bg-rose-500"></span>
          </div>
          <p className="mt-3 text-2xl font-black text-slate-900">
            {data.countDespesas.toLocaleString('pt-BR')} <span className="text-xs font-normal text-slate-500">lançamentos</span>
          </p>
          <p className="mt-1 text-xs font-bold text-rose-600">
            Total: {formatCurrency(data.totalValorDespesas)}
          </p>
        </Link>

        {/* Documentos */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-700">Arquivos & Links</span>
            <Files className="h-4 w-4 text-indigo-600" />
          </div>
          <p className="mt-3 text-2xl font-black text-slate-900">
            {data.countDocumentos.toLocaleString('pt-BR')} <span className="text-xs font-normal text-slate-500">no acervo</span>
          </p>
          <p className="mt-1 text-xs font-medium text-slate-500">
            {data.countClientes} clientes · {data.countColaboradores} colaboradores
          </p>
        </div>
      </section>

      {/* Destaque Módulo de Cobrança de Agências */}
      <section className="relative overflow-hidden rounded-2xl border border-indigo-200/80 bg-linear-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 text-white shadow-lg">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-400/20 px-2.5 py-0.5 text-[11px] font-black text-amber-300 ring-1 ring-amber-400/30">
                ⚡ Planilha Google Sheets Integrada
              </span>
              <span className="text-xs text-slate-400 font-medium">Cobrança Semanal Ondas 985</span>
            </div>
            <h3 className="text-lg font-black text-white">
              Cobrança de Agências de Publicidade
            </h3>
            <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
              Consolidação automática das autorizações de mídia (PIs) vencidas, geração de e-mails formais e relatórios em PDF.
            </p>
          </div>
          <Link
            href="/cobrancas"
            className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 px-5 py-3 text-xs font-bold text-white shadow-md transition active:scale-95 shrink-0 self-start md:self-auto"
          >
            Abrir Cobranças <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Main Content Split: Recent Lancamentos & Recent Documents */}
      <section className="grid gap-8 lg:grid-cols-5 items-start">
        
        {/* Left Column: Últimos Lançamentos */}
        <div className="lg:col-span-3 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-black text-slate-900">Últimos Lançamentos</h2>
              <p className="text-xs text-slate-500">Movimentações cadastradas ou atualizadas recentemente.</p>
            </div>
            <Link
              href="/lancamentos"
              className="text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors"
            >
              Ver todos ({data.countLancamentos}) &rarr;
            </Link>
          </div>

          <div className="space-y-3">
            {data.recentLancamentos.map((item) => {
              const isReceita = item.tipoLancamento === 'RECEITA';
              const owner = isReceita
                ? item.cliente?.nomeFantasia || item.cliente?.razaoSocial
                : item.colaborador?.nome;
              const hasNf = Boolean(item.numeroNotaFiscal);

              return (
                <Link
                  key={item.id}
                  href={`/lancamento/${item.id}`}
                  className="group flex flex-col justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-xs transition-all hover:border-indigo-300 hover:shadow-md sm:flex-row sm:items-center"
                >
                  <div className="min-w-0 flex-1 space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-[11px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                        {item.appSheetId || item.id.slice(0, 8)}
                      </span>

                      <span
                        className={`rounded-md px-2 py-0.5 text-[11px] font-black uppercase ${
                          isReceita ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                        }`}
                      >
                        {isReceita ? 'Receita' : 'Despesa'}
                      </span>

                      {item.veiculo && (
                        <span className={`rounded-md px-2 py-0.5 text-[11px] font-bold ${getVeiculoColor(item.veiculo.nome)}`}>
                          {item.veiculo.nome}
                        </span>
                      )}

                      {/* NF Indicator Badge */}
                      {hasNf ? (
                        <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-bold text-slate-700">
                          NF: {item.numeroNotaFiscal}
                        </span>
                      ) : isReceita ? (
                        <span className="rounded-md bg-amber-100 px-2 py-0.5 text-[11px] font-bold text-amber-800">
                          ⚠️ Sem NF
                        </span>
                      ) : null}
                    </div>

                    <h3 className="truncate font-black text-slate-900 group-hover:text-indigo-600 transition-colors">
                      {owner || 'Sem identificação'}
                    </h3>

                    {item.agencia && (
                      <p className="truncate text-xs font-semibold text-indigo-600">
                        Agência: {item.agencia.nome}
                      </p>
                    )}

                    <TickerText
                      text={item.descricao || 'Sem descrição'}
                      className="text-xs text-slate-500"
                    />

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 pt-1 text-xs text-slate-400">
                      {item.numeroPi && (
                        <span className="font-semibold text-slate-600">PI: {item.numeroPi}</span>
                      )}
                      {item.mesAnoReferencia && (
                        <span>Ref: {item.mesAnoReferencia}</span>
                      )}
                      {item.vencimento && (
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" /> Venc: {formatDate(item.vencimento)}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:flex-col sm:items-end sm:justify-center gap-2 border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-100 shrink-0">
                    <span className="text-base font-black text-slate-900">
                      {item.valor !== null ? formatCurrency(item.valor) : '—'}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-bold text-indigo-700">
                      <Files className="h-3.5 w-3.5" />
                      {item.documentos.length} doc(s)
                    </span>
                  </div>
                </Link>
              );
            })}

            {data.recentLancamentos.length === 0 && (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center">
                <FileText className="mx-auto h-8 w-8 text-slate-300" />
                <p className="mt-2 text-sm font-semibold text-slate-700">Nenhum lançamento registrado</p>
                <Link
                  href="/novo-lancamento"
                  className="mt-3 inline-flex rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white"
                >
                  Criar primeiro lançamento
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Documentos Recentes */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-black text-slate-900">Documentos Recentes</h2>
              <p className="text-xs text-slate-500">Últimos arquivos e links adicionados.</p>
            </div>
            <Link
              href="/novo-documento"
              className="text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors"
            >
              + Adicionar
            </Link>
          </div>

          <div className="divide-y divide-slate-100 rounded-2xl border border-slate-200 bg-white shadow-xs">
            {data.recentDocumentos.map((doc) => {
              const isReceita = doc.lancamento.tipoLancamento === 'RECEITA';
              const owner = isReceita
                ? doc.lancamento.cliente?.nomeFantasia || doc.lancamento.cliente?.razaoSocial
                : doc.lancamento.colaborador?.nome;
              const isExternalLink = Boolean(doc.urlPublica && !doc.caminhoOriginal);

              return (
                <div key={doc.id} className="p-3 hover:bg-slate-50 transition-colors">
                  <div className="flex items-start justify-between gap-3">
                    <Link
                      href={`/lancamento/${doc.lancamentoId}`}
                      className="min-w-0 flex-1 group"
                    >
                      <div className="flex items-center gap-1.5">
                        <span className="rounded-md bg-indigo-50 px-2 py-0.5 text-[10px] font-bold text-indigo-700">
                          {doc.tipoDocumento.nome}
                        </span>
                        {isExternalLink && (
                          <span className="rounded-md bg-slate-100 px-1.5 py-0.5 text-[10px] font-bold text-slate-600">
                            Link
                          </span>
                        )}
                      </div>
                      <p className="mt-1 truncate text-xs font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">
                        {doc.nomeOriginal}
                      </p>
                      <p className="truncate text-[11px] text-slate-500 mt-0.5">
                        {owner || 'Sem identificação'}
                      </p>
                    </Link>

                    {/* Direct open action */}
                    {doc.urlPublica ? (
                      <a
                        href={doc.urlPublica}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-lg p-2 text-indigo-600 hover:bg-indigo-50 transition-colors shrink-0"
                        title={isExternalLink ? 'Abrir link da nota' : 'Abrir no Google Drive'}
                      >
                        {isExternalLink ? <ExternalLink className="h-4 w-4" /> : <Download className="h-4 w-4" />}
                      </a>
                    ) : (
                      <Link
                        href={`/lancamento/${doc.lancamentoId}`}
                        className="rounded-lg p-2 text-slate-400 hover:text-indigo-600 hover:bg-slate-100 transition-colors shrink-0"
                      >
                        <Eye className="h-4 w-4" />
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}

            {data.recentDocumentos.length === 0 && (
              <div className="p-8 text-center text-xs text-slate-500">
                Nenhum arquivo ou link recente.
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

