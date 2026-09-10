import { Eye, FileText, Radio, UploadCloud, AlertTriangle, Calendar, Layers } from 'lucide-react';
import Link from 'next/link';
import { Lancamento, Cliente, Colaborador, Documento, Agencia, Veiculo } from '@/generated/prisma';
import { TickerText } from '@/components/TickerText';
import { CopyDescricaoButton } from '@/components/CopyDescricaoButton';
import { CopyCnpj } from '@/components/CopyCnpj';

type Item = Lancamento & {
  cliente: Cliente | null;
  colaborador: Colaborador | null;
  documentos: Documento[];
  agencia: Agencia | null;
  veiculo: Veiculo | null;
};

function owner(item: Item) {
  return item.tipoLancamento === 'RECEITA'
    ? item.cliente?.nomeFantasia || item.cliente?.razaoSocial
    : item.colaborador?.nome;
}

function formatDate(date: Date | string | null | undefined) {
  if (!date) return '—';
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('pt-BR');
}

function formatCurrency(val: number | null | undefined) {
  if (val === null || val === undefined) return '—';
  return `R$ ${val.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export function getVeiculoColor(veiculo: string | undefined | null) {
  if (!veiculo) return 'bg-slate-100 text-slate-600 font-medium';
  const name = veiculo.toLowerCase();

  // Rock (Rock News, etc) -> Preta e Vermelha
  if (name.includes('rock')) {
    return 'bg-zinc-950 text-red-500 border border-red-950/80 font-black shadow-xs';
  }

  // Onda FM / Grupo Ondas -> Tons de Azul
  if (name.includes('onda')) {
    return 'bg-blue-600 text-white font-bold shadow-xs';
  }

  // Rádio Clube AM / Outras rádios -> Azul claro / Sky
  if (name.includes('clube') || name.includes('rádio') || name.includes('radio') || name.includes('fm')) {
    return 'bg-sky-600 text-white font-bold shadow-xs';
  }

  return 'bg-indigo-600 text-white font-bold shadow-xs';
}

export function LancamentosTable({ initialData }: { initialData: Item[] }) {
  if (!initialData.length) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
        <FileText className="mx-auto h-12 w-12 text-slate-300" />
        <h3 className="mt-3 text-base font-bold text-slate-900">Nenhum lançamento encontrado</h3>
        <p className="mt-1 text-sm text-slate-500 max-w-sm mx-auto">
          Tente ajustar os termos da busca, alterar o tipo (Receita/Despesa) ou limpar os filtros selecionados.
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Mobile Card View */}
      <div className="space-y-3.5 md:hidden">
        {initialData.map((item) => {
          const isReceita = item.tipoLancamento === 'RECEITA';
          const hasNf = Boolean(item.numeroNotaFiscal);

          return (
            <div
              key={item.id}
              className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs space-y-3"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="font-mono text-[10px] font-bold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                      {item.appSheetId || item.id.slice(0, 8)}
                    </span>
                    <span
                      className={`rounded px-1.5 py-0.5 text-[10px] font-black uppercase ${
                        isReceita ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {isReceita ? 'Receita' : 'Despesa'}
                    </span>
                    {item.veiculo && (
                      <span className={`rounded px-1.5 py-0.5 text-[10px] font-bold ${getVeiculoColor(item.veiculo.nome)}`}>
                        {item.veiculo.nome}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-2 mt-1.5">
                    <Link href={`/lancamento/${item.id}`} className="block">
                      <h2 className="truncate font-black text-slate-900 text-base hover:text-indigo-600 transition-colors">
                        {owner(item) || 'Sem identificação'}
                      </h2>
                    </Link>
                    {(isReceita ? item.cliente?.cnpj : item.colaborador?.cpfCnpj) && (
                      <CopyCnpj
                        cnpj={isReceita ? item.cliente?.cnpj : item.colaborador?.cpfCnpj}
                        variant="badge"
                        className="text-[10px] py-0.5 px-1.5"
                      />
                    )}
                  </div>

                  {item.agencia && (
                    <p className="truncate text-xs font-semibold text-indigo-600">
                      Agência: {item.agencia.nome}
                    </p>
                  )}

                  <div className="flex items-center gap-1.5 mt-0.5">
                    <TickerText text={item.descricao || 'Sem descrição'} className="text-xs text-slate-500" />
                    {item.descricao && (
                      <CopyDescricaoButton
                        text={item.descricao}
                        variant="icon"
                        className="p-1 h-5 w-5 shrink-0 opacity-70 hover:opacity-100"
                      />
                    )}
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <p className="font-black text-slate-900 text-base">{formatCurrency(item.valor)}</p>
                  <span className="inline-flex items-center gap-1 rounded-full bg-indigo-50 px-2 py-0.5 text-[11px] font-bold text-indigo-700 mt-1">
                    <FileText className="h-3 w-3" /> {item.documentos.length}
                  </span>
                </div>
              </div>

              {/* Status Row */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 text-xs text-slate-500">
                <div className="flex items-center gap-3">
                  {hasNf ? (
                    <span className="font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded">
                      NF: {item.numeroNotaFiscal}
                    </span>
                  ) : isReceita ? (
                    <span className="font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded flex items-center gap-1">
                      <AlertTriangle className="h-3 w-3" /> Sem NF
                    </span>
                  ) : (
                    <span className="text-slate-400">Sem NF</span>
                  )}

                  {item.vencimento && (
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3 text-slate-400" />
                      Venc: {formatDate(item.vencimento)}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    href={`/novo-documento?lancamento=${item.id}`}
                    className="p-1.5 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                    title="Anexar documento"
                  >
                    <UploadCloud className="h-4 w-4" />
                  </Link>
                  <Link
                    href={`/lancamento/${item.id}`}
                    className="inline-flex items-center gap-1 font-bold text-indigo-600 hover:text-indigo-800"
                  >
                    <Eye className="h-4 w-4" /> Abrir
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Desktop Table View */}
      <div className="hidden overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs md:block">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 text-left">
            <thead className="bg-slate-50">
              <tr>
                <th scope="col" className="px-5 py-3 text-xs font-bold uppercase tracking-wider text-slate-500">
                  Tipo / Código
                </th>
                <th scope="col" className="px-5 py-3 text-xs font-bold uppercase tracking-wider text-slate-500">
                  Cliente / Fornecedor
                </th>
                <th scope="col" className="px-5 py-3 text-xs font-bold uppercase tracking-wider text-slate-500">
                  Veículo / Campanha
                </th>
                <th scope="col" className="px-5 py-3 text-xs font-bold uppercase tracking-wider text-slate-500">
                  Mês Ref. / Vencimento
                </th>
                <th scope="col" className="px-5 py-3 text-xs font-bold uppercase tracking-wider text-slate-500">
                  Nota Fiscal / Valor
                </th>
                <th scope="col" className="px-5 py-3 text-xs font-bold uppercase tracking-wider text-slate-500 text-center">
                  Anexos
                </th>
                <th scope="col" className="relative px-5 py-3">
                  <span className="sr-only">Ações</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {initialData.map((item) => {
                const isReceita = item.tipoLancamento === 'RECEITA';
                const hasNf = Boolean(item.numeroNotaFiscal);

                return (
                  <tr key={item.id} className="transition-colors hover:bg-slate-50/80">
                    {/* Col 1: Tipo & Código */}
                    <td className="whitespace-nowrap px-5 py-4">
                      <span
                        className={`inline-block rounded-md px-2 py-0.5 text-[11px] font-black uppercase ${
                          isReceita ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                        }`}
                      >
                        {isReceita ? 'Receita' : 'Despesa'}
                      </span>
                      <span className="block font-mono text-xs font-bold text-slate-600 mt-1">
                        {item.appSheetId || item.id.slice(0, 8)}
                      </span>
                    </td>

                    {/* Col 2: Cliente/Fornecedor */}
                    <td className="max-w-xs px-5 py-4">
                      <div className="flex flex-wrap items-center gap-2">
                        <Link
                          href={`/lancamento/${item.id}`}
                          className="truncate text-sm font-black text-slate-900 hover:text-indigo-600 transition-colors block"
                        >
                          {owner(item) || 'Sem identificação'}
                        </Link>
                        {(isReceita ? item.cliente?.cnpj : item.colaborador?.cpfCnpj) && (
                          <CopyCnpj
                            cnpj={isReceita ? item.cliente?.cnpj : item.colaborador?.cpfCnpj}
                            variant="badge"
                            className="text-[10px] py-0.5 px-1.5"
                          />
                        )}
                      </div>
                      {item.agencia && (
                        <p className="truncate text-xs font-semibold text-indigo-600 mt-0.5">
                          Ag: {item.agencia.nome}
                        </p>
                      )}
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <TickerText text={item.descricao || 'Sem descrição'} className="text-xs text-slate-500" />
                        {item.descricao && (
                          <CopyDescricaoButton
                            text={item.descricao}
                            variant="icon"
                            className="p-1 h-5 w-5 shrink-0 opacity-70 hover:opacity-100"
                          />
                        )}
                      </div>
                    </td>

                    {/* Col 3: Veículo / Campanha */}
                    <td className="whitespace-nowrap px-5 py-4 text-xs text-slate-600">
                      <span className={`inline-block rounded-md px-2 py-0.5 text-xs font-bold ${getVeiculoColor(item.veiculo?.nome)}`}>
                        {item.veiculo?.nome || 'Sem veículo'}
                      </span>
                      {item.numeroPi && (
                        <span className="block mt-1 font-semibold text-slate-700">
                          PI: {item.numeroPi}
                        </span>
                      )}
                      {item.numeroContrato && (
                        <span className="block text-slate-500">
                          Contr: {item.numeroContrato}
                        </span>
                      )}
                    </td>

                    {/* Col 4: Mês Ref. / Vencimento */}
                    <td className="whitespace-nowrap px-5 py-4 text-xs">
                      {item.mesAnoReferencia && (
                        <span className="block font-bold text-slate-800">
                          Ref: {item.mesAnoReferencia}
                        </span>
                      )}
                      <span className="block mt-0.5 text-slate-500">
                        Venc: <strong className="text-slate-700">{formatDate(item.vencimento)}</strong>
                      </span>
                    </td>

                    {/* Col 5: Nota Fiscal / Valor */}
                    <td className="whitespace-nowrap px-5 py-4">
                      <p className="text-sm font-black text-slate-900">
                        {formatCurrency(item.valor)}
                      </p>
                      <div className="mt-1">
                        {hasNf ? (
                          <span className="inline-block rounded-md bg-slate-100 px-2 py-0.5 text-xs font-bold text-slate-700">
                            NF {item.numeroNotaFiscal}
                          </span>
                        ) : isReceita ? (
                          <span className="inline-flex items-center gap-1 rounded-md bg-amber-100 px-2 py-0.5 text-xs font-bold text-amber-800">
                            <AlertTriangle className="h-3 w-3" /> Sem NF
                          </span>
                        ) : (
                          <span className="text-xs text-slate-400">Sem NF</span>
                        )}
                      </div>
                    </td>

                    {/* Col 6: Anexos */}
                    <td className="whitespace-nowrap px-5 py-4 text-center">
                      <span className="inline-flex items-center gap-1 rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-bold text-indigo-700">
                        <FileText className="h-3.5 w-3.5" /> {item.documentos.length}
                      </span>
                    </td>

                    {/* Col 7: Ações */}
                    <td className="whitespace-nowrap px-5 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/novo-documento?lancamento=${item.id}`}
                          title="Anexar documento ou link da NF"
                          className="rounded-lg p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                        >
                          <UploadCloud className="h-4 w-4" />
                        </Link>
                        <Link
                          href={`/lancamento/${item.id}`}
                          className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-indigo-600 hover:bg-indigo-50 hover:border-indigo-200 transition-colors shadow-2xs"
                        >
                          <Eye className="h-3.5 w-3.5" /> Abrir
                        </Link>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

