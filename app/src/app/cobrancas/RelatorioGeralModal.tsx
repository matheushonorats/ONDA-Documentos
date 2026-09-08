'use client';

import { useEffect } from 'react';
import { X, Printer, ShieldCheck, Building2, CheckCircle2, AlertTriangle, FileSpreadsheet, Mail } from 'lucide-react';
import Image from 'next/image';
import { CobrancasDataResponse, FINANCEIRO_EMAIL } from '@/lib/cobrancasTypes';

interface RelatorioGeralModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: CobrancasDataResponse;
}

export function RelatorioGeralModal({ isOpen, onClose, data }: RelatorioGeralModalProps) {
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

  if (!isOpen) return null;

  const { metrics, agenciasGrupos, todosContratos } = data;

  const dataHoraEmissao = new Date().toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  const protocolo = `AUDIT-${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}-DIR`;

  function handlePrint() {
    window.print();
  }

  // Contratos pagos para demonstrar efetividade da cobrança
  const contratosPagos = todosContratos.filter((c) => c.status === 'PAGO');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-2 sm:p-4 backdrop-blur-xs overflow-y-auto">
      {/* Modal Container */}
      <div className="relative my-6 w-full max-w-5xl rounded-2xl bg-white shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[95vh] print:m-0 print:p-0 print:border-none print:shadow-none print:max-h-none print:w-full">
        {/* Modal Top Bar (Hidden on Print) */}
        <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50/90 px-6 py-4 print:hidden">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100">
              <FileSpreadsheet className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900">Relatório Consolidado para a Diretoria</h3>
              <p className="text-xs text-slate-500">
                Visão macro completa de auditoria de cobrança de agências para prestação de contas
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-indigo-700 transition active:scale-95 cursor-pointer"
            >
              <Printer className="h-4 w-4" />
              Imprimir / Salvar PDF
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label="Fechar"
              className="rounded-xl p-2 text-slate-400 hover:bg-slate-200/70 hover:text-slate-700 transition cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Printable Canvas */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-10 bg-white text-slate-800 print:p-0 print:overflow-visible">
          <div className="max-w-4xl mx-auto border border-slate-200 rounded-2xl p-6 sm:p-8 bg-white shadow-xs print:border-none print:p-0 print:shadow-none">
            {/* Header Timbrado */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b-2 border-slate-900 gap-4">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Image src="/ondas.png" alt="Ondas 985" width={48} height={48} className="h-12 w-auto object-contain" />
                </div>
                <div>
                  <h1 className="text-xl font-black text-slate-900 tracking-tight">
                    ONDAS 985 <span className="text-indigo-600">DOCUMENTOS</span>
                  </h1>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-600">
                    Rádios Litoral FM &amp; Onda Livre FM • Controladoria Geral &amp; Faturamento
                  </p>
                </div>
              </div>

              <div className="text-left sm:text-right">
                <span className="inline-flex items-center gap-1 rounded-full bg-indigo-100 px-3 py-0.5 text-[11px] font-black text-indigo-900 uppercase tracking-wider border border-indigo-200">
                  <ShieldCheck className="h-3 w-3" /> Painel Executivo de Cobranças
                </span>
                <p className="text-[11px] font-mono text-slate-500 mt-1">
                  Protocolo Geral: <strong>{protocolo}</strong>
                </p>
                <p className="text-[11px] text-slate-500">Emissão: {dataHoraEmissao}</p>
              </div>
            </div>

            {/* Title */}
            <div className="my-6 text-center">
              <h2 className="text-lg font-black text-slate-900 uppercase tracking-wide">
                Relatório Geral de Auditoria e Notificação de Cobranças de Agências
              </h2>
              <p className="text-xs text-slate-500 max-w-2xl mx-auto mt-1">
                Demonstrativo oficial de acompanhamento da carteira de agências publicitárias, controle de inadimplência, histórico de notificações formais e receitas recuperadas perante a Diretoria Executiva.
              </p>
            </div>

            {/* Macro Indicator Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              <div className="rounded-xl border border-rose-200 bg-rose-50/70 p-3.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-rose-700 block">Total em Atraso</span>
                <span className="text-lg sm:text-xl font-black text-rose-950 block mt-0.5">
                  {metrics.totalVencidoFormatado}
                </span>
                <span className="text-[10px] font-semibold text-rose-600">
                  {metrics.totalContratosPendentes} contratos vencidos
                </span>
              </div>

              <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-3.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 block">Agências Notificadas</span>
                <span className="text-lg sm:text-xl font-black text-amber-950 block mt-0.5">
                  {metrics.totalAgenciasPendentes} agências
                </span>
                <span className="text-[10px] font-semibold text-amber-700">Em cobrança semanal</span>
              </div>

              <div className="rounded-xl border border-emerald-200 bg-emerald-50/70 p-3.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 block">Total Já Quitado</span>
                <span className="text-lg sm:text-xl font-black text-emerald-950 block mt-0.5">
                  {metrics.totalPagoFormatado}
                </span>
                <span className="text-[10px] font-semibold text-emerald-700">
                  {metrics.totalContratosPagos} autorizações pagas
                </span>
              </div>

              <div className="rounded-xl border border-indigo-200 bg-indigo-50/70 p-3.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-800 block">A Vencer</span>
                <span className="text-lg sm:text-xl font-black text-indigo-950 block mt-0.5">
                  {metrics.totalAVencerFormatado}
                </span>
                <span className="text-[10px] font-semibold text-indigo-600">Fluxo futuro</span>
              </div>
            </div>

            {/* Overdue Agencies Summary Table */}
            <div className="mb-6">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-800 mb-2.5 flex items-center justify-between">
                <span>Quadro Consolidado de Agências com Notificação Ativa</span>
                <span className="text-slate-500 font-normal">{agenciasGrupos.length} agência(s) devedora(s)</span>
              </h3>

              <div className="overflow-hidden rounded-xl border border-slate-200">
                <table className="w-full border-collapse text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-100 text-[11px] font-bold uppercase tracking-wider text-slate-600">
                      <th className="px-3 py-2.5">Agência de Publicidade</th>
                      <th className="px-3 py-2.5 text-center">PIs</th>
                      <th className="px-3 py-2.5">E-mails Notificados</th>
                      <th className="px-3 py-2.5">Último Envio</th>
                      <th className="px-3 py-2.5 text-center">Status</th>
                      <th className="px-3 py-2.5 text-right">Valor em Aberto</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {agenciasGrupos.map((grupo, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/50" style={{ breakInside: 'avoid', pageBreakInside: 'avoid' }}>
                        <td className="px-3 py-2.5 font-bold text-slate-900">
                          {grupo.agencia}
                          <div className="text-[10px] font-mono text-slate-400 font-normal">
                            PIs: {grupo.debts.map((d) => d.pi).join(', ')}
                          </div>
                        </td>
                        <td className="px-3 py-2.5 text-center font-bold text-slate-800">
                          {grupo.quantidadeContratos}
                        </td>
                        <td className="px-3 py-2.5 text-[11px] font-mono text-slate-600 max-w-xs truncate">
                          {grupo.emails.join(', ')}
                        </td>
                        <td className="px-3 py-2.5 text-slate-600">
                          {grupo.debts[0]?.ultCobranca || 'Sem registro prévio'}
                        </td>
                        <td className="px-3 py-2.5 text-center">
                          <span className="inline-block rounded bg-rose-50 px-2 py-0.5 text-[10px] font-bold text-rose-700 border border-rose-200">
                            COBRANÇA ATIVA
                          </span>
                        </td>
                        <td className="px-3 py-2.5 text-right font-mono font-bold text-slate-900">
                          {grupo.totalValorFormatado}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="border-t-2 border-slate-300 bg-slate-50 font-black text-slate-900" style={{ breakInside: 'avoid', pageBreakInside: 'avoid' }}>
                      <td colSpan={5} className="px-3 py-3 text-right uppercase tracking-wider text-[11px]">
                        Total Geral em Atraso Notificado:
                      </td>
                      <td className="px-3 py-3 text-right text-sm font-mono text-rose-700">
                        {metrics.totalVencidoFormatado}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            {/* Amostra de Contratos Regularizados / Efetividade */}
            {contratosPagos.length > 0 && (
              <div className="mb-6 rounded-xl border border-emerald-200 bg-emerald-50/40 p-4 text-xs">
                <span className="text-emerald-800 font-bold uppercase tracking-wider text-[10px] block mb-1">
                  Efetividade da Cobrança — Amostra de Autorizações Liquidadas Recentemente
                </span>
                <p className="text-emerald-900 text-[11px] mb-2 leading-relaxed">
                  Demonstração de autorizações de mídia que foram cobradas e tiveram sua quitação confirmada, totalizando <strong>{metrics.totalPagoFormatado}</strong> recuperados:
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {contratosPagos.slice(0, 10).map((p, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1 rounded bg-white px-2 py-0.5 font-mono text-[10px] font-semibold text-emerald-900 border border-emerald-200"
                    >
                      <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                      PI {p.pi} ({p.agencia}) - {p.valorFormatado}
                    </span>
                  ))}
                  {contratosPagos.length > 10 && (
                    <span className="text-[10px] text-emerald-700 font-bold self-center">
                      + {contratosPagos.length - 10} outras autorizações quitadas
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Parecer do Setor Financeiro para a Diretoria */}
            <div className="mt-8 pt-6 border-t border-slate-200 text-xs">
              <h4 className="text-[11px] font-black uppercase tracking-wider text-slate-800 mb-1">
                Parecer Técnico do Setor Financeiro &amp; Termo de Fé Interna
              </h4>
              <p className="text-slate-600 leading-relaxed text-[11px] italic">
                &ldquo;Certificamos formalmente à Diretoria Executiva que 100% das agências listadas com faturas vencidas encontram-se sob rigorosa régua de cobrança periódica semanal. As notificações extrajudiciais são encaminhadas sistematicamente por intermédio do canal corporativo (adm@ondas985.com.br), acompanhadas dos espelhos detalhados de veiculação e solicitações formais de quitação ou envio de comprovantes. O controle é mantido e auditado de forma contínua.&rdquo;
              </p>

              <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="text-center sm:text-left">
                  <div className="h-0.5 w-56 bg-slate-400 mb-1"></div>
                  <p className="font-black text-slate-900 text-xs">Departamento de Controladoria &amp; Cobrança</p>
                  <p className="text-[10px] text-slate-500">Ondas 985 FM / Litoral FM</p>
                </div>

                <div className="text-center sm:text-right">
                  <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Canal Institucional</p>
                  <p className="font-bold text-slate-800 text-xs">{FINANCEIRO_EMAIL}</p>
                  <p className="text-[10px] text-slate-500">Rádios Litoral FM &amp; Onda Livre FM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
