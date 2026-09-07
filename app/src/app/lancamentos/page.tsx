import { searchLancamentos } from '@/actions/lancamentos';
import { getVeiculos } from '@/actions/veiculos';
import {
  FilePlus2,
  ListChecks,
  Search,
  UploadCloud,
  Filter,
  AlertTriangle,
  Radio,
  X,
  FileText,
  Wallet,
  Users,
} from 'lucide-react';
import Link from 'next/link';
import { LancamentosTable } from './LancamentosTable';
import { SearchInput } from '@/components/SearchInput';
import { VeiculoFilterSelect } from '@/components/VeiculoFilterSelect';

export const dynamic = 'force-dynamic';

export default async function LancamentosList({
  searchParams,
}: {
  searchParams: Promise<{
    q?: string;
    tipo?: string;
    p?: string;
    status?: string;
    veiculo?: string;
  }>;
}) {
  const params = await searchParams;
  const query = params.q?.trim() || '';
  const tipo = params.tipo === 'DESPESA' ? 'DESPESA' : params.tipo === 'TODOS' ? 'TODOS' : 'RECEITA';
  const page = parseInt(params.p || '1', 10);
  const statusFilter = params.status || 'TODOS';
  const veiculoFilter = params.veiculo || 'TODOS';

  const [veiculos, { data: lancamentos, hasMore }] = await Promise.all([
    getVeiculos(),
    searchLancamentos(query, tipo, page, {
      statusDoc: statusFilter !== 'TODOS' ? statusFilter : undefined,
      veiculoId: veiculoFilter !== 'TODOS' ? veiculoFilter : undefined,
    }),
  ]);

  const buildUrl = (overrides: {
    tipo?: string;
    q?: string;
    p?: number;
    status?: string;
    veiculo?: string;
  }) => {
    const pTipo = overrides.tipo !== undefined ? overrides.tipo : tipo;
    const pQ = overrides.q !== undefined ? overrides.q : query;
    const pPage = overrides.p !== undefined ? overrides.p : page;
    const pStatus = overrides.status !== undefined ? overrides.status : statusFilter;
    const pVeiculo = overrides.veiculo !== undefined ? overrides.veiculo : veiculoFilter;

    const sp = new URLSearchParams();
    if (pTipo) sp.set('tipo', pTipo);
    if (pQ) sp.set('q', pQ);
    if (pPage > 1) sp.set('p', pPage.toString());
    if (pStatus && pStatus !== 'TODOS') sp.set('status', pStatus);
    if (pVeiculo && pVeiculo !== 'TODOS') sp.set('veiculo', pVeiculo);

    return `/lancamentos?${sp.toString()}`;
  };

  const hasActiveFilters = Boolean(query || statusFilter !== 'TODOS' || veiculoFilter !== 'TODOS');

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div>
          <div className="flex items-center gap-2">
            <span
              className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${
                tipo === 'RECEITA'
                  ? 'bg-emerald-100 text-emerald-800'
                  : tipo === 'DESPESA'
                  ? 'bg-rose-100 text-rose-800'
                  : 'bg-slate-100 text-slate-700'
              }`}
            >
              {tipo === 'RECEITA'
                ? 'Contas a Receber'
                : tipo === 'DESPESA'
                ? 'Contas a Pagar'
                : 'Acervo Geral'}
            </span>
          </div>

          <h1 className="mt-2 flex items-center gap-2 text-2xl sm:text-3xl font-black text-slate-900">
            <ListChecks className="h-7 w-7 text-indigo-600" />
            {tipo === 'RECEITA'
              ? 'Lançamentos de Clientes (Receitas)'
              : tipo === 'DESPESA'
              ? 'Lançamentos de Colaboradores & Fornecedores (Despesas)'
              : 'Todos os Lançamentos do Acervo'}
          </h1>
          <p className="mt-1 text-sm text-slate-500 max-w-3xl">
            Pesquise por cliente, colaborador, número de NF, autorização (PI), contrato, valor ou veículo de rádio.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2 sm:flex-row shrink-0">
          <Link
            href={`/novo-lancamento?tipo=${tipo === 'DESPESA' ? 'DESPESA' : 'RECEITA'}`}
            className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-bold text-white shadow-xs transition-all active:scale-[0.98] ${
              tipo === 'DESPESA'
                ? 'bg-rose-600 hover:bg-rose-700'
                : 'bg-indigo-600 hover:bg-indigo-700'
            }`}
          >
            <FilePlus2 className="h-4 w-4" />
            {tipo === 'DESPESA' ? 'Nova Despesa' : 'Novo Lançamento'}
          </Link>

          <Link
            href="/novo-documento"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-xs sm:text-sm font-bold text-slate-700 hover:bg-slate-50 transition-all active:scale-[0.98]"
          >
            <UploadCloud className="h-4 w-4 text-indigo-600" />
            Anexar Documento
          </Link>
        </div>
      </div>

      {/* Filter & Search Panel */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-4">
        {/* Tier 1: Main Category Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-100 pb-4">
          {[
            { value: 'RECEITA', label: 'Contas a Receber (Clientes)', dot: 'bg-emerald-500' },
            { value: 'DESPESA', label: 'Contas a Pagar (Despesas)', dot: 'bg-rose-500' },
            { value: 'TODOS', label: 'Todos os Registros', dot: 'bg-slate-400' },
          ].map(({ value, label, dot }) => {
            const active = tipo === value;
            return (
              <Link
                key={value}
                href={buildUrl({ tipo: value, p: 1 })}
                className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs sm:text-sm font-bold transition-all ${
                  active
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <span className={`h-2 w-2 rounded-full ${dot}`} />
                {label}
              </Link>
            );
          })}
        </div>

        {/* Tier 2: Search Input & Vehicle Dropdown */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="flex-1">
            <SearchInput placeholder="Digite para buscar: Cliente, NF 1234, PI 987, Onda FM, 1.500,00..." />
          </div>

          {/* Vehicle Dropdown */}
          <VeiculoFilterSelect veiculos={veiculos} currentValue={veiculoFilter} />
        </div>

        {/* Tier 3: Document Status Quick Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mr-1 flex items-center gap-1">
            <Filter className="h-3 w-3" /> Status:
          </span>

          {[
            { value: 'TODOS', label: 'Todos os Status' },
            { value: 'SEM_NF', label: '⚠️ Sem Nota Fiscal', alert: true },
            { value: 'COM_NF', label: 'Com Nota Fiscal' },
            { value: 'COM_DOCS', label: 'Com Anexos' },
            { value: 'SEM_DOCS', label: 'Sem Anexos' },
          ].map(({ value, label, alert }) => {
            const active = statusFilter === value;
            return (
              <Link
                key={value}
                href={buildUrl({ status: value, p: 1 })}
                className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-colors ${
                  active
                    ? alert
                      ? 'bg-amber-600 text-white shadow-xs'
                      : 'bg-indigo-600 text-white shadow-xs'
                    : alert
                    ? 'bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {label}
              </Link>
            );
          })}

          {/* Reset Filters button */}
          {hasActiveFilters && (
            <Link
              href={`/lancamentos?tipo=${tipo}`}
              className="inline-flex items-center gap-1 text-xs font-bold text-rose-600 hover:text-rose-800 ml-auto px-2 py-1"
            >
              <X className="h-3.5 w-3.5" /> Limpar filtros
            </Link>
          )}
        </div>
      </div>

      {/* Pagination & Status Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-1">
        <p className="text-xs sm:text-sm font-semibold text-slate-700">
          {query ? (
            <>
              Resultados para <strong className="text-slate-900">“{query}”</strong>
            </>
          ) : tipo === 'RECEITA' ? (
            'Exibindo Contas a Receber (Clientes)'
          ) : tipo === 'DESPESA' ? (
            'Exibindo Contas a Pagar (Colaboradores & Fornecedores)'
          ) : (
            'Exibindo todos os lançamentos'
          )}
          {statusFilter === 'SEM_NF' && (
            <span className="ml-2 text-amber-700 font-bold">• Filtrado: Sem Nota Fiscal</span>
          )}
        </p>

        {/* Top Pagination Controls */}
        <div className="flex items-center gap-2 text-xs sm:text-sm">
          {page > 1 && (
            <Link
              href={buildUrl({ p: page - 1 })}
              className="rounded-lg border border-slate-200 bg-white px-3 py-1 font-bold text-slate-700 hover:bg-slate-50 transition-colors shadow-2xs"
            >
              Anterior
            </Link>
          )}
          <span className="text-slate-500 font-medium px-2">Página {page}</span>
          {hasMore ? (
            <Link
              href={buildUrl({ p: page + 1 })}
              className="rounded-lg border border-slate-200 bg-white px-3 py-1 font-bold text-slate-700 hover:bg-slate-50 transition-colors shadow-2xs"
            >
              Próxima
            </Link>
          ) : (
            <span className="rounded-lg border border-slate-100 bg-slate-50 px-3 py-1 font-bold text-slate-300 cursor-not-allowed">
              Próxima
            </span>
          )}
        </div>
      </div>

      {/* Table Component */}
      <LancamentosTable initialData={lancamentos} />

      {/* Bottom Pagination */}
      <div className="flex justify-center mt-6">
        <div className="flex items-center gap-2 text-sm bg-white p-2 rounded-xl shadow-xs border border-slate-200">
          {page > 1 && (
            <Link
              href={buildUrl({ p: page - 1 })}
              className="rounded-lg border border-slate-200 bg-white px-4 py-2 font-bold text-slate-700 hover:bg-slate-50 transition-colors"
            >
              Página Anterior
            </Link>
          )}
          <span className="text-slate-500 font-medium px-4">Página {page}</span>
          {hasMore ? (
            <Link
              href={buildUrl({ p: page + 1 })}
              className="rounded-lg border border-slate-200 bg-indigo-50 px-4 py-2 font-bold text-indigo-700 hover:bg-indigo-100 transition-colors"
            >
              Próxima Página
            </Link>
          ) : (
            <span className="rounded-lg border border-slate-100 bg-slate-50 px-4 py-2 font-bold text-slate-300 cursor-not-allowed">
              Fim da lista
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

