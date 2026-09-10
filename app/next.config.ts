import type { NextConfig } from "next";
import { execSync } from "child_process";
import fs from "fs";
import path from "path";

// Garante que o Prisma Client esteja sempre gerado antes da compilação do Next.js
try {
  const baseDir = typeof __dirname !== "undefined" ? __dirname : process.cwd();
  const schemaInBase = path.join(baseDir, "prisma", "schema.prisma");
  const schemaInApp = path.join(baseDir, "app", "prisma", "schema.prisma");
  const schemaPath = fs.existsSync(schemaInBase) ? schemaInBase : fs.existsSync(schemaInApp) ? schemaInApp : null;

  const clientInBase = path.join(baseDir, "src", "generated", "prisma", "index.js");
  const clientInApp = path.join(baseDir, "app", "src", "generated", "prisma", "index.js");
  const clientExists = fs.existsSync(clientInBase) || fs.existsSync(clientInApp);

  if (schemaPath && !clientExists) {
    console.log(`[next.config.ts] Prisma client não encontrado em src/generated/prisma. Gerando a partir de ${schemaPath}...`);
    execSync(`npx prisma generate --schema="${schemaPath}"`, {
      stdio: "inherit",
      cwd: path.dirname(path.dirname(schemaPath)),
    });
    console.log("[next.config.ts] Prisma client gerado com sucesso.");
  }
} catch (error) {
  console.warn("[next.config.ts] Aviso: Não foi possível auto-gerar o Prisma client:", error);
}

const nextConfig: NextConfig = {
  serverExternalPackages: ['pdf-parse'],
};

export default nextConfig;

