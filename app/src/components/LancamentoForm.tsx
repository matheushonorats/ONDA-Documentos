'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Calendar, FileText, Plus, X, ClipboardPaste } from 'lucide-react';
import { createLancamento } from '@/actions/lancamentos';

type Props = {
  initialTipo: 'RECEITA' | 'DESPESA';
  clientes: { id: string, razaoSocial: string, nomeFantasia: string | null }[];
  colaboradores: { id: string, nome: string }[];
  agencias: { id: string, nome: string }[];
  tiposDocumento: { id: string, nome: string }[];
  veiculos: { id: string, nome: string }[];
};



export function LancamentoForm({ initialTipo, clientes, colaboradores, agencias, tiposDocumento, veiculos }: Props) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tipoLancamento, setTipoLancamento] = useState<'RECEITA' | 'DESPESA'>(initialTipo);
  const [novoRegistro, setNovoRegistro] = useState(false);

  // Formulário State
  const [buscaPessoa, setBuscaPessoa] = useState('');
  
  // Campos do Novo Registro Inline
  const [novoPessoaNome, setNovoPessoaNome] = useState('');
  const [novoClienteNomeFantasia, setNovoClienteNomeFantasia] = useState('');
  const [novoPessoaDoc, setNovoPessoaDoc] = useState(''); // CNPJ/CPF
  const [novoClienteCidade, setNovoClienteCidade] = useState('');
  
  // API IBGE
  const [ufs, setUfs] = useState<{ sigla: string, nome: string }[]>([]);
  const [selectedUf, setSelectedUf] = useState('');
  const [cidadesIbge, setCidadesIbge] = useState<{ id: number, nome: string }[]>([]);

  useEffect(() => {
    if (tipoLancamento === 'RECEITA' && novoRegistro && ufs.length === 0) {
      fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome')
        .then(res => res.json())
        .then(data => setUfs(data))
        .catch(console.error);
    }
  }, [novoRegistro, tipoLancamento, ufs.length]);

  useEffect(() => {
    if (selectedUf) {
      fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`)
        .then(res => res.json())
        .then(data => setCidadesIbge(data))
        .catch(console.error);
    }
  }, [selectedUf]);
  
  const [buscaVeiculo, setBuscaVeiculo] = useState('');
  const [buscaAgencia, setBuscaAgencia] = useState('');

  const [numeroNotaFiscal, setNumeroNotaFiscal] = useState('');
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  
  // Data Emissão pré-preenchida com hoje
  const [dataEmissao, setDataEmissao] = useState(() => new Date().toISOString().split('T')[0]);
  const [vencimento, setVencimento] = useState('');
  
  // Parcelamento
  const [gerarParcelas, setGerarParcelas] = useState(false);
  const [qtdParcelas, setQtdParcelas] = useState(2);
  
  // Campos Complementares
  const [numeroPi, setNumeroPi] = useState('');
  const [numeroContrato, setNumeroContrato] = useState('');
  
  // Mês / Ano Referência
  const [mesAnoReferencia, setMesAnoReferencia] = useState('');

  // Arquivos Temporários
  const [arquivos, setArquivos] = useState<{ tipoId: string, novoTipoDocumento: string, nomeOriginal: string, file: File | null }[]>([]);

  // Datalists / Filtros
  const clientesFiltrados = clientes.filter(c => `${c.nomeFantasia || ''} ${c.razaoSocial}`.toLowerCase().includes(buscaPessoa.toLowerCase()));
  const colaboradoresFiltrados = colaboradores.filter(c => c.nome.toLowerCase().includes(buscaPessoa.toLowerCase()));
  const agenciasFiltradas = agencias.filter(a => a.nome.toLowerCase().includes(buscaAgencia.toLowerCase()));
  const veiculosFiltrados = veiculos.filter(v => v.nome.toLowerCase().includes(buscaVeiculo.toLowerCase()));

  // Lógica Condicional para Exibição dos Campos Complementares
  const hasPI = arquivos.some(a => {
    if (a.tipoId === 'NOVO') return a.novoTipoDocumento.toLowerCase().includes('pi');
    const t = tiposDocumento.find(t => t.id === a.tipoId);
    return t?.nome.toLowerCase().includes('pi') || t?.nome.toLowerCase().includes('p.i');
  });

  const hasContrato = arquivos.some(a => {
    if (a.tipoId === 'NOVO') return a.novoTipoDocumento.toLowerCase().includes('contrato');
    const t = tiposDocumento.find(t => t.id === a.tipoId);
    return t?.nome.toLowerCase().includes('contrato');
  });

  const hasPIorContrato = hasPI || hasContrato;

  const addArquivoSlot = () => {
    setArquivos([...arquivos, { tipoId: tiposDocumento[0]?.id || '', novoTipoDocumento: '', nomeOriginal: '', file: null }]);
  };

  const removeArquivo = (index: number) => {
    setArquivos(arquivos.filter((_, i) => i !== index));
  };

  const handleFileChange = (index: number, file: File | null) => {
    const newArr = [...arquivos];
    newArr[index].file = file;
    
    if (file) {
      if (!newArr[index].nomeOriginal) {
        newArr[index].nomeOriginal = file.name;
      }
      if (!numeroNotaFiscal && file.name.includes('_')) {
        const possivelNF = file.name.split('_')[0].trim();
        // Apenas preenche automaticamente se a primeira parte antes do underline for puramente numérica
        if (/^\d+$/.test(possivelNF)) {
          setNumeroNotaFiscal(possivelNF);
        }
      }
    }
    setArquivos(newArr);
  };

  const handlePasteDescricao = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setDescricao(prev => prev + (prev ? ' ' : '') + text);
    } catch (err) {
      console.error('Falha ao colar', err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append('tipoLancamento', tipoLancamento);
      
      if (novoRegistro) {
        if (tipoLancamento === 'RECEITA') {
          formData.append('novoClienteNome', novoPessoaNome);
          if (novoClienteNomeFantasia) formData.append('novoClienteNomeFantasia', novoClienteNomeFantasia);
          if (novoPessoaDoc) formData.append('novoClienteCnpj', novoPessoaDoc);
          if (novoClienteCidade) formData.append('novoClienteCidade', novoClienteCidade);
        } else {
          formData.append('novoColaboradorNome', novoPessoaNome);
          // O backend já salva o cargo e tipificação como Fornecedor. CPF/CNPJ não é capturado no form do backend atual para colaborador na criação inline, 
          // mas é capturado pela rota de importar cadastros.
        }
      } else {
        if (tipoLancamento === 'RECEITA') {
          const clienteSelecionado = clientes.find(c => (c.nomeFantasia || c.razaoSocial) === buscaPessoa || c.razaoSocial === buscaPessoa);
          if (clienteSelecionado) formData.append('clienteId', clienteSelecionado.id);
        } else {
          const colaboradorSelecionado = colaboradores.find(c => c.nome === buscaPessoa);
          if (colaboradorSelecionado) formData.append('colaboradorId', colaboradorSelecionado.id);
        }
      }
      
      const agenciaSelecionada = agencias.find(a => a.nome === buscaAgencia);
      if (agenciaSelecionada) formData.append('agenciaId', agenciaSelecionada.id);
      const veiculoSelecionado = veiculos.find(v => v.nome === buscaVeiculo);
      if (veiculoSelecionado) formData.append('veiculoId', veiculoSelecionado.id);

      if (numeroNotaFiscal) formData.append('numeroNotaFiscal', numeroNotaFiscal);
      if (descricao) formData.append('descricao', descricao);
      if (valor) formData.append('valor', valor);
      if (dataEmissao) formData.append('dataEmissao', dataEmissao);
      if (vencimento) formData.append('vencimento', vencimento);
      
      if (gerarParcelas) {
        formData.append('gerarParcelas', 'true');
        formData.append('qtdParcelas', qtdParcelas.toString());
      }
      
      if (hasPI && numeroPi) formData.append('numeroPi', numeroPi);
      if (hasContrato && numeroContrato) formData.append('numeroContrato', numeroContrato);
      
      // Concatenar mes/ano se preenchido
      if (hasPIorContrato && mesAnoReferencia) {
        formData.append('mesAnoReferencia', mesAnoReferencia);
      }
      
      formData.append('arquivosMeta', JSON.stringify(arquivos.map(a => ({ 
        tipoId: a.tipoId, 
        novoTipoDocumento: a.tipoId === 'NOVO' ? a.novoTipoDocumento : undefined,
        nomeOriginal: a.nomeOriginal || a.file?.name 
      }))));

      // Append real files
      arquivos.forEach((arq, idx) => {
        if (arq.file) {
          formData.append(`file_${idx}`, arq.file);
        }
      });

      const res = await createLancamento(formData);
      if (res?.success) {
        router.push(`/lancamento/${res.id}`);
      } else {
        alert(res?.error || 'Não foi possível salvar o lançamento.');
        setIsSubmitting(false);
      }
    } catch (err) {
      console.error(err);
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Seção 1: Cliente/Colaborador e Agência */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        <div className="border-b border-slate-100 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h2 className="text-xl font-bold text-slate-800">
            1. Dados da Origem / Destino
          </h2>
          <div className="flex bg-slate-100 p-1 rounded-xl w-fit">
            <button type="button" onClick={() => { setTipoLancamento('RECEITA'); setNovoRegistro(false); setBuscaPessoa(''); }} className={`px-4 py-1.5 rounded-lg text-sm font-bold transition-colors ${tipoLancamento === 'RECEITA' ? 'bg-white shadow text-indigo-700' : 'text-slate-500 hover:text-slate-700'}`}>Recebimento (Cliente)</button>
            <button type="button" onClick={() => { setTipoLancamento('DESPESA'); setNovoRegistro(false); setBuscaPessoa(''); }} className={`px-4 py-1.5 rounded-lg text-sm font-bold transition-colors ${tipoLancamento === 'DESPESA' ? 'bg-white shadow text-rose-600' : 'text-slate-500 hover:text-slate-700'}`}>Pagamento (Colaborador)</button>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <button type="button" onClick={() => setNovoRegistro(false)} className={`flex-1 py-3 px-4 rounded-xl font-medium border transition-all active:scale-[0.98] ${!novoRegistro ? 'bg-indigo-50 border-indigo-200 text-indigo-700' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}>
              Selecionar Existente
            </button>
            <button type="button" onClick={() => setNovoRegistro(true)} className={`flex-1 py-3 px-4 rounded-xl font-medium border transition-all active:scale-[0.98] ${novoRegistro ? 'bg-indigo-50 border-indigo-200 text-indigo-700' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}>
              + Criar Novo
            </button>
          </div>

          {!novoRegistro ? (
            <div className="space-y-2 relative">
              <label className="block text-sm font-medium text-slate-700">Buscar {tipoLancamento === 'RECEITA' ? 'Cliente' : 'Colaborador / Fornecedor'}</label>
              <input 
                required 
                type="text" 
                list="pessoas-list"
                value={buscaPessoa} 
                onChange={(e) => setBuscaPessoa(e.target.value)} 
                placeholder="Comece a digitar o nome..."
                className="block w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500" 
              />
              <datalist id="pessoas-list">
                {tipoLancamento === 'RECEITA' ? (
                  clientesFiltrados.map(c => <option key={c.id} value={c.nomeFantasia || c.razaoSocial}>{c.razaoSocial}</option>)
                ) : (
                  colaboradoresFiltrados.map(c => <option key={c.id} value={c.nome}>{c.nome}</option>)
                )}
              </datalist>
            </div>
          ) : (
            <div className="space-y-4 bg-indigo-50/50 p-4 rounded-xl border border-indigo-100">
              <div className="space-y-2">
                <label className="block text-sm font-bold text-slate-700">{tipoLancamento === 'RECEITA' ? 'Razão Social do Novo Cliente' : 'Nome do Colaborador / Fornecedor'}</label>
                <input required type="text" value={novoPessoaNome} onChange={(e) => setNovoPessoaNome(e.target.value)} className="block w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-indigo-500 bg-white" placeholder="Nome completo / Razão Social" />
              </div>
              {tipoLancamento === 'RECEITA' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-700">Nome Fantasia</label>
                    <input type="text" value={novoClienteNomeFantasia} onChange={(e) => setNovoClienteNomeFantasia(e.target.value)} className="block w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-indigo-500 bg-white" />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-700">CNPJ</label>
                    <input type="text" value={novoPessoaDoc} onChange={(e) => setNovoPessoaDoc(e.target.value)} className="block w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-indigo-500 bg-white" />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-700">Estado</label>
                    <select value={selectedUf} onChange={e => { setSelectedUf(e.target.value); setNovoClienteCidade(''); }} className="block w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-indigo-500 bg-white">
                      <option value="">UF...</option>
                      {ufs.map(uf => <option key={uf.sigla} value={uf.sigla}>{uf.sigla}</option>)}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-700">Cidade (IBGE)</label>
                    <select value={novoClienteCidade} onChange={e => setNovoClienteCidade(e.target.value)} disabled={!selectedUf} className="block w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-indigo-500 bg-white disabled:bg-slate-100 disabled:text-slate-400">
                      <option value="">Selecione a cidade...</option>
                      {cidadesIbge.map(c => <option key={c.id} value={`${c.nome} - ${selectedUf}`}>{c.nome}</option>)}
                    </select>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="space-y-2 pt-2 relative">
          <label className="block text-sm font-medium text-slate-700">Agência (Buscar ou Opcional)</label>
          <input 
            type="text" 
            list="agencias-list"
            value={buscaAgencia} 
            onChange={(e) => setBuscaAgencia(e.target.value)} 
            placeholder="Digite para buscar uma agência..."
            className="block w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500" 
          />
          <datalist id="agencias-list">
            {agenciasFiltradas.map(a => <option key={a.id} value={a.nome} />)}
          </datalist>
        </div>
        <div className="space-y-2 pt-2 relative">
          <label className="block text-sm font-medium text-slate-700">Veículo / rádio</label>
          <select value={buscaVeiculo} onChange={(e) => setBuscaVeiculo(e.target.value)} className="block w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-indigo-500 bg-white">
            <option value="">Selecione...</option>
            {veiculos.map(v => <option key={v.id} value={v.nome}>{v.nome}</option>)}
          </select>
        </div>
      </div>

      {/* Seção 2: Documentos */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <h2 className="text-xl font-bold text-slate-800">
            2. Documentos
          </h2>
          <button type="button" onClick={addArquivoSlot} className="text-indigo-600 hover:text-indigo-700 font-medium text-sm flex items-center bg-indigo-50 px-3 py-1.5 rounded-lg transition-all active:scale-[0.96]">
            <Plus className="w-4 h-4 mr-1" /> Adicionar Arquivo
          </button>
        </div>

        <div className="space-y-4">
          {arquivos.length === 0 ? (
            <p className="text-sm text-slate-500 italic">Nenhum arquivo anexado no momento. Você pode adicionar anexos pelo botão acima.</p>
          ) : (
            arquivos.map((arq, idx) => (
              <div key={idx} className="flex flex-col gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200 relative">
                
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="w-full md:w-1/3 space-y-2">
                    <label className="block text-xs font-medium text-slate-500 mb-1">Tipo de Documento</label>
                    <select value={arq.tipoId} onChange={(e) => {
                      const newArr = [...arquivos];
                      newArr[idx].tipoId = e.target.value;
                      setArquivos(newArr);
                    }} className="block w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 bg-white">
                      {tiposDocumento.map(t => <option key={t.id} value={t.id}>{t.nome}</option>)}
                      <option value="NOVO" className="font-bold text-indigo-600">+ Cadastrar Novo Tipo</option>
                    </select>
                    
                    {arq.tipoId === 'NOVO' && (
                      <input 
                        type="text" 
                        placeholder="Nome do Novo Tipo (ex: Recibo)" 
                        value={arq.novoTipoDocumento}
                        onChange={(e) => {
                          const newArr = [...arquivos];
                          newArr[idx].novoTipoDocumento = e.target.value;
                          setArquivos(newArr);
                        }}
                        className="block w-full px-3 py-2 text-sm border border-indigo-300 bg-indigo-50 rounded-lg focus:ring-indigo-500" 
                      />
                    )}
                  </div>
                  
                  <div className="w-full md:w-2/3">
                    <label className="block text-xs font-medium text-slate-500 mb-1">Selecionar Arquivo</label>
                    <input type="file" onChange={(e) => handleFileChange(idx, e.target.files?.[0] || null)} className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-white file:border file:border-slate-300 file:text-slate-700 hover:file:bg-slate-50 transition-colors" />
                    {arq.nomeOriginal && (
                      <p className="mt-2 text-xs text-slate-500">Arquivo: <span className="font-medium text-slate-700">{arq.nomeOriginal}</span></p>
                    )}
                  </div>
                </div>
                
                <button type="button" onClick={() => removeArquivo(idx)} className="absolute -top-2 -right-2 bg-white border border-red-200 text-red-500 p-1.5 rounded-full hover:bg-red-50 transition-colors shadow-sm">
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Informações Complementares Ativadas Condicionalmente pelos Documentos */}
        {hasPIorContrato && (
          <div className="pt-4 border-t border-slate-200 bg-indigo-50/50 -mx-6 -mb-6 p-6 rounded-b-2xl">
            <p className="text-sm font-semibold text-indigo-800 mb-4 flex items-center gap-2">
              <FileText className="w-4 h-4" /> Informações Complementares Solicitadas (PI / Contrato)
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              
              {hasPI && (
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-700">Número de PI</label>
                  <input required type="text" value={numeroPi} onChange={(e) => setNumeroPi(e.target.value)} className="block w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-indigo-500 text-sm bg-white" />
                </div>
              )}
              
              {hasContrato && (
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-700">Número do Contrato</label>
                  <input required type="text" value={numeroContrato} onChange={(e) => setNumeroContrato(e.target.value)} className="block w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-indigo-500 text-sm bg-white" />
                </div>
              )}

              {/* Mês Ano Referência */}
              <div className="space-y-2 sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700">Mês/Ano Referência</label>
                <input type="month" value={mesAnoReferencia} onChange={e => setMesAnoReferencia(e.target.value)} className="block w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-indigo-500 text-sm bg-white" />
              </div>
              
            </div>
          </div>
        )}
      </div>

      {/* Seção 3: Dados da Operação */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-4 gap-4">
          <h2 className="text-xl font-bold text-slate-800">
            3. Dados da Operação
          </h2>
          <label className="flex items-center gap-2 cursor-pointer bg-slate-50 px-3 py-2 rounded-lg border border-slate-200">
            <input type="checkbox" checked={gerarParcelas} onChange={(e) => setGerarParcelas(e.target.checked)} className="rounded text-indigo-600 focus:ring-indigo-500 w-4 h-4" />
            <span className="text-sm font-bold text-slate-700">Dividir em múltiplas parcelas</span>
          </label>
        </div>

        {gerarParcelas && (
          <div className="bg-indigo-50/50 border border-indigo-100 p-4 rounded-xl flex flex-col sm:flex-row gap-4 items-center">
            <div className="w-full sm:w-1/3 space-y-2">
              <label className="block text-sm font-bold text-indigo-900">Qtd. de Parcelas</label>
              <input type="number" min="2" max="100" value={qtdParcelas} onChange={(e) => setQtdParcelas(parseInt(e.target.value) || 2)} className="block w-full px-4 py-2 border border-indigo-200 rounded-lg focus:ring-indigo-500 font-bold" />
            </div>
            <div className="w-full sm:w-2/3 text-sm text-indigo-700 font-medium">
              O sistema criará {qtdParcelas} lançamentos separados. O <strong className="font-bold">Valor Total</strong> será dividido por {qtdParcelas}, e o <strong className="font-bold">Vencimento / Mês Ref.</strong> de cada parcela avançará 1 mês automaticamente. Anexos ficarão na 1ª parcela.
            </div>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700 flex items-center gap-1"><FileText className="w-4 h-4"/> Número da Nota Fiscal (NF)</label>
            <input type="text" value={numeroNotaFiscal} onChange={(e) => setNumeroNotaFiscal(e.target.value)} placeholder="Ex: 1234 (Preenche auto se anexar o PDF)" className="block w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500" />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700">{gerarParcelas ? 'Valor Total (R$) - Será dividido' : 'Valor Bruto (R$)'}</label>
            <input type="number" step="0.01" value={valor} onChange={(e) => setValor(e.target.value)} className="block w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500" />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700 flex items-center gap-1"><Calendar className="w-4 h-4"/> Data de Emissão (Base)</label>
            <input type="date" value={dataEmissao} onChange={(e) => setDataEmissao(e.target.value)} className="block w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500" />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700 flex items-center gap-1"><Calendar className="w-4 h-4 text-rose-500"/> Data de Vencimento (1ª Parcela)</label>
            <input type="date" value={vencimento} onChange={(e) => setVencimento(e.target.value)} className="block w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500" />
          </div>
        </div>
        
        <div className="space-y-2 pt-2">
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium text-slate-700">Descrição Livre</label>
            <button type="button" onClick={handlePasteDescricao} className="text-xs font-medium text-indigo-600 bg-indigo-50 px-2 py-1 rounded hover:bg-indigo-100 flex items-center gap-1 transition-colors">
              <ClipboardPaste className="w-3 h-3" /> Colar da Área de Transferência
            </button>
          </div>
          <textarea value={descricao} onChange={(e) => setDescricao(e.target.value)} rows={3} placeholder="Referente a campanha X..." className="block w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500" />
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <button type="submit" disabled={isSubmitting} className="flex items-center px-8 py-4 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 hover:shadow-lg transition-all active:scale-[0.98] shadow-md disabled:opacity-50">
          {isSubmitting ? 'Salvando...' : 'Salvar Novo Lançamento'}
        </button>
      </div>

    </form>
  );
}
