import { getLancamentoById } from '@/actions/lancamentos';
import { notFound } from 'next/navigation';
import { EditLancamentoClient } from './EditLancamentoClient';
import { getAgencias } from '@/actions/agencias';
import { getVeiculos } from '@/actions/veiculos';
import { getClientes } from '@/actions/clientes';
import { getColaboradores } from '@/actions/colaboradores';

export default async function EditLancamentoPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const [lancamento, agencias, veiculos, clientes, colaboradores] = await Promise.all([
    getLancamentoById(params.id),
    getAgencias(),
    getVeiculos(),
    getClientes(),
    getColaboradores(),
  ]);

  if (!lancamento) notFound();

  return (
    <EditLancamentoClient 
      lancamento={lancamento} 
      agencias={agencias} 
      veiculos={veiculos}
      clientes={clientes}
      colaboradores={colaboradores}
    />
  );
}
