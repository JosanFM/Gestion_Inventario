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
    <button 
      onClick={handleDelete}
      className="w-full py-1 px-3 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
    >
      Eliminar
    </button>
  );
};