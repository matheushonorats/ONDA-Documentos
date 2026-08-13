'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Trash2, Loader2 } from 'lucide-react';

interface DeleteButtonProps {
  id: string;
  action: (id: string) => Promise<{ success: boolean; error?: string }>;
  redirectPath: string;
  confirmMessage: string;
}

export function DeleteButton({ id, action, redirectPath, confirmMessage }: DeleteButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!confirm(confirmMessage)) return;
    
    setLoading(true);
    const res = await action(id);
    
    if (res.success) {
      router.push(redirectPath);
    } else {
      alert(res.error || 'Erro ao excluir.');
      setLoading(false);
    }
  };

  return (
    <button 
      onClick={handleDelete}
      disabled={loading}
      className="inline-flex items-center justify-center px-4 py-2 border border-red-200 text-sm font-medium rounded-lg text-red-700 bg-red-50 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 transition-colors shadow-sm"
    >
      {loading ? (
        <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
      ) : (
        <Trash2 className="-ml-1 mr-2 h-4 w-4" />
      )}
      Excluir
    </button>
  );
}
