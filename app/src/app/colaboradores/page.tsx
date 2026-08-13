import { getColaboradores } from '@/actions/colaboradores';
import { Users, FileText } from 'lucide-react';
import { SearchInput } from '@/components/SearchInput';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function ColaboradoresList(props: { searchParams?: Promise<{ q?: string; tipo?: string }> }) {
  const searchParams = await props.searchParams;
  const query = searchParams?.q || '';
  const tipo = searchParams?.tipo || 'TODOS';
  const colaboradores = await getColaboradores(query, tipo);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Users className="w-6 h-6 text-indigo-600" />
            Colaboradores e Fornecedores
          </h1>
          <p className="text-slate-500 mt-1">Cadastros separados de clientes, usados somente nos lançamentos de colaboradores e fornecedores.</p>
        </div>

        {/* Tab Filters */}
        <div className="flex bg-slate-200/80 p-1 rounded-xl w-full sm:w-auto text-xs font-bold shrink-0">
          <Link href={`/colaboradores?tipo=TODOS${query ? `&q=${query}` : ''}`} className={`flex-1 sm:flex-none text-center px-4 py-2 rounded-lg transition-colors ${tipo === 'TODOS' ? 'bg-white shadow text-indigo-700' : 'text-slate-600 hover:text-slate-900'}`}>
            Todos
          </Link>
          <Link href={`/colaboradores?tipo=Colaborador${query ? `&q=${query}` : ''}`} className={`flex-1 sm:flex-none text-center px-4 py-2 rounded-lg transition-colors ${tipo === 'Colaborador' ? 'bg-white shadow text-emerald-700 font-bold' : 'text-slate-600 hover:text-slate-900'}`}>
            Apenas Colaboradores
          </Link>
          <Link href={`/colaboradores?tipo=Fornecedor${query ? `&q=${query}` : ''}`} className={`flex-1 sm:flex-none text-center px-4 py-2 rounded-lg transition-colors ${tipo === 'Fornecedor' ? 'bg-white shadow text-slate-900 font-bold' : 'text-slate-600 hover:text-slate-900'}`}>
            Apenas Fornecedores
          </Link>
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
        <SearchInput placeholder="Buscar colaborador por nome, CPF ou cargo..." />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Nome
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Cargo / Setor
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Lançamentos
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Ações</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {colaboradores.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <div className="text-sm font-semibold text-slate-900">{c.nome}</div>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${c.tipificacao === 'Colaborador' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'}`}>
                        {c.tipificacao || 'Fornecedor'}
                      </span>
                    </div>
                    {c.cpfCnpj && <div className="text-xs text-slate-500">{c.cpfCnpj}</div>}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                    {c.cargo || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-rose-100 text-rose-800">
                      {c._count.lancamentos} registros
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link href={`/colaboradores/${c.id}`} className="text-indigo-600 hover:text-indigo-900 inline-flex items-center">
                      <FileText className="w-4 h-4 mr-1" />
                      Ver lançamentos
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {colaboradores.length === 0 && (
            <div className="text-center py-12">
              <Users className="mx-auto h-12 w-12 text-slate-300" />
              <h3 className="mt-2 text-sm font-medium text-slate-900">Nenhum colaborador encontrado</h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
