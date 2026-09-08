'use client';

import { useState, useEffect, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import {
  RefreshCw,
  ExternalLink,
  ShieldCheck,
  ShieldAlert,
  AlertTriangle,
  Building2,
  FileText,
  CheckCircle2,
  Search,
  Eye,
  Mail,
  Printer,
  Copy,
  Check,
  FileSpreadsheet,
  Clock,
  Layers,
  ArrowUpDown,
  Filter,
} from 'lucide-react';
import {
  CobrancasDataResponse,
  AgenciaGrupo,
  ContratoCompleto,
  SPREADSHEET_URL,
  buildEmailData,
} from '@/lib/cobrancasTypes';
import { revalidateCobrancasCache, refreshCobrancasLive } from '@/actions/cobrancas';
import { getVeiculoColor } from '@/app/lancamentos/LancamentosTable';
import { EmailPreviewModal } from './EmailPreviewModal';
import { ComprovanteModal } from './ComprovanteModal';
import { RelatorioGeralModal } from './RelatorioGeralModal';

interface CobrancasClientProps {
  initialData: CobrancasDataResponse;
}

export function CobrancasClient({ initialData }: CobrancasClientProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  // Estado reativo dos dados para sincronização instantânea
  const [data, setData] = useState<CobrancasDataResponse>(initialData);

  useEffect(() => {
    setData(initialData);
  }, [initialData]);

  // Estados locais
  const [modoTeste, setModoTeste] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'vencidas' | 'todos'>('vencidas');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<'TODOS' | 'VENCIDO' | 'A_VENCER' | 'PAGO'>('TODOS');

  // Modais
  const [emailModalAgency, setEmailModalAgency] = useState<AgenciaGrupo | null>(null);
  const [comprovanteModalAgency, setComprovanteModalAgency] = useState<AgenciaGrupo | null>(null);
  const [isRelatorioGeralOpen, setIsRelatorioGeralOpen] = useState<boolean>(false);

  // Feedback de cópia
  const [copiedSummaryId, setCopiedSummaryId] = useState<string | null>(null);

  // Ação de Sincronização ao Vivo com feedback imediato
  function handleSync() {
    startTransition(async () => {
      try {
        const fresh = await refreshCobrancasLive();
        setData(fresh);
        router.refresh();
      } catch (err) {
        console.error('Erro ao sincronizar planilha:', err);
        await revalidateCobrancasCache();
        router.refresh();
      }
    });
  }

  // Copia resumo de PIs de uma agência com suporte resiliente a navegadores
  async function handleCopyResumo(grupo: AgenciaGrupo) {
    const lines = [
      `*PENDÊNCIAS - ${grupo.agencia.toUpperCase()}*`,
      `Valor Total: ${grupo.totalValorFormatado}`,
      `E-mails: ${grupo.emailsFormatados}`,
      '',
      ...grupo.debts.map(
        (d) => `• PI ${d.pi} (${d.veiculo}): ${d.valorFormatado} - Venc: ${d.dataVenc}${d.diasAtraso > 0 ? ` [${d.diasAtraso}d atraso]` : ''}`
      ),
    ];
    const textToCopy = lines.join('\n');
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(textToCopy);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = textToCopy;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopiedSummaryId(grupo.agencia);
      setTimeout(() => setCopiedSummaryId(null), 2000);
    } catch (err) {
      console.error('Falha ao copiar dados:', err);
    }
  }

  // Filtragem de Agências Vencidas
  const agenciasFiltradas = data.agenciasGrupos.filter((grupo) => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      grupo.agencia.toLowerCase().includes(term) ||
      grupo.emails.some((e) => e.toLowerCase().includes(term)) ||
      grupo.debts.some((d) => d.pi.toLowerCase().includes(term) || d.veiculo.toLowerCase().includes(term))
    );
  });

  // Filtragem de Todos os Contratos
  const contratosFiltrados = data.todosContratos.filter((contrato) => {
    const matchesStatus = statusFilter === 'TODOS' ? true : contrato.status === statusFilter;
    if (!matchesStatus) return false;

    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      contrato.pi.toLowerCase().includes(term) ||
      contrato.agencia.toLowerCase().includes(term) ||
      contrato.veiculo.toLowerCase().includes(term) ||
      contrato.obs.toLowerCase().includes(term) ||
      contrato.cobrancaNo.toLowerCase().includes(term)
    );
  });

  const { metrics, ultimaAtualizacao } = data;
  const horaSincronizacao = new Date(ultimaAtualizacao).toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  return (
    <div className="space-y-8">
      {/* Top Banner & Header */}
      <div className="flex flex-col gap-4 rounded-3xl bg-linear-to-r from-slate-900 via-slate-950 to-indigo-950 p-6 sm:p-8 text-white shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-full bg-indigo-500/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-indigo-300 ring-1 ring-indigo-400/30">
                <FileSpreadsheet className="h-3.5 w-3.5" /> Cobrança Semanal — Google Sheets
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-xs font-semibold text-emerald-300">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
                Planilha Conectada ao Vivo • Atualizado às {horaSincronizacao}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white">
              Cobrança de Agências de Publicidade
            </h1>
            <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
              Consolidação automática das autorizações de mídia (PIs) vencidas, geração de e-mails formais e relatórios timbrados para auditoria da Diretoria.
            </p>
          </div>

          {/* Action Hub */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Modo Teste Switch */}
            <div className="flex items-center gap-2.5 rounded-2xl bg-white/10 px-4 py-2.5 ring-1 ring-white/15 backdrop-blur-md">
              <label htmlFor="modo-teste-toggle" className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  id="modo-teste-toggle"
                  type="checkbox"
                  checked={modoTeste}
                  onChange={(e) => setModoTeste(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="relative w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
                <div className="flex flex-col">
                  <span className="text-xs font-black tracking-wide text-white flex items-center gap-1">
                    {modoTeste ? (
                      <>
                        <ShieldAlert className="h-3.5 w-3.5 text-amber-400" />
                        Modo Teste: ATIVADO
                      </>
                    ) : (
                      <>
                        <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                        Modo Produção: ATIVO
                      </>
                    )}
                  </span>
                  <span className="text-[10px] text-slate-300">
                    {modoTeste ? 'Seguro (adm@ondas985.com.br)' : 'Disparo real para agências'}
                  </span>
                </div>
              </label>
            </div>

            {/* Sincronizar Button */}
            <button
              type="button"
              onClick={handleSync}
              disabled={isPending}
              className="inline-flex items-center gap-2 rounded-2xl bg-white/15 hover:bg-white/25 px-4 py-2.5 text-xs font-bold text-white transition active:scale-95 disabled:opacity-50 ring-1 ring-white/20 cursor-pointer"
              title="Recarrega os dados diretamente da planilha do Google Sheets"
            >
              <RefreshCw className={`h-4 w-4 ${isPending ? 'animate-spin' : ''}`} />
              {isPending ? 'Sincronizando...' : 'Sincronizar Planilha'}
            </button>

            {/* Relatório Geral Consolidado p/ Diretoria Button */}
            <button
              type="button"
              onClick={() => setIsRelatorioGeralOpen(true)}
              className="inline-flex items-center gap-1.5 rounded-2xl bg-amber-500/25 hover:bg-amber-500/40 text-amber-200 border border-amber-400/40 px-4 py-2.5 text-xs font-bold transition active:scale-95 cursor-pointer shadow-xs"
              title="Gera o Relatório Consolidado de todas as agências para prestação de contas à Diretoria"
            >
              <Printer className="h-4 w-4 text-amber-300" />
              Relatório Diretoria (PDF)
            </button>

            {/* Link Planilha Externa */}
            <a
              href={SPREADSHEET_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 px-4 py-2.5 text-xs font-bold text-white shadow-md transition active:scale-95 cursor-pointer"
            >
              <ExternalLink className="h-4 w-4" />
              Abrir Planilha
            </a>
          </div>
        </div>

        {/* Test Mode Notification Bar */}
        {modoTeste && (
          <div className="rounded-xl bg-amber-500/15 border border-amber-500/30 px-4 py-2.5 text-xs text-amber-200 flex items-center gap-2">
            <ShieldAlert className="h-4 w-4 text-amber-400 shrink-0" />
            <span>
              <strong>Modo de Simulação Ativo:</strong> Nenhum e-mail será enviado inadvertidamente às agências parceiras. Links e testes são encaminhados com prefixo <strong>[TESTE]</strong>. Desmarque o Modo Teste quando desejar disparar as cobranças oficiais.
            </span>
          </div>
        )}
      </div>

      {/* 4 Top Metric Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Card 1: Total em Atraso */}
        <div className="relative overflow-hidden rounded-2xl border-2 border-rose-500/20 bg-linear-to-b from-rose-50/70 to-white p-5 shadow-xs transition hover:shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-700">Total em Atraso</span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-rose-100 text-rose-700">
              <AlertTriangle className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl sm:text-3xl font-black text-rose-950 tracking-tight">
              {metrics.totalVencidoFormatado}
            </span>
          </div>
          <p className="mt-1 text-xs font-semibold text-rose-700">
            {metrics.totalContratosPendentes} PI(s) em cobrança vencida
          </p>
        </div>

        {/* Card 2: Agências Inadimplentes */}
        <div className="relative overflow-hidden rounded-2xl border-2 border-amber-500/20 bg-linear-to-b from-amber-50/70 to-white p-5 shadow-xs transition hover:shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800">Agências c/ Débitos</span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-100 text-amber-800">
              <Building2 className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl sm:text-3xl font-black text-amber-950 tracking-tight">
              {metrics.totalAgenciasPendentes}
            </span>
            <span className="text-xs font-bold text-amber-800 ml-1.5">agências</span>
          </div>
          <p className="mt-1 text-xs font-semibold text-amber-700">
            Elegíveis para notificação semanal
          </p>
        </div>

        {/* Card 3: PIs Pendentes */}
        <div className="relative overflow-hidden rounded-2xl border-2 border-indigo-500/20 bg-linear-to-b from-indigo-50/70 to-white p-5 shadow-xs transition hover:shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-700">Contratos Pendentes</span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-100 text-indigo-700">
              <FileText className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl sm:text-3xl font-black text-indigo-950 tracking-tight">
              {metrics.totalContratosPendentes}
            </span>
            <span className="text-xs font-bold text-indigo-800 ml-1.5">vencidos</span>
            {metrics.totalAVencer > 0 && (
              <span className="text-xs font-medium text-slate-500 ml-2">
                (+ {metrics.totalAVencerFormatado} a vencer)
              </span>
            )}
          </div>
          <p className="mt-1 text-xs font-semibold text-indigo-600">
            Acompanhamento contínuo
          </p>
        </div>

        {/* Card 4: Total Quitado */}
        <div className="relative overflow-hidden rounded-2xl border-2 border-emerald-500/20 bg-linear-to-b from-emerald-50/70 to-white p-5 shadow-xs transition hover:shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">Total Quitado (Planilha)</span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
              <CheckCircle2 className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl sm:text-3xl font-black text-emerald-950 tracking-tight">
              {metrics.totalPagoFormatado}
            </span>
          </div>
          <p className="mt-1 text-xs font-semibold text-emerald-700">
            {metrics.totalContratosPagos} autorizações regularizadas
          </p>
        </div>
      </div>

      {/* Main Content Tabs & Filters */}
      <div className="space-y-4">
        {/* Navigation Tabs + Search Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-3">
          {/* Tabs */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveTab('vencidas')}
              className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-black transition cursor-pointer ${
                activeTab === 'vencidas'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80 hover:text-slate-900'
              }`}
            >
              <Building2 className="h-4 w-4" />
              Agências com Pendências Vencidas
              <span
                className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${
                  activeTab === 'vencidas' ? 'bg-indigo-800 text-indigo-100' : 'bg-slate-200 text-slate-700'
                }`}
              >
                {data.agenciasGrupos.length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('todos')}
              className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-black transition cursor-pointer ${
                activeTab === 'todos'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80 hover:text-slate-900'
              }`}
            >
              <Layers className="h-4 w-4" />
              Todos os Registros da Planilha
              <span
                className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${
                  activeTab === 'todos' ? 'bg-indigo-800 text-indigo-100' : 'bg-slate-200 text-slate-700'
                }`}
              >
                {data.todosContratos.length}
              </span>
            </button>
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-80">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar PI, agência, veículo..."
              className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 pl-9 text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-2xs"
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm('')}
                className="absolute right-2.5 top-2 text-xs font-bold text-slate-400 hover:text-slate-600"
              >
                ×
              </button>
            )}
          </div>
        </div>

        {/* TAB 1: Agências com Pendências Vencidas */}
        {activeTab === 'vencidas' && (
          <div className="space-y-6">
            {agenciasFiltradas.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
                <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-500" />
                <h3 className="mt-3 text-base font-bold text-slate-900">Nenhuma agência com débitos vencidos</h3>
                <p className="mt-1 text-xs text-slate-500 max-w-md mx-auto">
                  {searchTerm
                    ? 'Nenhum resultado corresponde à sua pesquisa. Tente alterar o termo buscado.'
                    : 'Todas as agências cadastradas na planilha estão em dia com seus pagamentos!'}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6">
                {agenciasFiltradas.map((grupo) => {
                  const emailData = buildEmailData(grupo, modoTeste);

                  return (
                    <div
                      key={grupo.agencia}
                      className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs transition hover:border-slate-300 hover:shadow-md flex flex-col justify-between gap-6"
                    >
                      {/* Agency Header Row */}
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 text-indigo-700">
                              <Building2 className="h-4 w-4" />
                            </span>
                            <h3 className="text-lg font-black text-slate-900">{grupo.agencia}</h3>
                            <span className="rounded-full bg-rose-100 px-2.5 py-0.5 text-[11px] font-black text-rose-800 border border-rose-200">
                              {grupo.quantidadeContratos} contrato(s)
                            </span>
                          </div>

                          {/* Recipient Emails */}
                          <div className="flex flex-wrap items-center gap-1.5 pt-1">
                            <span className="text-[11px] font-bold text-slate-400">E-mails de Contato:</span>
                            {grupo.emails.map((email, idx) => (
                              <span
                                key={idx}
                                className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-2 py-0.5 font-mono text-[11px] font-medium text-slate-700 border border-slate-200"
                              >
                                <Mail className="h-3 w-3 text-slate-400" />
                                {email}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Total Debt Value */}
                        <div className="text-left md:text-right">
                          <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                            Total Vencido Consolidado
                          </span>
                          <span className="text-2xl font-black text-rose-600 tracking-tight">
                            {grupo.totalValorFormatado}
                          </span>
                        </div>
                      </div>

                      {/* Debts Table */}
                      <div className="overflow-x-auto rounded-xl border border-slate-200">
                        <table className="w-full text-left text-xs border-collapse">
                          <thead>
                            <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold uppercase tracking-wider text-slate-600">
                              <th className="px-3.5 py-2.5">PI</th>
                              <th className="px-3.5 py-2.5">Veículo</th>
                              <th className="px-3.5 py-2.5">Vencimento Original</th>
                              <th className="px-3.5 py-2.5">Data Prevista</th>
                              <th className="px-3.5 py-2.5">Atraso</th>
                              <th className="px-3.5 py-2.5">Última Cobrança</th>
                              <th className="px-3.5 py-2.5 text-right">Valor</th>
                              <th className="px-3.5 py-2.5 text-center">Ações</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100">
                            {grupo.debts.map((debt, dIdx) => (
                              <tr key={dIdx} className="hover:bg-slate-50/70 transition-colors">
                                <td className="px-3.5 py-2.5 font-mono font-bold text-slate-900">
                                  {debt.pi}
                                  {debt.cobrancaNo && (
                                    <span className="text-[10px] text-slate-400 ml-1">
                                      (#{debt.cobrancaNo})
                                    </span>
                                  )}
                                </td>
                                <td className="px-3.5 py-2.5">
                                  <span className={`inline-block rounded px-2 py-0.5 text-[10px] font-bold ${getVeiculoColor(debt.veiculo)}`}>
                                    {debt.veiculo}
                                  </span>
                                </td>
                                <td className="px-3.5 py-2.5 text-slate-500">{debt.dataOriginal || '—'}</td>
                                <td className="px-3.5 py-2.5 font-bold text-slate-800">{debt.dataVenc}</td>
                                <td className="px-3.5 py-2.5">
                                  {debt.diasAtraso > 0 ? (
                                    <span className="inline-flex items-center gap-1 rounded bg-rose-50 px-1.5 py-0.5 text-[10px] font-bold text-rose-700 border border-rose-200">
                                      <Clock className="h-3 w-3" />
                                      {debt.diasAtraso}d
                                    </span>
                                  ) : (
                                    <span className="text-slate-400">—</span>
                                  )}
                                </td>
                                <td className="px-3.5 py-2.5 text-slate-500">{debt.ultCobranca || '—'}</td>
                                <td className="px-3.5 py-2.5 text-right font-mono font-bold text-slate-900">
                                  {debt.valorFormatado}
                                </td>
                                <td className="px-3.5 py-2.5 text-center">
                                  {debt.link ? (
                                    <a
                                      href={debt.link}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="inline-flex items-center gap-1 text-[11px] font-bold text-indigo-600 hover:text-indigo-800"
                                      title="Abrir link cadastrado na planilha (Webmail / NF)"
                                    >
                                      <ExternalLink className="h-3.5 w-3.5" />
                                      Link
                                    </a>
                                  ) : (
                                    <span className="text-slate-300">—</span>
                                  )}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      {/* Card Action Buttons */}
                      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                        <div className="flex flex-wrap items-center gap-2">
                          {/* Botão Principal: Ver E-mail */}
                          <button
                            type="button"
                            onClick={() => setEmailModalAgency(grupo)}
                            className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 px-4 py-2.5 text-xs font-bold text-white shadow-xs transition active:scale-95 cursor-pointer"
                          >
                            <Eye className="h-4 w-4" />
                            Ver E-mail &amp; Disparar
                          </button>

                          {/* Botão Urgente Solicitado: Comprovante p/ Diretoria */}
                          <button
                            type="button"
                            onClick={() => setComprovanteModalAgency(grupo)}
                            className="inline-flex items-center gap-1.5 rounded-xl border border-amber-300 bg-amber-50 hover:bg-amber-100/80 px-3.5 py-2.5 text-xs font-bold text-amber-900 shadow-2xs transition active:scale-95 cursor-pointer"
                            title="Gera o documento timbrado formal em A4 pronto para impressão/PDF para auditoria e prestação de contas à diretoria"
                          >
                            <Printer className="h-4 w-4 text-amber-700" />
                            Comprovante p/ Diretoria (PDF)
                          </button>

                          {/* Copiar Resumo */}
                          <button
                            type="button"
                            onClick={() => handleCopyResumo(grupo)}
                            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 px-3.5 py-2.5 text-xs font-bold text-slate-700 shadow-2xs transition active:scale-95 cursor-pointer"
                            title="Copia resumo em texto para colar em WhatsApp ou e-mail rápido"
                          >
                            {copiedSummaryId === grupo.agencia ? (
                              <Check className="h-4 w-4 text-emerald-600" />
                            ) : (
                              <Copy className="h-4 w-4" />
                            )}
                            {copiedSummaryId === grupo.agencia ? 'Resumo Copiado!' : 'Copiar Dados'}
                          </button>
                        </div>

                        {/* Atalho Webmail Direto */}
                        <a
                          href={emailData.mailtoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 px-3.5 py-2.5 text-xs font-bold text-slate-700 transition cursor-pointer"
                        >
                          <Mail className="h-4 w-4 text-indigo-600" />
                          Abrir no Webmail
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: Todos os Registros da Planilha */}
        {activeTab === 'todos' && (
          <div className="space-y-4">
            {/* Status Filters Bar */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-slate-400 flex items-center gap-1 mr-1">
                <Filter className="h-3.5 w-3.5" /> Filtrar:
              </span>

              <button
                type="button"
                onClick={() => setStatusFilter('TODOS')}
                className={`rounded-lg px-3 py-1.5 text-xs font-bold transition cursor-pointer ${
                  statusFilter === 'TODOS'
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Todos ({data.todosContratos.length})
              </button>

              <button
                type="button"
                onClick={() => setStatusFilter('VENCIDO')}
                className={`rounded-lg px-3 py-1.5 text-xs font-bold transition cursor-pointer ${
                  statusFilter === 'VENCIDO'
                    ? 'bg-rose-600 text-white'
                    : 'bg-rose-50 text-rose-700 hover:bg-rose-100'
                }`}
              >
                Vencidos ({data.todosContratos.filter((c) => c.status === 'VENCIDO').length})
              </button>

              <button
                type="button"
                onClick={() => setStatusFilter('A_VENCER')}
                className={`rounded-lg px-3 py-1.5 text-xs font-bold transition cursor-pointer ${
                  statusFilter === 'A_VENCER'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100'
                }`}
              >
                A Vencer ({data.todosContratos.filter((c) => c.status === 'A_VENCER').length})
              </button>

              <button
                type="button"
                onClick={() => setStatusFilter('PAGO')}
                className={`rounded-lg px-3 py-1.5 text-xs font-bold transition cursor-pointer ${
                  statusFilter === 'PAGO'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                }`}
              >
                Pagos / Baixados ({data.todosContratos.filter((c) => c.status === 'PAGO').length})
              </button>
            </div>

            {/* Table Container */}
            <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-xs">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold uppercase tracking-wider text-slate-600">
                    <th className="px-3.5 py-3">Nº</th>
                    <th className="px-3.5 py-3">PI</th>
                    <th className="px-3.5 py-3">Agência</th>
                    <th className="px-3.5 py-3">Veículo</th>
                    <th className="px-3.5 py-3 text-right">Valor</th>
                    <th className="px-3.5 py-3">Vencimento</th>
                    <th className="px-3.5 py-3 text-center">Status</th>
                    <th className="px-3.5 py-3">E-mail</th>
                    <th className="px-3.5 py-3">Últ. Cobrança</th>
                    <th className="px-3.5 py-3 text-center">Link</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {contratosFiltrados.length === 0 ? (
                    <tr>
                      <td colSpan={10} className="px-4 py-8 text-center text-slate-500">
                        Nenhum registro encontrado com os filtros atuais.
                      </td>
                    </tr>
                  ) : (
                    contratosFiltrados.map((item, index) => {
                      return (
                        <tr key={index} className="hover:bg-slate-50/70 transition-colors">
                          <td className="px-3.5 py-2.5 font-mono text-slate-400">
                            {item.cobrancaNo || index + 1}
                          </td>
                          <td className="px-3.5 py-2.5 font-mono font-bold text-slate-900">
                            {item.pi}
                          </td>
                          <td className="px-3.5 py-2.5 font-semibold text-slate-800">
                            {item.agencia}
                          </td>
                          <td className="px-3.5 py-2.5">
                            <span className={`inline-block rounded px-2 py-0.5 text-[10px] font-bold ${getVeiculoColor(item.veiculo)}`}>
                              {item.veiculo}
                            </span>
                          </td>
                          <td className="px-3.5 py-2.5 text-right font-mono font-bold text-slate-900">
                            {item.valorFormatado}
                          </td>
                          <td className="px-3.5 py-2.5 text-slate-600">
                            {item.dataVencEfetiva || '—'}
                          </td>
                          <td className="px-3.5 py-2.5 text-center">
                            {item.status === 'PAGO' && (
                              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-black text-emerald-800 border border-emerald-300">
                                <CheckCircle2 className="h-3 w-3" /> PAGO
                              </span>
                            )}
                            {item.status === 'VENCIDO' && (
                              <span className="inline-flex items-center gap-1 rounded-full bg-rose-100 px-2 py-0.5 text-[10px] font-black text-rose-800 border border-rose-300">
                                <AlertTriangle className="h-3 w-3" /> VENCIDO
                              </span>
                            )}
                            {item.status === 'A_VENCER' && (
                              <span className="inline-flex items-center gap-1 rounded-full bg-indigo-50 px-2 py-0.5 text-[10px] font-bold text-indigo-700 border border-indigo-200">
                                A VENCER
                              </span>
                            )}
                          </td>
                          <td className="px-3.5 py-2.5 font-mono text-[11px] text-slate-600 max-w-xs truncate" title={item.email}>
                            {item.email || '—'}
                          </td>
                          <td className="px-3.5 py-2.5 text-slate-500">
                            {item.ultCobranca || '—'}
                          </td>
                          <td className="px-3.5 py-2.5 text-center">
                            {item.link ? (
                              <a
                                href={item.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-[11px] font-bold text-indigo-600 hover:text-indigo-800"
                                title="Abrir link"
                              >
                                <ExternalLink className="h-3.5 w-3.5" />
                              </a>
                            ) : (
                              <span className="text-slate-300">—</span>
                            )}
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Modal 1: Email Preview */}
      <EmailPreviewModal
        isOpen={!!emailModalAgency}
        onClose={() => setEmailModalAgency(null)}
        grupo={emailModalAgency}
        modoTeste={modoTeste}
        onOpenComprovante={(grupo) => {
          setEmailModalAgency(null);
          setComprovanteModalAgency(grupo);
        }}
      />

      {/* Modal 2: Comprovante Oficial Individual p/ Diretoria (PDF) */}
      <ComprovanteModal
        isOpen={!!comprovanteModalAgency}
        onClose={() => setComprovanteModalAgency(null)}
        grupo={comprovanteModalAgency}
        email={comprovanteModalAgency ? buildEmailData(comprovanteModalAgency, false) : null}
      />

      {/* Modal 3: Relatório Geral Consolidado p/ Diretoria (PDF) */}
      <RelatorioGeralModal
        isOpen={isRelatorioGeralOpen}
        onClose={() => setIsRelatorioGeralOpen(false)}
        data={data}
      />
    </div>
  );
}
