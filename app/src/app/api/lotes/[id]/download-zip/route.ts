import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import JSZip from 'jszip';
import * as XLSX from 'xlsx';

export const dynamic = 'force-dynamic';

function sanitizeFilename(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9_\-\.]/g, '_')
    .replace(/_+/g, '_')
    .slice(0, 40);
}

function formatDate(date: Date | string | null | undefined): string {
  if (!date) return '—';
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('pt-BR');
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
                  include: {
                    tipoDocumento: true,
                  },
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

    const zip = new JSZip();

    // 1. Relatório em Planilha Excel (.xlsx)
    const relatorioLinhas = lote.itens.map((it, idx) => {
      const l = it.lancamento;
      const clienteNome = l.cliente?.nomeFantasia || l.cliente?.razaoSocial || l.colaborador?.nome || '—';
      const clienteCnpj = l.cliente?.cnpj || l.colaborador?.cpfCnpj || '—';
      
      // Encontrar link da nota
      const linkDoc = l.documentos.find(
        (d) => d.urlPublica && (d.tipoDocumento?.nome.toLowerCase().includes('nota') || d.tipoDocumento?.nome.toLowerCase().includes('nf') || d.urlPublica.includes('http'))
      );
      const urlNota = linkDoc?.urlPublica || '—';

      return {
        '#': idx + 1,
        'Nº Nota Fiscal': l.numeroNotaFiscal || '—',
        'Cliente / Favorecido': clienteNome,
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
    
    // Ajustar larguras das colunas
    worksheet['!cols'] = [
      { wch: 4 },  // #
      { wch: 16 }, // Nº NF
      { wch: 32 }, // Cliente
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
    zip.file('00_Planilha_Conferencia_Lote.xlsx', excelBuffer);

    // 2. Arquivo de Texto com resumo para WhatsApp / E-mail
    const totalGeral = lote.itens.reduce((acc, it) => acc + (it.lancamento.valor || 0), 0);
    const totalFormatado = totalGeral.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    
    let txtResumo = `========================================================\r\n`;
    txtResumo += `📦 ${lote.titulo.toUpperCase()}\r\n`;
    txtResumo += `Código: ${lote.codigo || lote.id}\r\n`;
    txtResumo += `Data: ${formatDate(lote.createdAt)}\r\n`;
    txtResumo += `Total de Notas: ${lote.itens.length} | Valor Total: R$ ${totalFormatado}\r\n`;
    txtResumo += `========================================================\r\n\r\n`;

    const folderLinks = zip.folder('Links_e_Atalhos_das_Notas');
    const folderPdfs = zip.folder('PDFs_Anexados');

    for (let i = 0; i < lote.itens.length; i++) {
      const it = lote.itens[i];
      const l = it.lancamento;
      const clienteNome = l.cliente?.nomeFantasia || l.cliente?.razaoSocial || l.colaborador?.nome || 'SemNome';
      const safeCliente = sanitizeFilename(clienteNome);
      const numNf = sanitizeFilename(l.numeroNotaFiscal || `NF_${i + 1}`);
      const nomeFantasia = l.cliente?.nomeFantasia ? sanitizeFilename(l.cliente.nomeFantasia) : '';
      const razaoSocial = sanitizeFilename(l.cliente?.razaoSocial || l.colaborador?.nome || 'Empresa');
      const vencimentoStr = l.vencimento ? (() => {
        const d = typeof l.vencimento === 'string' ? new Date(l.vencimento) : l.vencimento;
        return `${String(d.getDate()).padStart(2, '0')}-${String(d.getMonth() + 1).padStart(2, '0')}-${d.getFullYear()}`;
      })() : 'SemVenc';

      const partesNome = [`NF_${numNf}`];
      if (nomeFantasia && nomeFantasia.toLowerCase() !== razaoSocial.toLowerCase()) {
        partesNome.push(nomeFantasia);
      }
      partesNome.push(razaoSocial);
      partesNome.push(`Venc_${vencimentoStr}`);
      const baseFilename = partesNome.join('_').slice(0, 100);

      const valorStr = l.valor !== null && l.valor !== undefined
        ? `R$ ${l.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
        : 'R$ —';

      // Encontrar link da nota
      const linkDoc = l.documentos.find(
        (d) => d.urlPublica && (d.tipoDocumento?.nome.toLowerCase().includes('nota') || d.tipoDocumento?.nome.toLowerCase().includes('nf') || d.urlPublica.startsWith('http'))
      );
      const urlNota = linkDoc?.urlPublica;

      txtResumo += `${i + 1}) NF ${l.numeroNotaFiscal || 'S/N'} - ${clienteNome}\r\n`;
      txtResumo += `   Valor: ${valorStr} | Vencimento: ${formatDate(l.vencimento)}\r\n`;
      if (l.veiculo?.nome) txtResumo += `   Veículo: ${l.veiculo.nome}\r\n`;
      if (urlNota) txtResumo += `   Link NF: ${urlNota}\r\n`;
      txtResumo += `\r\n`;

      // Criar atalho .url e arquivo html redirecionador se houver link
      if (urlNota && folderLinks) {
        const urlFileContent = `[InternetShortcut]\r\nURL=${urlNota}\r\n`;
        folderLinks.file(`${baseFilename}.url`, urlFileContent);

        const htmlRedirect = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Abrindo NF ${l.numeroNotaFiscal || ''} - ${clienteNome}</title>
  <meta http-equiv="refresh" content="0; url=${urlNota}">
</head>
<body style="font-family: sans-serif; text-align: center; padding: 40px;">
  <h2>Redirecionando para a Nota Fiscal...</h2>
  <p><a href="${urlNota}">Clique aqui se não for redirecionado automaticamente</a></p>
</body>
</html>`;
        folderLinks.file(`${baseFilename}.html`, htmlRedirect);
      }

      // Baixar PDFs anexados se disponíveis
      if (folderPdfs) {
        const pdfDocs = l.documentos.filter((d) => {
          const nome = (d.nomeOriginal || '').toLowerCase();
          const tipo = (d.tipoDocumento?.nome || '').toLowerCase();
          return (nome.endsWith('.pdf') || tipo.includes('nota') || tipo.includes('nf')) && d.urlPublica?.startsWith('http');
        });

        for (let pIdx = 0; pIdx < pdfDocs.length; pIdx++) {
          const pDoc = pdfDocs[pIdx];
          try {
            const resp = await fetch(pDoc.urlPublica!, { signal: AbortSignal.timeout(6000) });
            if (resp.ok) {
              const arrayBuf = await resp.arrayBuffer();
              const sufixo = pdfDocs.length > 1 ? `_${pIdx + 1}` : '';
              folderPdfs.file(`${baseFilename}${sufixo}.pdf`, Buffer.from(arrayBuf));
            }
          } catch (fetchErr) {
            console.warn(`Não foi possível baixar PDF da NF ${baseFilename}:`, fetchErr);
          }
        }
      }
    }

    zip.file('00_Resumo_Notas_WhatsApp.txt', txtResumo);

    const zipBuffer = await zip.generateAsync({
      type: 'nodebuffer',
      compression: 'DEFLATE',
      compressionOptions: { level: 6 },
    });

    const safeCodigo = sanitizeFilename(lote.codigo || `Lote_${lote.id.slice(0, 8)}`);
    const filename = `${safeCodigo}.zip`;

    return new NextResponse(new Uint8Array(zipBuffer), {
      status: 200,
      headers: {
        'Content-Type': 'application/zip',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Cache-Control': 'no-store',
      },
    });
  } catch (err: any) {
    console.error('Erro ao gerar download ZIP do lote:', err);
    return NextResponse.json({ error: 'Erro ao gerar arquivo ZIP' }, { status: 500 });
  }
}
