/**
 * Utilitário de compressão inteligente de imagens no navegador.
 * Reduz fotos pesadas de celulares (5 MB a 15 MB) de comprovantes, notas e recibos
 * para cerca de 150 KB - 300 KB mantendo 100% da nitidez e legibilidade de textos,
 * sem estourar o limite de payload da Vercel (4.5 MB) e economizando espaço no Google Drive.
 */
export async function compressImageFile(
  file: File,
  maxDimension = 1920,
  quality = 0.82
): Promise<File> {
  // Apenas imagens JPEG, PNG ou WEBP
  if (!file.type || !file.type.startsWith('image/')) {
    return file;
  }

  // Não comprime SVGs ou GIFs animados
  if (file.type.includes('svg') || file.type.includes('gif')) {
    return file;
  }

  // Se já for menor que 350 KB, não precisa reprocessar
  if (file.size <= 350 * 1024) {
    return file;
  }

  // Apenas no ambiente do navegador (Client-side)
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return file;
  }

  return new Promise<File>((resolve) => {
    try {
      const reader = new FileReader();

      reader.onload = (event) => {
        const img = new Image();

        img.onload = () => {
          try {
            let width = img.width;
            let height = img.height;

            // Redimensionamento proporcional se ultrapassar a dimensão máxima (Full HD)
            if (width > maxDimension || height > maxDimension) {
              if (width > height) {
                height = Math.round((height * maxDimension) / width);
                width = maxDimension;
              } else {
                width = Math.round((width * maxDimension) / height);
                height = maxDimension;
              }
            }

            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;

            const ctx = canvas.getContext('2d');
            if (!ctx) {
              resolve(file);
              return;
            }

            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = 'high';
            ctx.drawImage(img, 0, 0, width, height);

            canvas.toBlob(
              (blob) => {
                if (!blob || blob.size >= file.size) {
                  // Se por algum motivo o blob ficar maior ou nulo, mantém o original
                  resolve(file);
                  return;
                }

                const newFileName = file.name.replace(/\.[^/.]+$/, '') + '.jpg';
                const compressedFile = new File([blob], newFileName, {
                  type: 'image/jpeg',
                  lastModified: Date.now(),
                });

                console.log(
                  `[Otimizador de Imagem] ${file.name} comprimido: ${(file.size / 1024).toFixed(0)} KB -> ${(compressedFile.size / 1024).toFixed(0)} KB (Economia de ${(100 - (compressedFile.size / file.size) * 100).toFixed(0)}%)`
                );

                resolve(compressedFile);
              },
              'image/jpeg',
              quality
            );
          } catch (err) {
            console.warn('Erro ao desenhar imagem no canvas, usando original:', err);
            resolve(file);
          }
        };

        img.onerror = () => resolve(file);
        img.src = event.target?.result as string;
      };

      reader.onerror = () => resolve(file);
      reader.readAsDataURL(file);
    } catch (err) {
      console.warn('Erro na compressão de imagem, usando original:', err);
      resolve(file);
    }
  });
}

/**
 * Processa uma lista de arquivos, otimizando imagens pesadas em paralelo
 */
export async function compressFilesList(files: File[]): Promise<File[]> {
  return Promise.all(files.map((f) => compressImageFile(f)));
}
