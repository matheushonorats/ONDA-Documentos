import { getLancamentoById, searchLancamentos, getParcelasDoContrato } from '@/actions/lancamentos';
import { getTiposDocumento } from '@/actions/documentos';
import { FileSearch, Search, UploadCloud, Layers } from 'lucide-react';
import Link from 'next/link';
import { NovoDocumentoClient } from './NovoDocumentoClient';
import { SearchInput } from '@/components/SearchInput';

export const dynamic = 'force-dynamic';

export default async function NovoDocumentoPage({ searchParams }: { searchParams: Promise<{ lancamento?: string; q?: string; tipo?: string }> }) {
  const params = await searchParams;
  if (params.lancamento) {
    const [lancamento, tiposDocumento, parcelasContrato] = await Promise.all([
      getLancamentoById(params.lancamento),
      getTiposDocumento(),
      getParcelasDoContrato(params.lancamento),
    ]);
    if (lancamento) {
      return (
        <NovoDocumentoClient
          lancamento={lancamento}
          tiposDocumento={tiposDocumento}
          parcelasContrato={parcelasContrato}
        />
      );
    }
  }

  const query = params.q?.trim() || '';
  const tipo = params.tipo === 'DESPESA' ? 'DESPESA' : 'RECEITA';
  const searchResult = query ? await searchLancamentos(query, tipo) : { data: [], hasMore: false };
  const results = searchResult.data;
  return (
    <div className="mx-auto max-w-4xl space-y-7">
      <div>
        <span className="inline-flex rounded-full bg-violet-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-violet-700">
          Complementar lançamento / Contrato
        </span>
        <h1 className="mt-3 text-3xl font-black text-slate-900">Adicionar documento</h1>
        <p className="mt-2 text-slate-500">
          Localize o cliente ou parcela ao qual o novo arquivo pertence. Documentos do mesmo PI e Veículo poderão ser vinculados a todo o contrato automaticamente.
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-4 flex gap-2">
          <Link
            href={`/novo-documento?tipo=RECEITA&q=${encodeURIComponent(query)}`}
            className={`rounded-lg px-4 py-2 text-sm font-bold ${
              tipo === 'RECEITA' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'
            }`}
          >
            Clientes (Receitas)
          </Link>
          <Link
            href={`/novo-documento?tipo=DESPESA&q=${encodeURIComponent(query)}`}
            className={`rounded-lg px-4 py-2 text-sm font-bold ${
              tipo === 'DESPESA' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'
            }`}
          >
            Colaboradores / Fornecedores (Despesas)
          </Link>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <SearchInput
            placeholder={
              tipo === 'RECEITA'
                ? 'Buscar por Cliente, PI, Veículo, NF, Contrato ou valor...'
                : 'Buscar por Colaborador, fornecedor, valor, veículo ou documento...'
            }
          />
        </div>
      </div>

      {query && (
        <section>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-bold text-slate-900">Resultados da Busca</h2>
            <span className="text-sm text-slate-500">{results.length} encontrado(s)</span>
          </div>
          <div className="space-y-3">
            {results.map((item) => {
              const owner =
                item.tipoLancamento === 'RECEITA'
                  ? item.cliente?.nomeFantasia || item.cliente?.razaoSocial
                  : item.colaborador?.nome;
              return (
                <Link
                  key={item.id}
                  href={`/novo-documento?lancamento=${item.id}`}
                  className="group flex flex-col justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-indigo-400 hover:shadow-md sm:flex-row sm:items-center"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded bg-slate-100 px-2 py-0.5 text-xs font-bold text-slate-600">
                        {item.appSheetId || item.id.slice(0, 8)}
                      </span>
                      {item.veiculo && (
                        <span className="rounded bg-indigo-50 px-2 py-0.5 text-xs font-bold text-indigo-700">
                          {item.veiculo.nome}
                        </span>
                      )}
                      {item.numeroPi && (
                        <span className="rounded bg-amber-50 px-2 py-0.5 text-xs font-bold text-amber-800 border border-amber-200">
                          PI: {item.numeroPi}
                        </span>
                      )}
                      {item.numeroNotaFiscal && (
                        <span className="rounded bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-700">
                          NF: {item.numeroNotaFiscal}
                        </span>
                      )}
                    </div>
                    <h3 className="mt-2 truncate font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                      {owner || 'Sem identificação'}
                    </h3>
                    <p className="mt-1 truncate text-xs text-slate-500">
                      {item.descricao || 'Sem descrição'} · {item.documentos.length} documento(s) anexado(s)
                      {item.valor !== null && ` · R$ ${item.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
                    </p>
                    {item.numeroPi && (
                      <p className="mt-1.5 flex items-center gap-1 text-[11px] font-semibold text-indigo-600">
                        <Layers className="h-3 w-3" /> Contrato/PI identificado: Vincule o documento a todas as parcelas deste PI de uma só vez
                      </p>
                    )}
                  </div>
                  <span className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-indigo-50 px-4 py-2.5 text-xs font-bold text-indigo-700 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-2xs">
                    <UploadCloud className="h-4 w-4" /> Selecionar
                  </span>
                </Link>
              );
            })}
            {results.length === 0 && (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
                <FileSearch className="mx-auto h-10 w-10 text-slate-300" />
                <p className="mt-3 font-semibold text-slate-700">Nenhum lançamento encontrado</p>
                <p className="mt-1 text-sm text-slate-500">Tente o nome fantasia, número do PI, da nota ou código CR/CP.</p>
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  );
}

