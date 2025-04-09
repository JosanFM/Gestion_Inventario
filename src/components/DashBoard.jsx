import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabase/cliente';
import { ProductList } from './ProductList';
import Crear from './Crear';
import { Buscador } from './Buscador';
import ThemeSwitcher from './ThemeSwitcher';

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
    <div className="dashboard-container">

      <ThemeSwitcher />
      
      <header className="dashboard-header">
        <h2>Bienvenido</h2>
        <button onClick={handleLogOut} className="logout-button">Cerrar sesión</button>
      </header>
      
      <div className="dashboard-content">

        <aside className="sidebar">
          <Buscador setResultadosBusqueda={setResultadosBusqueda} />
          
          {modoBusqueda && (
            <div className="busqueda-informacion">
              <p>Resultados encontrados: {resultadosBusqueda.length}</p>
            </div>
          )}
        </aside>
        
        <main className="main-content">
          <Crear />
          
          {!modoBusqueda ? (
            <ProductList />
          ) : (
            <div className="busqueda-resultados">
              <h3>Resultados de la búsqueda</h3>
              {resultadosBusqueda.length > 0 ? (
                <div className="productos-grid">
                  {resultadosBusqueda.map((producto) => (
                    <article key={producto.id} className="product-item">
                      <h3>{producto.Nombre}</h3>
                      <p>Precio por unidad: {producto.Precio} euros</p>
                      <p>Cantidad disponible: {producto.Cantidad}</p>
                    </article>
                  ))}
                </div>
              ) : (
                <p className="no-resultados">No se encontraron productos que coincidan con tu búsqueda.</p>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};