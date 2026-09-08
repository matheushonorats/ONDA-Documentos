export type ExtracaoNfeResult = {
  success: boolean;
  error?: string;
  dados?: {
    numeroNotaFiscal?: string;
    dataEmissao?: string; // YYYY-MM-DD
    vencimento?: string; // YYYY-MM-DD
    numeroPi?: string;
    numeroContrato?: string;
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
    numeroContrato?: string;
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
  const piMatch = text.match(
    /\b(?:N[º°o]\.?\s*(?:DO\s+)?P\.?I\.?|PEDIDO\s+DE\s+INSER[ÇC][ÃA]O|P\.?I\.?)[:\s]+([A-Za-z0-9\-\.\/]+)/i
  );
  if (piMatch) {
    const rawPi = piMatch[1].trim();
    if (rawPi && !/^[-_.\s]+$/.test(rawPi) && !/^(?:NENHUM|SEM|NAO|N\/A)$/i.test(rawPi)) {
      result.numeroPi = rawPi;
    }
  }

  // 5. Número do Contrato
  const contratoMatch = text.match(
    /\b(?:N[º°o]\.?\s*(?:DO\s+)?CONTRATO|CONTRATO\s*N[º°o]\.?|CTR)[:\s]+([A-Za-z0-9\-\.\/]+)/i
  );
  if (contratoMatch) {
    const rawContrato = contratoMatch[1].trim();
    if (
      rawContrato &&
      !/^[-_.\s]+$/.test(rawContrato) &&
      !/^(?:PUBLICIDADE|SERVI[ÇC]O|NENHUM|SEM|NAO|N\/A)$/i.test(rawContrato)
    ) {
      result.numeroContrato = rawContrato;
    }
  }

  // 6. Mês/Ano Referência
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

  // 7. Tomador do Serviço
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

    // Razão Social (suporta tanto valor na mesma linha quanto na linha seguinte da tabela)
    const lines = tomadorText.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (/NOME\/RAZ[ÃA]O\s+SOCIAL/i.test(line)) {
        const inlineVal = line
          .replace(/^.*?NOME\/RAZ[ÃA]O\s+SOCIAL[:\s]*/i, '')
          .replace(/(\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}).*$/, '')
          .trim();
        if (inlineVal && !/^(?:CPF|CNPJ|INSC)/i.test(inlineVal)) {
          result.tomadorNome = inlineVal;
          break;
        }
        const nextLine = lines[i + 1] || '';
        const cleaned = nextLine.replace(/(\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}).*$/, '').trim();
        if (cleaned) {
          result.tomadorNome = cleaned;
          break;
        }
      }
    }

    // Município Tomador e UF
    const munMatch =
      tomadorText.match(/([A-Za-zÀ-ÖØ-öø-ÿ\s]{2,40}?)\s*-\s*([A-Z]{2})(?:\s+\d{2}\.?\d{3}\-?\d{3})?/) ||
      tomadorText.match(/MUNIC[ÍI]PIO[:\s]+([A-Za-zÀ-ÖØ-öø-ÿ\s]{2,40}?)(?:\s*-\s*|\s+UF[:\s]*)([A-Z]{2})/i);
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

  // 8. Agência
  const agenciaMatch =
    text.match(
      /(?:POR\s+ORDEM\s+E\s+CONTA\s+DE|AG[ÊE]NCIA(?:\s+DE\s+PROPAGANDA|\s+DE\s+PUBLICIDADE)?|AG[ÊE]NCIA)[:\s]+([^\-\n\r]+?)\s*-\s*CNPJ[:\s]*([\d\.\/\-]+)/i
    ) ||
    text.match(
      /(?:POR\s+ORDEM\s+E\s+CONTA\s+DE|AG[ÊE]NCIA(?:\s+DE\s+PROPAGANDA|\s+DE\s+PUBLICIDADE)?|AG[ÊE]NCIA)[:\s]+([^\-\n\r]+?)\s+CNPJ[:\s]*([\d\.\/\-]+)/i
    ) ||
    text.match(/\bAG[ÊE]NCIA(?:\s+DE\s+PROPAGANDA|\s+DE\s+PUBLICIDADE)?[:\s]+([^\n\r]+)/i);
  if (agenciaMatch) {
    result.agenciaNome = agenciaMatch[1].trim();
    if (agenciaMatch[2]) {
      result.agenciaCnpj = agenciaMatch[2].replace(/[.\s]+$/, '').trim();
    }
  }

  // 9. Veículo / Rádio Transmissora
  const veiculoExplicit =
    text.match(/(?:VE[ÍI]CULO(?:\s*\/\s*R[ÁA]DIO)?|EMISSORA)[:\s]+([^\n\r]+)/i) ||
    text.match(/R[ÁA]DIO[:\s]+([^\n\r]+)/i);

  if (veiculoExplicit) {
    result.veiculoNome = veiculoExplicit[1].trim();
  } else {
    const irradMatch = text.match(/IRRADIA[ÇC][ÕO]ES\s+COMERCIAIS[\s\r\n]+([^\n\r]+)/i);
    if (irradMatch) {
      const rawVeiculo = irradMatch[1].trim();
      result.veiculoNome = rawVeiculo.replace(/^R[ÁA]DIO\s+/i, '').trim() || rawVeiculo;
    }
  }

  // 10. Valor Líquido / Negociado
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

  // 11. Descrição / Discriminação dos Serviços
  // Captura estritamente o bloco entre "DISCRIMINAÇÃO DO SERVIÇO" e "*** FIM DA DISCRIMINAÇÃO DO SERVIÇO ***" ou "DETALHAMENTO DE VALORES"
  const discriminacaoExata = text.match(
    /DISCRIMINA[ÇC][ÃA]O\s+DO\s+SERVI[ÇC]O([\s\S]*?)(?:\*{2,}\s*FIM\s+DA\s+DISCRIMINA[ÇC][ÃA]O|DETALHAMENTO\s+DE\s+VALORES|VALOR\s+DO\s+SERVI[ÇC]O)/i
  );

  if (discriminacaoExata && discriminacaoExata[1].trim().length > 3) {
    result.descricao = discriminacaoExata[1]
      .replace(/\*{2,}\s*FIM\s+DA\s+DISCRIMINA[ÇC][ÃA]O[^\n\r]*/i, '')
      .replace(/\r\n/g, '\n')
      .replace(/\n{3,}/g, '\n\n')
      .trim();
  } else {
    const discriminacaoBlock = text.match(
      /(?:DISCRIMINA[ÇC][ÃA]O|DESCRI[ÇC][ÃA]O)\s+DO[S]?\s+SERVI[ÇC]O[S]?[:\s]*([\s\S]*?)(?=(?:VALOR\s+TOTAL|VALOR\s+DO\s+SERVI[ÇC]O|VALOR\s+L[ÍI]QUIDO|VALOR\s+BRUTO|DETALHAMENTO|RETEN[ÇC][ÕO]ES|DADOS\s+BANC[ÁA]RIOS|INFORMA[ÇC][ÕO]ES\s+COMPLEMENTARES|TRIBUTA[ÇC][ÃA]O|BASE\s+DE\s+C[ÁA]LCULO|C[ÓO]DIGO\s+DO\s+SERVI[ÇC]O|SUBITEM|OBSERVA[ÇC][ÕO]ES|$))/i
    );

    if (discriminacaoBlock && discriminacaoBlock[1].trim().length > 3) {
      result.descricao = discriminacaoBlock[1]
        .replace(/\*{2,}\s*FIM\s+DA\s+DISCRIMINA[ÇC][ÃA]O[^\n\r]*/i, '')
        .replace(/\r\n/g, '\n')
        .replace(/\n{3,}/g, '\n\n')
        .trim();
    } else {
      const campanhaMatch = text.match(/CAMPANHA[:\s]+([^\n\r]+)/i);
      const descritivoMatch = text.match(/DESCRITIVO\s+DO\s+SERVI[ÇC]O[:\s]+([^\n\r]+)/i);

      if (campanhaMatch && descritivoMatch) {
        result.descricao = `${campanhaMatch[1].trim()} - ${descritivoMatch[1].trim()}`;
      } else if (campanhaMatch) {
        result.descricao = campanhaMatch[1].trim();
      } else if (descritivoMatch) {
        result.descricao = descritivoMatch[1].trim();
      }
    }
  }

  return result;
}
