import { getClientes } from '@/actions/clientes';
import { getColaboradores } from '@/actions/colaboradores';
import { getAgencias } from '@/actions/agencias';
import { getTiposDocumento } from '@/actions/documentos';
import { getVeiculos } from '@/actions/veiculos';
import { LancamentoForm } from '@/components/LancamentoForm';
import { ArrowLeft, Wallet } from 'lucide-react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function NovaDespesaPage() {
  const [clientes, colaboradores, agencias, tiposDocumento, veiculos] = await Promise.all([
    getClientes(),
    getColaboradores(),
    getAgencias(),
    getTiposDocumento(),
    getVeiculos(),
  ]);

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <div className="flex items-center gap-4">
        <Link href="/lancamentos?tipo=DESPESA" className="p-2 hover:bg-slate-100 rounded-full transition-colors">
          <ArrowLeft className="w-6 h-6 text-slate-600" />
        </Link>
        <div>
          <h1 className="text-3xl font-black text-slate-800 flex items-center gap-3">
            <Wallet className="w-8 h-8 text-rose-500" />
            Nova Conta a Pagar
          </h1>
          <p className="text-slate-500 mt-1">Registre despesas, parcelamentos e pagamentos de fornecedores ou colaboradores.</p>
        </div>
      </div>

      <LancamentoForm 
        initialTipo="DESPESA"
        clientes={clientes}
        colaboradores={colaboradores} 
        agencias={agencias}
        tiposDocumento={tiposDocumento} 
        veiculos={veiculos}
      />
    </div>
  );
}
