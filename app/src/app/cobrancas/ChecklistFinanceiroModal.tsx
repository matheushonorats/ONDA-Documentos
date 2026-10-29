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
  ListCheck,
  Send,
  Building2,
} from 'lucide-react';
import {
  AgenciaGrupo,
  EmailGerado,
  FINANCEIRO_EMAIL,
  buildChecklistFinanceiroEmail,
} from '@/lib/cobrancasTypes';

interface ChecklistFinanceiroModalProps {
  isOpen: boolean;
  onClose: () => void;
  grupos: AgenciaGrupo[];
}

export function ChecklistFinanceiroModal({
  isOpen,
  onClose,
  grupos,
}: ChecklistFinanceiroModalProps) {
  const [viewMode, setViewMode] = useState<'html' | 'text'>('html');
  const [copiedText, setCopiedText] = useState(false);
  const [copiedHtml, setCopiedHtml] = useState(false);
  const [copiedSubject, setCopiedSubject] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !grupos || grupos.length === 0) return null;

  const emailData: EmailGerado = buildChecklistFinanceiroEmail(grupos);

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
      console.error('Falha ao copiar:', err);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 p-2 sm:p-4 backdrop-blur-xs overflow-y-auto">
      <div className="relative my-6 flex w-full max-w-4xl flex-col max-h-[95vh] rounded-2xl bg-white shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50/90 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-xs">
              <ListCheck className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-black text-slate-900">
                  Checklist de Auditoria Financeira para Baixas
                </h3>
              </div>
              <p className="text-xs text-slate-500">
                E-mail de conferência organizado por agência para envio a <strong>{FINANCEIRO_EMAIL}</strong>
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl p-2 text-slate-400 hover:bg-slate-200 hover:text-slate-700 transition cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Metadados do E-mail */}
        <div className="border-b border-slate-200 bg-white px-6 py-3 space-y-2 text-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-400 uppercase tracking-wider text-[10px] w-14 shrink-0">
                Para:
              </span>
              <span className="inline-flex items-center gap-1 font-mono font-bold bg-blue-50 text-blue-800 border border-blue-200 px-2 py-0.5 rounded">
                <Mail className="h-3 w-3" /> {FINANCEIRO_EMAIL}
              </span>
            </div>

            {/* Toggle HTML / Texto */}
            <div className="flex items-center rounded-xl bg-slate-100 p-1 border border-slate-200 shrink-0">
              <button
                type="button"
                onClick={() => setViewMode('html')}
                className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-bold transition cursor-pointer ${
                  viewMode === 'html'
                    ? 'bg-white text-blue-600 shadow-xs'
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
                    ? 'bg-white text-blue-600 shadow-xs'
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
              <span className="font-bold text-slate-400 uppercase tracking-wider text-[10px] w-14 shrink-0">
                Assunto:
              </span>
              <span className="truncate font-semibold text-slate-800">
                {emailData.assunto}
              </span>
            </div>
            <button
              type="button"
              onClick={() => safeCopy(emailData.assunto, setCopiedSubject)}
              className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-600 hover:text-blue-800 cursor-pointer shrink-0"
            >
              {copiedSubject ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
              {copiedSubject ? 'Copiado' : 'Copiar Assunto'}
            </button>
          </div>
        </div>

        {/* Viewport */}
        <div className="flex-1 overflow-y-auto bg-slate-100/70 p-4 sm:p-6">
          {viewMode === 'html' ? (
            <div className="mx-auto max-w-2xl rounded-xl bg-white shadow-xs border border-slate-200 overflow-hidden">
              <iframe
                title="Prévia do Checklist"
                srcDoc={emailData.html}
                className="w-full border-none"
                style={{ height: '480px' }}
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

        {/* Footer */}
        <div className="flex flex-wrap items-center justify-between gap-2.5 border-t border-slate-200 bg-slate-50/90 px-6 py-4">
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => safeCopy(emailData.texto, setCopiedText)}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-slate-700 shadow-xs hover:bg-slate-50 transition active:scale-95 cursor-pointer"
            >
              {copiedText ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4" />}
              {copiedText ? 'Texto Copiado!' : 'Copiar Texto para WhatsApp/E-mail'}
            </button>

            <button
              type="button"
              onClick={() => safeCopy(emailData.html, setCopiedHtml)}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-slate-700 shadow-xs hover:bg-slate-50 transition active:scale-95 cursor-pointer"
            >
              {copiedHtml ? <Check className="h-4 w-4 text-emerald-600" /> : <Code2 className="h-4 w-4" />}
              {copiedHtml ? 'HTML Copiado!' : 'Copiar HTML'}
            </button>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={emailData.mailtoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-blue-700 transition active:scale-95 cursor-pointer"
            >
              <ExternalLink className="h-4 w-4" />
              Abrir E-mail no Gmail / Webmail
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
