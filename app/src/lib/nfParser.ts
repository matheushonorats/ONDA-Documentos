export type ExtracaoNfeResult = {
  success: boolean;
  error?: string;
  dados?: {
    numeroNotaFiscal?: string;
    dataEmissao?: string; // YYYY-MM-DD
    vencimento?: string; // YYYY-MM-DD
    numeroPi?: string;
    mesAnoReferencia?: string; // MM/YYYY
    valor?: number;
    descricao?: string;

    // Tomador / Cliente
    tomadorNome?: string;
    tomadorCnpj?: string;
    tomadorCidade?: string;
    tomadorUf?: string;
    clienteId?: string;
    clienteNome?: string;
    clienteMatched: boolean;
    novoCliente?: {
      razaoSocial: string;
      cnpj?: string;
      cidade?: string;
      uf?: string;
    };

    // Agência
    agenciaNome?: string;
    agenciaCnpj?: string;
    agenciaId?: string;
    agenciaMatched: boolean;

    // Veículo
    veiculoNome?: string;
    veiculoId?: string;
    veiculoMatched: boolean;

    // Origem e Metadados
    origem: 'PDF' | 'URL';
    urlNotaFiscal?: string;
    nomeArquivo?: string;
    totalCamposIdentificados: number;
  };
};

const MESES_MAP: Record<string, string> = {
  janeiro: '01',
  fevereiro: '02',
  marco: '03',
  março: '03',
  abril: '04',
  maio: '05',
  junho: '06',
  julho: '07',
  agosto: '08',
  setembro: '09',
  outubro: '10',
  novembro: '11',
  dezembro: '12',
};

export function parseValorMonetario(str: string): number | undefined {
  if (!str) return undefined;
  const cleaned = str
    .replace(/\s/g, '')
    .replace(';', '.')
    .replace(/\.(?=\d{3}(?:\D|$))/g, '')
    .replace(',', '.');
  const n = parseFloat(cleaned);
  return Number.isFinite(n) ? n : undefined;
}

