import { searchLancamentos } from '@/actions/lancamentos';
import { FilePlus2, ListChecks, Search, UploadCloud } from 'lucide-react';
import Link from 'next/link';
import { LancamentosTable } from './LancamentosTable';
import { SearchInput } from '@/components/SearchInput';

export const dynamic = 'force-dynamic';

export default async function LancamentosList({ searchParams }: { searchParams: Promise<{ q?: string; tipo?: string; p?: string }> }) {
  const params = await searchParams;
  const query = params.q?.trim() || '';
  const tipo = params.tipo === 'DESPESA' ? 'DESPESA' : params.tipo === 'TODOS' ? 'TODOS' : 'RECEITA';
  const page = parseInt(params.p || '1', 10);
  
  console.log(`>>> RENDERIZANDO LANCAMENTOS LIST! Query: ${query}, Tipo: ${tipo}, Page: ${page}`);
  
  const { data: lancamentos, hasMore } = await searchLancamentos(query, tipo, page);

  const buildUrl = (p: number) => `/lancamentos?tipo=${tipo}&q=${encodeURIComponent(query)}&p=${p}`;

  return <div className="space-y-6">
    <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end"><div><span className="inline-flex rounded-full bg-indigo-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-indigo-700">Acervo</span><h1 className="mt-3 flex items-center gap-2 text-3xl font-black text-slate-900"><ListChecks className="h-7 w-7 text-indigo-600" /> Lançamentos</h1><p className="mt-2 text-slate-500">Localize documentos por cliente, colaborador, NF, valor, veículo, PI, contrato, data ou nome do arquivo.</p></div><div className="flex flex-col gap-2 sm:flex-row"><Link href="/novo-lancamento" className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-bold text-white"><FilePlus2 className="h-4 w-4" /> Novo lançamento</Link><Link href="/novo-documento" className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-bold text-slate-700"><UploadCloud className="h-4 w-4" /> Adicionar documento</Link></div></div>
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-4 flex flex-wrap gap-2">
        {[['RECEITA','Clientes'],['DESPESA','Colaboradores'],['TODOS','Todos']].map(([value,label]) => (
          <Link key={value} href={`/lancamentos?tipo=${value}&q=${encodeURIComponent(query)}`} className={`rounded-lg px-4 py-2 text-sm font-bold ${tipo === value ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
            {label}
          </Link>
        ))}
      </div>
      <div className="flex items-center gap-3">
        <SearchInput placeholder="Ex.: Mercado Gama, CR125, NF 1234, Onda FM, 1.500,00..." />
      </div>
    </div>
    
    <div className="flex flex-wrap items-center justify-between gap-3">
      <p className="text-sm font-semibold text-slate-700">{query ? `Resultados para “${query}”` : tipo === 'RECEITA' ? 'Últimos lançamentos de clientes' : tipo === 'DESPESA' ? 'Últimos lançamentos de colaboradores' : 'Últimos lançamentos'}</p>
      
      <div className="flex items-center gap-2 text-sm">
        {page > 1 && (
          <Link href={buildUrl(page - 1)} className="rounded-lg border border-slate-200 bg-white px-3 py-1 font-bold text-slate-700 hover:bg-slate-50">Anterior</Link>
        )}
        <span className="text-slate-500 font-medium px-2">Página {page}</span>
        {hasMore ? (
          <Link href={buildUrl(page + 1)} className="rounded-lg border border-slate-200 bg-white px-3 py-1 font-bold text-slate-700 hover:bg-slate-50">Próxima</Link>
        ) : (
          <span className="rounded-lg border border-slate-100 bg-slate-50 px-3 py-1 font-bold text-slate-300 cursor-not-allowed">Próxima</span>
        )}
      </div>
    </div>
    
    <LancamentosTable initialData={lancamentos} />

    <div className="flex justify-center mt-6">
      <div className="flex items-center gap-2 text-sm bg-white p-2 rounded-xl shadow-sm border border-slate-200">
        {page > 1 && (
          <Link href={buildUrl(page - 1)} className="rounded-lg border border-slate-200 bg-white px-4 py-2 font-bold text-slate-700 hover:bg-slate-50">Página Anterior</Link>
        )}
        <span className="text-slate-500 font-medium px-4">Página {page}</span>
        {hasMore ? (
          <Link href={buildUrl(page + 1)} className="rounded-lg border border-slate-200 bg-indigo-50 px-4 py-2 font-bold text-indigo-700 hover:bg-indigo-100">Próxima Página</Link>
        ) : (
          <span className="rounded-lg border border-slate-100 bg-slate-50 px-4 py-2 font-bold text-slate-300 cursor-not-allowed">Fim da lista</span>
        )}
      </div>
    </div>
  </div>;
}
