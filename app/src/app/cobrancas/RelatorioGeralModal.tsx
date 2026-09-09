'use client';

import { useEffect } from 'react';
import { X, Printer } from 'lucide-react';
import { CobrancasDataResponse, FINANCEIRO_EMAIL } from '@/lib/cobrancasTypes';
import { printElementIsolated } from '@/lib/printHelper';
import Image from 'next/image';

interface RelatorioGeralModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: CobrancasDataResponse;
}

export function RelatorioGeralModal({ isOpen, onClose, data }: RelatorioGeralModalProps) {
  const { agenciasGrupos, metrics } = data;

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

  function handlePrint() {
    printElementIsolated('relatorio-imprimivel', 'Panorama Geral de Cobrancas');
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-2 sm:p-4 backdrop-blur-xs overflow-y-auto">
      <div className="relative my-4 w-full max-w-4xl rounded-2xl bg-white shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[95vh]">
        {/* Top bar */}
        <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-5 py-3.5">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Panorama Geral de Cobranças</h3>
            <p className="text-xs text-slate-500">Resumo consolidado de todas as agências com pendências</p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-indigo-700 transition active:scale-95 cursor-pointer"
            >
              <Printer className="h-4 w-4" />
              Imprimir / PDF
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label="Fechar"
              className="rounded-xl p-1.5 text-slate-400 hover:bg-slate-200 hover:text-slate-700 transition cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Printable Canvas */}
        <div className="flex-1 overflow-y-auto p-6 bg-white text-slate-900">
          <div id="relatorio-imprimivel" className="max-w-3xl mx-auto p-2">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b-2 border-slate-900">
              <div className="flex items-center gap-3">
                <Image src="/ondas.png" alt="Ondas 985" width={40} height={40} className="h-10 w-auto object-contain" />
                <div>
                  <h1 className="text-base font-black text-slate-900 tracking-tight leading-tight">
                    ONDAS <span className="text-indigo-600">DOCUMENTOS</span>
                  </h1>
                  <p className="text-[11px] font-semibold text-slate-600">
                    Ondas Sistema de Radiodifusão LTDA
                  </p>
                </div>
              </div>
              <div className="text-right text-xs">
                <p className="font-bold text-slate-800">Panorama Geral de Cobranças</p>
                <p className="text-[11px] text-slate-500">Emissão: {dataEmissao} às {horaEmissao}</p>
              </div>
            </div>

            {/* 4 Cards de Resumo */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-4">
              <div className="rounded-xl border border-rose-200 bg-rose-50 p-3">
                <span className="text-[10px] font-bold uppercase text-rose-700 block">Total Vencido</span>
                <span className="text-base font-black text-rose-900 block">{metrics.totalVencidoFormatado}</span>
                <span className="text-[10px] text-rose-600">{metrics.totalContratosPendentes} contrato(s)</span>
              </div>

              <div className="rounded-xl border border-indigo-200 bg-indigo-50 p-3">
                <span className="text-[10px] font-bold uppercase text-indigo-700 block">A Vencer</span>
                <span className="text-base font-black text-indigo-900 block">{metrics.totalAVencerFormatado}</span>
                <span className="text-[10px] text-indigo-600">No prazo regular</span>
              </div>

              <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3">
                <span className="text-[10px] font-bold uppercase text-emerald-700 block">Total Recebido</span>
                <span className="text-base font-black text-emerald-900 block">{metrics.totalPagoFormatado}</span>
                <span className="text-[10px] text-emerald-600">{metrics.totalContratosPagos} baixado(s)</span>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                <span className="text-[10px] font-bold uppercase text-slate-600 block">Agências em Aberto</span>
                <span className="text-base font-black text-slate-900 block">{metrics.totalAgenciasPendentes}</span>
                <span className="text-[10px] text-slate-500">Com débitos ativos</span>
              </div>
            </div>

            {/* Tabela Consolidada por Agência */}
            <div className="overflow-x-auto my-3">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-100 border-b border-slate-300 text-[11px] font-bold text-slate-700">
                    <th className="px-3 py-2 border border-slate-200">#</th>
                    <th className="px-3 py-2 border border-slate-200">Agência</th>
                    <th className="px-3 py-2 border border-slate-200 text-center">Contratos</th>
                    <th className="px-3 py-2 border border-slate-200">E-mail(s) de Contato</th>
                    <th className="px-3 py-2 border border-slate-200 text-right">Total Devido</th>
                  </tr>
                </thead>
                <tbody>
                  {agenciasGrupos.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-4 py-6 text-center text-slate-500 border border-slate-200">
                        Nenhuma pendência vencida registrada na planilha.
                      </td>
                    </tr>
                  ) : (
                    agenciasGrupos.map((g, idx) => (
                      <tr key={idx} className="border-b border-slate-200">
                        <td className="px-3 py-2 font-mono text-slate-400 border border-slate-200 w-8">
                          {idx + 1}
                        </td>
                        <td className="px-3 py-2 font-bold text-slate-900 border border-slate-200">
                          {g.agencia}
                        </td>
                        <td className="px-3 py-2 text-center font-semibold text-slate-700 border border-slate-200">
                          {g.quantidadeContratos}
                        </td>
                        <td className="px-3 py-2 text-slate-600 font-mono text-[11px] border border-slate-200">
                          {g.emailsFormatados || '—'}
                        </td>
                        <td className="px-3 py-2 text-right font-mono font-bold text-slate-900 border border-slate-200">
                          {g.totalValorFormatado}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
                <tfoot>
                  <tr className="bg-slate-100 font-bold border-t-2 border-slate-400">
                    <td colSpan={4} className="px-3 py-2 text-right text-slate-800 border border-slate-200">
                      Total Geral Pendente:
                    </td>
                    <td className="px-3 py-2 text-right font-mono text-sm text-slate-900 border border-slate-200">
                      {metrics.totalVencidoFormatado}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>

            {/* Rodapé Direto */}
            <div className="mt-8 pt-4 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600">
              <div>
                <p className="font-bold text-slate-900">Financeiro</p>
                <p className="text-[11px] text-slate-500">Ondas Sistema de Radiodifusão LTDA</p>
              </div>
              <div className="text-right">
                <p className="text-[11px] text-slate-500">Contato: {FINANCEIRO_EMAIL}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}