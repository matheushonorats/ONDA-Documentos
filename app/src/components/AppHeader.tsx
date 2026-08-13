'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

const links = [
  ['Início', '/'], ['Lançamentos', '/lancamentos'], ['Clientes', '/clientes'], ['Colaboradores', '/colaboradores'], ['Agências', '/agencias'],
];

export function AppHeader() {
  const [open, setOpen] = useState(false);
  return <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur">
    <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
      <Link href="/" className="flex min-w-0 items-center gap-2" onClick={() => setOpen(false)}>
        <Image src="/ondas.png" alt="Ondas" width={44} height={44} className="h-10 w-auto" priority />
        <span className="truncate text-base font-black tracking-tight text-slate-900 sm:text-xl">Ondas - Documentos</span>
      </Link>
      <nav className="hidden items-center gap-6 md:flex" aria-label="Navegação principal">
        {links.map(([label, href]) => <Link key={href} href={href} className="text-sm font-semibold text-slate-600 transition hover:text-indigo-700">{label}</Link>)}
      </nav>
      <button type="button" aria-label={open ? 'Fechar menu' : 'Abrir menu'} aria-expanded={open} onClick={() => setOpen((value) => !value)} className="rounded-lg p-2 text-slate-700 hover:bg-slate-100 md:hidden">{open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}</button>
    </div>
    {open && <nav className="border-t border-slate-100 bg-white px-4 py-3 md:hidden" aria-label="Navegação móvel"><div className="mx-auto grid max-w-7xl gap-1">{links.map(([label, href]) => <Link key={href} href={href} onClick={() => setOpen(false)} className="rounded-lg px-3 py-3 text-sm font-semibold text-slate-700 hover:bg-indigo-50 hover:text-indigo-700">{label}</Link>)}</div></nav>}
  </header>;
}
