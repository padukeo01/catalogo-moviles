const express = require('express');
const cors = require('cors');
const XLSX = require('xlsx');
const path = require('path');

const app = express();
app.use(cors());

app.get('/api/dispositivos', (req, res) => {
  try {
    console.log('Intentando leer el archivo Excel...');
    // Log para ver la ruta del archivo
    console.log('Ruta del archivo:', path.join(__dirname, 'dispositivos.xlsx'));
    
    const workbook = XLSX.readFile(path.join(__dirname, 'dispositivos.xlsx'));
    console.log('Excel leído correctamente');
    
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const dispositivos = XLSX.utils.sheet_to_json(sheet);
    console.log('Dispositivos encontrados:', dispositivos.length);

    const monto = parseFloat(req.query.monto) || 0;
    const dispositivosFiltrados = dispositivos.filter(d => d.precio <= monto);
    
    res.json(dispositivosFiltrados);
  } catch (error) {
    console.error('Error al procesar la solicitud:', error);
    res.status(500).json({ error: error.message });
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Servidor corriendo en puerto ${port}`);
}); 