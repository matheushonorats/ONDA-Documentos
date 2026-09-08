/**
 * Utilitário profissional de impressão sem corte de texto e sem poluição visual.
 * Imprime exclusivamente o elemento alvo em um contexto isolado (iframe),
 * garantindo layout A4 limpo, quebras de página perfeitas e zero vazamento
 * do resto da página de fundo.
 */
export function printElementIsolated(elementId: string, documentTitle: string) {
  const el = document.getElementById(elementId);
  if (!el) {
    window.print();
    return;
  }

  // Remove qualquer iframe de impressão anterior
  const existingIframe = document.getElementById('isolated-print-iframe');
  if (existingIframe) {
    existingIframe.remove();
  }

  // Cria iframe invisível
  const iframe = document.createElement('iframe');
  iframe.id = 'isolated-print-iframe';
  iframe.style.position = 'fixed';
  iframe.style.top = '0';
  iframe.style.left = '0';
  iframe.style.width = '1px';
  iframe.style.height = '1px';
  iframe.style.border = 'none';
  iframe.style.opacity = '0';
  iframe.style.pointerEvents = 'none';
  document.body.appendChild(iframe);

  const doc = iframe.contentWindow?.document;
  if (!doc) {
    window.print();
    return;
  }

  // Clona o HTML do elemento
  const contentHtml = el.innerHTML;

  doc.open();
  doc.write(`
    <!DOCTYPE html>
    <html lang="pt-BR">
      <head>
        <meta charset="utf-8" />
        <title>${documentTitle}</title>
        <style>
          @page {
            size: A4 portrait;
            margin: 12mm 15mm;
          }
          * {
            box-sizing: border-box;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          html, body {
            margin: 0;
            padding: 0;
            background: #ffffff !important;
            color: #0f172a !important;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
            font-size: 11px;
            line-height: 1.4;
          }
          table {
            width: 100% !important;
            border-collapse: collapse !important;
            margin: 10px 0 !important;
            page-break-inside: auto;
          }
          tr {
            page-break-inside: avoid;
            page-break-after: auto;
          }
          th, td {
            padding: 6px 8px !important;
            border: 1px solid #e2e8f0 !important;
          }
          th {
            background-color: #f8fafc !important;
            color: #475569 !important;
            font-weight: 700 !important;
          }
          .print-hidden, .no-print {
            display: none !important;
          }
          /* Estilos Tailwind essenciais para impressão */
          .border-b-2 { border-bottom-width: 2px !important; }
          .border-slate-900 { border-color: #0f172a !important; }
          .font-black { font-weight: 900 !important; }
          .font-bold { font-weight: 700 !important; }
          .font-semibold { font-weight: 600 !important; }
          .font-mono { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace !important; }
          .text-xs { font-size: 11px !important; }
          .text-sm { font-size: 12px !important; }
          .text-base { font-size: 14px !important; }
          .text-lg { font-size: 16px !important; }
          .text-xl { font-size: 18px !important; }
          .text-slate-900 { color: #0f172a !important; }
          .text-slate-800 { color: #1e293b !important; }
          .text-slate-700 { color: #334155 !important; }
          .text-slate-600 { color: #475569 !important; }
          .text-slate-500 { color: #64748b !important; }
          .text-indigo-600 { color: #4f46e5 !important; }
          .text-emerald-700 { color: #047857 !important; }
          .text-emerald-800 { color: #065f46 !important; }
          .text-rose-700 { color: #be123c !important; }
          .bg-slate-50 { background-color: #f8fafc !important; }
          .bg-emerald-50 { background-color: #ecfdf5 !important; }
          .bg-emerald-100 { background-color: #d1fae5 !important; }
          .bg-indigo-50 { background-color: #eef2ff !important; }
          .bg-indigo-100 { background-color: #e0e7ff !important; }
          .bg-rose-50 { background-color: #fff1f2 !important; }
          .rounded-lg { border-radius: 6px !important; }
          .rounded-xl { border-radius: 8px !important; }
          .rounded-2xl { border-radius: 12px !important; }
          .border { border-width: 1px !important; }
          .border-slate-200 { border-color: #e2e8f0 !important; }
          .p-4 { padding: 12px !important; }
          .p-5 { padding: 14px !important; }
          .p-6 { padding: 16px !important; }
          .pb-4 { padding-bottom: 12px !important; }
          .pb-6 { padding-bottom: 16px !important; }
          .pt-4 { padding-top: 12px !important; }
          .pt-6 { padding-top: 16px !important; }
          .my-6 { margin-top: 14px !important; margin-bottom: 14px !important; }
          .mt-2 { margin-top: 6px !important; }
          .mt-3 { margin-top: 8px !important; }
          .mt-4 { margin-top: 12px !important; }
          .mt-6 { margin-top: 16px !important; }
          .mt-8 { margin-top: 20px !important; }
          .mb-1 { margin-bottom: 4px !important; }
          .mb-4 { margin-bottom: 12px !important; }
          .mb-6 { margin-bottom: 16px !important; }
          .text-center { text-align: center !important; }
          .text-right { text-align: right !important; }
          .text-left { text-align: left !important; }
          .flex { display: flex !important; }
          .items-center { align-items: center !important; }
          .justify-between { justify-content: space-between !important; }
          .gap-2 { gap: 6px !important; }
          .gap-3 { gap: 8px !important; }
          .gap-4 { gap: 12px !important; }
          .gap-6 { gap: 16px !important; }
          .grid { display: grid !important; }
          .grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }
          .grid-cols-4 { grid-template-columns: repeat(4, minmax(0, 1fr)) !important; }
          .uppercase { text-transform: uppercase !important; }
          .italic { font-style: italic !important; }
          .whitespace-pre-wrap { white-space: pre-wrap !important; }
        </style>
      </head>
      <body>
        ${contentHtml}
      </body>
    </html>
  `);
  doc.close();

  // Aguarda carregar e dispara a janela de impressão nativa
  setTimeout(() => {
    iframe.contentWindow?.focus();
    iframe.contentWindow?.print();
  }, 250);
}