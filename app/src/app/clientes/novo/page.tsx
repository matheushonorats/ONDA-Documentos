'use client';

import { useState, useEffect } from 'react';
import { createCliente } from '@/actions/clientes';
import { Building2, ArrowLeft, FileText, MapPin } from 'lucide-react';
import Link from 'next/link';

export default function NovoCliente() {
  const [nomeFantasia, setNomeFantasia] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [cidade, setCidade] = useState('');
  
  // API IBGE
  const [ufs, setUfs] = useState<{ sigla: string, nome: string }[]>([]);
  const [selectedUf, setSelectedUf] = useState('');
  const [cidadesIbge, setCidadesIbge] = useState<{ id: number, nome: string }[]>([]);

  useEffect(() => {
    fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome')
      .then(res => res.json())
      .then(data => setUfs(data))
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (selectedUf) {
      fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`)
        .then(res => res.json())
        .then(data => setCidadesIbge(data))
        .catch(console.error);
    }
  }, [selectedUf]);

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div>
        <Link href="/clientes" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-indigo-600 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-1" />
          Voltar para Clientes
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-8 bg-slate-50 border-b border-slate-200">
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Building2 className="w-6 h-6 text-indigo-600" />
            Cadastrar Novo Cliente
          </h1>
        </div>
        
        <form action={createCliente} className="p-8 space-y-6">
          <div className="space-y-2">
            <label htmlFor="razaoSocial" className="block text-sm font-medium text-slate-700">Razão Social (Obrigatório)</label>
            <input required type="text" name="razaoSocial" id="razaoSocial" className="block w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-slate-900" />
          </div>

          <div className="space-y-2">
            <label htmlFor="nomeFantasia" className="block text-sm font-medium text-slate-700">Nome Fantasia</label>
            <input type="text" name="nomeFantasia" id="nomeFantasia" value={nomeFantasia} onChange={(e) => setNomeFantasia(e.target.value)} className="block w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-slate-900" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700 flex items-center gap-2">
                <FileText className="w-4 h-4" /> CNPJ
              </label>
              <input 
                type="text"
                name="cnpj"
                value={cnpj} 
                onChange={(e) => setCnpj(e.target.value)}
                className="block w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500" 
                placeholder="00.000.000/0000-00"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700 flex items-center gap-2">
                <MapPin className="w-4 h-4" /> Estado
              </label>
              <select 
                value={selectedUf} 
                onChange={(e) => { setSelectedUf(e.target.value); setCidade(''); }}
                className="block w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 bg-white"
              >
                <option value="">UF...</option>
                {ufs.map(uf => <option key={uf.sigla} value={uf.sigla}>{uf.sigla}</option>)}
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700 flex items-center gap-2">
                <MapPin className="w-4 h-4" /> Cidade (IBGE)
              </label>
              <select 
                name="cidade"
                value={cidade} 
                onChange={(e) => setCidade(e.target.value)}
                disabled={!selectedUf}
                className="block w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 bg-white disabled:bg-slate-100 disabled:text-slate-400"
              >
                <option value="">Selecione a cidade...</option>
                {cidadesIbge.map(c => <option key={c.id} value={`${c.nome} - ${selectedUf}`}>{c.nome}</option>)}
              </select>
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button type="submit" className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-xl hover:bg-indigo-700 transition-colors shadow-sm">
              Salvar Cliente
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
