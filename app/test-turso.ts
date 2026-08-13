import { db } from './src/lib/db';

async function main() {
  try {
    const agencias = await db.agencia.count();
    console.log(`Connection successful. Found ${agencias} agencias.`);
  } catch (error) {
    console.error('Connection failed:', error);
  } finally {
    await db.$disconnect();
  }
}

main();
