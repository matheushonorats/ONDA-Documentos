'use client';

import { Check, Link as LinkIcon } from 'lucide-react';
import { useState } from 'react';

export function CopyPageLinkButton() {
  const [copied, setCopied] = useState(false);
  async function handleCopy() { await navigator.clipboard.writeText(window.location.href); setCopied(true); window.setTimeout(() => setCopied(false), 1800); }
  return <button type="button" onClick={handleCopy} className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 shadow-sm hover:bg-slate-50">{copied ? <Check className="h-4 w-4 text-emerald-600" /> : <LinkIcon className="h-4 w-4" />}{copied ? 'Link copiado' : 'Copiar link'}</button>;
}
