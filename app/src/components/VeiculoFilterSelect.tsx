'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

interface Props {
  veiculos: { id: string; nome: string }[];
  currentValue: string;
}

function VeiculoFilterSelectInner({ veiculos, currentValue }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    const sp = new URLSearchParams(searchParams.toString());
    if (val && val !== 'TODOS') {
      sp.set('veiculo', val);
    } else {
      sp.delete('veiculo');
    }
    sp.delete('p'); // Reseta a paginação para página 1
    router.push(`/lancamentos?${sp.toString()}`);
  };

  return (
    <div className="w-full sm:w-64">
      <label htmlFor="veiculo-filter" className="sr-only">Filtrar por Veículo / Rádio</label>
      <div className="relative">
        <select
          id="veiculo-filter"
          value={currentValue}
          onChange={handleChange}
          className="w-full rounded-xl border border-slate-300 bg-white py-3 px-4 text-xs sm:text-sm font-bold text-slate-700 focus:border-indigo-500 focus:ring-indigo-500 shadow-xs cursor-pointer"
        >
          <option value="TODOS">📻 Todos os Veículos / Rádios</option>
          {veiculos.map((v) => (
            <option key={v.id} value={v.id}>
              {v.nome}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export function VeiculoFilterSelect(props: Props) {
  return (
    <Suspense
      fallback={
        <div className="w-full sm:w-64 h-11 rounded-xl border border-slate-200 bg-slate-100/60 animate-pulse" />
      }
    >
      <VeiculoFilterSelectInner {...props} />
    </Suspense>
  );
}
