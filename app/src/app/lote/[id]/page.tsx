import { notFound } from 'next/navigation';
import { getLoteById } from '@/actions/lotes';
import { LoteActionButtons } from '@/components/LoteActionButtons';
import { CopyCnpj } from '@/components/CopyCnpj';
import { CopyDescricaoButton } from '@/components/CopyDescricaoButton';
import { getVeiculoColor } from '@/lib/veiculo';
import {
  ArrowLeft,
  ExternalLink,
  FileText,
  Calendar,
  Building2,
  DollarSign,
  Package,
  Download,
  Eye,
  Clock,
  Radio,
} from 'lucide-react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

function formatDate(date: Date | string | null | undefined) {
  if (!date) return '—';
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('pt-BR');
}

function formatCurrency(val: number | null | undefined) {
  if (val === null || val === undefined) return '—';
  return `R$ ${val.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export default async function LotePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const lote = await getLoteById(id);

  if (!lote) {
    notFound();
  }

  const totalFormatado = formatCurrency(lote.valorTotal);
  let textoZap = `*${lote.titulo.toUpperCase()}*\n`;
  textoZap += `Código: ${lote.codigo || lote.id}\n`;
  textoZap += `Data: ${formatDate(lote.createdAt)}\n`;
  textoZap += `Total de Notas: ${lote.itens.length} | Valor Total: ${totalFormatado}\n\n`;

  lote.itens.forEach((it, idx) => {
    const l = it.lancamento;
    const fantasia = l.cliente?.nomeFantasia ? ` (${l.cliente.nomeFantasia})` : '';
    const razao = l.cliente?.razaoSocial || l.colaborador?.nome || 'Cliente';
    const linkDoc = l.documentos.find(
      (d) => d.urlPublica && (d.tipoDocumento?.nome.toLowerCase().includes('nota') || d.tipoDocumento?.nome.toLowerCase().includes('nf') || d.urlPublica.startsWith('http'))
    );
    textoZap += `${idx + 1}) *NF ${l.numeroNotaFiscal || 'S/N'}* - ${razao}${fantasia}\n`;
    textoZap += `   Valor: ${formatCurrency(l.valor)} | Venc: ${formatDate(l.vencimento)}\n`;
    if (l.veiculo?.nome) textoZap += `   Veículo: ${l.veiculo.nome}\n`;
    if (linkDoc?.urlPublica) textoZap += `   Link NF: ${linkDoc.urlPublica}\n`;
    textoZap += `\n`;
  });

  return (
    <div className="mx-auto max-w-6xl space-y-6 pb-20 print:p-0 print:space-y-4">
      {/* Barra de Navegação (oculta na impressão) */}
      <div className="flex items-center justify-between print:hidden">
        <Link
          href="/lancamentos"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-slate-500 hover:text-indigo-700 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar para Lançamentos
        </Link>

        <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
          Portal de Envio para o Financeiro
        </span>
      </div>

      {/* Banner Principal do Lote */}
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xs print:rounded-none print:border-none print:shadow-none">
        <div className="relative border-b border-slate-200 bg-slate-950 px-6 py-8 text-white sm:px-10 print:bg-white print:text-slate-900 print:p-0 print:border-b-2 print:border-slate-800">
          <div className="relative z-10 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-xs font-bold text-emerald-300 bg-emerald-950/80 ring-1 ring-emerald-500/40 px-2.5 py-0.5 rounded-md flex items-center gap-1 print:bg-slate-100 print:text-slate-900 print:ring-slate-300">
                  <Package className="h-3 w-3" />
                  {lote.codigo || 'LOTE'}
                </span>
                <span className="text-xs text-slate-400 font-medium print:text-slate-600">
                  Criado em {formatDate(lote.createdAt)}
                </span>
              </div>

              <h1 className="text-2xl font-black tracking-tight sm:text-3xl text-white print:text-slate-950">
                {lote.titulo}
              </h1>

              {lote.observacao && (
                <p className="text-sm text-slate-300 max-w-2xl print:text-slate-600">
                  {lote.observacao}
                </p>
              )}
            </div>

            {/* Ações do Lote */}
            <LoteActionButtons
              loteId={lote.id}
              codigo={lote.codigo}
              titulo={lote.titulo}
              resumoWhatsApp={textoZap}
            />
          </div>
        </div>

        {/* Métricas do Lote */}
        <div className="grid grid-cols-2 gap-4 p-6 sm:grid-cols-3 sm:p-8 print:p-3 print:gap-2">
          <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4 print:border-slate-300 print:bg-white">
            <dt className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1 flex items-center gap-1">
              <FileText className="h-3.5 w-3.5 text-slate-400" /> Total de Notas Fiscais
            </dt>
            <dd className="text-xl sm:text-2xl font-black text-slate-900">
              {lote.itens.length} {lote.itens.length === 1 ? 'nota' : 'notas'}
            </dd>
          </div>

          <div className="rounded-2xl border border-emerald-100 bg-emerald-50/50 p-4 print:border-slate-300 print:bg-white">
            <dt className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 mb-1 flex items-center gap-1 print:text-slate-600">
              <DollarSign className="h-3.5 w-3.5 text-emerald-600" /> Valor Total Somado
            </dt>
            <dd className="text-xl sm:text-2xl font-black text-emerald-900 print:text-slate-950">
              {formatCurrency(lote.valorTotal)}
            </dd>
          </div>

          <div className="col-span-2 sm:col-span-1 rounded-2xl border border-slate-100 bg-slate-50/70 p-4 print:border-slate-300 print:bg-white">
            <dt className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1 flex items-center gap-1">
              <Building2 className="h-3.5 w-3.5 text-slate-400" /> Clientes Envolvidos
            </dt>
            <dd className="text-xl sm:text-2xl font-black text-slate-900">
              {lote.totalClientes} {lote.totalClientes === 1 ? 'cliente' : 'clientes'}
            </dd>
          </div>
        </div>
      </div>

      {/* Lista das Notas Fiscais com Identificação Cristalina */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-1 print:hidden">
          <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
            <FileText className="h-5 w-5 text-indigo-600" />
            Notas Fiscais do Lote ({lote.itens.length})
          </h2>
          <span className="text-xs text-slate-500 font-medium">
            Arquivos com nome padronizado para o financeiro
          </span>
        </div>

        <div className="space-y-3.5">
          {lote.itens.map((it, idx) => {
            const l = it.lancamento;
            const razaoSocial = l.cliente?.razaoSocial || l.colaborador?.nome || '—';
            const nomeFantasia = l.cliente?.nomeFantasia;
            const cnpj = l.cliente?.cnpj || l.colaborador?.cpfCnpj;

            const linkDoc = l.documentos.find(
              (d) => d.urlPublica && (d.tipoDocumento?.nome.toLowerCase().includes('nota') || d.tipoDocumento?.nome.toLowerCase().includes('nf') || d.urlPublica.startsWith('http'))
            );
            const urlPrefeitura = linkDoc?.urlPublica;

            return (
              <div
                key={it.id}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-xs transition-all hover:border-slate-300 print:border print:border-slate-300 print:p-3 print:rounded-none"
              >
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  {/* Bloco 1: Identificação da Nota e Empresa */}
                  <div className="min-w-0 flex-1 space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-indigo-100 text-xs font-black text-indigo-800">
                        {idx + 1}
                      </span>

                      {/* Número da Nota Fiscal */}
                      <span className="rounded-lg bg-slate-950 px-3 py-1 text-xs font-black text-white tracking-wide shadow-2xs">
                        NF {l.numeroNotaFiscal || 'S/N'}
                      </span>

                      {/* Veículo (Rádio) */}
                      {l.veiculo && (
                        <span className={`rounded-md px-2 py-0.5 text-xs font-bold ${getVeiculoColor(l.veiculo.nome)}`}>
                          {l.veiculo.nome}
                        </span>
                      )}

                      {/* Número do PI */}
                      {l.numeroPi && (
                        <span className="rounded-md bg-slate-100 px-2 py-0.5 text-xs font-mono font-semibold text-slate-700">
                          PI: {l.numeroPi}
                        </span>
                      )}
                    </div>

                    {/* Empresa: Fantasia + Razão Social */}
                    <div className="space-y-0.5">
                      {nomeFantasia ? (
                        <>
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="text-base sm:text-lg font-black text-slate-900 leading-tight">
                              {nomeFantasia}
                            </h3>
                            {cnpj && (
                              <CopyCnpj
                                cnpj={cnpj}
                                variant="badge"
                                className="bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200 text-[11px]"
                              />
                            )}
                          </div>
                          <p className="text-xs text-slate-500 font-medium">
                            Razão Social: <span className="font-semibold text-slate-700">{razaoSocial}</span>
                          </p>
                        </>
                      ) : (
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-base sm:text-lg font-black text-slate-900 leading-tight">
                            {razaoSocial}
                          </h3>
                          {cnpj && (
                            <CopyCnpj
                              cnpj={cnpj}
                              variant="badge"
                              className="bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200 text-[11px]"
                            />
                          )}
                        </div>
                      )}
                    </div>

                    {/* Descrição resumida da nota */}
                    {l.descricao && (
                      <p className="text-xs text-slate-600 line-clamp-2 font-mono bg-slate-50 p-2 rounded-xl border border-slate-100">
                        {l.descricao}
                      </p>
                    )}
                  </div>

                  {/* Bloco 2: Valores, Vencimento e Botões de Download */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 lg:gap-6 lg:justify-end">
                    {/* Valor e Vencimento */}
                    <div className="flex items-center gap-5 sm:text-right">
                      <div className="rounded-xl bg-emerald-50/70 border border-emerald-100 px-3.5 py-2">
                        <span className="block text-[10px] font-bold uppercase tracking-wider text-emerald-700">
                          Valor da Parcela
                        </span>
                        <p className="text-base sm:text-lg font-black text-emerald-950">
                          {formatCurrency(l.valor)}
                        </p>
                      </div>

                      <div className="rounded-xl bg-amber-50/70 border border-amber-200 px-3.5 py-2">
                        <span className="block text-[10px] font-bold uppercase tracking-wider text-amber-700 flex items-center gap-1 sm:justify-end">
                          <Clock className="h-3 w-3" /> Vencimento
                        </span>
                        <p className="text-sm sm:text-base font-black text-amber-950">
                          {formatDate(l.vencimento)}
                        </p>
                      </div>
                    </div>

                    {/* Botões de Ação para a moça do financeiro */}
                    <div className="flex flex-wrap items-center gap-2 print:hidden">
                      {/* Botão de Download Direto com Nome Padronizado */}
                      <a
                        href={`/api/lancamentos/${l.id}/download-nf`}
                        download
                        className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-3.5 py-2 text-xs font-bold text-white shadow-2xs hover:bg-emerald-700 transition-all active:scale-[0.98]"
                        title="Baixar PDF com nome padronizado contendo NF, Razão Social, Nome Fantasia e Vencimento"
                      >
                        <Download className="h-3.5 w-3.5" />
                        Baixar PDF
                      </a>

                      {/* Abrir Link da Prefeitura */}
                      {urlPrefeitura && (
                        <a
                          href={urlPrefeitura}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors"
                          title="Abrir nota no site da prefeitura"
                        >
                          <ExternalLink className="h-3.5 w-3.5 text-slate-500" />
                          Prefeitura
                        </a>
                      )}

                      {/* Copiar Discriminação da Nota */}
                      {l.descricao && (
                        <CopyDescricaoButton
                          text={l.descricao}
                          label="Copiar Texto"
                          variant="topbar"
                          className="text-xs py-1.5 px-2.5"
                        />
                      )}

                      <Link
                        href={`/lancamento/${l.id}`}
                        target="_blank"
                        className="inline-flex items-center justify-center h-8 w-8 rounded-xl border border-slate-200 text-slate-400 hover:text-indigo-600 hover:border-indigo-300 transition-colors"
                        title="Inspecionar lançamento no sistema"
                      >
                        <Eye className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
