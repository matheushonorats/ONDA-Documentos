'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lancamento } from '@/generated/prisma';
import { ArrowLeft, Save, Edit3, Loader2, Trash2, Link as LinkIcon, ExternalLink, UploadCloud } from 'lucide-react';
import Link from 'next/link';
import { updateLancamento, deleteLancamento } from '@/actions/lancamentos';

interface EditProps {
  lancamento: Lancamento;
  agencias: { id: string; nome: string }[];
  veiculos: { id: string; nome: string }[];
  clientes: { id: string; razaoSocial: string; nomeFantasia: string | null }[];
  colaboradores: { id: string; nome: string }[];
  initialUrlNotaFiscal?: string;
  documentosCount?: number;
}

export function EditLancamentoClient({
  lancamento,
  agencias,
  veiculos,
  clientes,
  colaboradores,
  initialUrlNotaFiscal = '',
  documentosCount = 0,
}: EditProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [urlNotaFiscal, setUrlNotaFiscal] = useState(initialUrlNotaFiscal);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const res = await updateLancamento(lancamento.id, formData);
    
    if (res.success) {
      router.push(`/lancamento/${lancamento.id}`);
    } else {
      setError('Erro ao salvar as alterações.');
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Tem certeza que deseja excluir este lançamento? Esta ação não pode ser desfeita.')) return;
    setLoading(true);
    setError(null);
    const res = await deleteLancamento(lancamento.id);
    if (res.success) {
      router.push('/lancamentos');
    } else {
      setError(res.error || 'Erro ao excluir o lançamento.');
      setLoading(false);
    }
  };

  const toDateString = (d: Date | null) => d ? new Date(d).toISOString().split('T')[0] : '';

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div>
        <Link href={`/lancamento/${lancamento.id}`} className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-indigo-600 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-1" />
          Voltar para o lançamento
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-8 bg-slate-50 border-b border-slate-200">
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Edit3 className="w-6 h-6 text-indigo-600" />
            Editar Dados do Lançamento
          </h1>
        </div>
        
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {error && (
            <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm border border-red-100 font-medium">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {lancamento.tipoLancamento === 'RECEITA' ? (
              <div className="space-y-2 sm:col-span-2">
                <label className="block text-sm font-medium text-slate-700">Cliente</label>
                <select name="clienteId" defaultValue={lancamento.clienteId || ''} className="block w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-slate-900 bg-white">
                  <option value="">Selecione o cliente...</option>
                  {clientes.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.nomeFantasia ? `${c.nomeFantasia} (${c.razaoSocial})` : c.razaoSocial}
                    </option>
                  ))}
                </select>
              </div>
            ) : (
              <div className="space-y-2 sm:col-span-2">
                <label className="block text-sm font-medium text-slate-700">Colaborador / Fornecedor</label>
                <select name="colaboradorId" defaultValue={lancamento.colaboradorId || ''} className="block w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-slate-900 bg-white">
                  <option value="">Selecione o colaborador...</option>
                  {colaboradores.map((c) => (
                    <option key={c.id} value={c.id}>{c.nome}</option>
                  ))}
                </select>
              </div>
            )}

            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700">Veículo / Rádio</label>
              <select name="veiculoId" defaultValue={lancamento.veiculoId || ''} className="block w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-slate-900 bg-white">
                <option value="">Nenhum veículo selecionado</option>
                {veiculos.map((v) => (
                  <option key={v.id} value={v.id}>{v.nome}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700">Agência</label>
              <select name="agenciaId" defaultValue={lancamento.agenciaId || ''} className="block w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-slate-900 bg-white">
                <option value="">Sem agência vinculada</option>
                {agencias.map((ag) => (
                  <option key={ag.id} value={ag.id}>{ag.nome}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700">N.º da Nota Fiscal</label>
              <input type="text" name="numeroNotaFiscal" defaultValue={lancamento.numeroNotaFiscal || ''} className="block w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-slate-900" />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700">Valor (R$)</label>
              <input type="number" step="0.01" name="valor" defaultValue={lancamento.valor || ''} className="block w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-slate-900" />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700">Data de Emissão</label>
              <input type="date" name="dataEmissao" defaultValue={toDateString(lancamento.dataEmissao)} className="block w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-slate-900" />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700">Data de Vencimento</label>
              <input type="date" name="vencimento" defaultValue={toDateString(lancamento.vencimento)} className="block w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-slate-900" />
            </div>

            {lancamento.tipoLancamento === 'RECEITA' && (
              <>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-700">Número do PI</label>
                  <input type="text" name="numeroPi" defaultValue={lancamento.numeroPi || ''} className="block w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-slate-900" />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-700">N.º do Contrato</label>
                  <input type="text" name="numeroContrato" defaultValue={lancamento.numeroContrato || ''} className="block w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-slate-900" />
                </div>
              </>
            )}

            <div className="space-y-2 sm:col-span-2">
              <label className="block text-sm font-medium text-slate-700">Mês/Ano Ref.</label>
              <input type="month" name="mesAnoReferencia" defaultValue={(() => {
                if (!lancamento.mesAnoReferencia) return '';
                const match = lancamento.mesAnoReferencia.match(/^(\d{2})\/(\d{4})$/);
                return match ? `${match[2]}-${match[1]}` : '';
              })()} className="block w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-slate-900 bg-white" />
              {lancamento.mesAnoReferencia && !lancamento.mesAnoReferencia.match(/^\d{2}\/\d{4}$/) && (
                <p className="text-xs text-slate-500 mt-1">Valor atual no sistema: {lancamento.mesAnoReferencia}</p>
              )}
            </div>

            <div className="space-y-2 sm:col-span-2">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-slate-700 flex items-center gap-1.5">
                  <LinkIcon className="w-4 h-4 text-indigo-600" />
                  Link / URL da Nota Fiscal Emitida (Opcional)
                </label>
                {urlNotaFiscal && (
                  <a
                    href={urlNotaFiscal.startsWith('http') ? urlNotaFiscal : `https://${urlNotaFiscal}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 transition-colors"
                  >
                    Testar link <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
              <input
                type="text"
                name="urlNotaFiscal"
                value={urlNotaFiscal}
                onChange={(e) => setUrlNotaFiscal(e.target.value)}
                placeholder="Ex: https://nfe.prefeitura.sp.gov.br/publico/verificacao?..."
                className="block w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-slate-900 text-sm"
              />
              <p className="text-xs text-slate-500">
                Endereço web de verificação da Nota Fiscal na prefeitura. Ao salvar, é sincronizado automaticamente neste lançamento.
              </p>
            </div>

            <div className="space-y-2 sm:col-span-2">
              <label className="block text-sm font-medium text-slate-700">Descrição</label>
              <textarea name="descricao" rows={3} defaultValue={lancamento.descricao || ''} className="block w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-slate-900"></textarea>
            </div>

            {/* Atalho para Acervo Documental */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 sm:col-span-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="text-xs text-slate-600">
                <p className="font-bold text-slate-800 flex items-center gap-1.5">
                  <UploadCloud className="w-4 h-4 text-indigo-600" />
                  Anexos e Documentos Vinculados
                </p>
                <p className="mt-0.5">
                  Este lançamento possui <strong>{documentosCount} documento(s)</strong> anexado(s) entre arquivos e links.
                </p>
              </div>
              <Link
                href={`/novo-documento?lancamento=${lancamento.id}`}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 transition-colors shrink-0"
              >
                + Gerenciar / Anexar Arquivos
              </Link>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-200 flex gap-4">
            <button 
              type="button"
              onClick={handleDelete}
              disabled={loading}
              className="flex-1 flex items-center justify-center px-6 py-4 border border-red-200 text-base font-medium rounded-xl text-red-700 bg-red-50 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
            >
              <Trash2 className="mr-2 h-5 w-5" />
              Excluir
            </button>
            <button 
              type="submit" 
              disabled={loading}
              className="flex-1 flex items-center justify-center px-6 py-4 border border-transparent text-base font-medium rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" />
                  Salvando Alterações...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-5 w-5" />
                  Salvar
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
