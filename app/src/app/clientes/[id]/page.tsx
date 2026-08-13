import { getClienteById, deleteCliente } from '@/actions/clientes';
import { ArrowLeft, FileText, Calendar, Building2, MapPin } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { DeleteButton } from '@/components/DeleteButton';

export const dynamic = 'force-dynamic';

export default async function ClienteDetails(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const cliente = await getClienteById(params.id);

  if (!cliente) notFound();

  return (
    <div className="space-y-8">
      {/* Header and Actions */}
      <div className="flex items-center justify-between">
        <Link href="/clientes" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-indigo-600 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-1" />
          Voltar para Clientes
        </Link>
        <DeleteButton 
          id={cliente.id} 
          action={deleteCliente} 
          redirectPath="/clientes" 
          confirmMessage={`Tem certeza que deseja excluir o cliente ${cliente.razaoSocial}?`} 
        />
      </div>

      {/* Header */}
      <div className="bg-indigo-600 rounded-3xl p-8 sm:p-10 text-white shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-white opacity-10 rounded-full blur-2xl"></div>
        <div className="relative z-10">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">
            {cliente.razaoSocial}
          </h1>
          {cliente.nomeFantasia && (
            <p className="text-indigo-200 text-lg">{cliente.nomeFantasia}</p>
          )}
          
          <div className="mt-8 flex flex-wrap gap-6 text-sm font-medium text-indigo-100">
            {cliente.cnpj && (
              <div className="flex items-center gap-2"><FileText className="w-4 h-4" /> CNPJ: {cliente.cnpj}</div>
            )}
            {cliente.cidade && (
              <div className="flex items-center gap-2"><MapPin className="w-4 h-4" /> {cliente.cidade}</div>
            )}
            <div className="flex items-center gap-2"><FileText className="w-4 h-4" /> {cliente.lancamentos.length} Lançamentos</div>
          </div>
        </div>
      </div>

      {/* Lançamentos List */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-slate-800">Lançamentos / Operações</h2>
        <div className="grid grid-cols-1 gap-4">
          {cliente.lancamentos.map((l) => (
            <Link href={`/lancamento/${l.id}`} key={l.id} className="block group">
              <div className="bg-white border border-slate-200 rounded-xl p-5 hover:border-indigo-400 hover:shadow-md transition-all flex flex-col sm:flex-row gap-4 justify-between">
                
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-slate-100 text-slate-800">
                      {l.appSheetId || l.id.substring(0,8)}
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                      NF: {l.numeroNotaFiscal || 'Sem NF informada'}
                    </h3>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
                    {l.valor && (
                      <span className="flex items-center font-medium text-emerald-600">R$ {l.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                    )}
                    <span className="flex items-center"><Calendar className="w-4 h-4 mr-1 text-slate-400"/> {l.createdAt.toLocaleDateString('pt-BR')}</span>
                    {l.agencia && (
                      <span className="flex items-center"><Building2 className="w-4 h-4 mr-1 text-slate-400"/> {l.agencia.nome}</span>
                    )}
                  </div>
                </div>

                <div className="flex flex-col items-start sm:items-end space-y-2 sm:min-w-32">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-100">
                    {l.documentos.length} Documentos
                  </span>
                </div>

              </div>
            </Link>
          ))}

          {cliente.lancamentos.length === 0 && (
            <div className="text-center py-12 bg-white rounded-xl border border-dashed border-slate-300">
              <FileText className="mx-auto h-12 w-12 text-slate-300" />
              <p className="mt-2 text-sm text-slate-500">Nenhum lançamento vinculado a este cliente.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
