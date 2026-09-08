'use client';

import { X, Printer, ShieldCheck, Building2, Mail, Calendar, FileText, CheckCircle2 } from 'lucide-react';
import { AgenciaGrupo, EmailGerado, FINANCEIRO_EMAIL } from '@/lib/cobrancasTypes';
import { getVeiculoColor } from '@/app/lancamentos/LancamentosTable';
import Image from 'next/image';

interface ComprovanteModalProps {
  isOpen: boolean;
  onClose: () => void;
  grupo: AgenciaGrupo | null;
  email: EmailGerado | null;
}

export function ComprovanteModal({ isOpen, onClose, grupo, email }: ComprovanteModalProps) {
  if (!isOpen || !grupo) return null;

  const dataHoraEmissao = new Date().toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  const protocolo = `COB-${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}-${grupo.debts[0]?.pi || '00'}${grupo.quantidadeContratos}`;

  function handlePrint() {
    window.print();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-2 sm:p-4 backdrop-blur-xs overflow-y-auto">
      {/* Modal Container */}
      <div className="relative my-6 w-full max-w-4xl rounded-2xl bg-white shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[95vh] print:m-0 print:p-0 print:border-none print:shadow-none print:max-h-none print:w-full">
        {/* Modal Top Bar (Hidden on Print) */}
        <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50/90 px-6 py-4 print:hidden">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900">Comprovante Oficial de Cobrança (Diretoria)</h3>
              <p className="text-xs text-slate-500">Documento timbrado para auditoria e prestação de contas internas</p>
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

        {/* Printable Paper Canvas */}
        <div
          id="comprovante-imprimivel"
          className="flex-1 overflow-y-auto p-6 sm:p-10 bg-white text-slate-800 print:p-0 print:overflow-visible"
        >
          {/* Paper Border & Styling */}
          <div className="max-w-3xl mx-auto border border-slate-200 rounded-2xl p-6 sm:p-8 bg-white shadow-xs print:border-none print:p-0 print:shadow-none">
            {/* Header Timbrado */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b-2 border-slate-900 gap-4">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Image src="/ondas.png" alt="Ondas 985" width={44} height={44} className="h-11 w-auto object-contain" />
                </div>
                <div>
                  <h1 className="text-xl font-black text-slate-900 tracking-tight">
                    ONDAS 985 <span className="text-indigo-600">DOCUMENTOS</span>
                  </h1>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-600">
                    Rádios Litoral FM &amp; Onda Livre FM • Controladoria Financeira
                  </p>
                </div>
              </div>

              <div className="text-left sm:text-right">
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-[11px] font-black text-emerald-800 uppercase tracking-wider border border-emerald-300">
                  <CheckCircle2 className="h-3 w-3" /> Cobrança Formal Ativa
                </span>
                <p className="text-[11px] font-mono text-slate-500 mt-1">Protocolo: <strong>{protocolo}</strong></p>
                <p className="text-[11px] text-slate-500">Emissão: {dataHoraEmissao}</p>
              </div>
            </div>

            {/* Document Title */}
            <div className="my-6 text-center">
              <h2 className="text-lg font-black text-slate-900 uppercase tracking-wide">
                Termo de Notificação e Auditoria de Cobrança Extrajudicial
              </h2>
              <p className="text-xs text-slate-500 max-w-lg mx-auto mt-1">
                Documento comprobatório de cobrança periódica emitido pelo Departamento Financeiro para fins de auditoria interna e acompanhamento de inadimplência da Diretoria Executiva.
              </p>
            </div>

            {/* Agency Info Card */}
            <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-4 sm:p-5 mb-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px] block">Agência / Devedora</span>
                  <span className="text-sm font-black text-slate-900 flex items-center gap-1.5 mt-0.5">
                    <Building2 className="h-4 w-4 text-slate-500 shrink-0" />
                    {grupo.agencia}
                  </span>
                </div>

                <div>
                  <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px] block">Status de Cobrança</span>
                  <span className="text-xs font-bold text-rose-700 bg-rose-50 border border-rose-200 rounded-md px-2 py-0.5 inline-block mt-0.5">
                    PENDÊNCIA VENCIDA — NOTIFICAÇÃO ENVIADA
                  </span>
                </div>

                <div className="sm:col-span-2">
                  <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px] block">Destinatários Notificados (E-mails Formais)</span>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {grupo.emails.map((e, idx) => (
                      <span key={idx} className="inline-flex items-center gap-1 rounded bg-white px-2 py-0.5 font-mono text-[11px] font-semibold text-slate-700 border border-slate-200">
                        <Mail className="h-3 w-3 text-slate-400" />
                        {e}
                      </span>
                    ))}
                  </div>
                </div>

                {grupo.debts[0]?.ultCobranca && (
                  <div>
                    <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px] block">Último Contato Registrado</span>
                    <span className="font-semibold text-slate-800 mt-0.5 block">{grupo.debts[0].ultCobranca}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Debts Table */}
            <div className="mb-6">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-700 mb-2 flex items-center justify-between">
                <span>Relação de Autorizações de Mídia (PIs) em Cobrança</span>
                <span className="text-slate-500 font-normal">{grupo.quantidadeContratos} contrato(s)</span>
              </h3>

              <div className="overflow-hidden rounded-xl border border-slate-200">
                <table className="w-full border-collapse text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-100 text-[11px] font-bold uppercase tracking-wider text-slate-600">
                      <th className="px-3 py-2.5">Nº / PI</th>
                      <th className="px-3 py-2.5">Veículo</th>
                      <th className="px-3 py-2.5">Vencimento Original</th>
                      <th className="px-3 py-2.5">Vencimento Atual</th>
                      <th className="px-3 py-2.5 text-right">Valor</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {grupo.debts.map((d, index) => (
                      <tr key={index} className="hover:bg-slate-50/50">
                        <td className="px-3 py-2.5 font-mono font-bold text-slate-900">
                          {d.pi}
                          {d.cobrancaNo && <span className="text-[10px] text-slate-400 ml-1">(#{d.cobrancaNo})</span>}
                        </td>
                        <td className="px-3 py-2.5">
                          <span className={`inline-block rounded px-2 py-0.5 text-[10px] font-bold ${getVeiculoColor(d.veiculo)}`}>
                            {d.veiculo}
                          </span>
                        </td>
                        <td className="px-3 py-2.5 text-slate-500">{d.dataOriginal || '—'}</td>
                        <td className="px-3 py-2.5 font-bold text-rose-700">
                          {d.dataVenc}
                          {d.diasAtraso > 0 && (
                            <span className="text-[10px] font-medium text-rose-500 ml-1">
                              ({d.diasAtraso}d)
                            </span>
                          )}
                        </td>
                        <td className="px-3 py-2.5 text-right font-bold font-mono text-slate-900">
                          {d.valorFormatado}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="border-t-2 border-slate-300 bg-slate-50 font-black text-slate-900">
                      <td colSpan={4} className="px-3 py-3 text-right uppercase tracking-wider text-[11px]">
                        Total Consolidado Notificado:
                      </td>
                      <td className="px-3 py-3 text-right text-sm font-mono text-indigo-700">
                        {grupo.totalValorFormatado}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            {/* Espelho da Mensagem de Cobrança */}
            {email && (
              <div className="mb-6 rounded-xl border border-slate-200 bg-slate-50/50 p-4 text-xs">
                <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px] block mb-1">
                  Espelho do E-mail Formal de Cobrança Encaminhado
                </span>
                <p className="font-semibold text-slate-800 text-[11px] mb-2">
                  Assunto: <span className="font-normal font-mono">{email.assunto}</span>
                </p>
                <div className="rounded-lg bg-white p-3 border border-slate-200 font-mono text-[10px] leading-relaxed text-slate-600 whitespace-pre-wrap max-h-48 overflow-y-auto print:max-h-none print:overflow-visible">
                  {email.texto}
                </div>
              </div>
            )}

            {/* Certificação e Assinatura */}
            <div className="mt-8 pt-6 border-t border-slate-200 text-xs">
              <p className="text-slate-600 leading-relaxed text-[11px] italic">
                &ldquo;Certificamos expressamente para fins de auditoria financeira interna, controle de compliance e comprovação perante a Diretoria Executiva que a agência devedora supracitada foi formalmente notificada acerca de todas as faturas e autorizações de mídia em aberto, com cobrança ativa e acompanhamento contínuo.&rdquo;
              </p>

              <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="text-center sm:text-left">
                  <div className="h-0.5 w-48 bg-slate-400 mb-1"></div>
                  <p className="font-black text-slate-900 text-xs">Controladoria &amp; Cobrança</p>
                  <p className="text-[10px] text-slate-500">Ondas 985 FM / Litoral FM</p>
                </div>

                <div className="text-center sm:text-right">
                  <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Canal Oficial Financeiro</p>
                  <p className="font-bold text-slate-800 text-xs">{FINANCEIRO_EMAIL}</p>
                  <p className="text-[10px] text-slate-500">Validação Interna de Cobrança</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
