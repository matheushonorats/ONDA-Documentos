'use client';

import { useState } from 'react';
import { Copy, Check, Hash } from 'lucide-react';

interface CopyCnpjProps {
  cnpj?: string | null;
  label?: string;
  variant?: 'badge' | 'button' | 'icon' | 'topbar';
  className?: string;
}

export function CopyCnpj({
  cnpj,
  label = 'Copiar CNPJ',
  variant = 'badge',
  className = '',
}: CopyCnpjProps) {
  const [copied, setCopied] = useState(false);

  if (!cnpj) return null;

  // Apenas dígitos numéricos puros (sem pontos, barras ou traços)
  const cleanCnpj = cnpj.replace(/\D/g, '').trim();
  if (!cleanCnpj) return null;

  // Formatação visual para exibição humana (XX.XXX.XXX/XXXX-XX)
  const formattedCnpj =
    cleanCnpj.length === 14
      ? cleanCnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5')
      : cleanCnpj;

  async function handleCopy(e: React.MouseEvent) {
    e.stopPropagation();
    e.preventDefault();

    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(cleanCnpj);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = cleanCnpj;
        textarea.style.position = 'fixed';
        textarea.style.left = '-9999px';
        textarea.style.top = '0';
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }

      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch (err) {
      console.error('Falha ao copiar CNPJ:', err);
    }
  }

  // Estilo Topbar / Botão de Ação
  if (variant === 'topbar') {
    return (
      <button
        type="button"
        onClick={handleCopy}
        title="Copiar CNPJ limpo (somente números)"
        className={`inline-flex items-center justify-center gap-1.5 rounded-xl border px-3.5 py-2 text-xs font-bold transition-all active:scale-[0.98] cursor-pointer shadow-xs ${
          copied
            ? 'border-emerald-500 bg-emerald-50 text-emerald-800 ring-2 ring-emerald-500/20'
            : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50 hover:border-slate-400'
        } ${className}`}
      >
        {copied ? (
          <>
            <Check className="h-3.5 w-3.5 text-emerald-600 animate-in zoom-in-50 duration-200" />
            <span className="text-emerald-700 font-black">CNPJ Copiado!</span>
          </>
        ) : (
          <>
            <Copy className="h-3.5 w-3.5 text-slate-500" />
            <span>{label}</span>
          </>
        )}
      </button>
    );
  }

  // Estilo Badge com número visível (ótimo para cabeçalho ou listas)
  if (variant === 'badge') {
    return (
      <button
        type="button"
        onClick={handleCopy}
        title="Clique para copiar o CNPJ (somente números para emissão de NF)"
        className={`group inline-flex items-center gap-1.5 rounded-lg border px-2 py-1 text-xs font-mono font-medium transition-all active:scale-95 cursor-pointer ${
          copied
            ? 'border-emerald-500 bg-emerald-50 text-emerald-800 ring-1 ring-emerald-400'
            : 'border-slate-200 bg-slate-50/90 text-slate-700 hover:bg-indigo-50 hover:border-indigo-300 hover:text-indigo-800'
        } ${className}`}
      >
        <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-slate-400 group-hover:text-indigo-600">
          CNPJ:
        </span>
        <span className="font-bold">{formattedCnpj}</span>
        {copied ? (
          <span className="inline-flex items-center gap-1 font-sans text-[10px] font-black text-emerald-700 ml-1">
            <Check className="h-3 w-3 text-emerald-600" /> Copiado!
          </span>
        ) : (
          <Copy className="h-3 w-3 opacity-50 group-hover:opacity-100 group-hover:text-indigo-600 transition-opacity ml-0.5" />
        )}
      </button>
    );
  }

  // Estilo Botão de Destaque
  if (variant === 'button') {
    return (
      <button
        type="button"
        onClick={handleCopy}
        title="Copiar CNPJ limpo (somente números)"
        className={`inline-flex items-center justify-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-bold transition-all active:scale-95 cursor-pointer ${
          copied
            ? 'border-emerald-500 bg-emerald-50 text-emerald-800'
            : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-100 hover:border-slate-300'
        } ${className}`}
      >
        {copied ? (
          <>
            <Check className="h-3.5 w-3.5 text-emerald-600" />
            <span className="text-emerald-700 font-bold">CNPJ Copiado!</span>
          </>
        ) : (
          <>
            <Copy className="h-3.5 w-3.5 text-slate-500" />
            <span>{label}</span>
          </>
        )}
      </button>
    );
  }

  // Estilo Ícone Compacto
  return (
    <button
      type="button"
      onClick={handleCopy}
      title={`Copiar CNPJ (${cleanCnpj})`}
      className={`inline-flex items-center justify-center p-1 rounded-md border transition-all active:scale-95 cursor-pointer ${
        copied
          ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
          : 'border-slate-200 bg-white text-slate-500 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200'
      } ${className}`}
    >
      {copied ? (
        <Check className="h-3 w-3 text-emerald-600" />
      ) : (
        <Copy className="h-3 w-3" />
      )}
    </button>
  );
}
