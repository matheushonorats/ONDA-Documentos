'use client';

import { useState } from 'react';
import { Table, Loader2, Check, AlertCircle } from 'lucide-react';
import { enviarLancamentoParaPlanilhaCobranca } from '@/actions/cobrancas';
import { useRouter } from 'next/navigation';

export function EnviarParaPlanilhaButton({
  lancamentoId,
  temAgenciaOuPi,
}: {
  lancamentoId: string;
  temAgenciaOuPi: boolean;
}) {
  const [loading, setLoading] = useState(false);
  const [successNo, setSuccessNo] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleEnviar = async () => {
    if (!confirm('Deseja enviar este lançamento como uma nova linha na Planilha Semanal de Cobranças?')) {
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const res = await enviarLancamentoParaPlanilhaCobranca(lancamentoId);
      if (res.success) {
        setSuccessNo(res.cobrancaNo || 'OK');
        router.refresh();
      } else {
        setError(res.error || 'Erro ao enviar para a planilha.');
      }
    } catch (err: any) {
      setError(err?.message || 'Falha de conexão.');
    } finally {
      setLoading(false);
    }
  };

  if (successNo) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-50 border border-emerald-200 px-3 py-2 text-xs font-bold text-emerald-700 shadow-2xs">
        <Check className="h-3.5 w-3.5" /> Na Planilha (Linha {successNo})
      </span>
    );
  }

  return (
    <div className="inline-flex flex-col items-start gap-1">
      <button
        type="button"
        onClick={handleEnviar}
        disabled={loading}
        title="Insere este contrato como nova linha na planilha Google Sheets de cobranças de agências"
        className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-indigo-200 bg-white px-3.5 py-2 text-xs font-bold text-indigo-700 shadow-2xs hover:bg-indigo-50 hover:border-indigo-300 transition-all active:scale-[0.98] disabled:opacity-50"
      >
        {loading ? (
          <>
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
            Enviando...
          </>
        ) : (
          <>
            <Table className="h-3.5 w-3.5 text-indigo-600" />
            Enviar para Planilha
          </>
        )}
      </button>
      {error && (
        <span className="text-[11px] text-red-600 font-semibold flex items-center gap-1">
          <AlertCircle className="h-3 w-3" /> {error}
        </span>
      )}
    </div>
  );
}
