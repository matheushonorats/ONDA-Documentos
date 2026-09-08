'use client';

import { useState } from 'react';
import { X, PlusCircle, Loader2 } from 'lucide-react';
import { adicionarCobranca, NovaCobrancaInput } from '@/actions/cobrancas';

interface NovaCobrancaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function NovaCobrancaModal({ isOpen, onClose, onSuccess }: NovaCobrancaModalProps) {
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  const [formData, setFormData] = useState<NovaCobrancaInput>({
    pi: '',
    agencia: '',
    veiculo: 'ONDAS 985',
    valor: '',
    dataVencimento: '',
    email: '',
    obs: '',
    link: '',
  });

  if (!isOpen) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErro(null);

    if (!formData.pi.trim() || !formData.agencia.trim() || !formData.valor || !formData.dataVencimento.trim()) {
      setErro('Por favor, preencha os campos obrigatórios (PI, Agência, Valor e Vencimento).');
      return;
    }

    setLoading(true);
    try {
      // Normaliza a data para DD/MM/YYYY se o input date nativo retornar YYYY-MM-DD
      let dataFormatada = formData.dataVencimento.trim();
      if (dataFormatada.includes('-')) {
        const parts = dataFormatada.split('-');
        if (parts.length === 3 && parts[0].length === 4) {
          dataFormatada = `${parts[2]}/${parts[1]}/${parts[0]}`;
        }
      }

      const res = await adicionarCobranca({
        ...formData,
        dataVencimento: dataFormatada,
      });

      if (!res.success) {
        setErro(res.error || 'Erro ao registrar cobrança na planilha.');
      } else {
        onSuccess();
        onClose();
      }
    } catch (err: any) {
      setErro(err?.message || 'Erro inesperado.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-xl rounded-2xl bg-white p-6 shadow-2xl ring-1 ring-slate-200">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
              <PlusCircle className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">Nova Cobrança na Planilha</h3>
              <p className="text-xs text-slate-500">Adiciona uma nova linha diretamente ao Google Sheets</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {erro && (
          <div className="mt-4 rounded-xl bg-rose-50 p-3 text-xs font-semibold text-rose-700 border border-rose-200">
            {erro}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Número do PI *
              </label>
              <input
                type="text"
                required
                placeholder="Ex: 8847/26"
                value={formData.pi}
                onChange={(e) => setFormData({ ...formData, pi: e.target.value })}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Veículo *
              </label>
              <input
                type="text"
                required
                placeholder="Ex: ONDAS 985"
                value={formData.veiculo}
                onChange={(e) => setFormData({ ...formData, veiculo: e.target.value })}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Agência *
            </label>
            <input
              type="text"
              required
              placeholder="Nome da agência de publicidade"
              value={formData.agencia}
              onChange={(e) => setFormData({ ...formData, agencia: e.target.value })}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Valor (R$) *
              </label>
              <input
                type="text"
                required
                placeholder="Ex: 1.500,00"
                value={formData.valor}
                onChange={(e) => setFormData({ ...formData, valor: e.target.value })}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Data de Vencimento *
              </label>
              <input
                type="date"
                required
                value={formData.dataVencimento}
                onChange={(e) => setFormData({ ...formData, dataVencimento: e.target.value })}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              E-mail(s) da Agência
            </label>
            <input
              type="text"
              placeholder="financeiro@agencia.com.br, midia@agencia.com.br"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
            <p className="mt-1 text-[11px] text-slate-400">Separe múltiplos e-mails por vírgula</p>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Observação
            </label>
            <input
              type="text"
              placeholder="Ex: Aguardando retorno da nota"
              value={formData.obs}
              onChange={(e) => setFormData({ ...formData, obs: e.target.value })}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          <div className="flex justify-end gap-2 border-t border-slate-100 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 disabled:opacity-50 transition"
            >
              {loading && <Loader2 className="h-4 w-4 animate-spin" />}
              Salvar na Planilha
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}