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
    <>
        <span>Cantidad: <strong>{cantidad}</strong></span>

        <br></br>

        <button className='disminuir' onClick={disminuir} disabled={loading || cantidad <= 0}>-</button>
        

        <button className='aumentar' onClick={incrementar} disabled={loading}>+</button>
    </>
  )
}
