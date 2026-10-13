import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import * as XLSX from 'xlsx';

export const dynamic = 'force-dynamic';

function formatDate(date: Date | string | null | undefined): string {
  if (!date) return '—';
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('pt-BR');
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const tipo = searchParams.get('tipo') || 'RECEITA';

    const lancamentos = await db.lancamento.findMany({
      where: {
        tipoLancamento: tipo,
      },
      orderBy: [{ vencimento: 'desc' }, { createdAt: 'desc' }],
      include: {
        cliente: true,
        colaborador: true,
        agencia: true,
        veiculo: true,
        documentos: {
          include: { tipoDocumento: true },
        },
      },
    });

    const linhas = lancamentos.map((l, idx) => {
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
        'ID / Código': l.appSheetId || l.id.slice(0, 8),
        'Nº Nota Fiscal': l.numeroNotaFiscal || '—',
        'Nome Fantasia': nomeFantasia,
        'Razão Social': razaoSocial,
        'CNPJ / CPF': clienteCnpj,
        'Valor (R$)': l.valor ?? 0,
        'Vencimento': formatDate(l.vencimento),
        'Emissão': formatDate(l.dataEmissao),
        'Veículo (Rádio)': l.veiculo?.nome || '—',
        'Agência': l.agencia?.nome || '—',
        'Nº PI': l.numeroPi || '—',
        'Nº Contrato': l.numeroContrato || '—',
        'Competência': l.mesAnoReferencia || '—',
        'Link da Nota': urlNota,
        'Qtd Documentos': l.documentos.length,
        'Descrição / Discriminação': l.descricao || '—',
      };
    });

    const worksheet = XLSX.utils.json_to_sheet(linhas);
    worksheet['!cols'] = [
      { wch: 4 },  // #
      { wch: 14 }, // ID
      { wch: 16 }, // NF
      { wch: 28 }, // Fantasia
      { wch: 32 }, // Razao
      { wch: 20 }, // CNPJ
      { wch: 14 }, // Valor
      { wch: 14 }, // Vencimento
      { wch: 14 }, // Emissao
      { wch: 18 }, // Veiculo
      { wch: 22 }, // Agencia
      { wch: 14 }, // PI
      { wch: 14 }, // Contrato
      { wch: 14 }, // Competencia
      { wch: 40 }, // Link
      { wch: 14 }, // Qtd Docs
      { wch: 50 }, // Descricao
    ];

    const workbook = XLSX.utils.book_new();
    const sheetName = tipo === 'RECEITA' ? 'Contas a Receber' : 'Contas a Pagar';
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);

    const buffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });
    const filename = `Exportacao_${tipo}_${new Date().toISOString().slice(0, 10)}.xlsx`;

    return new NextResponse(new Uint8Array(buffer), {
      status: 200,
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Cache-Control': 'no-store',
      },
    });
  } catch (err: any) {
    console.error('Erro na exportação de lançamentos:', err);
    return NextResponse.json({ error: 'Erro ao gerar exportação' }, { status: 500 });
  }
}
