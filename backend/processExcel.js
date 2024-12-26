const XLSX = require('xlsx');

function processExcel(filePath) {
  const workbook = XLSX.readFile(filePath);
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const data = XLSX.utils.sheet_to_json(sheet);

  return data.map(row => ({
    marca: row.marca,
    modelo: row.modelo,
    precio: parseFloat(row.precio),
    specs: row.specs,
    imagen: row.imagen,
    cuota1: row.cuota1,         // Valor directo del Excel
    cuota2a12: row.cuota2a12    // Valor directo del Excel
  }));
}

module.exports = { processExcel }; 