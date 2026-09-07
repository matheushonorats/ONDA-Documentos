'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Calendar, 
  FileText, 
  Plus, 
  X, 
  ClipboardPaste, 
  Link as LinkIcon,
  Layers,
  Sparkles,
  Building2,
  DollarSign,
  Info,
  CheckCircle2
} from 'lucide-react';
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
  const [urlNotaFiscal, setUrlNotaFiscal] = useState('');
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  
  // Data Emissão pré-preenchida com a data local de hoje (fuso do Brasil)
  const [dataEmissao, setDataEmissao] = useState(() => {
    const d = new Date();
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  });
  const [vencimento, setVencimento] = useState('');
  
  // Parcelamento
  const [gerarParcelas, setGerarParcelas] = useState(false);
  const [qtdParcelas, setQtdParcelas] = useState(2);
  
  // Campos Comerciais / Identificação da Campanha
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

  // Dynamic preview of installments
  const parcelasPreview = useMemo(() => {
    if (!gerarParcelas || qtdParcelas < 2) return [];
    const totalVal = parseFloat(valor) || 0;
    const totalCents = Math.round(totalVal * 100);
    const baseCents = Math.floor(totalCents / qtdParcelas);
    const remainderCents = totalCents - (baseCents * qtdParcelas);
    
    const items = [];
    const baseDate = vencimento ? new Date(vencimento + 'T12:00:00') : null;
    
    let baseMonth: number | null = null;
    let baseYear: number | null = null;
    if (mesAnoReferencia) {
      if (/^\d{4}-\d{2}$/.test(mesAnoReferencia)) {
        const [y, m] = mesAnoReferencia.split('-').map(Number);
        baseYear = y;
        baseMonth = m;
      } else if (/^\d{2}\/\d{4}$/.test(mesAnoReferencia)) {
        const [m, y] = mesAnoReferencia.split('/').map(Number);
        baseMonth = m;
        baseYear = y;
      }
    } else if (baseDate) {
      baseMonth = baseDate.getMonth() + 1;
      baseYear = baseDate.getFullYear();
    }

    for (let i = 0; i < Math.min(qtdParcelas, 36); i++) {
      let dataPrevista = 'A definir';
      if (baseDate) {
        const d = new Date(baseDate);
        d.setMonth(d.getMonth() + i);
        dataPrevista = d.toLocaleDateString('pt-BR');
      }

      let refStr = '—';
      if (baseMonth !== null && baseYear !== null) {
        let m = baseMonth + i;
        let y = baseYear;
        while (m > 12) {
          m -= 12;
          y += 1;
        }
        refStr = `${String(m).padStart(2, '0')}/${y}`;
      }

      const parcelCents = (i === qtdParcelas - 1) ? baseCents + remainderCents : baseCents;
      const parcelVal = totalVal > 0 ? parcelCents / 100 : null;

      items.push({
        numero: i + 1,
        total: qtdParcelas,
        vencimento: dataPrevista,
        mesRef: refStr,
        valor: parcelVal,
        isPrimeira: i === 0,
      });
    }
    return items;
  }, [gerarParcelas, qtdParcelas, valor, vencimento, mesAnoReferencia]);

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
      
      const lower = file.name.toLowerCase();

      // Sugerir número da NF caso o arquivo comece com número ou contenha NF
      if (!numeroNotaFiscal) {
        const match = file.name.match(/(?:nf[_\-\s]?|nota[_\-\s]?)(\d+)/i) || 
                      (file.name.includes('_') && file.name.split('_')[0].trim().match(/^\d+$/) ? [null, file.name.split('_')[0].trim()] : null);
        if (match && match[1]) {
          setNumeroNotaFiscal(match[1]);
        }
      }

      // Autodetectar tipo do documento baseado no nome do arquivo
      if (!newArr[index].tipoId || newArr[index].tipoId === tiposDocumento[0]?.id) {
        if (lower.includes('nota') || lower.includes('nf') || lower.includes('danfe')) {
          const t = tiposDocumento.find(td => td.nome.toLowerCase().includes('nota') || td.nome.toLowerCase().includes('nf'));
          if (t) newArr[index].tipoId = t.id;
        } else if (lower.includes('pi') || lower.includes('pedido')) {
          const t = tiposDocumento.find(td => td.nome.toLowerCase().includes('pi') || td.nome.toLowerCase().includes('pedido'));
          if (t) newArr[index].tipoId = t.id;
        } else if (lower.includes('contrato')) {
          const t = tiposDocumento.find(td => td.nome.toLowerCase().includes('contrato'));
          if (t) newArr[index].tipoId = t.id;
        } else if (lower.includes('boleto')) {
          const t = tiposDocumento.find(td => td.nome.toLowerCase().includes('boleto'));
          if (t) newArr[index].tipoId = t.id;
        } else if (lower.includes('comprovante') || lower.includes('recibo')) {
          const t = tiposDocumento.find(td => td.nome.toLowerCase().includes('comprovante') || td.nome.toLowerCase().includes('recibo'));
          if (t) newArr[index].tipoId = t.id;
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
        }
      } else {
        if (tipoLancamento === 'RECEITA') {
          const queryClean = buscaPessoa.trim().toLowerCase();
          const clienteSelecionado = clientes.find(c => 
            (c.nomeFantasia && c.nomeFantasia.toLowerCase() === queryClean) ||
            c.razaoSocial.toLowerCase() === queryClean ||
            `${c.razaoSocial} (${c.nomeFantasia || ''})`.toLowerCase() === queryClean
          ) || clientes.find(c => 
            c.razaoSocial.toLowerCase().includes(queryClean) || 
            (c.nomeFantasia && c.nomeFantasia.toLowerCase().includes(queryClean))
          );
          if (clienteSelecionado) formData.append('clienteId', clienteSelecionado.id);
        } else {
          const queryClean = buscaPessoa.trim().toLowerCase();
          const colaboradorSelecionado = colaboradores.find(c => 
            c.nome.toLowerCase() === queryClean
          ) || colaboradores.find(c => 
            c.nome.toLowerCase().includes(queryClean)
          );
          if (colaboradorSelecionado) formData.append('colaboradorId', colaboradorSelecionado.id);
        }
      }
      
      const agenciaQuery = buscaAgencia.trim().toLowerCase();
      const agenciaSelecionada = agencias.find(a => a.nome.toLowerCase() === agenciaQuery || a.id === buscaAgencia);
      if (agenciaSelecionada) formData.append('agenciaId', agenciaSelecionada.id);

      const veiculoQuery = buscaVeiculo.trim().toLowerCase();
      const veiculoSelecionado = veiculos.find(v => v.nome.toLowerCase() === veiculoQuery || v.id === buscaVeiculo);
      if (veiculoSelecionado) formData.append('veiculoId', veiculoSelecionado.id);

      if (numeroNotaFiscal.trim()) formData.append('numeroNotaFiscal', numeroNotaFiscal.trim());
      if (urlNotaFiscal.trim()) formData.append('urlNotaFiscal', urlNotaFiscal.trim());
      if (descricao.trim()) formData.append('descricao', descricao.trim());
      if (valor) formData.append('valor', valor);
      if (dataEmissao) formData.append('dataEmissao', dataEmissao);
      if (vencimento) formData.append('vencimento', vencimento);
      
      if (gerarParcelas) {
        formData.append('gerarParcelas', 'true');
        formData.append('qtdParcelas', qtdParcelas.toString());
      }
      
      if (numeroPi.trim()) formData.append('numeroPi', numeroPi.trim());
      if (numeroContrato.trim()) formData.append('numeroContrato', numeroContrato.trim());
      if (mesAnoReferencia.trim()) formData.append('mesAnoReferencia', mesAnoReferencia.trim());
      
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
      {/* Seção 1: Origem / Destino & Veículo */}
      <div className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        <div className="border-b border-slate-100 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md">
              Etapa 1
            </span>
            <h2 className="text-xl font-bold text-slate-900 mt-2">
              Origem / Destino & Veículo
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Identifique quem paga ou recebe, a rádio/veículo e a agência vinculada.
            </p>
          </div>
          <div className="flex bg-slate-100 p-1.5 rounded-xl w-fit self-start sm:self-auto">
            <button 
              type="button" 
              onClick={() => { setTipoLancamento('RECEITA'); setNovoRegistro(false); setBuscaPessoa(''); }} 
              className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${tipoLancamento === 'RECEITA' ? 'bg-white shadow-sm text-emerald-700' : 'text-slate-600 hover:text-slate-800'}`}
            >
              Recebimento (Cliente)
            </button>
            <button 
              type="button" 
              onClick={() => { setTipoLancamento('DESPESA'); setNovoRegistro(false); setBuscaPessoa(''); }} 
              className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${tipoLancamento === 'DESPESA' ? 'bg-white shadow-sm text-rose-700' : 'text-slate-600 hover:text-slate-800'}`}
            >
              Pagamento (Despesa)
            </button>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <button 
              type="button" 
              onClick={() => setNovoRegistro(false)} 
              className={`flex-1 py-2.5 px-4 rounded-xl font-semibold text-sm border transition-all active:scale-[0.98] ${!novoRegistro ? 'bg-indigo-50 border-indigo-200 text-indigo-700 font-bold' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}
            >
              Buscar Cadastro Existente
            </button>
            <button 
              type="button" 
              onClick={() => setNovoRegistro(true)} 
              className={`flex-1 py-2.5 px-4 rounded-xl font-semibold text-sm border transition-all active:scale-[0.98] ${novoRegistro ? 'bg-indigo-50 border-indigo-200 text-indigo-700 font-bold' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}
            >
              + Cadastrar Novo Inline
            </button>
          </div>

          {!novoRegistro ? (
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                {tipoLancamento === 'RECEITA' ? 'Cliente / Anunciante' : 'Colaborador / Fornecedor'} <span className="text-red-500">*</span>
              </label>
              <input 
                required 
                type="text" 
                list="pessoas-list"
                value={buscaPessoa} 
                onChange={(e) => setBuscaPessoa(e.target.value)} 
                placeholder={`Digite o nome do ${tipoLancamento === 'RECEITA' ? 'cliente ou razão social' : 'colaborador ou fornecedor'}...`}
                className="block w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-slate-900 bg-white shadow-sm" 
              />
              <datalist id="pessoas-list">
                {tipoLancamento === 'RECEITA' ? (
                  clientesFiltrados.map(c => (
                    <option key={c.id} value={c.nomeFantasia || c.razaoSocial}>
                      {c.razaoSocial} {c.nomeFantasia ? `(${c.nomeFantasia})` : ''}
                    </option>
                  ))
                ) : (
                  colaboradoresFiltrados.map(c => <option key={c.id} value={c.nome}>{c.nome}</option>)
                )}
              </datalist>
            </div>
          ) : (
            <div className="space-y-4 bg-indigo-50/50 p-5 rounded-xl border border-indigo-100">
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  {tipoLancamento === 'RECEITA' ? 'Razão Social do Novo Cliente' : 'Nome do Colaborador / Fornecedor'} <span className="text-red-500">*</span>
                </label>
                <input 
                  required 
                  type="text" 
                  value={novoPessoaNome} 
                  onChange={(e) => setNovoPessoaNome(e.target.value)} 
                  className="block w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 bg-white" 
                  placeholder="Nome completo ou Razão Social..." 
                />
              </div>
              {tipoLancamento === 'RECEITA' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">Nome Fantasia</label>
                    <input 
                      type="text" 
                      value={novoClienteNomeFantasia} 
                      onChange={(e) => setNovoClienteNomeFantasia(e.target.value)} 
                      placeholder="Nome fantasia comercial"
                      className="block w-full px-3.5 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 bg-white text-sm" 
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">CNPJ / CPF</label>
                    <input 
                      type="text" 
                      value={novoPessoaDoc} 
                      onChange={(e) => setNovoPessoaDoc(e.target.value)} 
                      placeholder="00.000.000/0000-00"
                      className="block w-full px-3.5 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 bg-white text-sm" 
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">Estado (UF)</label>
                    <select 
                      value={selectedUf} 
                      onChange={e => { setSelectedUf(e.target.value); setNovoClienteCidade(''); }} 
                      className="block w-full px-3.5 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 bg-white text-sm"
                    >
                      <option value="">Selecione a UF...</option>
                      {ufs.map(uf => <option key={uf.sigla} value={uf.sigla}>{uf.sigla} - {uf.nome}</option>)}
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">Cidade (IBGE)</label>
                    <select 
                      value={novoClienteCidade} 
                      onChange={e => setNovoClienteCidade(e.target.value)} 
                      disabled={!selectedUf} 
                      className="block w-full px-3.5 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 bg-white disabled:bg-slate-100 disabled:text-slate-400 text-sm"
                    >
                      <option value="">Selecione a cidade...</option>
                      {cidadesIbge.map(c => <option key={c.id} value={`${c.nome} - ${selectedUf}`}>{c.nome}</option>)}
                    </select>
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Veículo / Rádio Transmissora
              </label>
              <select 
                value={buscaVeiculo} 
                onChange={(e) => setBuscaVeiculo(e.target.value)} 
                className="block w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 bg-white text-slate-800 shadow-sm"
              >
                <option value="">Selecione o veículo da emissora...</option>
                {veiculos.map(v => <option key={v.id} value={v.nome}>{v.nome}</option>)}
              </select>
            </div>

            {tipoLancamento === 'RECEITA' && (
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Agência de Publicidade (Opcional)
                </label>
                <input 
                  type="text" 
                  list="agencias-list"
                  value={buscaAgencia} 
                  onChange={(e) => setBuscaAgencia(e.target.value)} 
                  placeholder="Se houver, busque a agência..."
                  className="block w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 text-slate-900 bg-white shadow-sm" 
                />
                <datalist id="agencias-list">
                  {agenciasFiltradas.map(a => <option key={a.id} value={a.nome} />)}
                </datalist>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Seção 2: Dados Financeiros & Identificação Comercial */}
      <div className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        <div className="border-b border-slate-100 pb-4">
          <span className="text-xs font-black uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md">
            Etapa 2
          </span>
          <h2 className="text-xl font-bold text-slate-900 mt-2">
            Dados Financeiros & Identificação Comercial
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Defina valores, datas de vencimento, Nota Fiscal e números contratuais da campanha.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              {gerarParcelas ? 'Valor Total da Campanha (R$)' : 'Valor Bruto (R$)'} <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 font-bold text-sm">
                R$
              </span>
              <input 
                required
                type="number" 
                step="0.01" 
                value={valor} 
                onChange={(e) => setValor(e.target.value)} 
                placeholder="0,00"
                className="block w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 font-bold text-slate-900 text-lg shadow-sm" 
              />
            </div>
            {gerarParcelas && parseFloat(valor) > 0 && (
              <p className="text-xs text-indigo-600 font-semibold">
                Será dividido em {qtdParcelas}x de R$ {(parseFloat(valor) / qtdParcelas).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-rose-500"/> 
              Data de Vencimento {gerarParcelas && '(1ª Parcela)'} <span className="text-red-500">*</span>
            </label>
            <input 
              required
              type="date" 
              value={vencimento} 
              onChange={(e) => setVencimento(e.target.value)} 
              className="block w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 text-slate-900 shadow-sm" 
            />
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-slate-400"/> 
              Data de Emissão (Base)
            </label>
            <input 
              type="date" 
              value={dataEmissao} 
              onChange={(e) => setDataEmissao(e.target.value)} 
              className="block w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 text-slate-900 shadow-sm" 
            />
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center justify-between">
              <span className="flex items-center gap-1"><FileText className="w-3.5 h-3.5 text-slate-500"/> Número da NF</span>
              <span className="text-[10px] text-slate-400 font-normal normal-case">Pode ser informado depois</span>
            </label>
            <input 
              type="text" 
              value={numeroNotaFiscal} 
              onChange={(e) => setNumeroNotaFiscal(e.target.value)} 
              placeholder="Ex: 1234 (Deixe vazio se pendente)" 
              className="block w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 text-slate-900 shadow-sm" 
            />
          </div>

          <div className="space-y-2 sm:col-span-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1">
              <LinkIcon className="w-3.5 h-3.5 text-indigo-600"/> Link / URL Pública da Nota Fiscal Emitida (Opcional)
            </label>
            <input 
              type="text" 
              value={urlNotaFiscal} 
              onChange={(e) => setUrlNotaFiscal(e.target.value)} 
              placeholder="Ex: https://nfe.prefeitura.sp.gov.br/publico/..." 
              className="block w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 text-slate-900 text-sm shadow-sm" 
            />
          </div>
        </div>

        {/* Bloco de Identificação Comercial (PI / Contrato / Referência) */}
        <div className="p-5 rounded-2xl bg-indigo-50/40 border border-indigo-100 space-y-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <h3 className="font-bold text-slate-800 text-sm">
              Identificação Comercial da Campanha / Contrato
            </h3>
            <span className="text-xs text-slate-500 font-normal">
              (Permite agrupar parcelas e vincular faturamentos)
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Número do PI (Pedido de Inserção)
              </label>
              <input 
                type="text" 
                value={numeroPi} 
                onChange={(e) => setNumeroPi(e.target.value)} 
                placeholder="Ex: PI 4589/2026"
                className="block w-full px-3.5 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 bg-white text-sm" 
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Número do Contrato
              </label>
              <input 
                type="text" 
                value={numeroContrato} 
                onChange={(e) => setNumeroContrato(e.target.value)} 
                placeholder="Ex: CTR-089/26"
                className="block w-full px-3.5 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 bg-white text-sm" 
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Mês / Ano de Referência
              </label>
              <input 
                type="month" 
                value={mesAnoReferencia} 
                onChange={e => setMesAnoReferencia(e.target.value)} 
                className="block w-full px-3.5 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 bg-white text-sm" 
              />
            </div>
          </div>
        </div>
      </div>

      {/* Seção 3: Parcelamento Inteligente com Prévia em Tempo Real */}
      <div className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-4 gap-4">
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md">
              Etapa 3
            </span>
            <h2 className="text-xl font-bold text-slate-900 mt-2">
              Parcelamento Inteligente
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Divida campanhas semestrais/anuais com cronograma automatizado de vencimentos.
            </p>
          </div>
          <label className="flex items-center gap-3 cursor-pointer bg-slate-50 hover:bg-slate-100 px-4 py-2.5 rounded-xl border border-slate-200 transition-colors">
            <input 
              type="checkbox" 
              checked={gerarParcelas} 
              onChange={(e) => setGerarParcelas(e.target.checked)} 
              className="rounded text-indigo-600 focus:ring-indigo-500 w-4 h-4 cursor-pointer" 
            />
            <span className="text-sm font-bold text-slate-800">Dividir em múltiplas parcelas</span>
          </label>
        </div>

        {gerarParcelas && (
          <div className="space-y-6">
            <div className="bg-indigo-50/60 border border-indigo-100 p-5 rounded-xl flex flex-col sm:flex-row gap-5 items-start sm:items-center">
              <div className="w-full sm:w-1/3 space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-indigo-900">
                  Quantidade de Parcelas
                </label>
                <div className="flex items-center gap-2">
                  <input 
                    type="number" 
                    min="2" 
                    max="60" 
                    value={qtdParcelas} 
                    onChange={(e) => setQtdParcelas(parseInt(e.target.value) || 2)} 
                    className="block w-full px-4 py-2.5 border border-indigo-200 rounded-xl focus:ring-indigo-500 font-black text-indigo-950 bg-white text-lg shadow-sm" 
                  />
                  <span className="text-sm font-bold text-indigo-700 whitespace-nowrap">meses</span>
                </div>
              </div>
              <div className="w-full sm:w-2/3 text-xs sm:text-sm text-indigo-800 leading-relaxed">
                <p>
                  O sistema criará <strong className="font-bold">{qtdParcelas} lançamentos independentes</strong> vinculados ao mesmo contrato.
                </p>
                <p className="mt-1 text-indigo-700">
                  • Contratos, PIs e comprovantes mestres ficarão acessíveis em todas as parcelas.<br />
                  • Cada mês terá seu controle de Nota Fiscal e status de faturamento próprio.
                </p>
              </div>
            </div>

            {/* Tabela de Prévia Dinâmica */}
            <div className="rounded-xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-indigo-600" />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    Prévia do Cronograma de Parcelas ({parcelasPreview.length}x)
                  </span>
                </div>
                {parseFloat(valor) > 0 && (
                  <span className="text-xs font-bold text-slate-500">
                    Total: {parseFloat(valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  </span>
                )}
              </div>

              <div className="overflow-x-auto max-h-64 divide-y divide-slate-100">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-slate-50/80 text-slate-500 text-[11px] uppercase tracking-wider sticky top-0">
                    <tr>
                      <th className="px-4 py-2.5 font-bold">Parcela</th>
                      <th className="px-4 py-2.5 font-bold">Mês Ref.</th>
                      <th className="px-4 py-2.5 font-bold">Vencimento Previsto</th>
                      <th className="px-4 py-2.5 font-bold text-right">Valor Estimado</th>
                      <th className="px-4 py-2.5 font-bold text-center">Status da Nota Fiscal</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white">
                    {parcelasPreview.map((item) => (
                      <tr key={item.numero} className={`hover:bg-slate-50/60 ${item.isPrimeira ? 'bg-indigo-50/30' : ''}`}>
                        <td className="px-4 py-2.5 font-bold text-slate-900 flex items-center gap-2">
                          <span className={`inline-flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-black ${item.isPrimeira ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-700'}`}>
                            {item.numero}
                          </span>
                          Parcela {item.numero} de {item.total}
                        </td>
                        <td className="px-4 py-2.5 text-slate-600 font-medium">
                          {item.mesRef}
                        </td>
                        <td className="px-4 py-2.5 text-slate-800 font-semibold">
                          {item.vencimento}
                        </td>
                        <td className="px-4 py-2.5 text-right font-mono font-bold text-slate-900">
                          {item.valor !== null ? item.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : '—'}
                        </td>
                        <td className="px-4 py-2.5 text-center">
                          {item.isPrimeira ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                              <CheckCircle2 className="w-3 h-3" />
                              {numeroNotaFiscal ? `NF ${numeroNotaFiscal}` : '1ª Parcela (Anexos)'}
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-amber-50 text-amber-700 border border-amber-200">
                              Aguardando emissão mensal
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Seção 4: Documentos e Anexos */}
      <div className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md">
              Etapa 4
            </span>
            <h2 className="text-xl font-bold text-slate-900 mt-2">
              Documentos & Anexos
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Anexe PDFs de PI, contrato, notas fiscais, boletos ou recibos.
            </p>
          </div>
          <button 
            type="button" 
            onClick={addArquivoSlot} 
            className="text-indigo-600 hover:text-indigo-700 font-bold text-xs sm:text-sm flex items-center bg-indigo-50 hover:bg-indigo-100 px-3.5 py-2 rounded-xl transition-all active:scale-[0.96]"
          >
            <Plus className="w-4 h-4 mr-1.5" /> Adicionar Arquivo
          </button>
        </div>

        <div className="space-y-4">
          {arquivos.length === 0 ? (
            <div className="text-center py-8 px-4 rounded-xl border border-dashed border-slate-200 bg-slate-50/50">
              <FileText className="w-8 h-8 text-slate-300 mx-auto mb-2" />
              <p className="text-sm font-semibold text-slate-600">Nenhum documento anexado ainda</p>
              <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                Você pode anexar contratos, PIs e notas agora, ou salvar o lançamento e anexá-los a qualquer momento depois.
              </p>
            </div>
          ) : (
            arquivos.map((arq, idx) => (
              <div key={idx} className="flex flex-col gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200 relative">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="w-full md:w-1/3 space-y-1.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">Tipo de Documento</label>
                    <select 
                      value={arq.tipoId} 
                      onChange={(e) => {
                        const newArr = [...arquivos];
                        newArr[idx].tipoId = e.target.value;
                        setArquivos(newArr);
                      }} 
                      className="block w-full px-3 py-2.5 text-sm border border-slate-300 rounded-lg focus:ring-indigo-500 bg-white"
                    >
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
                  
                  <div className="w-full md:w-2/3 space-y-1.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">Arquivo Físico</label>
                    <input 
                      type="file" 
                      onChange={(e) => handleFileChange(idx, e.target.files?.[0] || null)} 
                      className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-white file:border file:border-slate-300 file:text-slate-700 hover:file:bg-slate-100 transition-colors" 
                    />
                    {arq.nomeOriginal && (
                      <p className="text-xs text-slate-500 mt-1">
                        Selecionado: <span className="font-semibold text-slate-700">{arq.nomeOriginal}</span>
                      </p>
                    )}
                  </div>
                </div>
                
                <button 
                  type="button" 
                  onClick={() => removeArquivo(idx)} 
                  className="absolute -top-2.5 -right-2.5 bg-white border border-rose-200 text-rose-500 p-1 rounded-full hover:bg-rose-50 transition-colors shadow-sm"
                  title="Remover este anexo"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Descrição Livre */}
        <div className="space-y-2 pt-2 border-t border-slate-100">
          <div className="flex items-center justify-between">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              Descrição / Observações Operacionais
            </label>
            <button 
              type="button" 
              onClick={handlePasteDescricao} 
              className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-lg hover:bg-indigo-100 flex items-center gap-1 transition-colors"
            >
              <ClipboardPaste className="w-3.5 h-3.5" /> Colar da Área de Transferência
            </button>
          </div>
          <textarea 
            value={descricao} 
            onChange={(e) => setDescricao(e.target.value)} 
            rows={3} 
            placeholder="Observações complementares, número de chamadas diárias, dados de faturamento..." 
            className="block w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 text-slate-900 text-sm shadow-sm" 
          />
        </div>
      </div>

      {/* Barra de Ação Final */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="text-xs sm:text-sm text-slate-600">
          {gerarParcelas ? (
            <span>
              Criando <strong className="text-slate-900 font-bold">{qtdParcelas} parcelas mensais</strong> de{' '}
              <strong className="text-indigo-600 font-bold">
                {parseFloat(valor) > 0 ? (parseFloat(valor) / qtdParcelas).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : 'R$ 0,00'}
              </strong>
            </span>
          ) : (
            <span>
              Lançamento único com vencimento em <strong className="text-slate-900 font-bold">{vencimento || 'Data a definir'}</strong>
            </span>
          )}
        </div>

        <button 
          type="submit" 
          disabled={isSubmitting} 
          className="flex items-center justify-center px-8 py-3.5 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 hover:shadow-lg transition-all active:scale-[0.98] shadow-md disabled:opacity-50 text-sm sm:text-base cursor-pointer"
        >
          {isSubmitting ? 'Salvando Lançamento...' : 'Salvar Novo Lançamento'}
        </button>
      </div>
    </form>
  );
}
