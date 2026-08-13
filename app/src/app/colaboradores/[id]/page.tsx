import { getColaboradorById, deleteColaborador } from '@/actions/colaboradores';
import { ArrowLeft, FileText, Calendar, Files, UserCheck, CreditCard, FolderOpen, Building2 } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { DeleteButton } from '@/components/DeleteButton';

export default async function ColaboradorDetails(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const colaborador = await getColaboradorById(params.id);

  if (!colaborador) notFound();

  const totalDocumentos = colaborador.lancamentos.reduce((acc, l) => acc + l.documentos.length, 0);
  const totalValor = colaborador.lancamentos.reduce((acc, l) => acc + (l.valor || 0), 0);

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <Link href="/colaboradores" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-indigo-600 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-1" />
          Voltar para Colaboradores
        </Link>
        <DeleteButton 
          id={colaborador.id} 
          action={deleteColaborador} 
          redirectPath="/colaboradores" 
          confirmMessage={`Tem certeza que deseja excluir o colaborador/fornecedor ${colaborador.nome}?`} 
        />
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="bg-gradient-to-r from-slate-900 to-indigo-950 p-6 sm:p-8 text-white">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-2xl bg-indigo-600/30 border border-indigo-400/30 flex items-center justify-center text-indigo-200 shrink-0">
                <UserCheck className="h-8 w-8" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl sm:text-3xl font-black text-white">{colaborador.nome}</h1>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${colaborador.tipificacao === 'Colaborador' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-slate-700 text-slate-300'}`}>
                    {colaborador.tipificacao || 'Fornecedor'}
                  </span>
                </div>
                <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-300">
                  {colaborador.cpfCnpj && <span>CPF/CNPJ: {colaborador.cpfCnpj}</span>}
                  <span>Cod: {colaborador.id.substring(0, 8)}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 w-full sm:w-auto bg-white/5 p-4 rounded-2xl border border-white/10">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Operações</span>
                <span className="text-xl font-bold text-white">{colaborador.lancamentos.length}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Total de Arquivos</span>
                <span className="text-xl font-bold text-indigo-300">{totalDocumentos}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-100 bg-slate-50 border-b border-slate-200 text-sm">
          <div className="p-4 flex items-center gap-3">
            <CreditCard className="h-5 w-5 text-indigo-600 shrink-0" />
            <div>
              <p className="text-xs text-slate-500 font-semibold">Soma dos Lançamentos</p>
              <p className="font-bold text-slate-900">R$ {totalValor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
            </div>
          </div>
          <div className="p-4 flex items-center gap-3">
            <Building2 className="h-5 w-5 text-indigo-600 shrink-0" />
            <div>
              <p className="text-xs text-slate-500 font-semibold">Classificação</p>
              <p className="font-bold text-slate-900">{colaborador.cargo || 'Colaborador'}</p>
            </div>
          </div>
          <div className="p-4 flex items-center gap-3">
            <FolderOpen className="h-5 w-5 text-indigo-600 shrink-0" />
            <div>
              <p className="text-xs text-slate-500 font-semibold">Status de Arquivos</p>
              <p className="font-bold text-emerald-600">{totalDocumentos > 0 ? 'Documentado' : 'Sem anexos'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* List of Lancamentos */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Files className="w-5 h-5 text-indigo-600" />
          Histórico de Lançamentos e Documentos
        </h2>

        <div className="space-y-3">
          {colaborador.lancamentos.map((l) => (
            <Link key={l.id} href={`/lancamento/${l.id}`} className="block group">
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:border-indigo-300 hover:shadow-md transition-all flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                      {l.appSheetId || l.id.slice(0, 8)}
                    </span>
                    <span className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                      {l.valor ? `R$ ${l.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : 'Valor não informado'}
                    </span>
                    {l.numeroNotaFiscal && (
                      <span className="text-xs font-semibold text-slate-500">NF: {l.numeroNotaFiscal}</span>
                    )}
                  </div>

                  <p className="text-sm text-slate-600 truncate max-w-xl">{l.descricao || 'Sem descrição'}</p>

                  <div className="flex items-center gap-4 text-xs text-slate-400 pt-1">
                    {l.dataEmissao && (
                      <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> Emissão: {l.dataEmissao.toLocaleDateString('pt-BR')}</span>
                    )}
                    {l.vencimento && (
                      <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-rose-500" /> Vencimento: {l.vencimento.toLocaleDateString('pt-BR')}</span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-100">
                    <FileText className="w-3.5 h-3.5" /> {l.documentos.length} arquivo(s)
                  </span>
                </div>
              </div>
            </Link>
          ))}

          {colaborador.lancamentos.length === 0 && (
            <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-slate-300">
              <FileText className="mx-auto h-12 w-12 text-slate-300" />
              <h3 className="mt-2 text-sm font-bold text-slate-900">Nenhum lançamento vinculado</h3>
              <p className="mt-1 text-xs text-slate-500">Este colaborador ainda não possui lançamentos de despesas.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
