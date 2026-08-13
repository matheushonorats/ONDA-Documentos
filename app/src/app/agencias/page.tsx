import { getAgencias } from '@/actions/agencias';
import { Building2, Briefcase } from 'lucide-react';
import { SearchInput } from '@/components/SearchInput';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function AgenciasPage(props: { searchParams?: Promise<{ q?: string }> }) {
  const searchParams = await props.searchParams;
  const query = searchParams?.q || '';
  const agencias = await getAgencias(query);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-3xl font-bold text-slate-800 tracking-tight flex items-center gap-3">
          <Building2 className="w-8 h-8 text-indigo-600" />
          Agências
        </h1>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <SearchInput placeholder="Buscar agência..." />
          <Link href="/agencias/novo" className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium text-sm whitespace-nowrap">
            Nova Agência
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {agencias.map((agencia) => (
          <Link href={`/agencias/${agencia.id}`} key={agencia.id} className="block group">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 hover:border-indigo-400 hover:shadow-lg transition-all flex flex-col justify-between h-full space-y-4">
              <div>
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-2">
                  {agencia.nome}
                </h3>
              </div>
              
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="inline-flex items-center text-sm font-medium text-slate-600">
                  <Briefcase className="w-4 h-4 mr-2 text-slate-400" />
                  {agencia._count.lancamentos} Lançamentos Gerenciados
                </span>
                <span className="text-indigo-600 group-hover:translate-x-1 transition-transform">
                  &rarr;
                </span>
              </div>
            </div>
          </Link>
        ))}

        {agencias.length === 0 && (
          <div className="col-span-full text-center py-12 bg-white rounded-2xl border border-dashed border-slate-300">
            <Building2 className="mx-auto h-12 w-12 text-slate-300" />
            <h3 className="mt-2 text-sm font-semibold text-slate-900">Nenhuma agência cadastrada</h3>
          </div>
        )}
      </div>
    </div>
  );
}
