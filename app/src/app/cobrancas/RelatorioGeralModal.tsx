'use client';

import { useState, useEffect } from 'react';
import { X, Printer, FileText, CheckCircle2, AlertTriangle, Building2 } from 'lucide-react';
import { CobrancasDataResponse, FINANCEIRO_EMAIL } from '@/lib/cobrancasTypes';
import { printElementIsolated } from '@/lib/printHelper';
import Image from 'next/image';

interface RelatorioGeralModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: CobrancasDataResponse;
}

export function RelatorioGeralModal({ isOpen, onClose, data }: RelatorioGeralModalProps) {
  const { agenciasGrupos, metrics, todosContratos } = data;
  const [incluirDetalhamento, setIncluirDetalhamento] = useState(true);

  useEffect(() => {
    if (!isOpen) return;
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const dataEmissao = new Date().toLocaleDateString('pt-BR');
  const horaEmissao = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

  // Contratos em aberto (não pagos)
  const contratosEmAberto = todosContratos.filter(c => !c.pago);

  function handlePrint() {
    printElementIsolated('relatorio-imprimivel', 'Relatorio_Cobrancas_Agencias_Em_Aberto');
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 p-2 sm:p-4 backdrop-blur-xs overflow-y-auto">
      <div className="relative my-4 w-full max-w-5xl rounded-3xl bg-white shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[95vh]">
        {/* Top bar de controles */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 bg-slate-50 px-6 py-4">
          <div>
            <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
              <FileText className="h-5 w-5 text-indigo-600" /> Relatório de Cobranças de Agências em Aberto
            </h3>
            <p className="text-xs text-slate-500">
              Resumo e detalhamento de todas as pendências vencidas e a vencer
            </p>
          </div>

          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer select-none bg-white px-3 py-1.5 rounded-xl border border-slate-200">
              <input
                type="checkbox"
                checked={incluirDetalhamento}
                onChange={(e) => setIncluirDetalhamento(e.target.checked)}
                className="h-3.5 w-3.5 rounded text-indigo-600 focus:ring-indigo-500"
              />
              Incluir contratos individuais
            </label>

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
              className="rounded-xl p-2 text-slate-400 hover:bg-slate-200 hover:text-slate-700 transition cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Canvas Imprimível */}
        <div className="flex-1 overflow-y-auto p-6 bg-white text-slate-900">
          <div id="relatorio-imprimivel" className="max-w-4xl mx-auto p-2 space-y-6">
            {/* Header da Empresa */}
            <div className="flex items-center justify-between pb-4 border-b-2 border-slate-900">
              <div className="flex items-center gap-3">
                <Image
                  src="/ondas.png"
                  alt="Ondas 985"
                  width={48}
                  height={48}
                  className="h-12 w-auto object-contain"
                />
                <div>
                  <h1 className="text-lg font-black text-slate-900 tracking-tight leading-tight">
                    ONDAS <span className="text-indigo-600">DOCUMENTOS</span>
                  </h1>
                  <p className="text-xs font-semibold text-slate-600">
                    Ondas Sistema de Radiodifusão LTDA
                  </p>
                </div>
              </div>
              <div className="text-right text-xs">
                <span className="inline-block rounded-md bg-rose-100 text-rose-800 font-bold px-2.5 py-0.5 text-[10px] uppercase mb-1">
                  Relatório Financeiro
                </span>
                <p className="font-black text-slate-900 text-sm">Cobranças em Aberto (Agências)</p>
                <p className="text-[11px] text-slate-500">Emissão: {dataEmissao} às {horaEmissao}</p>
              </div>
            </div>

            {/* 4 Cards de Métricas Principais */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="rounded-xl border border-rose-200 bg-rose-50/70 p-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-rose-700 block">
                  Total Vencido
                </span>
                <span className="text-lg font-black text-rose-900 block mt-0.5">
                  {metrics.totalVencidoFormatado}
                </span>
                <span className="text-[10px] font-semibold text-rose-600">
                  {metrics.totalContratosPendentes} contrato(s) vencido(s)
                </span>
              </div>

              <div className="rounded-xl border border-indigo-200 bg-indigo-50/70 p-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700 block">
                  A Vencer
                </span>
                <span className="text-lg font-black text-indigo-900 block mt-0.5">
                  {metrics.totalAVencerFormatado}
                </span>
                <span className="text-[10px] font-semibold text-indigo-600">
                  No prazo regular
                </span>
              </div>

              <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 block">
                  Agências Pendentes
                </span>
                <span className="text-lg font-black text-amber-950 block mt-0.5">
                  {metrics.totalAgenciasPendentes}
                </span>
                <span className="text-[10px] font-semibold text-amber-700">
                  Com faturas pendentes
                </span>
              </div>

              <div className="rounded-xl border border-emerald-200 bg-emerald-50/70 p-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 block">
                  Total Já Recebido
                </span>
                <span className="text-lg font-black text-emerald-900 block mt-0.5">
                  {metrics.totalPagoFormatado}
                </span>
                <span className="text-[10px] font-semibold text-emerald-600">
                  {metrics.totalContratosPagos} contrato(s) baixado(s)
                </span>
              </div>
            </div>

            {/* SEÇÃO 1: Resumo Consolidado por Agência */}
            <div className="space-y-2">
              <h2 className="text-sm font-black text-slate-900 flex items-center gap-1.5 uppercase tracking-wide">
                <Building2 className="h-4 w-4 text-indigo-600" /> 1. Resumo por Agência de Publicidade
              </h2>

              <div className="overflow-x-auto rounded-xl border border-slate-200">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-100 border-b border-slate-200 text-[11px] font-bold text-slate-700">
                      <th className="px-3 py-2 border-r border-slate-200 w-10 text-center">#</th>
                      <th className="px-3 py-2 border-r border-slate-200">Agência / Empresa</th>
                      <th className="px-3 py-2 border-r border-slate-200 text-center w-24">Pendências</th>
                      <th className="px-3 py-2 border-r border-slate-200">E-mail(s) de Contato</th>
                      <th className="px-3 py-2 text-right w-36">Total em Aberto</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {agenciasGrupos.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="px-4 py-8 text-center text-slate-500">
                          Nenhuma pendência em aberto registrada na planilha.
                        </td>
                      </tr>
                    ) : (
                      agenciasGrupos.map((g, idx) => (
                        <tr key={idx} className="hover:bg-slate-50">
                          <td className="px-3 py-2 text-center font-mono text-slate-400 border-r border-slate-200">
                            {idx + 1}
                          </td>
                          <td className="px-3 py-2 font-bold text-slate-900 border-r border-slate-200">
                            {g.agencia}
                          </td>
                          <td className="px-3 py-2 text-center font-semibold text-slate-700 border-r border-slate-200">
                            <span className="rounded bg-rose-100 text-rose-800 px-2 py-0.5 text-[10px] font-bold">
                              {g.quantidadeContratos} contrato(s)
                            </span>
                          </td>
                          <td className="px-3 py-2 text-slate-600 font-mono text-[11px] border-r border-slate-200 truncate max-w-[280px]">
                            {g.emailsFormatados || '—'}
                          </td>
                          <td className="px-3 py-2 text-right font-mono font-black text-rose-700">
                            {g.totalValorFormatado}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                  <tfoot>
                    <tr className="bg-slate-100 font-bold border-t-2 border-slate-300">
                      <td colSpan={4} className="px-3 py-2.5 text-right text-slate-800 border-r border-slate-200 uppercase text-[11px]">
                        Total Geral Vencido:
                      </td>
                      <td className="px-3 py-2.5 text-right font-mono text-sm font-black text-rose-700">
                        {metrics.totalVencidoFormatado}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            {/* SEÇÃO 2: Detalhamento de cada Contrato/PI Individual */}
            {incluirDetalhamento && agenciasGrupos.length > 0 && (
              <div className="space-y-4 pt-4 border-t border-slate-200">
                <h2 className="text-sm font-black text-slate-900 flex items-center gap-1.5 uppercase tracking-wide">
                  <FileText className="h-4 w-4 text-indigo-600" /> 2. Detalhamento de Contratos / PIs por Agência
                </h2>

                {agenciasGrupos.map((grupo, gIdx) => (
                  <div key={gIdx} className="rounded-xl border border-slate-200 overflow-hidden">
                    <div className="bg-slate-50 px-4 py-2 border-b border-slate-200 flex items-center justify-between">
                      <span className="font-black text-xs text-slate-900">
                        {gIdx + 1}. {grupo.agencia}
                      </span>
                      <span className="text-xs font-bold text-rose-700">
                        Total: {grupo.totalValorFormatado} ({grupo.quantidadeContratos} contrato(s))
                      </span>
                    </div>

                    <table className="w-full text-left text-[11px] border-collapse">
                      <thead>
                        <tr className="bg-slate-100/60 text-slate-600 font-semibold border-b border-slate-200">
                          <th className="px-3 py-1.5 border-r border-slate-200 w-12 text-center">Nº</th>
                          <th className="px-3 py-1.5 border-r border-slate-200 w-24">PI</th>
                          <th className="px-3 py-1.5 border-r border-slate-200 w-24">Veículo</th>
                          <th className="px-3 py-1.5 border-r border-slate-200 w-28">Vencimento</th>
                          <th className="px-3 py-1.5 border-r border-slate-200 text-center w-24">Atraso</th>
                          <th className="px-3 py-1.5 border-r border-slate-200">Observações / NF</th>
                          <th className="px-3 py-1.5 text-right w-28">Valor</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {grupo.debts.map((deb, dIdx) => (
                          <tr key={dIdx} className="hover:bg-slate-50/50">
                            <td className="px-3 py-1.5 text-center font-mono text-slate-400 border-r border-slate-200">
                              {deb.cobrancaNo}
                            </td>
                            <td className="px-3 py-1.5 font-bold text-slate-800 border-r border-slate-200">
                              {deb.pi}
                            </td>
                            <td className="px-3 py-1.5 text-slate-700 border-r border-slate-200">
                              {deb.veiculo}
                            </td>
                            <td className="px-3 py-1.5 font-mono text-slate-800 border-r border-slate-200">
                              {deb.dataVenc}
                            </td>
                            <td className="px-3 py-1.5 text-center border-r border-slate-200">
                              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                deb.diasAtraso > 30 ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800'
                              }`}>
                                {deb.diasAtraso} dias
                              </span>
                            </td>
                            <td className="px-3 py-1.5 text-slate-600 border-r border-slate-200 truncate max-w-[220px]">
                              {deb.obs || '—'}
                            </td>
                            <td className="px-3 py-1.5 text-right font-mono font-bold text-slate-900">
                              {deb.valorFormatado}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ))}
              </div>
            )}

            {/* Rodapé do Relatório */}
            <div className="mt-8 pt-4 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
              <div>
                <p className="font-bold text-slate-800">Departamento Financeiro</p>
                <p className="text-[11px]">Ondas Sistema de Radiodifusão LTDA</p>
              </div>
              <div className="text-right">
                <p className="text-[11px]">Contato: {FINANCEIRO_EMAIL}</p>
                <p className="text-[10px] text-slate-400">Documento gerado automaticamente pelo Ondas Documentos</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
