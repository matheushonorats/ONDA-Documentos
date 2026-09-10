import type { NextConfig } from "next";
import { execSync } from "child_process";
import fs from "fs";
import path from "path";

// Garante que o Prisma Client esteja sempre gerado antes da compilação do Next.js
if (!(globalThis as unknown as { __PRISMA_GENERATED__?: boolean }).__PRISMA_GENERATED__) {
  (globalThis as unknown as { __PRISMA_GENERATED__?: boolean }).__PRISMA_GENERATED__ = true;
  try {
    const baseDir = typeof __dirname !== "undefined" ? __dirname : process.cwd();
    const possibleSchemaPaths = [
      path.resolve(/*turbopackIgnore: true*/ baseDir, "prisma", "schema.prisma"),
      path.resolve(/*turbopackIgnore: true*/ baseDir, "app", "prisma", "schema.prisma"),
      path.resolve(/*turbopackIgnore: true*/ process.cwd(), "prisma", "schema.prisma"),
      path.resolve(/*turbopackIgnore: true*/ process.cwd(), "app", "prisma", "schema.prisma"),
    ];

    const schemaPath = possibleSchemaPaths.find((p) => fs.existsSync(p));

    if (schemaPath) {
      const appDir = path.dirname(path.dirname(schemaPath));
      const clientPath = path.resolve(appDir, "src", "generated", "prisma", "index.js");
      const shouldGenerate = !fs.existsSync(clientPath) || process.env.VERCEL === "1";

      if (shouldGenerate) {
        console.log(`[next.config.ts] Gerando Prisma Client a partir de ${schemaPath}...`);
        const prismaCli = path.resolve(appDir, "node_modules", "prisma", "build", "index.js");

        if (fs.existsSync(prismaCli)) {
          execSync(`node "${prismaCli}" generate --schema="${schemaPath}"`, {
            stdio: "inherit",
            cwd: appDir,
          });
        } else {
          execSync(`npx --yes prisma generate --schema="${schemaPath}"`, {
            stdio: "inherit",
            cwd: appDir,
          });
        }
        console.log("[next.config.ts] Prisma Client gerado com sucesso.");
      }
    }
  } catch (error) {
    console.warn("[next.config.ts] Aviso: Não foi possível auto-gerar o Prisma client:", error);
  }
}

const nextConfig: NextConfig = {
  serverExternalPackages: ['pdf-parse'],
};

export default nextConfig;

