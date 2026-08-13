export function fixMojibake(str: string | null | undefined): string {
  if (!str) return '';
  if (!/[ÃÂÁÀÉÊÍÓÔÕÚÇ]/i.test(str)) return str;
  try {
    return decodeURIComponent(escape(str));
  } catch {
    return str
      .replace(/Ã§/g, 'ç')
      .replace(/Ã‡/g, 'Ç')
      .replace(/Ã£/g, 'ã')
      .replace(/Ãƒ/g, 'Ã')
      .replace(/Ã¡/g, 'á')
      .replace(/Ã³/g, 'ó')
      .replace(/Ã©/g, 'é')
      .replace(/Ãª/g, 'ê')
      .replace(/Ã­/g, 'í')
      .replace(/Ãº/g, 'ú');
  }
}
