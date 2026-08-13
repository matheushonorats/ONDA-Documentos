import type { Metadata } from 'next';
import Image from 'next/image';
import './globals.css';
import { AppHeader } from '@/components/AppHeader';

export const metadata: Metadata = {
  title: 'Ondas - Documentos',
  description: 'Organização e localização de notas fiscais e documentos relacionados.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body className="min-h-screen bg-slate-50 text-slate-900 antialiased"><div className="flex min-h-screen flex-col"><AppHeader /><main className="mx-auto w-full max-w-7xl flex-1 px-4 py-7 sm:px-6 sm:py-9 lg:px-8">{children}</main><footer className="border-t border-slate-200 bg-white py-8"><div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 px-4 text-center text-sm text-slate-500 sm:px-6 md:flex-row md:text-left lg:px-8"><div className="flex items-center gap-3"><Image src="/ondas.png" alt="Ondas" width={42} height={42} className="h-9 w-auto" /><div><strong className="block text-slate-800">ONDAS SISTEMA DE RADIODIFUSÃO LTDA</strong><span>CNPJ 43.579.370/0001-38</span></div></div><p className="max-w-md md:text-right">R. Antonio Goulart Marmo, 20, Loja 01 · São Sebastião/SP · CEP 11609-524</p></div></footer></div></body></html>;
}
