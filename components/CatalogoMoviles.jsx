'use client'

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Smartphone, DollarSign, Award } from 'lucide-react';

const CatalogoMoviles = () => {
  const [monto, setMonto] = useState('');
  const [dispositivos, setDispositivos] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  const buscarDispositivos = async () => {
    try {
      setCargando(true);
      setError(null);
      const response = await fetch(`http://localhost:5000/api/dispositivos?monto=${monto}`);
      if (!response.ok) throw new Error('Error al obtener los dispositivos');
      const data = await response.json();
      setDispositivos(data);
    } catch (err) {
      setError('Error al cargar los dispositivos. Por favor, verifica que el servidor esté funcionando.');
      console.error(err);
    } finally {
      setCargando(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    buscarDispositivos();
  };

  const calcularCuotaMensual = (precio, meses = 12) => {
    return (precio / meses).toFixed(2);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <Card className="mb-8 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-800">
          <CardTitle className="text-2xl text-white flex items-center gap-2">
            <Smartphone className="w-6 h-6" />
            Catálogo de Dispositivos Móviles
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4 md:flex md:space-y-0 md:space-x-4 md:items-end">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ingrese el monto de crédito disponible (S/.)
              </label>
              <Input
                type="number"
                min="0"
                step="0.01"
                value={monto}
                onChange={(e) => setMonto(e.target.value)}
                placeholder="Ejemplo: 1000.00"
                className="w-full"
              />
            </div>
            <Button 
              type="submit" 
              className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6"
            >
              <DollarSign className="w-4 h-4 mr-2" />
              Buscar Dispositivos
            </Button>
          </form>
        </CardContent>
      </Card>

      {error && (
        <Card className="p-4 mb-6 bg-red-50 text-red-600">
          {error}
        </Card>
      )}

      {dispositivos.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-gray-800">
            <Award className="w-6 h-6 text-blue-600" />
            Dispositivos Disponibles para S/ {parseFloat(monto).toFixed(2)}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dispositivos.map((dispositivo, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="aspect-w-16 aspect-h-9 bg-gray-100">
                  <img
                    src={dispositivo.imagen || "/placeholder.png"}
                    alt={`${dispositivo.marca} ${dispositivo.modelo}`}
                    className="w-full h-48 object-contain p-4"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-3 text-gray-800">
                    {dispositivo.marca} {dispositivo.modelo}
                  </h3>
                  <div className="space-y-3">
                    <p className="text-3xl font-bold text-blue-600">
                      S/ {dispositivo.precio.toFixed(2)}
                    </p>



                    <div className="mt-4 space-y-2">
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <p className="text-sm font-semibold text-blue-800">
                        Cuota 1
                      </p>
                      <p className="text-lg font-bold text-blue-600">
                        S/ {dispositivo.cuota1}
                      </p>
                    </div>
                    
                    <div className="bg-green-50 p-3 rounded-lg">
                      <p className="text-sm font-semibold text-green-800">
                        Cuota 2 a 12
                      </p>
                      <p className="text-lg font-bold text-green-600">
                        S/ {dispositivo.cuota2a12}
                      </p>
                    </div>
                  </div>



                    <p className="text-sm text-gray-500 border-t pt-3">
                      {dispositivo.specs}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {dispositivos.length === 0 && (
        <Card className="p-8 text-center text-gray-500 bg-gray-50">
          <p className="text-lg">
            No se encontraron dispositivos disponibles para ese monto.
          </p>
        </Card>
      )}
    </div>
  );
};

export default CatalogoMoviles;