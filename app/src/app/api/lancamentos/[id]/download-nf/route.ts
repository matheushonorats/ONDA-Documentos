import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export const dynamic = 'force-dynamic';

function sanitizeFilename(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9_\-]/g, '_')
    .replace(/_+/g, '_')
    .replace(/^_|_$/g, '');
}

function formatDateFilename(date: Date | string | null | undefined): string {
  if (!date) return 'SemVenc';
  const d = typeof date === 'string' ? new Date(date) : date;
  const dia = String(d.getDate()).padStart(2, '0');
  const mes = String(d.getMonth() + 1).padStart(2, '0');
  const ano = d.getFullYear();
  return `${dia}-${mes}-${ano}`;
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const lancamento = await db.lancamento.findUnique({
      where: { id },
      include: {
        cliente: true,
        colaborador: true,
        documentos: {
          include: { tipoDocumento: true },
        },
      },
    });

    if (!lancamento) {
      return NextResponse.json({ error: 'Lançamento não encontrado' }, { status: 404 });
    }

    // Identificação dos nomes
    const numNf = sanitizeFilename(lancamento.numeroNotaFiscal || 'S_N');
    const nomeFantasia = lancamento.cliente?.nomeFantasia ? sanitizeFilename(lancamento.cliente.nomeFantasia) : '';
    const razaoSocial = sanitizeFilename(lancamento.cliente?.razaoSocial || lancamento.colaborador?.nome || 'Empresa');
    const vencimentoStr = formatDateFilename(lancamento.vencimento);

    // Montar nome do arquivo no padrão solicitado:
    // NF_{numero}_{razaoSocial}_{nomeFantasia}_Venc_{vencimento}.pdf
    const partes = [`NF_${numNf}`];
    if (nomeFantasia && nomeFantasia.toLowerCase() !== razaoSocial.toLowerCase()) {
      partes.push(nomeFantasia);
    }
    partes.push(razaoSocial);
    partes.push(`Venc_${vencimentoStr}`);

    const filename = `${partes.join('_').slice(0, 100)}.pdf`;

    // Localizar documento PDF ou Link
    const pdfDoc = lancamento.documentos.find(
      (d) =>
        (d.nomeOriginal.toLowerCase().endsWith('.pdf') ||
          d.tipoDocumento?.nome.toLowerCase().includes('nota') ||
          d.tipoDocumento?.nome.toLowerCase().includes('nf')) &&
        d.urlPublica?.startsWith('http')
    );

    const linkDoc = lancamento.documentos.find(
      (d) => d.urlPublica?.startsWith('http')
    );

    const urlAlvo = pdfDoc?.urlPublica || linkDoc?.urlPublica;

    if (!urlAlvo) {
      return NextResponse.json({ error: 'Nenhum documento ou link disponível para download' }, { status: 404 });
    }

    // Tentar buscar o arquivo e servir com o nome padronizado
    try {
      const resp = await fetch(urlAlvo, { signal: AbortSignal.timeout(10000) });
      if (resp.ok) {
        const buffer = await resp.arrayBuffer();
        const contentType = resp.headers.get('content-type') || 'application/pdf';

        return new NextResponse(new Uint8Array(buffer), {
          status: 200,
          headers: {
            'Content-Type': contentType,
            'Content-Disposition': `attachment; filename="${filename}"`,
            'Cache-Control': 'public, max-age=3600',
          },
        });
      }
    } catch (fetchErr) {
      console.warn('Falha ao baixar diretamente a URL do documento:', fetchErr);
    }

    // Se falhar o proxy/fetch direto, redireciona para a URL pública
    return NextResponse.redirect(urlAlvo);
  } catch (err: any) {
    console.error('Erro no download da NF:', err);
    return NextResponse.json({ error: 'Erro ao processar download' }, { status: 500 });
  }
}
