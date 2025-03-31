import React, { useEffect } from 'react'
import { supabase } from '../supabase/cliente';

export const Listado = (listadoState, setListadoState) => {

  useEffect(() => {
    conseguirProductos();

  },[]);

  const conseguirProductos = () => {
    //Aqui tenemos que incluir el enlace a la base de datos o su API KEY o lo que sea para enlazar la peticion del cliente con la BD
    
  }

  const borrarProducto = (id) => {
    // Conseguir los productos almacenados
    let productos_almacenados = conseguirProductos();

    //Filtrar esos productos para que elimine del array el producto que elimino (muestra todos los productos que no coincidan con el id que le paso)
    let nuevo_array_productos = productos_almacenados.filter(producto => producto.id != parseInt(id));

    // Actualizar el estado del listado
    setListadoState(nuevo_array_productos);

    // Actualizar los datos en la base de datos


  }

  return (
    <div className='listado'>

      {listadoState != null ? listadoState.map(producto => {
        return (
          <article key={producto.id} className='producto-item'>
            <h3 className='title'>{producto.titulo}</h3>
            <p className='description'>{producto.descripcion}</p>

            <button className='edit' onClick={() => {setEditar(producto.id)}}>Editar</button>
            <button className='delete' onClick={() => borrarProducto(producto.id)}></button>

            {/*Formulario para editar producto (lo creamos a otra pagina y con otro componente <Modificar/>) */}
          </article>
        );
      }): <h2><strong>No hay productos para mostrar. Lo sentimos.</strong></h2>
      }

    </div>
  )
}
