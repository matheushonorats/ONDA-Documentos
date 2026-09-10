'use server';

import { db } from '@/lib/db';
import { parseNfseTextContent, type ExtracaoNfeResult } from '@/lib/nfParser';

export async function extrairDadosNotaFiscal(input: FormData | string): Promise<ExtracaoNfeResult> {
  try {
    let buffer: Buffer | null = null;
    let origem: 'PDF' | 'URL' = 'PDF';
    let urlNotaFiscal: string | undefined;
    let nomeArquivo: string | undefined;

    if (typeof input === 'string') {
      origem = 'URL';
      urlNotaFiscal = input.trim();
    } else if (input instanceof FormData) {
      const urlInput = input.get('url');
      const fileInput = input.get('file');

      if (urlInput && typeof urlInput === 'string' && urlInput.trim()) {
        origem = 'URL';
        urlNotaFiscal = urlInput.trim();
      } else if (fileInput && typeof fileInput === 'object' && 'arrayBuffer' in fileInput) {
        origem = 'PDF';
        const file = fileInput as File;
        nomeArquivo = file.name;
        const ab = await file.arrayBuffer();
        buffer = Buffer.from(ab);
      }
    }

    if (origem === 'URL') {
      if (!urlNotaFiscal) {
        return { success: false, error: 'URL da Nota Fiscal não fornecida.' };
      }
      if (!/^https?:\/\//i.test(urlNotaFiscal)) {
        urlNotaFiscal = `https://${urlNotaFiscal}`;
      }

      const res = await fetch(urlNotaFiscal, {
        signal: AbortSignal.timeout(15000),
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          Accept: 'application/pdf,*/*',
        },
      });

      if (!res.ok) {
        return {
          success: false,
          error: `Não foi possível acessar a URL da Nota Fiscal (HTTP ${res.status} ${res.statusText}).`,
        };
      }

      const ab = await res.arrayBuffer();
      buffer = Buffer.from(ab);
    }

    if (!buffer || buffer.length === 0) {
      return { success: false, error: 'Arquivo PDF não fornecido ou vazio.' };
    }

    // Leitura robusta do PDF compatível com servidores e ambientes serverless (Vercel)
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const pdf = require('pdf-parse');
    const pdfData = await pdf(buffer);
    const text = pdfData?.text || '';

    if (!text.trim()) {
      return {
        success: false,
        error: 'Não foi possível extrair texto do documento. O PDF pode ser uma imagem digitalizada sem camada de texto.',
      };
    }

    // Extração estruturada dos dados
    const parsed = parseNfseTextContent(text);

    // Cruzamento com Banco de Dados e Segurança de Chave Primária (Matching Inteligente)
    // 1. Tomador -> Cliente
    let clienteId: string | undefined;
    let clienteNome: string | undefined;
    let clienteMatched = false;

    const allClientes = await db.cliente.findMany({
      select: { id: true, razaoSocial: true, nomeFantasia: true, cnpj: true, cidade: true },
    });

    const cleanDigits = (s?: string | null) => (s ? s.replace(/\D/g, '') : '');
    const norm = (s: string) =>
      s
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, ' ')
        .trim();

    const tomadorCnpjDigits = cleanDigits(parsed.tomadorCnpj);

    // 1.1 Match prioritário e absoluto por CNPJ completo (14 dígitos)
    let matchedCliente = tomadorCnpjDigits && tomadorCnpjDigits.length >= 14
      ? allClientes.find(c => cleanDigits(c.cnpj) === tomadorCnpjDigits)
      : null;

    // 1.2 Match por raiz do CNPJ (8 primeiros dígitos - mesma matriz/filial ou mesma entidade pública)
    if (!matchedCliente && tomadorCnpjDigits && tomadorCnpjDigits.length >= 8) {
      const raizCnpj = tomadorCnpjDigits.slice(0, 8);
      // Se tiver cidade do tomador, prioriza a mesma cidade
      const tomadorCidadeNorm = parsed.tomadorCidade ? norm(parsed.tomadorCidade) : '';
      matchedCliente = allClientes.find(c => {
        const cDigits = cleanDigits(c.cnpj);
        const matchesRaiz = cDigits.length >= 8 && cDigits.startsWith(raizCnpj);
        if (!matchesRaiz) return false;
        if (tomadorCidadeNorm && c.cidade) {
          return norm(c.cidade).includes(tomadorCidadeNorm) || tomadorCidadeNorm.includes(norm(c.cidade));
        }
        return true;
      }) || null;
    }

    // 1.3 Se a nota fiscal tem CNPJ explícito mas não achou no cadastro por CNPJ, NUNCA associar a outro cliente com CNPJ diferente!
    // Apenas busca por nome se o cliente cadastrado NÃO tiver CNPJ (para não misturar prefeituras/empresas com CNPJs distintos)
    if (!matchedCliente && parsed.tomadorNome) {
      const tNorm = norm(parsed.tomadorNome);
      const tWords = tNorm.split(/\s+/).filter(w => w.length > 2 && !['ltda', 'epp', 'me', 'eireli', 'sa', 's/a', 'de', 'do', 'da'].includes(w));
      const tomadorCidadeNorm = parsed.tomadorCidade ? norm(parsed.tomadorCidade) : '';

      // Filtra apenas clientes elegíveis: se a nota tem CNPJ, não pode bater em cliente que já tem um CNPJ diferente
      const clientesCandidatos = allClientes.filter(c => {
        const cDigits = cleanDigits(c.cnpj);
        if (tomadorCnpjDigits && cDigits && cDigits !== tomadorCnpjDigits) {
          return false; // CNPJ incompatível! Jamais associar!
        }
        return true;
      });

      // Busca exata ou com filtro de cidade
      matchedCliente = clientesCandidatos.find(c => {
        const rNorm = norm(c.razaoSocial);
        const fNorm = c.nomeFantasia ? norm(c.nomeFantasia) : '';
        const nameMatch = rNorm === tNorm || fNorm === tNorm;
        if (nameMatch) {
          if (tomadorCidadeNorm && c.cidade) {
            return norm(c.cidade).includes(tomadorCidadeNorm) || tomadorCidadeNorm.includes(norm(c.cidade));
          }
          return true;
        }
        return false;
      }) || null;

      // Se ainda não achou, busca contenção com exigência de cidade idêntica se ambas existirem
      if (!matchedCliente) {
        matchedCliente = clientesCandidatos.find(c => {
          const rNorm = norm(c.razaoSocial);
          const fNorm = c.nomeFantasia ? norm(c.nomeFantasia) : '';
          const contains = rNorm.includes(tNorm) || tNorm.includes(rNorm) || (fNorm && (fNorm.includes(tNorm) || tNorm.includes(fNorm)));
          if (contains) {
            if (tomadorCidadeNorm && c.cidade) {
              return norm(c.cidade).includes(tomadorCidadeNorm) || tomadorCidadeNorm.includes(norm(c.cidade));
            }
            // Se for órgão genérico como 'SECRETARIA DE COMUNICACAO', exige cidade
            if (tNorm.includes('secretaria') || tNorm.includes('prefeitura') || tNorm.includes('camara')) {
              return false;
            }
            return true;
          }
          return false;
        }) || null;
      }
    }

    if (matchedCliente) {
      clienteId = matchedCliente.id;
      clienteNome = matchedCliente.nomeFantasia
        ? `${matchedCliente.razaoSocial} (${matchedCliente.nomeFantasia})`
        : matchedCliente.razaoSocial;
      clienteMatched = true;
    }

    // 2. Agência
    let agenciaId: string | undefined;
    let agenciaNome = parsed.agenciaNome;
    let agenciaMatched = false;

    const agenciaCnpjDigits = parsed.agenciaCnpj?.replace(/\D/g, '');
    const allAgencias = await db.agencia.findMany({
      select: { id: true, nome: true, cnpj: true },
    });

    let matchedAgencia = agenciaCnpjDigits
      ? allAgencias.find(a => a.cnpj && a.cnpj.replace(/\D/g, '') === agenciaCnpjDigits)
      : null;

    if (!matchedAgencia && parsed.agenciaNome) {
      const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, '');
      const aNorm = norm(parsed.agenciaNome);
      matchedAgencia =
        allAgencias.find(a => {
          const nNorm = norm(a.nome);
          return nNorm === aNorm || nNorm.includes(aNorm) || aNorm.includes(nNorm);
        }) || null;
    }

    if (matchedAgencia) {
      agenciaId = matchedAgencia.id;
      agenciaNome = matchedAgencia.nome;
      agenciaMatched = true;
    }

    // 3. Veículo (Rádio)
    let veiculoId: string | undefined;
    let veiculoNome = parsed.veiculoNome;
    let veiculoMatched = false;

    const allVeiculos = await db.veiculo.findMany({
      select: { id: true, nome: true },
    });
    const textUpper = text.toUpperCase();
    let matchedVeiculo = allVeiculos.find(v => textUpper.includes(v.nome.toUpperCase())) || null;

    if (!matchedVeiculo && parsed.veiculoNome) {
      const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, '');
      const vNorm = norm(parsed.veiculoNome);
      matchedVeiculo =
        allVeiculos.find(v => {
          const dbNorm = norm(v.nome);
          return dbNorm === vNorm || dbNorm.includes(vNorm) || vNorm.includes(dbNorm);
        }) || null;
    }

    if (matchedVeiculo) {
      veiculoId = matchedVeiculo.id;
      veiculoNome = matchedVeiculo.nome;
      veiculoMatched = true;
    }

    // Contagem de campos preenchidos
    let camposContados = 0;
    if (parsed.numeroNotaFiscal) camposContados++;
    if (parsed.dataEmissao) camposContados++;
    if (parsed.vencimento) camposContados++;
    if (parsed.numeroPi) camposContados++;
    if (parsed.numeroContrato) camposContados++;
    if (parsed.mesAnoReferencia) camposContados++;
    if (parsed.valor !== undefined) camposContados++;
    if (parsed.descricao) camposContados++;
    if (clienteId || parsed.tomadorNome) camposContados++;
    if (agenciaId || parsed.agenciaNome) camposContados++;
    if (veiculoId || parsed.veiculoNome) camposContados++;

    return {
      success: true,
      dados: {
        numeroNotaFiscal: parsed.numeroNotaFiscal,
        dataEmissao: parsed.dataEmissao,
        vencimento: parsed.vencimento,
        numeroPi: parsed.numeroPi,
        numeroContrato: parsed.numeroContrato,
        mesAnoReferencia: parsed.mesAnoReferencia,
        valor: parsed.valor,
        descricao: parsed.descricao,

        tomadorNome: parsed.tomadorNome,
        tomadorCnpj: parsed.tomadorCnpj,
        tomadorCidade: parsed.tomadorCidade,
        tomadorUf: parsed.tomadorUf,
        clienteId,
        clienteNome,
        clienteMatched,
        novoCliente:
          !clienteMatched && parsed.tomadorNome
            ? {
                razaoSocial: parsed.tomadorNome,
                cnpj: parsed.tomadorCnpj,
                cidade: parsed.tomadorCidade,
                uf: parsed.tomadorUf,
              }
            : undefined,

        agenciaNome,
        agenciaCnpj: parsed.agenciaCnpj,
        agenciaId,
        agenciaMatched,

        veiculoNome,
        veiculoId,
        veiculoMatched,

        origem,
        urlNotaFiscal: origem === 'URL' ? urlNotaFiscal : undefined,
        nomeArquivo,
        totalCamposIdentificados: camposContados,
      },
    };
  } catch (error) {
    console.error('Erro na extração de dados da Nota Fiscal:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Erro ao processar o arquivo de Nota Fiscal.',
    };
  }
}
