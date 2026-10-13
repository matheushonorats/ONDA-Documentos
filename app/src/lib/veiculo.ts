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
