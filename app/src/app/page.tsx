import { getDashboardData } from '@/actions/dashboard';
import { ArrowRight, Building2, FilePlus2, Files, ListChecks, Search, UploadCloud, UserRound, UsersRound } from 'lucide-react';
import Link from 'next/link';
import { TickerText } from '@/components/TickerText';

export const dynamic = 'force-dynamic';

const shortcuts = [
  { href: '/novo-lancamento', label: 'Novo lançamento', description: 'Registrar documento de cliente', icon: FilePlus2, tone: 'bg-indigo-600 text-white' },
  { href: '/novo-documento', label: 'Adicionar documento', description: 'Localizar um lançamento e complementar', icon: UploadCloud, tone: 'bg-violet-600 text-white' },
  { href: '/lancamentos', label: 'Buscar lançamentos', description: 'Pesquisar todo o acervo', icon: Search, tone: 'bg-white text-slate-900 border border-slate-200' },
  { href: '/clientes', label: 'Clientes', description: 'Cadastros ligados a recebimentos', icon: UserRound, tone: 'bg-white text-slate-900 border border-slate-200' },
  { href: '/colaboradores', label: 'Colaboradores', description: 'Prestadores e fornecedores separados', icon: UsersRound, tone: 'bg-white text-slate-900 border border-slate-200' },
  { href: '/agencias', label: 'Agências', description: 'Consultar agências relacionadas', icon: Building2, tone: 'bg-white text-slate-900 border border-slate-200' },
];

export default async function Home() {
  const data = await getDashboardData();

  return (
    <div className="space-y-10">
      <section className="rounded-3xl bg-slate-950 px-6 py-9 text-white shadow-xl sm:px-10 sm:py-12">
        <div className="max-w-3xl">
          <span className="inline-flex rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-indigo-200">Acervo documental</span>
          <h1 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">Encontre e organize documentos sem procurar linha por linha.</h1>
          <p className="mt-3 max-w-2xl text-base leading-7 text-slate-300">Acesse rapidamente um lançamento, consulte os arquivos relacionados ou acrescente um comprovante recebido depois.</p>
        </div>
      </section>

      <section>
        <div className="mb-4 flex items-end justify-between gap-4">
          <div><h2 className="text-xl font-bold text-slate-900">Acesso rápido</h2><p className="mt-1 text-sm text-slate-500">Escolha o que precisa fazer agora.</p></div>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {shortcuts.map(({ href, label, description, icon: Icon, tone }) => (
            <Link key={href} href={href} className={`group rounded-2xl p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg ${tone}`}>
              <div className="flex items-start justify-between gap-4">
                <span className="rounded-xl bg-current/10 p-2.5"><Icon className="h-6 w-6" /></span>
                <ArrowRight className="h-5 w-5 opacity-60 transition group-hover:translate-x-1" />
              </div>
              <h3 className="mt-5 text-lg font-bold">{label}</h3>
              <p className={`mt-1 text-sm ${tone.includes('text-white') ? 'text-white/75' : 'text-slate-500'}`}>{description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          ['Lançamentos', data.countLancamentos, ListChecks],
          ['Documentos', data.countDocumentos, Files],
          ['Clientes', data.countClientes, UserRound],
          ['Colaboradores', data.countColaboradores, UsersRound],
        ].map(([label, value, Icon]) => {
          const StatIcon = Icon as typeof Files;
          return <div key={String(label)} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5"><StatIcon className="h-5 w-5 text-indigo-600" /><p className="mt-3 text-2xl font-black text-slate-900">{Number(value).toLocaleString('pt-BR')}</p><p className="text-sm text-slate-500">{String(label)}</p></div>;
        })}
      </section>

      <section className="grid gap-6 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <div className="mb-4 flex items-center justify-between"><div><h2 className="text-xl font-bold text-slate-900">Últimos lançamentos</h2><p className="mt-1 text-sm text-slate-500">Registros acessados ou atualizados recentemente.</p></div><Link href="/lancamentos" className="text-sm font-semibold text-indigo-600 hover:text-indigo-800">Ver todos</Link></div>
          <div className="space-y-3">
            {data.recentLancamentos.map((item) => {
              const owner = item.tipoLancamento === 'RECEITA' ? item.cliente?.nomeFantasia || item.cliente?.razaoSocial : item.colaborador?.nome;
              return <Link key={item.id} href={`/lancamento/${item.id}`} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-indigo-300 hover:shadow-md"><div className="min-w-0 w-full"><div className="flex flex-wrap items-center gap-2"><span className="rounded-md bg-slate-100 px-2 py-1 text-xs font-bold text-slate-600">{item.appSheetId || item.id.slice(0, 8)}</span><span className="text-xs font-semibold text-indigo-700">{item.tipoLancamento === 'RECEITA' ? 'Cliente' : 'Colaborador'}</span></div><p className="mt-2 truncate font-bold text-slate-900">{owner || 'Sem identificação'}</p>{item.agencia && <p className="mt-0.5 truncate text-xs font-semibold text-indigo-600">Ag: {item.agencia.nome}</p>}<TickerText text={item.descricao || item.veiculo?.nome || 'Sem descrição'} className="mt-0.5 text-sm text-slate-500" /><div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500">{item.numeroPi && <span className="font-semibold text-slate-700">PI: {item.numeroPi}</span>}{item.numeroNotaFiscal && <span>NF: {item.numeroNotaFiscal}</span>}{item.valor !== null && <span>R$ {item.valor.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</span>}</div></div><span className="shrink-0 self-start sm:self-center rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">{item.documentos.length} arquivo(s)</span></Link>;
            })}
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="mb-4"><h2 className="text-xl font-bold text-slate-900">Documentos recentes</h2><p className="mt-1 text-sm text-slate-500">Últimos arquivos adicionados ao acervo.</p></div>
          <div className="rounded-2xl border border-slate-200 bg-white p-2 shadow-sm">
            {data.recentDocumentos.map((doc) => {
              const owner = doc.lancamento.tipoLancamento === 'RECEITA' ? doc.lancamento.cliente?.nomeFantasia || doc.lancamento.cliente?.razaoSocial : doc.lancamento.colaborador?.nome;
              return <Link key={doc.id} href={`/lancamento/${doc.lancamentoId}`} className="flex gap-3 rounded-xl p-3 transition hover:bg-slate-50"><span className="mt-0.5 rounded-lg bg-indigo-50 p-2 text-indigo-600"><Files className="h-4 w-4" /></span><span className="min-w-0"><span className="block truncate text-sm font-semibold text-slate-900">{doc.tipoDocumento.nome}</span><span className="block truncate text-xs text-slate-500">{doc.nomeOriginal} · {owner || 'Sem identificação'}</span></span></Link>;
            })}
            {data.recentDocumentos.length === 0 && <p className="p-6 text-center text-sm text-slate-500">Nenhum documento importado.</p>}
          </div>
        </div>
      </section>
    </div>
  );
}
