'use client';

import { useEffect } from 'react';
import { X, Printer, Building2, Mail } from 'lucide-react';
import { AgenciaGrupo, FINANCEIRO_EMAIL } from '@/lib/cobrancasTypes';
import { printElementIsolated } from '@/lib/printHelper';
import Image from 'next/image';

interface ComprovanteModalProps {
  isOpen: boolean;
  onClose: () => void;
  grupo: AgenciaGrupo | null;
}

export function ComprovanteModal({ isOpen, onClose, grupo }: ComprovanteModalProps) {
  useEffect(() => {
    if (!isOpen) return;
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !grupo) return null;

  const dataEmissao = new Date().toLocaleDateString('pt-BR');
  const horaEmissao = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

  function handlePrint() {
    printElementIsolated('comprovante-imprimivel', `Cobranca - ${grupo?.agencia || 'Agencia'}`);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-2 sm:p-4 backdrop-blur-xs overflow-y-auto">
      <div className="relative my-4 w-full max-w-3xl rounded-2xl bg-white shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[95vh]">
        {/* Top bar */}
        <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-5 py-3.5">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Relatório da Agência: {grupo.agencia}</h3>
            <p className="text-xs text-slate-500">Formato direto de 1 página pronto para impressão ou envio</p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-indigo-700 transition active:scale-95 cursor-pointer"
            >
              <Printer className="h-4 w-4" />
              Imprimir / PDF (1 Folha)
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
          <div id="comprovante-imprimivel" className="max-w-2xl mx-auto p-2">
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
                <p className="font-bold text-slate-800">Relatório de Cobrança</p>
                <p className="text-[11px] text-slate-500">Emissão: {dataEmissao} às {horaEmissao}</p>
              </div>
            </div>

            {/* Agência Info */}
            <div className="my-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Agência</span>
                  <h2 className="text-lg font-black text-slate-900 leading-tight">{grupo.agencia}</h2>
                  {grupo.emails.length > 0 && (
                    <p className="text-xs text-slate-600 mt-0.5">
                      <span className="font-semibold text-slate-500">E-mail:</span> {grupo.emailsFormatados}
                    </p>
                  )}
                </div>
                <div className="text-left sm:text-right border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-200">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Total Pendente</span>
                  <span className="text-xl font-black text-slate-900 block leading-tight">{grupo.totalValorFormatado}</span>
                  <span className="text-[11px] text-slate-500 font-medium">{grupo.quantidadeContratos} contrato(s)</span>
                </div>
              </div>
            </div>

            {/* Tabela de Contratos / PIs */}
            <div className="overflow-x-auto my-3">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-100 border-b border-slate-300 text-[11px] font-bold text-slate-700">
                    <th className="px-3 py-2 border border-slate-200">PI</th>
                    <th className="px-3 py-2 border border-slate-200">Veículo</th>
                    <th className="px-3 py-2 border border-slate-200">Vencimento</th>
                    <th className="px-3 py-2 border border-slate-200 text-center">Atraso</th>
                    <th className="px-3 py-2 border border-slate-200">Observação</th>
                    <th className="px-3 py-2 border border-slate-200 text-right">Valor</th>
                  </tr>
                </thead>
                <tbody>
                  {grupo.debts.map((d, i) => (
                    <tr key={i} className="border-b border-slate-200">
                      <td className="px-3 py-2 font-mono font-bold text-slate-900 border border-slate-200">
                        {d.pi}
                      </td>
                      <td className="px-3 py-2 font-medium text-slate-800 border border-slate-200">
                        {d.veiculo}
                      </td>
                      <td className="px-3 py-2 text-slate-700 border border-slate-200">
                        {d.dataVenc}
                      </td>
                      <td className="px-3 py-2 text-center border border-slate-200">
                        {d.diasAtraso > 0 ? (
                          <span className="font-bold text-rose-700">{d.diasAtraso}d</span>
                        ) : (
                          <span className="text-slate-400">—</span>
                        )}
                      </td>
                      <td className="px-3 py-2 text-slate-600 text-[11px] border border-slate-200">
                        {d.obs || '—'}
                      </td>
                      <td className="px-3 py-2 text-right font-mono font-bold text-slate-900 border border-slate-200">
                        {d.valorFormatado}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-slate-100 font-bold border-t-2 border-slate-400">
                    <td colSpan={5} className="px-3 py-2 text-right text-slate-800 border border-slate-200">
                      Valor Total:
                    </td>
                    <td className="px-3 py-2 text-right font-mono text-sm text-slate-900 border border-slate-200">
                      {grupo.totalValorFormatado}
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