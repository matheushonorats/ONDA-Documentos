'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { Menu, X, PlusCircle, UploadCloud, ChevronDown, Radio, Layers, Wallet, Users, Building2, ListChecks, FileSpreadsheet } from 'lucide-react';
import { useState, useRef, useEffect, Suspense } from 'react';

function AppHeaderContent() {
  const [open, setOpen] = useState(false);
  const [cadastrosOpen, setCadastrosOpen] = useState(false);
  const cadastrosRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const tipoParam = searchParams.get('tipo');

  // Fechar dropdown ao clicar fora
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (cadastrosRef.current && !cadastrosRef.current.contains(event.target as Node)) {
        setCadastrosOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isHomeActive = pathname === '/';
  const isReceberActive = pathname === '/lancamentos' && tipoParam === 'RECEITA';
  const isPagarActive = (pathname === '/lancamentos' && tipoParam === 'DESPESA') || pathname === '/pagar/novo';
  const isTodosActive = pathname === '/lancamentos' && (tipoParam === 'TODOS' || !tipoParam);
  const isCobrancasActive = pathname.startsWith('/cobrancas');
  const isCadastrosActive = pathname.startsWith('/clientes') || pathname.startsWith('/colaboradores') || pathname.startsWith('/agencias');

  const navItemClass = (active: boolean) =>
    `px-3 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-1.5 ${
      active
        ? 'bg-indigo-50 text-indigo-700 shadow-xs'
        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
    }`;

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 shadow-xs backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Logo & Sistema */}
        <div className="flex items-center gap-6">
          <Link href="/" className="flex min-w-0 items-center gap-3" onClick={() => setOpen(false)}>
            <div className="relative">
              <Image src="/ondas.png" alt="Ondas" width={38} height={38} className="h-9 w-auto object-contain" priority />
            </div>
            <div>
              <span className="block truncate text-base font-black tracking-tight text-slate-900 sm:text-lg">
                Ondas <span className="text-indigo-600">Documentos</span>
              </span>
              <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 -mt-1">
                Rádios Litoral & Onda Livre
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Navegação principal">
            <Link href="/" className={navItemClass(isHomeActive)}>
              Início
            </Link>

            <Link href="/lancamentos?tipo=RECEITA" className={navItemClass(isReceberActive)}>
              <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
              A Receber (Clientes)
            </Link>

            <Link href="/lancamentos?tipo=DESPESA" className={navItemClass(isPagarActive)}>
              <span className="h-2 w-2 rounded-full bg-rose-500"></span>
              A Pagar (Despesas)
            </Link>

            <Link href="/lancamentos?tipo=TODOS" className={navItemClass(isTodosActive)}>
              <ListChecks className="h-4 w-4 text-slate-400" />
              Todos os Lançamentos
            </Link>

            <Link href="/cobrancas" className={navItemClass(isCobrancasActive)}>
              <FileSpreadsheet className="h-4 w-4 text-indigo-600" />
              Cobranças
            </Link>

            {/* Dropdown Cadastros */}
            <div className="relative" ref={cadastrosRef}>
              <button
                type="button"
                onClick={() => setCadastrosOpen(!cadastrosOpen)}
                className={`${navItemClass(isCadastrosActive)} cursor-pointer`}
              >
                Cadastros
                <ChevronDown className={`h-3.5 w-3.5 transition-transform ${cadastrosOpen ? 'rotate-180' : ''}`} />
              </button>

              {cadastrosOpen && (
                <div className="absolute left-0 mt-2 w-52 origin-top-left rounded-xl border border-slate-200 bg-white p-2 shadow-lg ring-1 ring-black/5 animate-in fade-in slide-from-top-2 duration-150">
                  <Link
                    href="/clientes"
                    onClick={() => setCadastrosOpen(false)}
                    className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 transition-colors"
                  >
                    <Users className="h-4 w-4 text-slate-400" />
                    Clientes
                  </Link>
                  <Link
                    href="/colaboradores"
                    onClick={() => setCadastrosOpen(false)}
                    className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 transition-colors"
                  >
                    <Wallet className="h-4 w-4 text-slate-400" />
                    Colaboradores / Fornecedores
                  </Link>
                  <Link
                    href="/agencias"
                    onClick={() => setCadastrosOpen(false)}
                    className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 transition-colors"
                  >
                    <Building2 className="h-4 w-4 text-slate-400" />
                    Agências de Publicidade
                  </Link>
                </div>
              )}
            </div>
          </nav>
        </div>

        {/* Quick Actions (Desktop) */}
        <div className="hidden items-center gap-2.5 sm:flex">
          <Link
            href="/novo-documento"
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs font-bold text-slate-700 hover:bg-slate-100 hover:border-slate-300 transition-all active:scale-[0.98]"
            title="Anexar arquivos ou link a um lançamento existente"
          >
            <UploadCloud className="h-4 w-4 text-indigo-600" />
            Anexar Documento
          </Link>

          <Link
            href="/novo-lancamento"
            className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-3.5 py-2 text-xs font-bold text-white shadow-xs hover:bg-indigo-700 transition-all active:scale-[0.98]"
          >
            <PlusCircle className="h-4 w-4" />
            Novo Lançamento
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          type="button"
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
          className="rounded-lg p-2 text-slate-700 hover:bg-slate-100 lg:hidden"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {open && (
        <nav className="border-t border-slate-200 bg-white px-4 py-4 lg:hidden animate-in fade-in duration-200" aria-label="Navegação móvel">
          <div className="grid gap-1">
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className={`rounded-xl px-3.5 py-2.5 text-sm font-bold ${
                isHomeActive ? 'bg-indigo-50 text-indigo-700' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              Início
            </Link>

            <div className="pt-2 pb-1 px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Lançamentos Financeiros
            </div>

            <Link
              href="/lancamentos?tipo=RECEITA"
              onClick={() => setOpen(false)}
              className={`flex items-center justify-between rounded-xl px-3.5 py-2.5 text-sm font-bold ${
                isReceberActive ? 'bg-emerald-50 text-emerald-800' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <span className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500"></span>
                Contas a Receber (Clientes)
              </span>
            </Link>

            <Link
              href="/lancamentos?tipo=DESPESA"
              onClick={() => setOpen(false)}
              className={`flex items-center justify-between rounded-xl px-3.5 py-2.5 text-sm font-bold ${
                isPagarActive ? 'bg-rose-50 text-rose-800' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <span className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-rose-500"></span>
                Contas a Pagar (Despesas)
              </span>
            </Link>

            <Link
              href="/lancamentos?tipo=TODOS"
              onClick={() => setOpen(false)}
              className={`rounded-xl px-3.5 py-2.5 text-sm font-bold ${
                isTodosActive ? 'bg-indigo-50 text-indigo-700' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              Todos os Lançamentos
            </Link>

            <Link
              href="/cobrancas"
              onClick={() => setOpen(false)}
              className={`flex items-center justify-between rounded-xl px-3.5 py-2.5 text-sm font-bold ${
                isCobrancasActive ? 'bg-indigo-50 text-indigo-700' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <span className="flex items-center gap-2">
                <FileSpreadsheet className="h-4 w-4 text-indigo-600" />
                Cobrança de Agências
              </span>
            </Link>

            <div className="pt-2 pb-1 px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Cadastros
            </div>

            <Link
              href="/clientes"
              onClick={() => setOpen(false)}
              className="rounded-xl px-3.5 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50"
            >
              Clientes
            </Link>
            <Link
              href="/colaboradores"
              onClick={() => setOpen(false)}
              className="rounded-xl px-3.5 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50"
            >
              Colaboradores / Fornecedores
            </Link>
            <Link
              href="/agencias"
              onClick={() => setOpen(false)}
              className="rounded-xl px-3.5 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50"
            >
              Agências de Publicidade
            </Link>

            <div className="mt-4 pt-3 border-t border-slate-100 flex flex-col gap-2">
              <Link
                href="/novo-lancamento"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-bold text-white shadow-xs"
              >
                <PlusCircle className="h-4 w-4" />
                Novo Lançamento
              </Link>
              <Link
                href="/novo-documento"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-bold text-slate-700"
              >
                <UploadCloud className="h-4 w-4 text-indigo-600" />
                Anexar Documento
              </Link>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}

export function AppHeader() {
  return (
    <Suspense fallback={<header className="sticky top-0 z-30 border-b border-slate-200 bg-white h-16" />}>
      <AppHeaderContent />
    </Suspense>
  );
}
