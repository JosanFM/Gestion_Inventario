import React, { useState } from 'react'
import { supabase } from '../supabase/cliente';

export const ControlarCantidad = ({productId, cantidadInicial}) => {

    const [cantidad, setCantidad] = useState(cantidadInicial);

    const [loading, setLoading] = useState(false);

    // Para actualizar la cantidad de Supabase
    const modificarCantidad = async(nuevaCantidad) => {

        try{
            setLoading(true);
            const {data, error} = await supabase
            .from('Productos')
            .update({Cantidad: nuevaCantidad})
            .eq('id', productId);

            if (error) throw error;

            setCantidad(nuevaCantidad);
            onCantidadActualizada && onCantidadActualizada(productId, nuevaCantidad);

        } catch (error){
            console.error('Error al actualizar la cantidad:', error.message);
        } finally {
            setLoading(false);
        }
    };

    const incrementar = () => {
        const nuevaCantidad = cantidad + 1;
        modificarCantidad(nuevaCantidad);
    };

    const disminuir = () => {
        if (cantidad >0) {
            const nuevaCantidad = cantidad - 1;
            modificarCantidad(nuevaCantidad);
        }
    };

  return (
    <div className="flex items-center gap-2 justify-center">
    <button 
      onClick={disminuir} 
      disabled={loading || cantidad <= 0}
      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 disabled:opacity-50 transition-colors"
    >
      -
    </button>
    
    <span className="font-medium text-gray-800 dark:text-gray-300">{cantidad}</span>
    
    <button 
      onClick={incrementar} 
      disabled={loading}
      className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 disabled:opacity-50 transition-colors"
    >
      +
    </button>
  </div>
);
};