import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import * as XLSX from 'xlsx';

export const dynamic = 'force-dynamic';

function formatDate(date: Date | string | null | undefined): string {
  if (!date) return '—';
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('pt-BR');
}

function sanitizeFilename(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9_\-\.]/g, '_')
    .slice(0, 40);
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const lote = await db.lote.findUnique({
      where: { id },
      include: {
        itens: {
          orderBy: { ordem: 'asc' },
          include: {
            lancamento: {
              include: {
                cliente: true,
                colaborador: true,
                agencia: true,
                veiculo: true,
                documentos: {
                  include: { tipoDocumento: true },
                },
              },
            },
          },
        },
      },
    });

    if (!lote) {
      return NextResponse.json({ error: 'Lote não encontrado' }, { status: 404 });
    }

    const relatorioLinhas = lote.itens.map((it, idx) => {
      const l = it.lancamento;
      const clienteNome = l.cliente?.nomeFantasia || l.cliente?.razaoSocial || l.colaborador?.nome || '—';
      const razaoSocial = l.cliente?.razaoSocial || '—';
      const nomeFantasia = l.cliente?.nomeFantasia || '—';
      const clienteCnpj = l.cliente?.cnpj || l.colaborador?.cpfCnpj || '—';

      const linkDoc = l.documentos.find(
        (d) => d.urlPublica && (d.tipoDocumento?.nome.toLowerCase().includes('nota') || d.tipoDocumento?.nome.toLowerCase().includes('nf') || d.urlPublica.startsWith('http'))
      );
      const urlNota = linkDoc?.urlPublica || '—';

      return {
        '#': idx + 1,
        'Nº Nota Fiscal': l.numeroNotaFiscal || '—',
        'Nome Fantasia': nomeFantasia,
        'Razão Social': razaoSocial,
        'CNPJ / CPF': clienteCnpj,
        'Valor (R$)': l.valor ?? 0,
        'Vencimento': formatDate(l.vencimento),
        'Data Emissão': formatDate(l.dataEmissao),
        'Veículo (Rádio)': l.veiculo?.nome || '—',
        'Agência': l.agencia?.nome || '—',
        'Nº PI': l.numeroPi || '—',
        'Link da Nota Fiscal': urlNota,
        'Descrição / Discriminação': l.descricao || '—',
      };
    });

    const worksheet = XLSX.utils.json_to_sheet(relatorioLinhas);
    worksheet['!cols'] = [
      { wch: 4 },  // #
      { wch: 16 }, // Nº NF
      { wch: 28 }, // Fantasia
      { wch: 32 }, // Razao
      { wch: 20 }, // CNPJ
      { wch: 14 }, // Valor
      { wch: 14 }, // Vencimento
      { wch: 14 }, // Emissao
      { wch: 18 }, // Veiculo
      { wch: 22 }, // Agencia
      { wch: 14 }, // PI
      { wch: 45 }, // Link
      { wch: 50 }, // Descricao
    ];

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Lote de Notas');
    const excelBuffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });

    const safeCodigo = sanitizeFilename(lote.codigo || `Lote_${lote.id.slice(0, 8)}`);
    const filename = `Planilha_${safeCodigo}.xlsx`;

    return new NextResponse(new Uint8Array(excelBuffer), {
      status: 200,
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Cache-Control': 'no-store',
      },
    });
  } catch (err: any) {
    console.error('Erro ao exportar Excel do lote:', err);
    return NextResponse.json({ error: 'Erro ao gerar planilha Excel' }, { status: 500 });
  }
}