export function parseNfseTextContent(text: string) {
  const result: {
    numeroNotaFiscal?: string;
    dataEmissao?: string;
    vencimento?: string;
    numeroPi?: string;
    mesAnoReferencia?: string;
    valor?: number;
    descricao?: string;
    tomadorNome?: string;
    tomadorCnpj?: string;
    tomadorCidade?: string;
    tomadorUf?: string;
    agenciaNome?: string;
    agenciaCnpj?: string;
    veiculoNome?: string;
  } = {};

  // 1. Número da Nota Fiscal
  const numMatch =
    text.match(/N[ÚU]MERO\s+DA\s+NOTA[\s\S]*?(?:MUNIC[ÍI]PIO[^\n]*\s+)?(\d{3,9})/i) ||
    text.match(/(?:NOTA FISCAL[^\n]*?|NFS-e)[^\d]*(\d{3,9})/i) ||
    text.match(/N[º°o]\s*(\d{3,9})/i);

  if (numMatch) {
    const raw = numMatch[1];
    const parsedInt = parseInt(raw, 10);
    result.numeroNotaFiscal = isNaN(parsedInt) ? raw.trim() : parsedInt.toString();
  }

  // 2. Data de Emissão (DD/MM/YYYY) -> YYYY-MM-DD
  const emissaoMatch =
    text.match(/DATA\s+DA\s+EMISS[ÃA]O[\s\S]*?(\d{2}\/\d{2}\/\d{4})/i) ||
    text.match(/EMISS[ÃA]O[:\s]+(\d{2}\/\d{2}\/\d{4})/i);
  if (emissaoMatch) {
    const [d, m, y] = emissaoMatch[1].split('/');
    result.dataEmissao = `${y}-${m}-${d}`;
  }

  // 3. Vencimento (DD/MM/YYYY) -> YYYY-MM-DD
  const vencMatch =
    text.match(/VENCIMENTO[:\s]+(\d{2}\/\d{2}\/\d{4})/i) ||
    text.match(/VENC\.?[:\s]+(\d{2}\/\d{2}\/\d{4})/i);
  if (vencMatch) {
    const [d, m, y] = vencMatch[1].split('/');
    result.vencimento = `${y}-${m}-${d}`;
  }

  // 4. Número do PI
  const piMatch = text.match(/(?:N[º°o]\s*PI|N[ÚU]MERO\s+DO\s+PI|PI)[:\s]+([A-Za-z0-9\-\.\/]+)/i);
  if (piMatch) {
    result.numeroPi = piMatch[1].trim();
  }

  // 5. Mês/Ano Referência
  const servicosMatch = text.match(/SERVI[ÇC]OS\s+EXECUTADOS[:\s]+([A-ZÇ]+)\/(\d{4})/i);
  if (servicosMatch) {
    const mesNome = servicosMatch[1].toLowerCase();
    const mesNum = MESES_MAP[mesNome];
    const ano = servicosMatch[2];
    if (mesNum) {
      result.mesAnoReferencia = `${mesNum}/${ano}`;
    }
  } else {
    const compMatch =
      text.match(/COMPET[ÊE]NCIA[:\s]+(?:(\d{2})\/)?(\d{2})\/(\d{4})/i) ||
      text.match(/M[ÊE]S\/ANO\s*REF[:\s]+(\d{2}\/\d{4})/i);
    if (compMatch) {
      if (compMatch[1] && compMatch[2] && compMatch[3]) {
        result.mesAnoReferencia = `${compMatch[2]}/${compMatch[3]}`;
      } else if (compMatch[1]) {
        result.mesAnoReferencia = compMatch[1];
      }
    }
  }

  // 6. Tomador do Serviço
  const tomadorSection = text.match(
    /TOMADOR\s+DO\s+SERVI[ÇC]O([\s\S]*?)(?:DESCRI[ÇC][ÃA]O\s+DO\s+SERVI[ÇC]O|DISCRIMINA[ÇC][ÃA]O|DETALHAMENTO)/i
  );
  if (tomadorSection) {
    const tomadorText = tomadorSection[1];

    // CNPJ: XX.XXX.XXX/XXXX-XX
    const cnpjMatch = tomadorText.match(/(\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2})/);
    if (cnpjMatch) {
      result.tomadorCnpj = cnpjMatch[1];
    }

    // Razão Social
    const lines = tomadorText.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (/NOME\/RAZ[ÃA]O\s+SOCIAL/i.test(line)) {
        const nextLine = lines[i + 1] || '';
        const cleaned = nextLine.replace(/(\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}).*$/, '').trim();
        if (cleaned) {
          result.tomadorNome = cleaned;
          break;
        }
      }
    }

    // Município Tomador e UF
    const munMatch = tomadorText.match(/([A-Za-zÀ-ÖØ-öø-ÿ\s]{2,40}?)\s*-\s*([A-Z]{2})(?:\s+\d{2}\.?\d{3}\-?\d{3})?/);
    if (munMatch) {
      const rawCity = munMatch[1].trim();
      const parts = rawCity.split('-').map(p => p.trim());
      const lastPart = parts[parts.length - 1];
      const cleanedCity =
        lastPart.replace(/^.*?\b(?:vila\s+\w+|jardim\s+\w+|centro|bairro\s+\w+)\s+/i, '').trim() || lastPart;
      result.tomadorCidade = cleanedCity;
      result.tomadorUf = munMatch[2].trim();
    }
  }

  // 7. Agência
  const agenciaMatch =
    text.match(/(?:POR\s+ORDEM\s+E\s+CONTA\s+DE|AG[ÊE]NCIA)[:\s]+([^\-\n]+?)\s*-\s*CNPJ:\s*([\d\.\/\-]+)/i) ||
    text.match(/AG[ÊE]NCIA[:\s]+([^\n]+)/i);
  if (agenciaMatch) {
    result.agenciaNome = agenciaMatch[1].trim();
    if (agenciaMatch[2]) {
      result.agenciaCnpj = agenciaMatch[2].replace(/[.\s]+$/, '').trim();
    }
  }

  // 8. Valor Líquido / Negociado
  const valLiquidoMatch = text.match(/VALOR\s+L[ÍI]QUIDO[\.\s]*R\$\s*([\d\.,;]+)/i);
  const valNegociadoMatch = text.match(/VALOR\s+NEGOCIADO\s*\([^\)]*L[ÍI]QUIDO[^\)]*\)[:\s]+R\$\s*([\d\.,;]+)/i);
  const valServicoMatch = text.match(/VALOR\s+DO\s+SERVI[ÇC]O[\.\s]*R\$\s*([\d\.,;]+)/i);
  const valBrutoMatch = text.match(/VALOR\s+BRUTO[:\s]+R\$\s*([\d\.,;]+)/i);

  if (valLiquidoMatch) {
    result.valor = parseValorMonetario(valLiquidoMatch[1]);
  } else if (valNegociadoMatch) {
    result.valor = parseValorMonetario(valNegociadoMatch[1]);
  } else if (valServicoMatch) {
    result.valor = parseValorMonetario(valServicoMatch[1]);
  } else if (valBrutoMatch) {
    result.valor = parseValorMonetario(valBrutoMatch[1]);
  }

  // 9. Descrição / Campanha / Descritivo
  const campanhaMatch = text.match(/CAMPANHA[:\s]+([^\n]+)/i);
  const descritivoMatch = text.match(/DESCRITIVO\s+DO\s+SERVI[ÇC]O[:\s]+([^\n]+)/i);

  if (campanhaMatch && descritivoMatch) {
    result.descricao = `${campanhaMatch[1].trim()} - ${descritivoMatch[1].trim()}`;
  } else if (campanhaMatch) {
    result.descricao = campanhaMatch[1].trim();
  } else if (descritivoMatch) {
    result.descricao = descritivoMatch[1].trim();
  }

  return result;
}
