export type ExtracaoNfeResult = {
  success: boolean;
  error?: string;
  dados?: {
    numeroNotaFiscal?: string;
    chaveAcesso?: string; // Chave de Acesso Nacional (50 dígitos)
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
    chaveAcesso?: string;
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

  // 0. Chave de Acesso Nacional da NFS-e (50 dígitos numéricos)
  const chaveMatch =
    text.match(/CHAVEDEACESSODANFS-e[\s\S]*?(\d{50})/i) ||
    text.match(/\b(\d{50})\b/);
  if (chaveMatch) {
    result.chaveAcesso = chaveMatch[1];
  }

  // 1. Número da Nota Fiscal
  // Padrão Nacional (DANFSe v2.0): NÚMERODANFS-e \n 923 ou N°NFS-e / CHAVENFS-e \n 923/
  // Padrão Municipal IIBR: NÚMERO DA NOTA: 916
  const numMatch =
    text.match(/N[ÚU]MERO\s*(?:DA\s*)?NFS-?e[\s\r\n:]+(\d{1,9})/i) ||
    text.match(/N[º°o]\s*NFS-?e[^\d]*?(\d{1,9})/i) ||
    text.match(/N[ÚU]MERO\s+DA\s+NOTA[\s\S]*?(?:MUNIC[ÍI]PIO[^\n]*\s+)?(\d{1,9})/i) ||
    text.match(/(?:NOTA\s*FISCAL[^\n]*?|NFS-e)[^\d]*(\d{1,9})/i) ||
    text.match(/N[º°o]\s*(\d{1,9})/i);

  if (numMatch) {
    const raw = numMatch[1];
    const parsedInt = parseInt(raw, 10);
    result.numeroNotaFiscal = isNaN(parsedInt) ? raw.trim() : parsedInt.toString();
  } else if (result.chaveAcesso && result.chaveAcesso.length === 50) {
    // Se não encontrou explicitamente mas tem a chave de acesso de 50 dígitos:
    // Padrão NFS-e Nacional: dígitos 31-39 representam o número sequencial da nota
    const rawNum = result.chaveAcesso.slice(30, 39);
    const parsedInt = parseInt(rawNum, 10);
    if (!isNaN(parsedInt) && parsedInt > 0) {
      result.numeroNotaFiscal = parsedInt.toString();
    }
  }

  // 2. Data de Emissão (DD/MM/YYYY) -> YYYY-MM-DD
  // Padrão Nacional: DATAE HORADAEMISSÃODANFS-e \n 29/10/202610:16:23 ou DATAE HORADAEMISSÃODADPS
  // Padrão Municipal IIBR: DATA DA EMISSÃO: 28/10/2026
  const emissaoMatch =
    text.match(/DATA\s*(?:E\s*HORA\s*)?(?:DA\s*)?EMISS[ÃA]O[\s\S]*?(\d{2}\/\d{2}\/\d{4})/i) ||
    text.match(/EMISS[ÃA]O[:\s]+(\d{2}\/\d{2}\/\d{4})/i);
  if (emissaoMatch) {
    const [d, m, y] = emissaoMatch[1].split('/');
    result.dataEmissao = `${y}-${m}-${d}`;
  }

  // 3. Vencimento (DD/MM/YYYY) -> YYYY-MM-DD
  const vencMatch =
    text.match(/VENCIMENTO[:\s]*(\d{2}\/\d{2}\/\d{4})/i) ||
    text.match(/VENC\.?[:\s]*(\d{2}\/\d{2}\/\d{4})/i);
  if (vencMatch) {
    const [d, m, y] = vencMatch[1].split('/');
    result.vencimento = `${y}-${m}-${d}`;
  }

  // 4. Número do PI (Pedido de Inserção)
  // Previne falsos positivos com 'Município', 'PIX', 'PIS', etc.
  const piMatch =
    text.match(/(?:N[º°o]\.?\s*(?:DO\s+)?P\.?I\.?|PEDIDO\s+DE\s+INSER[ÇC][ÃA]O)[:\s]*([A-Za-z0-9\-\.\/]+)/i) ||
    text.match(/(?<![a-zA-ZÀ-ÿ0-9])P\.?I\.?[:\s]+([A-Za-z0-9\-\.\/]+)/i);

  if (piMatch) {
    const rawPi = piMatch[1].trim();
    if (rawPi && !/^[-_.\s]+$/.test(rawPi) && !/^(?:NENHUM|SEM|NAO|N\/A|X)$/i.test(rawPi)) {
      result.numeroPi = rawPi;
    }
  }

  // 5. Número do Contrato
  const contratoMatch = text.match(
    /\b(?:N[º°o]\.?\s*(?:DO\s+)?CONTRATO|CONTRATO\s*N[º°o]\.?|CTR)[:\s]*([A-Za-z0-9\-\.\/]+)/i
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
  // Prioridade 1: Veiculação na publicidade (ex: "SERVIÇOS EXECUTADOS SETEMBRO/2026" ou "SERVIÇOSEXECUTADOSSETEMBRO/2026")
  const servicosMatch = text.match(/SERVI[ÇC]OS\s*EXECUTADOS[:\s]*([A-ZÇ]+)\/(\d{4})/i);
  if (servicosMatch) {
    const mesNome = servicosMatch[1].toLowerCase();
    const mesNum = MESES_MAP[mesNome];
    const ano = servicosMatch[2];
    if (mesNum) {
      result.mesAnoReferencia = `${mesNum}/${ano}`;
    }
  }

  if (!result.mesAnoReferencia) {
    // Padrão Nacional: COMPETÊNCIADANFS-e \n 29/10/2026
    const compNacionalMatch = text.match(/COMPET[ÊE]NCIA\s*(?:DA\s*NFS-?e)?[\s\r\n:]+(\d{2})\/(\d{2})\/(\d{4})/i);
    if (compNacionalMatch) {
      result.mesAnoReferencia = `${compNacionalMatch[2]}/${compNacionalMatch[3]}`;
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
  }

  // 7. Tomador / Adquirente (Cliente)
  // Suporta tanto o Padrão Nacional (TOMADOR/ ADQUIRENTE) quanto Municipal (TOMADOR DO SERVIÇO)
  const tomadorSection =
    text.match(/TOMADOR\s*(?:\/|\s+DO\s+SERVI[ÇC]O|\s+ADQUIRENTE)[\s\S]*?(?:DESTINAT[ÁA]RIO|INTERMEDI[ÁA]RIO|SERVI[ÇC]O\s*PRESTADO|DESCRI[ÇC][ÃA]O\s*(?:DO\s*)?SERVI[ÇC]O|DISCRIMINA[ÇC][ÃA]O|DETALHAMENTO)/i) ||
    text.match(/TOMADOR[\s\S]*?(?:SERVI[ÇC]O|DISCRIMINA[ÇC][ÃA]O)/i);

  if (tomadorSection) {
    const tomadorText = tomadorSection[0];

    // CNPJ do tomador (formato formatado ou 14 dígitos consecutivos)
    const cnpjMatch =
      tomadorText.match(/(\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2})/) ||
      tomadorText.match(/\b(?:CNPJ|CPF\/CNPJ|NIF|DOC)[:\s]*(\d{14})\b/i) ||
      tomadorText.match(/\b(\d{14})\b/);
    if (cnpjMatch) {
      result.tomadorCnpj = cnpjMatch[1];
    }

    // Nome / Razão Social do tomador
    // Padrão Nacional: "Nome/ NomeEmpresarial \n CRUZEIRODOSULEDUCACIONALS.A."
    const nomeEmpresarialMatch = tomadorText.match(/Nome\s*\/\s*Nome\s*Empresarial[\s\r\n:]+([^\r\n]+)/i);
    if (nomeEmpresarialMatch) {
      result.tomadorNome = nomeEmpresarialMatch[1].trim();
    } else {
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
    }

    // Município e UF do tomador
    // Padrão Nacional: "Município/ SiglaUF \n SãoPaulo/ SP"
    const munNacionalMatch = tomadorText.match(/Munic[íi]pio\s*\/\s*Sigla\s*UF[\s\r\n:]+([^\/\r\n]+)\s*\/\s*([A-Z]{2})/i);
    if (munNacionalMatch) {
      result.tomadorCidade = munNacionalMatch[1].trim();
      result.tomadorUf = munNacionalMatch[2].trim();
    } else {
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
  }

  // 8. Agência de Propaganda
  // Padrão mais comum em notas de radiodifusão e publicidade:
  // "ORDEME CONTADESEVENCOMUNICAÇÃOLTDA- CNPJ:01.341.333/0001-47." ou "POR ORDEM E CONTA DE SEVEN COMUNICAÇÃO LTDA - CNPJ: ..."
  const ordemContaMatch = text.match(
    /(?:POR\s*)?ORDEM\s*E\s*CONTA\s*DE\s*[:\s]*([^\-\n\r]+?)(?:\s*-\s*CNPJ[:\s]*([\d\.\/\-]+)|\s+CNPJ[:\s]*([\d\.\/\-]+))/i
  );

  if (ordemContaMatch) {
    result.agenciaNome = ordemContaMatch[1].trim();
    const cnpj = ordemContaMatch[2] || ordemContaMatch[3];
    if (cnpj) {
      result.agenciaCnpj = cnpj.replace(/[.\s]+$/, '').trim();
    }
  } else {
    // Procura por "AGÊNCIA DE PROPAGANDA" ou similar (EVITANDO DADOS BANCÁRIOS!)
    const agenciaExplicitMatch = text.match(
      /(?:AG[ÊE]NCIA\s+DE\s+PROPAGANDA|AG[ÊE]NCIA\s+DE\s+PUBLICIDADE)[:\s]+([^\-\n\r]+?)(?:\s*-\s*CNPJ[:\s]*([\d\.\/\-]+))?/i
    );
    if (agenciaExplicitMatch) {
      result.agenciaNome = agenciaExplicitMatch[1].trim();
      if (agenciaExplicitMatch[2]) {
        result.agenciaCnpj = agenciaExplicitMatch[2].replace(/[.\s]+$/, '').trim();
      }
    } else {
      // Caso genérico: se encontrar "AGÊNCIA: Nome", mas SOMENTE se NÃO for agência bancária (ex: não seguido só de números ou de BANCO)
      const genericAgencia = text.match(/\bAG[ÊE]NCIA[:\s]+([A-Za-zÀ-ÖØ-öø-ÿ\s]{4,60})(?:\s*-\s*CNPJ[:\s]*([\d\.\/\-]+))?/i);
      if (genericAgencia) {
        const val = genericAgencia[1].trim();
        // Se não for número puro de agência bancária nem palavra de banco
        if (!/^\d+$/.test(val) && !/^(?:BANC[AÁ]RIA|CONTA|ITAU|BRADESCO|SANTANDER|CAIXA|BRASIL)/i.test(val)) {
          result.agenciaNome = val;
          if (genericAgencia[2]) result.agenciaCnpj = genericAgencia[2].trim();
        }
      }
    }
  }

  // 9. Veículo / Emissora
  const veiculoExplicit =
    text.match(/(?:VE[ÍI]CULO(?:\s*\/\s*R[ÁA]DIO)?|EMISSORA)[:\s]*([^\n\r]+)/i);
  if (veiculoExplicit) {
    result.veiculoNome = veiculoExplicit[1].trim();
  } else {
    // Verifica marcas conhecidas de rádio no texto (com ou sem espaços, maiúsculas ou minúsculas)
    const upperTextNoSpaces = text.toUpperCase().replace(/[^A-Z0-9]/g, '');
    if (upperTextNoSpaces.includes('ONDAFM') || upperTextNoSpaces.includes('RADIOONDA')) {
      result.veiculoNome = 'ONDA FM';
    } else if (upperTextNoSpaces.includes('ROCKNEWS') || upperTextNoSpaces.includes('ROCKLITORAL')) {
      result.veiculoNome = 'ROCK NEWS';
    } else if (upperTextNoSpaces.includes('CLUBEAM') || upperTextNoSpaces.includes('RADIOCLUBE')) {
      result.veiculoNome = 'RÁDIO CLUBE AM';
    } else {
      const irradMatch = text.match(/IRRADIA[ÇC][ÕO]ES\s*COMERCIAIS[\s\r\n]+([^\n\r]+)/i);
      if (irradMatch) {
        const rawVeiculo = irradMatch[1].trim();
        result.veiculoNome = rawVeiculo.replace(/^R[ÁA]DIO\s*/i, '').trim() || rawVeiculo;
      }
    }
  }

  // 10. Valor Líquido / Negociado
  // Padrão Nacional (DANFSe v2.0):
  // VALORLÍQUIDODANFS-e \n R$4.019,20
  // VALORNEGOCIADO(LÍQUIDO):R$4.019,20
  // VALORDAOPERAÇÃO/ SERVIÇO \n R$4.019,20
  const valNegociadoMatch = text.match(/VALOR\s*NEGOCIADO\s*\([^\)]*L[ÍI]QUIDO[^\)]*\)[:\s]*R\$\s*([\d\.,;]+)/i);
  const valLiquidoMatch =
    text.match(/VALOR\s*L[ÍI]QUIDO\s*(?:DA\s*NFS-?e)?[\s\r\n:]*R\$\s*([\d\.,;]+)/i) ||
    text.match(/VALOR\s*L[ÍI]QUIDO[\.\s]*R\$\s*([\d\.,;]+)/i);
  const valOperacaoMatch = text.match(/VALOR\s*(?:DA\s*OPERA[ÇC][ÃA]O\s*\/\s*)?SERVI[ÇC]O[\s\r\n:]*R\$\s*([\d\.,;]+)/i);
  const valBrutoMatch = text.match(/VALOR\s*BRUTO[:\s]*R\$\s*([\d\.,;]+)/i);

  if (valNegociadoMatch) {
    result.valor = parseValorMonetario(valNegociadoMatch[1]);
  } else if (valLiquidoMatch) {
    result.valor = parseValorMonetario(valLiquidoMatch[1]);
  } else if (valOperacaoMatch) {
    result.valor = parseValorMonetario(valOperacaoMatch[1]);
  } else if (valBrutoMatch) {
    result.valor = parseValorMonetario(valBrutoMatch[1]);
  }

  // 11. Descrição dos Serviços
  // Padrão Nacional: DescriçãodoServiço ... até TRIBUTAÇÃO ou VALOR TOTAL
  const descNacional = text.match(/Descri[çc][ãa]o\s*do\s*Servi[çc]o([\s\S]*?)(?=TRIBUTA[ÇC][ÃA]O|VALOR\s*TOTAL|VALOR\s*DA\s*OPERA[ÇC]|INFORMA[ÇC][ÕO]ES|$)/i);
  if (descNacional && descNacional[1].trim().length > 10) {
    result.descricao = descNacional[1].trim();
  } else {
    // Padrão Municipal IIBR: DISCRIMINAÇÃO DO SERVIÇO ... até *** FIM DA DISCRIMINAÇÃO
    const discriminacaoExata = text.match(
      /DISCRIMINA[ÇC][ÃA]O\s+DO\s+SERVI[ÇC]O([\s\S]*?)(?:\*{2,}\s*FIM\s+DA\s+DISCRIMINA[ÇC][ÃA]O|DETALHAMENTO\s+DE\s+VALORES|VALOR\s+DO\s+SERVI[ÇC]O)/i
    );
    if (discriminacaoExata && discriminacaoExata[1].trim().length > 3) {
      result.descricao = discriminacaoExata[1]
        .replace(/\*{2,}\s*FIM\s+DA\s+DISCRIMINA[ÇC][ÃA]O[^\n\r]*/i, '')
        .trim();
    }
  }

  if (result.descricao) {
    result.descricao = formatarDescricaoServico(result.descricao);
  }

  return result;
}

/**
 * Formata e organiza a descrição dos serviços, corrigindo concatenações indesejadas
 * de palavras causadas por extratores de PDF (ex: PDFium no DANFSe Nacional v2.0),
 * separando rótulos, datas, valores e quebras de linha de forma limpa e legível.
 */
export function formatarDescricaoServico(rawDesc: string): string {
  if (!rawDesc || typeof rawDesc !== 'string') return '';

  let s = rawDesc.replace(/\r\n/g, '\n').trim();

  // 1. Separar palavras-chave coladas conhecidas no início ou meio de frases
  const replacePairs: [RegExp, string][] = [
    [/RADIOONDA\b/gi, 'RÁDIO ONDA'],
    [/R[ÁA]DIOONDA\b/gi, 'RÁDIO ONDA'],
    [/SERVI[ÇC]OSEXECUTADOS/gi, 'SERVIÇOS EXECUTADOS'],
    [/OBJETODOCONTRATO/gi, 'OBJETO DO CONTRATO'],
    [/DESCRITIVODOSERVI[ÇC]O/gi, 'DESCRITIVO DO SERVIÇO'],
    [/PER[ÍI]ODODEVEICULA[ÇC][ÃA]O/gi, 'PERÍODO DE VEICULAÇÃO'],
    [/VALORBRUTO/gi, 'VALOR BRUTO'],
    [/VALORNEGOCIADO/gi, 'VALOR NEGOCIADO'],
    [/NEGOCIADO\(/gi, 'NEGOCIADO ('],
    [/VALORDE\b/gi, 'VALOR DE '],
    [/VALORDESERVI[ÇC]O/gi, 'VALOR DE SERVIÇO'],
    [/VALORDOREFER[ÊE]NCIA/gi, 'VALOR DE REFERÊNCIA'],
    [/VALORDASDESPESAS/gi, 'VALOR DAS DESPESAS'],
    [/ORDEME CONTADE/gi, 'ORDEM E CONTA DE'],
    [/ORDEMECONTADE/gi, 'ORDEM E CONTA DE'],
    [/DADOSBANC[ÁA]RIOS/gi, 'DADOS BANCÁRIOS'],
    [/DADOSBANCARIOS/gi, 'DADOS BANCÁRIOS'],
    [/TIPODECONTA/gi, 'TIPO DE CONTA'],
    [/CONTACORRENTE/gi, 'CONTA CORRENTE'],
    [/NOMECOMPLETO/gi, 'NOME COMPLETO'],
    [/N[º°o]\.?PI/gi, 'Nº PI'],
    [/PEDIDODEINSER[ÇC][ÃA]O/gi, 'PEDIDO DE INSERÇÃO'],
  ];

  for (const [pattern, repl] of replacePairs) {
    s = s.replace(pattern, repl);
  }

  // 2. Quebrar linha antes de seções e campos chave se estiverem grudados na mesma linha ou em texto anterior
  const sectionKeywords = [
    'OBJETO DO CONTRATO',
    'CAMPANHA',
    'N[º°o]\\.?\\s*PI',
    'PEDIDO DE INSERÇÃO',
    'PER[ÍI]ODO DE VEICULA[ÇC][ÃA]O',
    'VENCIMENTO',
    'DESCRITIVO DO SERVI[ÇC]O',
    'VALOR BRUTO',
    'VALOR NEGOCIADO(?:\\s*\\(L[ÍI]QUIDO\\))?',
    'VALOR DE REFER[ÊE]NCIA',
    'POR ORDEM E CONTA DE',
    'ORDEM E CONTA DE',
    'DADOS BANC[ÁA]RIOS',
    'BANCO',
    'AG[ÊE]NCIA',
    'CONTA',
    'TIPO DE CONTA',
    'NOME COMPLETO',
    'PIX'
  ];

  for (const kw of sectionKeywords) {
    // Caso 1: Grudado em letra/número anterior sem espaço (ex: "PUBLICIDADECAMPANHA:")
    const gluedRegex = new RegExp(`([a-zA-Z0-9À-ÿ])(${kw})\\s*:`, 'gi');
    s = s.replace(gluedRegex, '$1\n$2:');

    // Caso 2: Em mesma linha com espaço anterior (ex: " ... 20SEC VALOR BRUTO:")
    const inlineRegex = new RegExp(`(?<!\\n|^)\\s+(${kw})\\s*:`, 'gi');
    s = s.replace(inlineRegex, '\n$1:');
  }

  // Quebrar linha antes de termos de valor em sequência
  s = s.replace(/([0-9,]+)\s*(VALOR\s+NEGOCIADO)/gi, '$1\n$2');
  s = s.replace(/([0-9,]+)\s*(VALOR\s+DE\b)/gi, '$1\n$2');

  // Quebrar linha antes de "SERVIÇOS EXECUTADOS" ou "IRRADIAÇÕES COMERCIAIS"
  s = s.replace(/(?<!\n|^)\s*(SERVI[ÇC]OS\s+EXECUTADOS)/gi, '\n$1');
  s = s.replace(/(?<!\n|^)\s*(IRRADIA[ÇC][ÕO]ES\s+COMERCIAIS)/gi, '\n$1');

  // 3. Garantir espaço após dois pontos ":" se estiver colado no valor
  s = s.replace(/:([^\s\/\d])/g, ': $1');
  s = s.replace(/:(\d)/g, ': $1');

  // 4. Separar datas coladas com 'A' ou 'ATÉ'
  s = s.replace(/(\d{2}\/\d{2}\/\d{4})\s*A\s*(\d{2}\/\d{2}\/\d{4})/gi, '$1 A $2');
  s = s.replace(/(\d{2}\/\d{2}\/\d{4})\s*AT[ÉE]\s*(\d{2}\/\d{2}\/\d{4})/gi, '$1 ATÉ $2');

  // 5. Garantir espaço em "R$" colado em números: "R$840,00" -> "R$ 840,00"
  s = s.replace(/R\$\s*(\d)/gi, 'R$ $1');

  // 6. Separar horários ou texto comum de rádio colado
  s = s.replace(/ROTATIVO(\d)/gi, 'ROTATIVO $1');
  s = s.replace(/(\d{1,2})\s*-\s*(\d{1,2})H\b/gi, '$1-$2H');

  // 7. Normalizar quebras de linha múltiplas e espaços excedentes
  const lines = s
    .split('\n')
    .map(line => line.replace(/[ \t]+/g, ' ').trim())
    .filter(Boolean);

  return lines.join('\n');
}
