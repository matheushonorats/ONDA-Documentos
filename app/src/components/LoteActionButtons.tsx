'use client';

import { useState } from 'react';
import {
  Download,
  Link as LinkIcon,
  Check,
  MessageSquare,
  Loader2,
  FileSpreadsheet,
  Printer,
} from 'lucide-react';

interface LoteActionButtonsProps {
  loteId: string;
  codigo: string | null;
  titulo: string;
  resumoWhatsApp: string;
}

export function LoteActionButtons({
  loteId,
  codigo,
  titulo,
  resumoWhatsApp,
}: LoteActionButtonsProps) {
  const [downloadingZip, setDownloadingZip] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedZap, setCopiedZap] = useState(false);

  const handleCopyLink = async () => {
    try {
      const url = window.location.href;
      await navigator.clipboard.writeText(url);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    } catch {}
  };

  const handleCopyWhatsApp = async () => {
    try {
      await navigator.clipboard.writeText(resumoWhatsApp);
      setCopiedZap(true);
      setTimeout(() => setCopiedZap(false), 2000);
    } catch {}
  };

  const handleDownloadZip = () => {
    setDownloadingZip(true);
    const a = document.createElement('a');
    a.href = `/api/lotes/${loteId}/download-zip`;
    a.download = `${codigo || 'Lote'}.zip`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => setDownloadingZip(false), 3000);
  };

  const handleDownloadExcel = () => {
    const a = document.createElement('a');
    a.href = `/api/lotes/${loteId}/download-excel`;
    a.download = `Planilha_${codigo || 'Lote'}.xlsx`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handlePrintPdf = () => {
    window.print();
  };

  return (
    <div className="flex flex-wrap items-center gap-2 print:hidden">
      {/* Download do ZIP */}
      <button
        onClick={handleDownloadZip}
        disabled={downloadingZip}
        className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs sm:text-sm font-bold text-white shadow-sm hover:bg-emerald-700 active:scale-[0.98] transition-all cursor-pointer disabled:opacity-70"
        title="Baixar pacote completo com todas as notas, PDFs, atalhos e planilha"
      >
        {downloadingZip ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Gerando ZIP...
          </>
        ) : (
          <>
            <Download className="h-4 w-4" />
            Baixar Lote (.ZIP)
          </>
        )}
      </button>

      {/* Exportar Excel */}
      <button
        onClick={handleDownloadExcel}
        className="inline-flex items-center gap-1.5 rounded-xl border border-emerald-400 bg-emerald-50 px-3.5 py-2.5 text-xs sm:text-sm font-bold text-emerald-800 hover:bg-emerald-100 active:scale-[0.98] transition-all cursor-pointer"
        title="Baixar planilha Excel com todos os dados do lote"
      >
        <FileSpreadsheet className="h-4 w-4 text-emerald-700" />
        Exportar Excel (.XLSX)
      </button>

      {/* Imprimir / Salvar em PDF */}
      <button
        onClick={handlePrintPdf}
        className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-xs sm:text-sm font-bold text-slate-700 hover:bg-slate-50 active:scale-[0.98] transition-all cursor-pointer"
        title="Imprimir ou Salvar Relatório em PDF"
      >
        <Printer className="h-4 w-4 text-slate-600" />
        Imprimir / Salvar PDF
      </button>

      {/* Copiar WhatsApp */}
      <button
        onClick={handleCopyWhatsApp}
        className="inline-flex items-center gap-1.5 rounded-xl border border-indigo-200 bg-indigo-50 px-3.5 py-2.5 text-xs sm:text-sm font-bold text-indigo-800 hover:bg-indigo-100 active:scale-[0.98] transition-all cursor-pointer"
        title="Copiar texto pronto com links para enviar no WhatsApp"
      >
        {copiedZap ? (
          <>
            <Check className="h-4 w-4 text-indigo-700" />
            Copiado!
          </>
        ) : (
          <>
            <MessageSquare className="h-4 w-4 text-indigo-700" />
            Copiar WhatsApp
          </>
        )}
      </button>

      {/* Copiar Link */}
      <button
        onClick={handleCopyLink}
        className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-xs sm:text-sm font-bold text-slate-700 hover:bg-slate-50 active:scale-[0.98] transition-all cursor-pointer"
        title="Copiar link desta página para enviar ao financeiro"
      >
        {copiedLink ? (
          <>
            <Check className="h-4 w-4 text-indigo-600" />
            Link Copiado!
          </>
        ) : (
          <>
            <LinkIcon className="h-4 w-4 text-slate-500" />
            Copiar Link
          </>
        )}
      </button>
    </div>
  );
}
