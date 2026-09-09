'use client';

import { useState, useEffect } from 'react';
import {
  X,
  Copy,
  Check,
  Mail,
  ExternalLink,
  Code2,
  Eye,
  FileCheck2,
  ShieldAlert,
  ShieldCheck,
  Building2,
} from 'lucide-react';
import { AgenciaGrupo, buildEmailData } from '@/lib/cobrancasTypes';

interface EmailPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  grupo: AgenciaGrupo | null;
  modoTeste: boolean;
  onOpenComprovante?: (grupo: AgenciaGrupo) => void;
  onRegistrarEnvio?: (grupo: AgenciaGrupo) => Promise<void>;
}

export function EmailPreviewModal({
  isOpen,
  onClose,
  grupo,
  modoTeste,
  onOpenComprovante,
  onRegistrarEnvio,
}: EmailPreviewModalProps) {
  const [viewMode, setViewMode] = useState<'html' | 'text'>('html');
  const [copiedText, setCopiedText] = useState(false);
  const [copiedHtml, setCopiedHtml] = useState(false);
  const [copiedSubject, setCopiedSubject] = useState(false);
  const [isRegistrando, setIsRegistrando] = useState(false);
  const [registradoSucesso, setRegistradoSucesso] = useState(false);

  // Fecha o modal ao pressionar a tecla Escape
  useEffect(() => {
    if (!isOpen) return;
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        onClose();
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !grupo) return null;

  const emailData = buildEmailData(grupo, modoTeste);

  async function safeCopy(text: string, setSuccess: (val: boolean) => void) {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2000);
    } catch (err) {
      console.error('Falha ao copiar conteúdo:', err);
    }
  }

  async function handleCopyText() {
    await safeCopy(emailData.texto, setCopiedText);
  }

  async function handleCopyHtml() {
    await safeCopy(emailData.html, setCopiedHtml);
  }

  async function handleCopySubject() {
    await safeCopy(emailData.assunto, setCopiedSubject);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-2 sm:p-4 backdrop-blur-xs overflow-y-auto">
      <div className="relative my-6 flex w-full max-w-4xl flex-col max-h-[95vh] rounded-2xl bg-white shadow-2xl border border-slate-200 overflow-hidden">
        {/* Modal Top Header */}
        <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50/90 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-xs">
              <Mail className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-black text-slate-900">Pré-visualização do E-mail</h3>
                {modoTeste ? (
                  <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-black text-amber-800 border border-amber-300">
                    <ShieldAlert className="h-3 w-3" /> MODO TESTE
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-black text-emerald-800 border border-emerald-300">
                    <ShieldCheck className="h-3 w-3" /> PRODUÇÃO
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 flex items-center gap-1.5 mt-0.5">
                <Building2 className="h-3.5 w-3.5" />
                <strong className="text-slate-700">{grupo.agencia}</strong> • {grupo.quantidadeContratos} débito(s) • Total: <span className="font-bold text-slate-900">{grupo.totalValorFormatado}</span>
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar"
            className="rounded-xl p-2 text-slate-400 hover:bg-slate-200/70 hover:text-slate-700 transition cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Email Metadata Strip */}
        <div className="border-b border-slate-200 bg-white px-6 py-3 space-y-2 text-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-400 uppercase tracking-wider text-[10px] w-14 shrink-0">Para:</span>
              <div className="flex flex-wrap gap-1">
                {emailData.destinatarios.map((dest, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center rounded-md bg-slate-100 px-2 py-0.5 font-mono text-[11px] font-semibold text-slate-700 border border-slate-200"
                  >
                    {dest}
                  </span>
                ))}
              </div>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center rounded-xl bg-slate-100 p-1 border border-slate-200 shrink-0 self-start sm:self-auto">
              <button
                type="button"
                onClick={() => setViewMode('html')}
                className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-bold transition cursor-pointer ${
                  viewMode === 'html'
                    ? 'bg-white text-indigo-600 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Eye className="h-3.5 w-3.5" />
                HTML Real
              </button>
              <button
                type="button"
                onClick={() => setViewMode('text')}
                className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-bold transition cursor-pointer ${
                  viewMode === 'text'
                    ? 'bg-white text-indigo-600 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Code2 className="h-3.5 w-3.5" />
                Texto Puro
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 overflow-hidden">
              <span className="font-bold text-slate-400 uppercase tracking-wider text-[10px] w-14 shrink-0">Assunto:</span>
              <span className="truncate font-semibold text-slate-800">{emailData.assunto}</span>
            </div>
            <button
              type="button"
              onClick={handleCopySubject}
              className="inline-flex items-center gap-1 text-[11px] font-bold text-indigo-600 hover:text-indigo-800 cursor-pointer shrink-0"
              title="Copiar linha de assunto"
            >
              {copiedSubject ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
              {copiedSubject ? 'Copiado' : 'Copiar Assunto'}
            </button>
          </div>
        </div>

        {/* Modal Body / Preview Viewport */}
        <div className="flex-1 overflow-y-auto bg-slate-100/70 p-4 sm:p-6">
          {viewMode === 'html' ? (
            <div className="mx-auto max-w-2xl rounded-xl bg-white shadow-xs border border-slate-200 overflow-hidden">
              <iframe
                title="Prévia do E-mail"
                srcDoc={emailData.html}
                className="w-full border-none"
                style={{ height: '520px' }}
              />
            </div>
          ) : (
            <div className="mx-auto max-w-2xl rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
              <pre className="whitespace-pre-wrap font-mono text-xs leading-relaxed text-slate-700 select-all">
                {emailData.texto}
              </pre>
            </div>
          )}
        </div>

        {/* Modal Footer Actions */}
        <div className="flex flex-wrap items-center justify-between gap-2.5 border-t border-slate-200 bg-slate-50/90 px-6 py-4">
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={handleCopyText}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-slate-700 shadow-xs hover:bg-slate-50 transition active:scale-95 cursor-pointer"
            >
              {copiedText ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4" />}
              {copiedText ? 'Texto Copiado!' : 'Copiar Texto'}
            </button>

            <button
              type="button"
              onClick={handleCopyHtml}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-slate-700 shadow-xs hover:bg-slate-50 transition active:scale-95 cursor-pointer"
            >
              {copiedHtml ? <Check className="h-4 w-4 text-emerald-600" /> : <Code2 className="h-4 w-4" />}
              {copiedHtml ? 'HTML Copiado!' : 'Copiar Código HTML'}
            </button>

            {onOpenComprovante && (
              <button
                type="button"
                onClick={() => {
                  onOpenComprovante(grupo);
                }}
                className="inline-flex items-center gap-1.5 rounded-xl border border-amber-300 bg-amber-50 px-3.5 py-2 text-xs font-bold text-amber-900 shadow-xs hover:bg-amber-100 transition active:scale-95 cursor-pointer"
                title="Gera o documento comprobatório timbrado em PDF"
              >
                <FileCheck2 className="h-4 w-4 text-amber-700" />
                Comprovante (PDF)
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            {onRegistrarEnvio && (
              <button
                type="button"
                onClick={async () => {
                  if (isRegistrando) return;
                  setIsRegistrando(true);
                  try {
                    await onRegistrarEnvio(grupo);
                    setRegistradoSucesso(true);
                    setTimeout(() => setRegistradoSucesso(false), 3000);
                  } finally {
                    setIsRegistrando(false);
                  }
                }}
                disabled={isRegistrando}
                className="inline-flex items-center gap-1.5 rounded-xl border border-emerald-300 bg-emerald-50 px-3.5 py-2 text-xs font-bold text-emerald-800 shadow-xs hover:bg-emerald-100 transition active:scale-95 disabled:opacity-50 cursor-pointer"
                title="Atualiza a coluna 'Últ. Cobrança' com a data de hoje para todos os contratos desta agência no Google Sheets"
              >
                {registradoSucesso ? (
                  <Check className="h-4 w-4 text-emerald-600" />
                ) : (
                  <Check className="h-4 w-4 text-emerald-700" />
                )}
                {isRegistrando ? 'Gravando...' : registradoSucesso ? 'Data Gravada!' : 'Registrar Envio no Sheets'}
              </button>
            )}

            <a
              href={emailData.mailtoUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={async () => {
                if (onRegistrarEnvio) {
                  onRegistrarEnvio(grupo).catch((e) => console.error('Erro ao registrar envio ao abrir webmail:', e));
                }
              }}
              className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-indigo-700 transition active:scale-95 cursor-pointer"
              title="Abre o Gmail / Webmail e já atualiza a data da última cobrança no Google Sheets"
            >
              <ExternalLink className="h-4 w-4" />
              Abrir no Webmail / Gmail
            </a>

            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 transition cursor-pointer"
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
