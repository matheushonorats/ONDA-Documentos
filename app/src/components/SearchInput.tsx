'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect, Suspense } from 'react';
import { Search } from 'lucide-react';

function SearchInputContent({ placeholder = "Pesquisar..." }: { placeholder?: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [value, setValue] = useState(searchParams.get('q') || '');

  useEffect(() => {
    // Se o valor não mudou, não dispara o timeout
    if (value === (searchParams.get('q') || '')) return;

    const timeoutId = setTimeout(() => {
      // Usar window.location.search para ter os parâmetros mais recentes sem depender do estado do React
      const params = new URLSearchParams(window.location.search);
      if (value) {
        params.set('q', value);
      } else {
        params.delete('q');
      }
      params.delete('p'); // Reseta a página para a 1ª ao pesquisar
      router.push(`?${params.toString()}`);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [value]); // Roda apenas quando o usuário digita

  return (
    <div className="relative flex-1">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
        <Search className="h-5 w-5 text-slate-400" />
      </div>
      <input
        type="text"
        name="q"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="block w-full rounded-xl border border-slate-300 bg-white py-3.5 pl-11 pr-4 text-slate-900 placeholder:text-slate-500 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm shadow-sm transition-all"
        placeholder={placeholder}
      />
    </div>
  );
}

export function SearchInput({ placeholder = "Pesquisar..." }: { placeholder?: string }) {
  return (
    <Suspense fallback={
      <div className="relative flex-1">
        <div className="h-12 rounded-xl border border-slate-200 bg-slate-100/50 animate-pulse" />
      </div>
    }>
      <SearchInputContent placeholder={placeholder} />
    </Suspense>
  );
}
