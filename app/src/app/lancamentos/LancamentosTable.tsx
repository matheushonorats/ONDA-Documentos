import { Eye, FileText, Radio } from 'lucide-react';
import Link from 'next/link';
import { Lancamento, Cliente, Colaborador, Documento, Agencia, Veiculo } from '@/generated/prisma';
import { TickerText } from '@/components/TickerText';

type Item = Lancamento & {
  cliente: Cliente | null;
  colaborador: Colaborador | null;
  documentos: Documento[];
  agencia: Agencia | null;
  veiculo: Veiculo | null;
};

function owner(item: Item) { return item.tipoLancamento === 'RECEITA' ? item.cliente?.nomeFantasia || item.cliente?.razaoSocial : item.colaborador?.nome; }

export function getVeiculoColor(veiculo: string | undefined | null) {
  if (!veiculo) return 'bg-slate-100 text-slate-500 font-medium';
  const name = veiculo.toLowerCase();
  
  // Rock (Rock News, etc) -> Preta e Vermelha
  if (name.includes('rock')) {
    return 'bg-zinc-950 text-red-500 border border-red-950/80 font-black shadow-sm';
  }

  // Onda FM / Grupo Ondas -> Tons de Azul
  if (name.includes('onda')) {
    return 'bg-blue-600 text-white font-bold shadow-sm';
  }

  // Rádio Clube AM / Outras rádios -> Azul claro / Sky
  if (name.includes('clube') || name.includes('rádio') || name.includes('radio') || name.includes('fm')) {
    return 'bg-sky-600 text-white font-bold shadow-sm';
  }

  return 'bg-blue-700 text-white font-bold shadow-sm';
}

export function LancamentosTable({ initialData }: { initialData: Item[] }) {
  if (!initialData.length) return <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center"><FileText className="mx-auto h-12 w-12 text-slate-300" /><p className="mt-3 font-bold text-slate-900">Nenhum lançamento encontrado</p><p className="mt-1 text-sm text-slate-500">Tente buscar por outro nome, código ou documento.</p></div>;
  return <>
    <div className="space-y-3 md:hidden">{initialData.map((item) => <Link key={item.id} href={`/lancamento/${item.id}`} className="block rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"><div className="flex items-start justify-between gap-3"><div className="min-w-0"><div className="flex flex-wrap gap-2"><span className="rounded bg-slate-100 px-2 py-1 text-xs font-bold text-slate-600">{item.appSheetId || item.id.slice(0,8)}</span><span className="rounded bg-indigo-50 px-2 py-1 text-xs font-bold text-indigo-700">{item.tipoLancamento === 'RECEITA' ? 'Cliente' : 'Colaborador'}</span></div><h2 className="mt-2 truncate font-bold text-slate-900">{owner(item) || 'Sem identificação'}</h2>{item.agencia && <p className="mt-0.5 truncate text-xs font-semibold text-indigo-600">Ag: {item.agencia.nome}</p>}<TickerText text={item.descricao || 'Sem descrição'} className="mt-0.5 text-xs text-slate-500" /></div><Eye className="h-5 w-5 shrink-0 text-indigo-600" /></div><div className="mt-3 grid grid-cols-2 gap-2 text-sm text-slate-500"><span className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-bold w-fit ${getVeiculoColor(item.veiculo?.nome)}`}><Radio className="h-3 w-3" />{item.veiculo?.nome || 'Sem veículo'}</span><span>NF {item.numeroNotaFiscal || '—'}</span><span>{item.documentos.length} arquivo(s)</span><span>{item.valor !== null ? `R$ ${item.valor.toLocaleString('pt-BR',{minimumFractionDigits:2})}` : 'Valor não informado'}</span></div></Link>)}</div>
    <div className="hidden overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm md:block"><div className="overflow-x-auto"><table className="min-w-full divide-y divide-slate-200"><thead className="bg-slate-50"><tr>{['Código / tipo','Cliente ou colaborador','Veículo / referência','NF / valor','Arquivos',''].map((label) => <th key={label} className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-500">{label}</th>)}</tr></thead><tbody className="divide-y divide-slate-100">{initialData.map((item) => <tr key={item.id} className="transition hover:bg-slate-50"><td className="whitespace-nowrap px-5 py-4"><span className="block font-mono text-xs font-bold text-slate-700">{item.appSheetId || item.id.slice(0,8)}</span><span className="mt-1 block text-xs text-indigo-700">{item.tipoLancamento === 'RECEITA' ? 'Cliente' : 'Colaborador'}</span></td><td className="max-w-xs px-5 py-4"><p className="truncate text-sm font-bold text-slate-900">{owner(item) || 'Sem identificação'}</p>{item.agencia && <p className="truncate text-xs font-semibold text-indigo-600 mt-0.5">Ag: {item.agencia.nome}</p>}<TickerText text={item.descricao || 'Sem descrição'} className="mt-0.5 text-xs text-slate-500" /></td><td className="whitespace-nowrap px-5 py-4 text-sm text-slate-600"><span className={`inline-block rounded-md px-2 py-1 text-xs font-bold ${getVeiculoColor(item.veiculo?.nome)}`}>{item.veiculo?.nome || '—'}</span>{item.numeroPi && <span className="block mt-1 text-xs text-slate-500">PI: {item.numeroPi}</span>}{item.numeroContrato && <span className="block mt-1 text-xs text-slate-500">Contrato: {item.numeroContrato}</span>}</td><td className="whitespace-nowrap px-5 py-4"><p className="text-sm text-slate-800">NF {item.numeroNotaFiscal || '—'}</p><p className="text-xs text-slate-500">{item.valor !== null ? `R$ ${item.valor.toLocaleString('pt-BR',{minimumFractionDigits:2})}` : 'Valor não informado'}</p></td><td className="whitespace-nowrap px-5 py-4"><span className="inline-flex items-center gap-1 rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-700"><FileText className="h-3.5 w-3.5" /> {item.documentos.length}</span></td><td className="whitespace-nowrap px-5 py-4 text-right"><Link href={`/lancamento/${item.id}`} className="inline-flex items-center gap-1 text-sm font-bold text-indigo-600 hover:text-indigo-800"><Eye className="h-4 w-4" /> Abrir</Link></td></tr>)}</tbody></table></div></div>
  </>;
}
