import { getCobrancasData } from '@/actions/cobrancas';
import { CobrancasClient } from './CobrancasClient';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Cobrança de Agências | Ondas Documentos',
  description: 'Módulo de Gestão e Notificação de Cobrança Semanal de Agências de Publicidade - Ondas Sistema de Radiodifusão LTDA',
};

export default async function CobrancasPage() {
  const data = await getCobrancasData();

  return <CobrancasClient initialData={data} />;
}
