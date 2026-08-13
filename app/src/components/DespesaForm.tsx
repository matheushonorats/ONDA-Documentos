'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { UploadCloud, X, Check, FileIcon } from 'lucide-react';
import { createLancamento } from '@/actions/lancamentos';

type Props = {
  colaboradores: { id: string, nome: string }[];
  tiposDocumento: { id: string, nome: string }[];
  veiculos: { id: string, nome: string }[];
};

export function DespesaForm({ colaboradores, tiposDocumento, veiculos }: Props) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [novoColaborador, setNovoColaborador] = useState(false);

  // Formulário State
  const [buscaColaborador, setBuscaColaborador] = useState('');
  const [novoColaboradorNome, setNovoColaboradorNome] = useState('');
  
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [vencimento, setVencimento] = useState('');
  const [buscaVeiculo, setBuscaVeiculo] = useState('');

  // Arquivos
  const [arquivos, setArquivos] = useState<{file: File, tipoId: string, novoTipoDocumento: string}[]>([]);

  // Datalists / Filtros
  const colaboradoresFiltrados = colaboradores.filter(c => c.nome.toLowerCase().includes(buscaColaborador.toLowerCase()));

  const handleAddArquivo = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).map(file => ({
        file,
        tipoId: '',
        novoTipoDocumento: ''
      }));
      setArquivos([...arquivos, ...newFiles]);
    }
  };

  const updateArquivo = (index: number, field: string, value: string) => {
    const newArquivos = [...arquivos];
    newArquivos[index] = { ...newArquivos[index], [field]: value };
    setArquivos(newArquivos);
  };

  const removeArquivo = (index: number) => {
    setArquivos(arquivos.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!novoColaborador && !buscaColaborador) {
      alert("Selecione um colaborador.");
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append('tipoLancamento', 'DESPESA'); // Define que é uma conta a pagar
      
      if (novoColaborador) {
        // We will need to adapt the action to support creating a novoColaborador if needed. 
        // For now, assume action can handle or we just require existing.
        formData.append('novoColaboradorNome', novoColaboradorNome);
      } else {
        const colabSelecionado = colaboradores.find(c => c.nome === buscaColaborador);
        if (colabSelecionado) formData.append('colaboradorId', colabSelecionado.id);
      }
      
      formData.append('descricao', descricao);
      const veiculoSelecionado = veiculos.find(v => v.nome === buscaVeiculo);
      if (veiculoSelecionado) formData.append('veiculoId', veiculoSelecionado.id);
      if (valor) formData.append('valor', valor);
      if (vencimento) formData.append('vencimento', vencimento);

      const arquivosMeta = arquivos.map(a => ({
        tipoId: a.tipoId,
        novoTipoDocumento: a.novoTipoDocumento,
        nomeOriginal: a.file.name
      }));
      formData.append('arquivosMeta', JSON.stringify(arquivosMeta));

      arquivos.forEach((a, index) => {
        formData.append(`file_${index}`, a.file);
      });

      const result = await createLancamento(formData);

      if (result.success) {
        router.push(`/lancamento/${result.id}`);
      } else {
        alert(result.error || "Erro ao salvar lançamento.");
      }
    } catch (error) {
      console.error(error);
      alert("Ocorreu um erro inesperado.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Seção 1: Colaborador */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        <h2 className="text-xl font-bold text-slate-800 border-b border-slate-100 pb-4">
          1. Dados do Colaborador / Fornecedor
        </h2>
        
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <button type="button" onClick={() => setNovoColaborador(false)} className={`flex-1 py-3 px-4 rounded-xl font-medium border transition-colors ${!novoColaborador ? 'bg-indigo-50 border-indigo-200 text-indigo-700' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}>
              Selecionar Existente
            </button>
            <button type="button" onClick={() => setNovoColaborador(true)} className={`flex-1 py-3 px-4 rounded-xl font-medium border transition-colors ${novoColaborador ? 'bg-indigo-50 border-indigo-200 text-indigo-700' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}>
              + Cadastrar Novo
            </button>
          </div>

          {!novoColaborador ? (
            <div className="space-y-2 relative">
              <label className="block text-sm font-medium text-slate-700">Buscar Colaborador</label>
              <input 
                required 
                type="text" 
                list="colaboradores-list"
                value={buscaColaborador} 
                onChange={(e) => setBuscaColaborador(e.target.value)} 
                placeholder="Comece a digitar o nome..."
                className="block w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500" 
              />
              <datalist id="colaboradores-list">
                {colaboradoresFiltrados.map(c => <option key={c.id} value={c.nome} />)}
              </datalist>
            </div>
          ) : (
            <div className="space-y-4 bg-indigo-50/50 p-4 rounded-xl border border-indigo-100">
              <div className="space-y-2">
                <label className="block text-sm font-bold text-slate-700">Nome do Novo Colaborador</label>
                <input required type="text" value={novoColaboradorNome} onChange={(e) => setNovoColaboradorNome(e.target.value)} className="block w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-indigo-500 bg-white" placeholder="Ex: João da Silva" />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Seção 2: Dados de Pagamento */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        <h2 className="text-xl font-bold text-slate-800 border-b border-slate-100 pb-4">
          2. Dados do Pagamento
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700">Descrição / Serviço Referência</label>
            <input required type="text" value={descricao} onChange={(e) => setDescricao(e.target.value)} placeholder="Ex: Contrato de Prestação de Serviço, Auxílio Combustível..." className="block w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500" />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700">Valor (R$)</label>
            <input required type="number" step="0.01" value={valor} onChange={(e) => setValor(e.target.value)} placeholder="0.00" className="block w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500" />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700">Data de Vencimento</label>
            <input required type="date" value={vencimento} onChange={(e) => setVencimento(e.target.value)} className="block w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500" />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700">Veículo / rádio</label>
            <input type="text" list="veiculos-despesa-list" value={buscaVeiculo} onChange={(e) => setBuscaVeiculo(e.target.value)} placeholder="Selecione o veículo" className="block w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500" />
            <datalist id="veiculos-despesa-list">{veiculos.map(v => <option key={v.id} value={v.nome} />)}</datalist>
          </div>
        </div>
      </div>

      {/* Seção 3: Anexos */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <h2 className="text-xl font-bold text-slate-800">
            3. Arquivos e Comprovantes
          </h2>
          <label className="cursor-pointer bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm flex items-center gap-2">
            <UploadCloud className="w-4 h-4" />
            Anexar Arquivo
            <input type="file" multiple className="hidden" onChange={handleAddArquivo} />
          </label>
        </div>

        {arquivos.length > 0 ? (
          <div className="space-y-4">
            {arquivos.map((arq, index) => (
              <div key={index} className="flex flex-col sm:flex-row gap-4 p-4 rounded-xl border border-indigo-100 bg-indigo-50/30">
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-2 text-sm font-medium text-indigo-900 bg-white px-3 py-2 rounded-md border border-indigo-100 shrink-0">
                    <FileIcon className="w-4 h-4 text-indigo-500" />
                    <span className="truncate max-w-[200px]">{arq.file.name}</span>
                  </div>
                  
                  <div className="flex-1 flex flex-col sm:flex-row gap-2">
                    <select required value={arq.tipoId} onChange={(e) => updateArquivo(index, 'tipoId', e.target.value)} className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:ring-indigo-500 text-sm bg-white">
                      <option value="">O que é este arquivo?</option>
                      {tiposDocumento.map(t => <option key={t.id} value={t.id}>{t.nome}</option>)}
                      <option value="NOVO">+ Criar Novo Tipo</option>
                    </select>

                    {arq.tipoId === 'NOVO' && (
                      <input required type="text" placeholder="Ex: Contrato Assinado" value={arq.novoTipoDocumento} onChange={(e) => updateArquivo(index, 'novoTipoDocumento', e.target.value)} className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:ring-indigo-500 text-sm bg-white" />
                    )}
                  </div>
                </div>

                <button type="button" onClick={() => removeArquivo(index)} className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg self-start sm:self-center transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-10 px-4 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50 text-slate-500">
            <UploadCloud className="w-10 h-10 text-slate-300 mb-2" />
            <p className="text-sm">Nenhum arquivo anexado ainda.</p>
            <p className="text-xs mt-1">Anexe contratos, recibos ou comprovantes associados a esta despesa.</p>
          </div>
        )}
      </div>

      <div className="pt-6">
        <button type="submit" disabled={isSubmitting} className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-bold text-lg py-4 px-8 rounded-xl shadow-lg shadow-indigo-200 transition-all flex items-center justify-center gap-2">
          {isSubmitting ? 'Salvando Lançamento...' : <><Check className="w-6 h-6" /> Salvar Conta a Pagar</>}
        </button>
      </div>
    </form>
  );
}
