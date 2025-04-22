import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabase/cliente';
import { ProductList } from './ProductList';
import Crear from './Crear';
import { Buscador } from './Buscador';

export const DashBoard = () => {
  const navigate = useNavigate();
  
  const [resultadosBusqueda, setResultadosBusqueda] = useState([]);
  const [modoBusqueda, setModoBusqueda] = useState(false);
  
  useEffect(() => {
    setModoBusqueda(resultadosBusqueda.length > 0);
  }, [resultadosBusqueda]);

  const handleLogOut = async () => {
    await supabase.auth.signOut();
    navigate('/singin');
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="sticky top-0 w-full bg-white shadow-sm z-10 border-b border-gray-200">
        <div className="w-full px-4 py-4 flex justify-between items-center">
          <strong className="text-gray-800">PANEL DE CONTROL</strong>
          <div className="flex items-center gap-4">
            <button 
              onClick={handleLogOut}
              className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </header>
  
      <div className="flex-1 flex w-full">
        <aside className="w-72 bg-white border-r border-gray-200 flex-shrink-0">
          <div className="p-4 h-full">
            <Buscador setResultadosBusqueda={setResultadosBusqueda} />
            {modoBusqueda && (
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  {resultadosBusqueda.length} resultados encontrados
                </p>
              </div>
            )}
          </div>
        </aside>
  
        <main className="flex-1 w-full bg-gray-50 p-6">
          <div className="max-w-full">
            <Crear />
            <div className="mt-6 w-full">
              {!modoBusqueda ? (
                <ProductList />
              ) : (
                <div className="w-full bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-lg font-semibold mb-4 text-gray-800">Resultados</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {resultadosBusqueda.map((producto) => (
                      <div key={producto.id} className="bg-gray-100 p-4 rounded-lg">
                        <h3 className="font-medium text-gray-800">{producto.Nombre}</h3>
                        <p className="text-blue-600">€{producto.Precio}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};