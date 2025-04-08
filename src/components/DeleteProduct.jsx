import React from 'react'
import { supabase } from '../supabase/cliente';

export const DeleteProduct = ({ productId, onDelete }) => {

  const handleDelete = async() => {
    try {
      const { error } = await supabase.from('Productos').delete().eq('id', productId)

      if (error) throw error;

      onDelete && onDelete(productId);

      console.log('Producto eliminado con éxito')
    
    } catch (error) {
    console.error('Error al eliminar el producto:', error.message)
  }
};



return (
  <button className='eliminar' onClick={handleDelete}>
    Eliminar
  </button>
)
};
