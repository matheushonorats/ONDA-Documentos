import { getClientes } from '@/actions/clientes';
import { getColaboradores } from '@/actions/colaboradores';
import { getAgencias } from '@/actions/agencias';
import { getTiposDocumento } from '@/actions/documentos';
import { getVeiculos } from '@/actions/veiculos';
import { LancamentoForm } from '@/components/LancamentoForm';
import { ArrowLeft, LayoutDashboard } from 'lucide-react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function NovoLancamentoPage({ searchParams }: { searchParams: Promise<{ tipo?: string }> }) {
  const params = await searchParams;
  const initialTipo = params.tipo === 'DESPESA' ? 'DESPESA' : 'RECEITA';

  const [clientes, colaboradores, agencias, tiposDocumento, veiculos] = await Promise.all([
    getClientes(),
    getColaboradores(),
    getAgencias(),
    getTiposDocumento(),
    getVeiculos(),
  ]);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <Link href="/" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-indigo-600 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-1" />
          Voltar para o Dashboard
        </Link>
      </div>

      <div className="bg-indigo-600 rounded-3xl p-8 sm:p-10 text-white shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-white opacity-10 rounded-full blur-2xl"></div>
        <div className="relative z-10 flex items-center gap-4">
          <div className="bg-white/20 p-3 rounded-xl">
            <LayoutDashboard className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Novo Lançamento
            </h1>
            <p className="text-indigo-200 mt-1">
              Registre a operação e adicione os documentos pertinentes
            </p>
          </div>
        </div>
      </div>

      <LancamentoForm 
        initialTipo={initialTipo}
        clientes={clientes} 
        colaboradores={colaboradores}
        agencias={agencias} 
        tiposDocumento={tiposDocumento} 
        veiculos={veiculos}
      />
    </div>
  );
}
