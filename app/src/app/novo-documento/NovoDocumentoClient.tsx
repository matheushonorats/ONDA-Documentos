'use client';

import { useState } from 'react';
import { TipoDocumento, Lancamento } from '@/generated/prisma';
import {
  UploadCloud,
  File as FileIcon,
  X,
  Loader2,
  ArrowLeft,
  Link as LinkIcon,
  CheckCircle2,
  AlertCircle,
  Layers,
} from 'lucide-react';
import Link from 'next/link';
import { adicionarLinkDocumento } from '@/actions/documentos';
import { useRouter } from 'next/navigation';

export interface ParcelaContratoResumo {
  id: string;
  valor: number | null;
  vencimento: Date | string | null;
  numeroNotaFiscal: string | null;
  mesAnoReferencia: string | null;
  appSheetId: string | null;
  _count?: { documentos: number };
}

export function NovoDocumentoClient({
  lancamento,
  tiposDocumento,
  parcelasContrato = [],
}: {
  lancamento: Lancamento & {
    cliente: { razaoSocial: string; nomeFantasia: string | null } | null;
    colaborador: { nome: string } | null;
    veiculo?: { nome: string } | null;
    agencia?: { nome: string } | null;
    documentos?: Array<{
      id: string;
      nomeOriginal: string;
      urlPublica: string | null;
      tipoDocumento: { nome: string } | null;
    }>;
  };
  tiposDocumento: TipoDocumento[];
  parcelasContrato?: ParcelaContratoResumo[];
}) {
  const router = useRouter();
  const [modo, setModo] = useState<'UPLOAD' | 'LINK'>('UPLOAD');

  // Modo Upload
  const [arquivos, setArquivos] = useState<File[]>([]);
  const [tiposSelecionados, setTiposSelecionados] = useState<string[]>([]);
  const [novosTiposTexto, setNovosTiposTexto] = useState<string[]>([]);

  // Opção de Replicar para todo o contrato (mesmo PI + Veículo)
  const temOutrasParcelas = parcelasContrato.length > 1;
  const [replicarContrato, setReplicarContrato] = useState<boolean>(temOutrasParcelas);

  // Modo Link
  const [urlLink, setUrlLink] = useState('');
  const [tituloLink, setTituloLink] = useState('');
  const [tipoLink, setTipoLink] = useState('');
  const [novoTipoLinkTexto, setNovoTipoLinkTexto] = useState('');
  const [observacaoLink, setObservacaoLink] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [progresso, setProgresso] = useState<string | null>(null);

  const title =
    lancamento.tipoLancamento === 'RECEITA'
      ? lancamento.cliente?.nomeFantasia || lancamento.cliente?.razaoSocial
      : lancamento.colaborador?.nome;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const novasFiles = Array.from(e.target.files);

      // Validação prévia de tamanho individual
      const arquivosExcedentes = novasFiles.filter(f => f.size > 25 * 1024 * 1024);
      if (arquivosExcedentes.length > 0) {
        setError(
          `O arquivo "${arquivosExcedentes[0].name}" ultrapassa o limite de 25 MB. Compacte-o ou envie via link público.`
        );
        return;
      }

      const novosTipos = novasFiles.map(file => {
        const lower = file.name.toLowerCase();
        if (lower.includes('nota') || lower.includes('nf') || lower.includes('danfe')) {
          const t = tiposDocumento.find(
            td => td.nome.toLowerCase().includes('nota') || td.nome.toLowerCase().includes('nf')
          );
          if (t) return t.id;
        } else if (lower.includes('pi') || lower.includes('pedido') || lower.includes('inserção')) {
          const t = tiposDocumento.find(
            td => td.nome.toLowerCase().includes('pi') || td.nome.toLowerCase().includes('pedido')
          );
          if (t) return t.id;
        } else if (lower.includes('contrato')) {
          const t = tiposDocumento.find(td => td.nome.toLowerCase().includes('contrato'));
          if (t) return t.id;
        } else if (lower.includes('boleto')) {
          const t = tiposDocumento.find(td => td.nome.toLowerCase().includes('boleto'));
          if (t) return t.id;
        } else if (
          lower.includes('comprovante') ||
          lower.includes('checking') ||
          lower.includes('veiculação') ||
          lower.includes('recibo')
        ) {
          const t = tiposDocumento.find(
            td =>
              td.nome.toLowerCase().includes('comprovante') ||
              td.nome.toLowerCase().includes('checking') ||
              td.nome.toLowerCase().includes('recibo')
          );
          if (t) return t.id;
        }
        return '';
      });

      setArquivos(prev => [...prev, ...novasFiles]);
      setTiposSelecionados(prev => [...prev, ...novosTipos]);
      setNovosTiposTexto(prev => [...prev, ...novasFiles.map(() => '')]);
      setError(null);
    }
  };

  const removeArquivo = (index: number) => {
    setArquivos(prev => prev.filter((_, i) => i !== index));
    setTiposSelecionados(prev => prev.filter((_, i) => i !== index));
    setNovosTiposTexto(prev => prev.filter((_, i) => i !== index));
  };

  const handleTipoChange = (index: number, value: string) => {
    const novos = [...tiposSelecionados];
    novos[index] = value;
    setTiposSelecionados(novos);
  };

  const handleNovoTipoChange = (index: number, value: string) => {
    const novos = [...novosTiposTexto];
    novos[index] = value;
    setNovosTiposTexto(novos);
  };

  const handleSubmitUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (arquivos.length === 0) {
      setError('Anexe ao menos um documento.');
      return;
    }

    setLoading(true);
    setError(null);
    setSuccessMessage(null);
    setProgresso(`Preparando upload de ${arquivos.length} arquivo(s)...`);

    try {
      const formData = new FormData();
      formData.append('lancamentoId', lancamento.id);
      formData.append('replicarContrato', String(replicarContrato));

      const arquivosMeta = arquivos.map((file, idx) => ({
        tipoId: tiposSelecionados[idx] || 'NOVO',
        novoTipoDocumento:
          tiposSelecionados[idx] === 'NOVO' || !tiposSelecionados[idx]
            ? novosTiposTexto[idx] || 'Outros'
            : undefined,
        nomeOriginal: file.name,
      }));

      formData.append('arquivosMeta', JSON.stringify(arquivosMeta));
      arquivos.forEach((file, idx) => {
        formData.append(`file_${idx}`, file);
      });

      setProgresso(`Enviando ${arquivos.length} arquivo(s) para o Google Drive e acervo...`);

      const response = await fetch('/api/documentos/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json().catch(() => null);

      if (!response.ok || !data?.success) {
        const errorMsg =
          data?.error ||
          `Erro no envio (${response.status}: ${response.statusText}). O servidor não pôde concluir o upload.`;
        setError(errorMsg);
        setLoading(false);
        setProgresso(null);
        return;
      }

      setSuccessMessage(
        data.message ||
          (temOutrasParcelas && replicarContrato
            ? `Documentos vinculados com sucesso a todas as ${parcelasContrato.length} parcelas do Contrato/PI!`
            : 'Documentos anexados com sucesso ao lançamento!')
      );
      setArquivos([]);
      setTiposSelecionados([]);
      setNovosTiposTexto([]);
      setLoading(false);
      setProgresso(null);

      setTimeout(() => {
        router.push(`/lancamento/${lancamento.id}`);
        router.refresh();
      }, 1400);
    } catch (uploadErr: any) {
      console.error('Falha de rede ao enviar documentos:', uploadErr);
      setError(
        uploadErr?.message ||
          'Falha de rede ou timeout ao conectar com o servidor. Se o arquivo for muito pesado, envie via link público.'
      );
      setLoading(false);
      setProgresso(null);
    }
  };

  const handleSubmitLink = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlLink.trim()) {
      setError('Informe a URL / Link da Nota Fiscal.');
      return;
    }

    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    const res = await adicionarLinkDocumento(lancamento.id, {
      urlPublica: urlLink,
      nomeOriginal: tituloLink.trim() || undefined,
      tipoDocumentoId: tipoLink || undefined,
      novoTipoDocumento: tipoLink === 'NOVO' ? novoTipoLinkTexto : undefined,
      observacao: observacaoLink.trim() || undefined,
      replicarContrato,
    });

    setLoading(false);

    if (res.success) {
      setSuccessMessage(
        temOutrasParcelas && replicarContrato
          ? `Link vinculado com sucesso a todas as ${parcelasContrato.length} parcelas deste Contrato (PI + Veículo)!`
          : 'Link da Nota Fiscal adicionado com sucesso!'
      );
      setTimeout(() => {
        router.push(`/lancamento/${lancamento.id}`);
        router.refresh();
      }, 1200);
    } else {
      setError(res.error || 'Erro ao adicionar o link da Nota Fiscal.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <Link
          href={`/lancamento/${lancamento.id}`}
          className="inline-flex items-center text-sm font-semibold text-slate-500 hover:text-indigo-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-1.5" />
          Voltar para o lançamento
        </Link>
        <span className="text-xs font-mono text-slate-400">
          ID: {lancamento.appSheetId || lancamento.id.slice(0, 8)}
        </span>
      </div>

      {/* Context Card do Lançamento Alvo */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <span
              className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                lancamento.tipoLancamento === 'RECEITA'
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  : 'bg-rose-50 text-rose-700 border border-rose-200'
              }`}
            >
              {lancamento.tipoLancamento === 'RECEITA' ? 'Receita · Cliente' : 'Despesa · Fornecedor'}
            </span>
            {lancamento.veiculo && (
              <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-100">
                {lancamento.veiculo.nome}
              </span>
            )}
            {lancamento.numeroPi && (
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200">
                PI: {lancamento.numeroPi}
              </span>
            )}
          </div>
          <div>
            {lancamento.numeroNotaFiscal ? (
              <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                <CheckCircle2 className="w-3.5 h-3.5" /> NF nº {lancamento.numeroNotaFiscal}
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                <AlertCircle className="w-3.5 h-3.5" /> Sem NF Cadastrada
              </span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
          <div>
            <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Origem / Destino
            </span>
            <p className="font-bold text-slate-900 mt-0.5 truncate">{title}</p>
          </div>
          <div>
            <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Valor
            </span>
            <p className="font-bold text-slate-900 mt-0.5">
              {lancamento.valor
                ? lancamento.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
                : '—'}
            </p>
          </div>
          <div>
            <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Vencimento
            </span>
            <p className="font-bold text-slate-900 mt-0.5">
              {lancamento.vencimento ? new Date(lancamento.vencimento).toLocaleDateString('pt-BR') : '—'}
            </p>
          </div>
        </div>

        {/* Documentos já anexados neste lançamento */}
        {lancamento.documentos && lancamento.documentos.length > 0 && (
          <div className="pt-3 border-t border-slate-100">
            <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">
              Documentos já anexados nesta operação ({lancamento.documentos.length}):
            </span>
            <div className="flex flex-wrap gap-2">
              {lancamento.documentos.map(doc => (
                <span
                  key={doc.id}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs bg-slate-100 text-slate-700 border border-slate-200"
                >
                  <span className="font-bold text-indigo-700">{doc.tipoDocumento?.nome || 'Doc'}:</span>
                  <span className="truncate max-w-[160px]">{doc.nomeOriginal}</span>
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Destaque: Contrato / Campanha Vinculada por PI + Veículo */}
      {temOutrasParcelas && (
        <div className="rounded-2xl border-2 border-indigo-200 bg-linear-to-r from-indigo-50/90 via-indigo-50/50 to-white p-5 shadow-xs">
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-xl bg-indigo-600 text-white shrink-0 shadow-xs mt-0.5">
              <Layers className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0 space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-black uppercase tracking-wider text-indigo-900 bg-indigo-100 px-2.5 py-0.5 rounded-full">
                  Contrato / Campanha Identificada
                </span>
                {lancamento.numeroPi && (
                  <span className="text-xs font-bold bg-white text-indigo-800 px-2.5 py-0.5 rounded-md border border-indigo-200 shadow-2xs">
                    PI: {lancamento.numeroPi}
                  </span>
                )}
                {lancamento.veiculo && (
                  <span className="text-xs font-bold bg-white text-indigo-800 px-2.5 py-0.5 rounded-md border border-indigo-200 shadow-2xs">
                    Veículo: {lancamento.veiculo.nome}
                  </span>
                )}
                <span className="text-xs font-semibold text-slate-500">
                  ({parcelasContrato.length} parcelas registradas)
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Este lançamento pertence a um contrato com <strong>{parcelasContrato.length} parcelas</strong> cadastradas com este mesmo PI e Veículo de comunicação.
              </p>
              <label className="flex items-start sm:items-center gap-3 cursor-pointer bg-white p-3.5 rounded-xl border border-indigo-300 shadow-2xs hover:bg-indigo-50/40 transition">
                <input
                  type="checkbox"
                  checked={replicarContrato}
                  onChange={e => setReplicarContrato(e.target.checked)}
                  className="mt-0.5 sm:mt-0 h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                />
                <div className="flex-1 min-w-0">
                  <span className="text-xs sm:text-sm font-bold text-slate-900 block sm:inline">
                    Vincular automaticamente este anexo a todas as {parcelasContrato.length} parcelas deste Contrato/PI
                  </span>
                  <span className="text-[11px] text-slate-500 block sm:inline sm:ml-1">
                    (Recomendado para comprovantes de veiculação, autorizações, propostas ou contratos).
                  </span>
                </div>
              </label>
            </div>
          </div>
        </div>
      )}

      {/* Caixa de Mensagens de Sucesso / Erro */}
      {successMessage && (
        <div className="p-4 bg-emerald-50 text-emerald-800 rounded-2xl text-sm border border-emerald-200 font-bold flex items-center gap-2 shadow-xs">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {error && (
        <div className="p-4 bg-rose-50 text-rose-700 rounded-2xl text-sm border border-rose-200 font-semibold flex items-start gap-2 shadow-xs">
          <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
          <div className="flex-1">{error}</div>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-7 bg-slate-50 border-b border-slate-200">
          <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <UploadCloud className="w-5 h-5 text-indigo-600" />
            Anexar Documento ou Link
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Escolha se deseja fazer upload de um arquivo (PDF, imagem, áudio) ou cadastrar o link público da NF.
          </p>

          <div className="flex gap-2 mt-5 bg-slate-200/60 p-1 rounded-xl">
            <button
              type="button"
              onClick={() => {
                setModo('UPLOAD');
                setError(null);
              }}
              className={`flex-1 py-2.5 px-4 rounded-lg font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all active:scale-[0.98] ${
                modo === 'UPLOAD'
                  ? 'bg-white text-indigo-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <UploadCloud className="w-4 h-4" />
              Upload de Arquivo (PDF/Img)
            </button>
            <button
              type="button"
              onClick={() => {
                setModo('LINK');
                setError(null);
              }}
              className={`flex-1 py-2.5 px-4 rounded-lg font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all active:scale-[0.98] ${
                modo === 'LINK'
                  ? 'bg-white text-indigo-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <LinkIcon className="w-4 h-4" />
              Link da Nota Emitida (URL)
            </button>
          </div>
        </div>

        {modo === 'UPLOAD' ? (
          <form onSubmit={handleSubmitUpload} className="p-8 space-y-6">
            <div className="space-y-4">
              <label className="block text-sm font-medium text-slate-700">Anexar Arquivos</label>
              <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 hover:bg-slate-50 transition-colors cursor-pointer relative group">
                <input
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  disabled={loading}
                />
                <div className="flex flex-col items-center justify-center text-center space-y-2">
                  <UploadCloud className="w-10 h-10 text-slate-400 group-hover:text-indigo-500 transition-colors" />
                  <div className="text-sm text-slate-600">
                    <span className="font-semibold text-indigo-600">Clique para fazer upload</span> ou
                    arraste e solte
                  </div>
                  <p className="text-xs text-slate-500">PDF, Imagens, Excel ou Áudio (até 25 MB)</p>
                </div>
              </div>

              {arquivos.length > 0 && (
                <div className="space-y-3 mt-6">
                  {arquivos.map((file, idx) => (
                    <div
                      key={idx}
                      className="flex flex-col sm:flex-row gap-4 p-4 border border-slate-200 rounded-xl bg-white shadow-sm items-start sm:items-center"
                    >
                      <div className="flex items-center gap-3 flex-1 overflow-hidden">
                        <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg shrink-0">
                          <FileIcon className="w-5 h-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-slate-900 truncate">{file.name}</p>
                          <p className="text-xs text-slate-500">
                            {(file.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
                        <select
                          value={tiposSelecionados[idx]}
                          onChange={e => handleTipoChange(idx, e.target.value)}
                          className="block w-full sm:w-44 text-sm border-slate-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-slate-700"
                          disabled={loading}
                        >
                          <option value="">Selecione o tipo</option>
                          {tiposDocumento.map(t => (
                            <option key={t.id} value={t.id}>
                              {t.nome}
                            </option>
                          ))}
                          <option value="NOVO">+ Novo Tipo</option>
                        </select>

                        {tiposSelecionados[idx] === 'NOVO' && (
                          <input
                            type="text"
                            placeholder="Nome do tipo"
                            value={novosTiposTexto[idx]}
                            onChange={e => handleNovoTipoChange(idx, e.target.value)}
                            className="block w-full sm:w-32 text-sm border-slate-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-slate-700"
                            disabled={loading}
                          />
                        )}

                        <button
                          type="button"
                          aria-label={`Remover ${file.name}`}
                          onClick={() => removeArquivo(idx)}
                          disabled={loading}
                          className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="pt-6 border-t border-slate-200">
              <button
                type="submit"
                disabled={loading || arquivos.length === 0}
                className="w-full flex items-center justify-center px-6 py-4 border border-transparent text-base font-bold rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" />
                    {progresso || 'Enviando Documentos...'}
                  </>
                ) : (
                  temOutrasParcelas && replicarContrato
                    ? `Adicionar e Vincular a Todas as ${parcelasContrato.length} Parcelas do Contrato`
                    : 'Adicionar ao lançamento'
                )}
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleSubmitLink} className="p-8 space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Link / URL da Nota Fiscal Emitida <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    required
                    value={urlLink}
                    onChange={e => setUrlLink(e.target.value)}
                    placeholder="Ex: https://nfe.prefeitura.sp.gov.br/publico/verificacao?..."
                    className="flex-1 px-4 py-3 border border-slate-300 rounded-xl text-sm bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-slate-900"
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={async () => {
                      try {
                        const text = await navigator.clipboard.readText();
                        setUrlLink(text);
                      } catch {}
                    }}
                    title="Colar da área de transferência"
                    className="flex items-center gap-1.5 px-3 py-2 border border-slate-300 rounded-xl text-xs font-bold text-slate-600 bg-white hover:bg-slate-50 hover:border-indigo-400 hover:text-indigo-700 transition-all"
                  >
                    <LinkIcon className="w-3.5 h-3.5" />
                    Colar
                  </button>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Cole aqui o endereço onde a Nota Fiscal foi emitida no sistema da prefeitura/governo.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Título / Identificação do Link
                  </label>
                  <input
                    type="text"
                    value={tituloLink}
                    onChange={e => setTituloLink(e.target.value)}
                    placeholder="Ex: Nota Fiscal 839"
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl text-sm bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-slate-900"
                    disabled={loading}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Tipo de Documento
                  </label>
                  <select
                    value={tipoLink}
                    onChange={e => setTipoLink(e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl text-sm bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-slate-900"
                    disabled={loading}
                  >
                    <option value="">Nota Fiscal (Padrão)</option>
                    {tiposDocumento.map(t => (
                      <option key={t.id} value={t.id}>
                        {t.nome}
                      </option>
                    ))}
                    <option value="NOVO">+ Novo Tipo</option>
                  </select>
                </div>
              </div>

              {tipoLink === 'NOVO' && (
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Nome do Novo Tipo
                  </label>
                  <input
                    type="text"
                    value={novoTipoLinkTexto}
                    onChange={e => setNovoTipoLinkTexto(e.target.value)}
                    placeholder="Ex: Link de Consulta NF"
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl text-sm bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-slate-900"
                    disabled={loading}
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Observações (Opcional)
                </label>
                <input
                  type="text"
                  value={observacaoLink}
                  onChange={e => setObservacaoLink(e.target.value)}
                  placeholder="Ex: Nota emitida referente ao lote 1..."
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl text-sm bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-slate-900"
                  disabled={loading}
                />
              </div>
            </div>

            <div className="pt-6 border-t border-slate-200">
              <button
                type="submit"
                disabled={loading || !urlLink.trim()}
                className="w-full flex items-center justify-center px-6 py-4 border border-transparent text-base font-bold rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" />
                    Salvando Link...
                  </>
                ) : (
                  temOutrasParcelas && replicarContrato
                    ? `Salvar e Vincular Link a Todas as ${parcelasContrato.length} Parcelas do Contrato`
                    : 'Salvar Link da Nota Fiscal'
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
