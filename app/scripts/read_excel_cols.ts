import * as XLSX from 'xlsx';
import path from 'path';

const filePath = path.resolve(__dirname, '../../Controle _ Notas a Pagar.xlsx');
const workbook = XLSX.readFile(filePath);
const sheetName = workbook.SheetNames[0];
const sheet = workbook.Sheets[sheetName];
const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });

if (data.length > 0) {
  const headers = data[0];
  console.log('Headers:', headers);
  console.log('\nSample rows:');
  for (let i = 1; i <= 5 && i < data.length; i++) {
    console.log(`Row ${i}:`, data[i]);
  }
} else {
  console.log('Sheet is empty');
}
