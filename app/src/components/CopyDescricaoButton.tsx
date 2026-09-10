'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface CopyDescricaoButtonProps {
  text?: string | null;
  label?: string;
  variant?: 'topbar' | 'primary' | 'card' | 'icon';
  className?: string;
}

export function CopyDescricaoButton({
  text,
  label = 'Copiar Texto da Nota',
  variant = 'topbar',
  className = '',
}: CopyDescricaoButtonProps) {
  const [copied, setCopied] = useState(false);

  if (!text || !text.trim()) return null;

  async function handleCopy(e: React.MouseEvent) {
    e.stopPropagation();
    e.preventDefault();
    if (!text) return;

    // Normaliza quebras de linha para manter a formatação original intacta
    const formattedText = text.replace(/\r\n/g, '\n').trim();

    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(formattedText);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = formattedText;
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
      window.setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error('Falha ao copiar descrição da nota:', err);
    }
  }

  if (variant === 'topbar') {
    return (
      <button
        type="button"
        onClick={handleCopy}
        title="Copia a descrição e discriminação da nota fiscal com quebras de linha preservadas"
        className={`inline-flex items-center justify-center gap-1.5 rounded-xl border px-3.5 py-2 text-xs font-bold transition-all active:scale-[0.98] cursor-pointer shadow-xs ${
          copied
            ? 'border-emerald-500 bg-emerald-50 text-emerald-800 ring-2 ring-emerald-500/20'
            : 'border-indigo-200 bg-indigo-50 text-indigo-700 hover:bg-indigo-100/80 hover:border-indigo-300'
        } ${className}`}
      >
        {copied ? (
          <>
            <Check className="h-3.5 w-3.5 text-emerald-600 animate-in zoom-in-50 duration-200" />
            <span className="text-emerald-700 font-black">Texto Copiado!</span>
          </>
        ) : (
          <>
            <Copy className="h-3.5 w-3.5 text-indigo-600" />
            <span>{label}</span>
          </>
        )}
      </button>
    );
  }

  if (variant === 'primary') {
    return (
      <button
        type="button"
        onClick={handleCopy}
        title="Copia todo o texto formatado para a área de transferência"
        className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all active:scale-[0.98] cursor-pointer shadow-xs ${
          copied
            ? 'bg-emerald-600 text-white ring-2 ring-emerald-600/30'
            : 'bg-indigo-600 text-white hover:bg-indigo-700'
        } ${className}`}
      >
        {copied ? (
          <>
            <Check className="h-4 w-4 animate-in zoom-in-50 duration-200" />
            <span>Copiado com sucesso!</span>
          </>
        ) : (
          <>
            <Copy className="h-4 w-4" />
            <span>{label}</span>
          </>
        )}
      </button>
    );
  }

  // Icon only
  return (
    <button
      type="button"
      onClick={handleCopy}
      title="Copiar texto da nota formatado"
      className={`inline-flex items-center justify-center p-1.5 rounded-lg border transition-all active:scale-95 cursor-pointer ${
        copied
          ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
          : 'border-slate-200 bg-white text-slate-500 hover:bg-slate-100 hover:text-slate-800'
      } ${className}`}
    >
      {copied ? (
        <Check className="h-3.5 w-3.5 text-emerald-600" />
      ) : (
        <Copy className="h-3.5 w-3.5" />
      )}
    </button>
  );
}
