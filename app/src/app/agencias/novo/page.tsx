import { createAgencia } from '@/actions/agencias';
import { Building2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function NovaAgencia() {
  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div>
        <Link href="/agencias" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-indigo-600 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-1" />
          Voltar para Agências
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-8 bg-slate-50 border-b border-slate-200">
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Building2 className="w-6 h-6 text-indigo-600" />
            Cadastrar Nova Agência
          </h1>
        </div>
        
        <form action={createAgencia} className="p-8 space-y-6">
          <div className="space-y-2">
            <label htmlFor="nome" className="block text-sm font-medium text-slate-700">Nome da Agência (Obrigatório)</label>
            <input required type="text" name="nome" id="nome" className="block w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-slate-900" />
          </div>

          <div className="space-y-2">
            <label htmlFor="cnpj" className="block text-sm font-medium text-slate-700">CNPJ</label>
            <input type="text" name="cnpj" id="cnpj" className="block w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-slate-900" />
          </div>

          <div className="space-y-2">
            <label htmlFor="contatos" className="block text-sm font-medium text-slate-700">Contatos / Observações</label>
            <textarea name="contatos" id="contatos" rows={3} className="block w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-slate-900"></textarea>
          </div>

          <div className="pt-4 flex justify-end">
            <button type="submit" className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-xl hover:bg-indigo-700 transition-colors shadow-sm">
              Salvar Agência
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
