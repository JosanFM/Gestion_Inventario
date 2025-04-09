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
    <div className="search-container">
      <h3 className="search-title">Buscador</h3>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="search-input-container">
          <input
            type="text"
            id="search_field"
            name="busqueda"
            placeholder="Buscar productos..."
            autoComplete="off"
            onChange={buscarProducto}
            value={busqueda}
            className="search-input"
          />
          
          {busqueda && (
            <div className="search-term">
              <span>Buscando: </span>
              <strong>{busqueda}</strong>
            </div>
          )}
          

          {buscando && (
            <div className="busqueda-buscando">
              Buscando productos...
            </div>
          )}
          
          {mensajeBusqueda && (
            <div className={`busqueda-mensaje ${getMensajeClass(mensajeBusqueda.tipo)}`}>
              {mensajeBusqueda.texto}
            </div>
          )}
        </div>
      </form>
    </div>
  );
};