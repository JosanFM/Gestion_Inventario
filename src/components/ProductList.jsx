import React from 'react'
import { useState, useEffect } from 'react';
import { supabase } from '../supabase/cliente';

import { DeleteProduct } from './DeleteProduct';
import { ControlarCantidad } from './ControlarCantidad';

export const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect (() => {
        const fetchProducts = async() => {
            try {
                setLoading(true);

                const {data,error} = await supabase.from('Productos').select('*');

                if (error) throw error;

                setProducts(data);

            } catch (err){
                setError(err.message);
            }finally{
                setLoading(false);
            }
        };
        fetchProducts();
    },[]);
    if (loading) return <div>Cargando productos...</div>;

    if(error) return <div>Error: {error}</div>;

    // Para actualizar el estado y la lista cuando elimino un producto:
    const handleProductDeleted = (deletedId) => {
        setProducts(products.filter(product => product.id !== deletedId))
    };

    const handleCantidadActualizada = (productId, nuevaCantidad) => {
        setProducts((prevProducts) =>
            prevProducts.map((product) =>
                product.id === productId ? { ...product, Cantidad: nuevaCantidad } : product
            )
        );
    };

    return (
        <div className="w-full bg-white rounded-lg shadow-sm p-6">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {products.map(product => (
            <div 
              key={product.id}
              className="w-full bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {/* Nombre */}
              <div className="w-full">
                <h3 className="text-xl font-semibold break-words text-gray-800">
                  {product.Nombre}
                </h3>
              </div>
    
              {/* Precio */}
              <div className="text-lg font-medium text-blue-600">
                €{product.Precio}
              </div>
    
              {/* Controles */}
              <div className="w-full space-y-4 mt-4">
                <div className="flex justify-center">
                  <ControlarCantidad 
                    productId={product.id} 
                    cantidadInicial={product.Cantidad}
                    onCantidadActualizada={handleCantidadActualizada}
                  />
                </div>
                
                <div className="flex justify-center">
                  <DeleteProduct 
                    productId={product.id} 
                    onDelete={handleProductDeleted}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };