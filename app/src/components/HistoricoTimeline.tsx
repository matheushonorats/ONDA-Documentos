import { Clock, Edit3, FilePlus, AlertTriangle, Trash2, PlusCircle } from 'lucide-react';
import { fixMojibake } from '@/lib/utils';

interface HistoricoItem {
  id: string;
  acao: string;
  descricao: string;
  detalhes?: string | null;
  usuario?: string | null;
  createdAt: Date | string;
}

interface HistoricoTimelineProps {
  items: HistoricoItem[];
}

function getActionMeta(acao: string) {
  switch (acao) {
    case 'CRIACAO':
      return { label: 'Criação', bg: 'bg-emerald-50 text-emerald-700 border-emerald-200', icon: PlusCircle };
    case 'EDICAO_DADOS':
      return { label: 'Edição de Dados', bg: 'bg-blue-50 text-blue-700 border-blue-200', icon: Edit3 };
    case 'INCLUSAO_DOCUMENTO':
      return { label: 'Documento Adicionado', bg: 'bg-indigo-50 text-indigo-700 border-indigo-200', icon: FilePlus };
    case 'STATUS_DOCUMENTO':
      return { label: 'Situação do Documento', bg: 'bg-amber-50 text-amber-800 border-amber-300', icon: AlertTriangle };
    case 'EXCLUSAO_DOCUMENTO':
      return { label: 'Exclusão de Documento', bg: 'bg-red-50 text-red-700 border-red-200', icon: Trash2 };
    default:
      return { label: 'Alteração', bg: 'bg-slate-100 text-slate-700 border-slate-200', icon: Clock };
  }
}

export function HistoricoTimeline({ items }: HistoricoTimelineProps) {
  if (!items || items.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50/50 p-6 text-center text-sm text-slate-500">
        <Clock className="mx-auto h-6 w-6 text-slate-400 mb-2" />
        Nenhum registro de alteração registrado até o momento.
      </div>
    );
  }

  return (
    <div className="space-y-3 min-w-0">
      {items.map((item) => {
        const dateObj = typeof item.createdAt === 'string' ? new Date(item.createdAt) : item.createdAt;
        const dateFormatted = dateObj.toLocaleDateString('pt-BR', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        });

        const meta = getActionMeta(item.acao);
        const IconComponent = meta.icon;

        return (
          <div
            key={item.id}
            className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-3.5 sm:p-4 shadow-sm min-w-0 overflow-hidden"
          >
            <span className={`mt-0.5 shrink-0 rounded-xl p-2 border ${meta.bg}`}>
              <IconComponent className="h-4 w-4" />
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center justify-between gap-1.5">
                <span className={`inline-block rounded-md border px-2 py-0.5 text-[11px] font-bold ${meta.bg}`}>
                  {meta.label}
                </span>
                <span className="text-xs font-semibold text-slate-400 flex items-center gap-1">
                  <Clock className="h-3 w-3" /> {dateFormatted}
                </span>
              </div>
              <p className="mt-1.5 text-xs sm:text-sm font-semibold text-slate-800 break-words">
                {fixMojibake(item.descricao)}
              </p>
              {item.detalhes && (
                <p className="mt-1 text-xs text-slate-500 font-mono break-words">
                  {fixMojibake(item.detalhes)}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
