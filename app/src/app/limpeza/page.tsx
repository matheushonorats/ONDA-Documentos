import { ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function LimpezaPage() {
  return <div className="mx-auto max-w-2xl rounded-3xl border border-emerald-200 bg-emerald-50 p-8 text-center"><ShieldCheck className="mx-auto h-12 w-12 text-emerald-600" /><h1 className="mt-4 text-2xl font-black text-slate-900">Exclusão automática desativada</h1><p className="mt-3 leading-7 text-slate-600">Nenhum documento do acervo será apagado automaticamente. Os caminhos legados permanecem preservados para conferência e migração segura.</p><Link href="/" className="mt-6 inline-flex rounded-xl bg-slate-900 px-5 py-3 font-semibold text-white">Voltar ao início</Link></div>;
}
