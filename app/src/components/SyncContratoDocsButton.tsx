'use client';

import { useState } from 'react';
import { Layers, Loader2, Check } from 'lucide-react';
import { sincronizarDocumentosPI } from '@/actions/lancamentos';
import { useRouter } from 'next/navigation';

export function SyncContratoDocsButton() {
  const [loading, setLoading] = useState(false);
  const [synced, setSynced] = useState(false);
  const router = useRouter();

  const handleSync = async () => {
    setLoading(true);
    setSynced(false);
    try {
      const res = await sincronizarDocumentosPI();
      if (res?.success) {
        setSynced(true);
        router.refresh();
        setTimeout(() => setSynced(false), 3000);
      }
    } catch (err) {
      console.error('Erro ao sincronizar:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleSync}
      disabled={loading}
      title="Sincronizar anexos (PIs, contratos e comprovantes de veiculação) entre todas as parcelas deste contrato"
      className="inline-flex items-center gap-1.5 rounded-xl border border-indigo-200 bg-white px-3 py-1.5 text-xs font-bold text-indigo-700 shadow-2xs hover:bg-indigo-50 hover:border-indigo-300 transition-all disabled:opacity-50"
    >
      {loading ? (
        <>
          <Loader2 className="h-3.5 w-3.5 animate-spin" />
          Sincronizando...
        </>
      ) : synced ? (
        <>
          <Check className="h-3.5 w-3.5 text-emerald-600" />
          Anexos Sincronizados!
        </>
      ) : (
        <>
          <Layers className="h-3.5 w-3.5" />
          Sincronizar Anexos do Contrato
        </>
      )}
    </button>
  );
}
