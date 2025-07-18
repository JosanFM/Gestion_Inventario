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
      <header className="sticky top-0 w-full bg-slate-800 shadow-sm z-10 border-b border-slate-700">
        <div className="w-full px-4 py-4 flex justify-between items-center">
          <strong className="text-cyan-300">PANEL DE CONTROL</strong>
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
        <aside className="w-72 bg-slate-800 border-r border-slate-700 flex-shrink-0">
          <div className="p-4 h-full">
            <Buscador setResultadosBusqueda={setResultadosBusqueda} />
            {modoBusqueda && (
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-green-700">
                  {resultadosBusqueda.length} resultados encontrados
                </p>
              </div>
            )}
          </div>
        </aside>
  
        <main className="flex-1 w-full bg-slate-500 p-6">
          <div className="max-w-full">
            <Crear />
            <div className="mt-6 w-full">
              {!modoBusqueda ? (
                <ProductList />
              ) : (
                <div className="w-full bg-slate-800 rounded-lg shadow-sm p-6">
                  <h3 className="text-lg font-semibold mb-4 text-green-400 text-center">Resultados</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 bg-slate-800 p-4 rounded-lg">
                    {resultadosBusqueda.map((producto) => (
                      <div key={producto.id} className="bg-slate-700 p-4 rounded-lg">
                        <h3 className="font-medium text-cyan-300">{producto.Nombre}</h3>
                        <p className="text-yellow-300">€{producto.Precio}</p>
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