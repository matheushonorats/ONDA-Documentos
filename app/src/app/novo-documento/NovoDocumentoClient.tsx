'use client';

import { useState } from 'react';
import { TipoDocumento, Lancamento } from '@/generated/prisma';
import { UploadCloud, File, X, Loader2, ArrowLeft, Link as LinkIcon } from 'lucide-react';
import Link from 'next/link';
import { adicionarDocumentos } from '@/actions/lancamentos';
import { adicionarLinkDocumento } from '@/actions/documentos';
import { useRouter } from 'next/navigation';

export function NovoDocumentoClient({
  lancamento,
  tiposDocumento
}: {
  lancamento: Lancamento & {
    cliente: { razaoSocial: string, nomeFantasia: string | null } | null;
    colaborador: { nome: string } | null;
  };
  tiposDocumento: TipoDocumento[];
}) {
  const router = useRouter();
  const [modo, setModo] = useState<'UPLOAD' | 'LINK'>('UPLOAD');

  // Modo Upload
  const [arquivos, setArquivos] = useState<File[]>([]);
  const [tiposSelecionados, setTiposSelecionados] = useState<string[]>([]);
  const [novosTiposTexto, setNovosTiposTexto] = useState<string[]>([]);

  // Modo Link
  const [urlLink, setUrlLink] = useState('');
  const [tituloLink, setTituloLink] = useState('');
  const [tipoLink, setTipoLink] = useState('');
  const [novoTipoLinkTexto, setNovoTipoLinkTexto] = useState('');
  const [observacaoLink, setObservacaoLink] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progresso, setProgresso] = useState<string | null>(null);

  const title = lancamento.tipoLancamento === 'RECEITA' 
    ? (lancamento.cliente?.nomeFantasia || lancamento.cliente?.razaoSocial)
    : lancamento.colaborador?.nome;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const novasFiles = Array.from(e.target.files);
      setArquivos(prev => [...prev, ...novasFiles]);
      setTiposSelecionados(prev => [...prev, ...novasFiles.map(() => '')]);
      setNovosTiposTexto(prev => [...prev, ...novasFiles.map(() => '')]);
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
    let sucessoTotal = true;

    for (let i = 0; i < arquivos.length; i++) {
      setProgresso(`Enviando documento ${i + 1} de ${arquivos.length}...`);
      const file = arquivos[i];
      const formData = new FormData();
      
      const arquivosMeta = [{
        tipoId: tiposSelecionados[i] || 'NOVO',
        novoTipoDocumento: tiposSelecionados[i] === 'NOVO' || !tiposSelecionados[i] ? novosTiposTexto[i] || 'Outros' : undefined,
        nomeOriginal: file.name
      }];

      formData.append('arquivosMeta', JSON.stringify(arquivosMeta));
      formData.append('file_0', file);

      const res = await adicionarDocumentos(lancamento.id, formData);
      if (!res.success) {
        setError(res.error || `Erro ao enviar o documento: ${file.name}`);
        sucessoTotal = false;
        break;
      }
    }

    setLoading(false);
    setProgresso(null);

    if (sucessoTotal) {
      router.push(`/lancamento/${lancamento.id}`);
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

    const res = await adicionarLinkDocumento(lancamento.id, {
      urlPublica: urlLink,
      nomeOriginal: tituloLink.trim() || undefined,
      tipoDocumentoId: tipoLink || undefined,
      novoTipoDocumento: tipoLink === 'NOVO' ? novoTipoLinkTexto : undefined,
      observacao: observacaoLink.trim() || undefined,
    });

    setLoading(false);

    if (res.success) {
      router.push(`/lancamento/${lancamento.id}`);
    } else {
      setError(res.error || 'Erro ao adicionar o link da Nota Fiscal.');
    }
  };

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
            <UploadCloud className="w-6 h-6 text-indigo-600" />
            Adicionar Documento / Nota Fiscal
          </h1>
          <p className="text-slate-500 mt-2">
            Anexando à nota/lançamento de <strong className="text-slate-800">{title}</strong>
          </p>

          <div className="flex gap-2 mt-6 bg-slate-200/60 p-1 rounded-xl">
            <button
              type="button"
              onClick={() => { setModo('UPLOAD'); setError(null); }}
              className={`flex-1 py-2.5 px-4 rounded-lg font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all active:scale-[0.98] ${
                modo === 'UPLOAD' ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <UploadCloud className="w-4 h-4" />
              Upload de Arquivo (PDF/Img)
            </button>
            <button
              type="button"
              onClick={() => { setModo('LINK'); setError(null); }}
              className={`flex-1 py-2.5 px-4 rounded-lg font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all active:scale-[0.98] ${
                modo === 'LINK' ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <LinkIcon className="w-4 h-4" />
              Link da Nota Emitida (URL)
            </button>
          </div>
        </div>
        
        {modo === 'UPLOAD' ? (
          <form onSubmit={handleSubmitUpload} className="p-8 space-y-6">
            {error && (
              <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm border border-red-100 font-medium">
                {error}
              </div>
            )}

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
                    <span className="font-semibold text-indigo-600">Clique para fazer upload</span> ou arraste e solte
                  </div>
                  <p className="text-xs text-slate-500">PDF, Imagens, Excel ou Áudio</p>
                </div>
              </div>

              {arquivos.length > 0 && (
                <div className="space-y-3 mt-6">
                  {arquivos.map((file, idx) => (
                    <div key={idx} className="flex flex-col sm:flex-row gap-4 p-4 border border-slate-200 rounded-xl bg-white shadow-sm items-start sm:items-center">
                      <div className="flex items-center gap-3 flex-1 overflow-hidden">
                        <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg shrink-0">
                          <File className="w-5 h-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-slate-900 truncate">{file.name}</p>
                          <p className="text-xs text-slate-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
                        <select 
                          value={tiposSelecionados[idx]}
                          onChange={(e) => handleTipoChange(idx, e.target.value)}
                          className="block w-full sm:w-40 text-sm border-slate-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-slate-700"
                          disabled={loading}
                        >
                          <option value="">Selecione o tipo</option>
                          {tiposDocumento.map(t => (
                            <option key={t.id} value={t.id}>{t.nome}</option>
                          ))}
                          <option value="NOVO">+ Novo Tipo</option>
                        </select>
                        
                        {tiposSelecionados[idx] === 'NOVO' && (
                          <input 
                            type="text" 
                            placeholder="Nome do tipo"
                            value={novosTiposTexto[idx]}
                            onChange={(e) => handleNovoTipoChange(idx, e.target.value)}
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
                className="w-full flex items-center justify-center px-6 py-4 border border-transparent text-base font-medium rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" />
                    {progresso || 'Enviando Documentos...'}
                  </>
                ) : (
                  'Adicionar ao lançamento'
                )}
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleSubmitLink} className="p-8 space-y-6">
            {error && (
              <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm border border-red-100 font-medium">
                {error}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Link / URL da Nota Fiscal Emitida <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={urlLink}
                  onChange={(e) => setUrlLink(e.target.value)}
                  placeholder="Ex: https://nfe.prefeitura.sp.gov.br/publico/verificacao?..."
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl text-sm bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-slate-900"
                  disabled={loading}
                />
                <p className="text-xs text-slate-500 mt-1">Cole aqui o endereço onde a Nota Fiscal foi emitida no sistema da prefeitura/governo.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Título / Identificação do Link
                  </label>
                  <input
                    type="text"
                    value={tituloLink}
                    onChange={(e) => setTituloLink(e.target.value)}
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
                    onChange={(e) => setTipoLink(e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl text-sm bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-slate-900"
                    disabled={loading}
                  >
                    <option value="">Nota Fiscal (Padrão)</option>
                    {tiposDocumento.map(t => (
                      <option key={t.id} value={t.id}>{t.nome}</option>
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
                    onChange={(e) => setNovoTipoLinkTexto(e.target.value)}
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
                  onChange={(e) => setObservacaoLink(e.target.value)}
                  placeholder="Ex: Nota emitida em 13/08 referente ao lote 1..."
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl text-sm bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-slate-900"
                  disabled={loading}
                />
              </div>
            </div>

            <div className="pt-6 border-t border-slate-200">
              <button 
                type="submit" 
                disabled={loading || !urlLink.trim()}
                className="w-full flex items-center justify-center px-6 py-4 border border-transparent text-base font-medium rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" />
                    Salvando Link...
                  </>
                ) : (
                  'Salvar Link da Nota Fiscal'
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
