import { getClientes } from '@/actions/clientes';
import { Users, FileText, Building2 } from 'lucide-react';
import { SearchInput } from '@/components/SearchInput';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function ClientesPage(props: { searchParams?: Promise<{ q?: string }> }) {
  const searchParams = await props.searchParams;
  const query = searchParams?.q || '';
  const clientes = await getClientes(query);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-3xl font-bold text-slate-800 tracking-tight flex items-center gap-3">
          <Users className="w-8 h-8 text-indigo-600" />
          Clientes
        </h1>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <SearchInput placeholder="Buscar cliente..." />
          <Link href="/clientes/novo" className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium text-sm whitespace-nowrap">
            Novo Cliente
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clientes.map((cliente) => (
          <Link href={`/clientes/${cliente.id}`} key={cliente.id} className="block group">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 hover:border-indigo-400 hover:shadow-lg transition-all flex flex-col justify-between h-full space-y-4">
              <div>
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-2">
                  {cliente.razaoSocial}
                </h3>
                {cliente.nomeFantasia && (
                  <p className="text-sm text-slate-500 mt-1">{cliente.nomeFantasia}</p>
                )}
              </div>
              
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="inline-flex items-center text-sm font-medium text-slate-600">
                  <FileText className="w-4 h-4 mr-2 text-slate-400" />
                  {cliente._count.lancamentos} Lançamentos
                </span>
                <span className="text-indigo-600 group-hover:translate-x-1 transition-transform">
                  &rarr;
                </span>
              </div>
            </div>
          </Link>
        ))}

        {clientes.length === 0 && (
          <div className="col-span-full text-center py-12 bg-white rounded-2xl border border-dashed border-slate-300">
            <Building2 className="mx-auto h-12 w-12 text-slate-300" />
            <h3 className="mt-2 text-sm font-semibold text-slate-900">Nenhum cliente cadastrado</h3>
          </div>
        )}
      </div>
    </div>
  );
}
