import React, { useState } from 'react';
import { supabase } from '../supabase/cliente';

export const Buscador = ({ setResultadosBusqueda }) => {
  const [busqueda, setBusqueda] = useState('');
  const [mensajeBusqueda, setMensajeBusqueda] = useState(null);
  const [buscando, setBuscando] = useState(false);
  
  const buscarProducto = async (e) => {
    const valor = e.target.value;
    setBusqueda(valor);
    
    setMensajeBusqueda(null);
    
    if (valor.length > 1) {
      setBuscando(true);
      
      try {
        const { data, error } = await supabase
          .from('Productos')
          .select('*')
          .ilike('Nombre', `%${valor}%`);
          
        if (error) {
          console.error('Error al buscar producto:', error);
          setMensajeBusqueda({
            tipo: 'error',
            texto: 'Hubo un error al realizar la búsqueda'
          });
        } else {
          setResultadosBusqueda(data);
          
          if (data.length === 0) {
            setMensajeBusqueda({
              tipo: 'info',
              texto: `No se encontraron productos que coincidan con "${valor}"`
            });
          } else {
            setMensajeBusqueda({
              tipo: 'success',
              texto: `Se encontraron ${data.length} productos`
            });
          }
        }
      } catch (error) {
        console.error('Error en la búsqueda:', error);
        setMensajeBusqueda({
          tipo: 'error',
          texto: 'Error en la conexión con la base de datos'
        });
      } finally {
        setBuscando(false);
      }
    } else {
      setResultadosBusqueda([]);
      setMensajeBusqueda(null);
    }
  };
  
  const getMensajeClass = (tipo) => {
    switch(tipo) {
      case 'error': return 'busqueda-mensaje-error';
      case 'success': return 'busqueda-mensaje-success';
      default: return 'busqueda-mensaje-info';
    }
  };
  
  return (
    <div className="space-y-2">
    <div className="relative">
      <input
        type="text"
        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-100"
        placeholder="Buscar productos..."
        onChange={buscarProducto}
        value={busqueda}
      />
      <svg 
        className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    </div>
    
    <div className="space-y-1">
      {buscando && (
        <div className="flex items-center text-sm text-gray-500">
          <svg className="animate-spin h-4 w-4 mr-2 text-blue-500" viewBox="0 0 24 24">
            <path fill="currentColor" d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z"/>
          </svg>
          Buscando...
        </div>
      )}
      
      {mensajeBusqueda && (
        <div className={`p-2 rounded-md text-sm ${
          mensajeBusqueda.tipo === 'error' 
            ? 'bg-red-100 text-red-800' 
            : mensajeBusqueda.tipo === 'success' 
              ? 'bg-green-100 text-green-800' 
              : 'bg-blue-100 text-blue-800'
        }`}>
          {mensajeBusqueda.texto}
        </div>
      )}
    </div>
  </div>
);
};