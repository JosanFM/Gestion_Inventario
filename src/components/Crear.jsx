import React, { useState } from 'react'

export const Crear = () => {

  const nombreComponente = "Añadir Producto";

  //Const del producto vacio
  const [ productoState, setProductoState ] = useState({
    nombre: '',
    cantidad:'',
    precio:''
  })

  //Destructuracion del objeto
  const { nombre, cantidad, precio} = productoState;

  //Const de obtener datos que metemos 
  const conseguirDatosForm = e => {

    //Evita el refresco de pagina
    e.preventDefault();

    //Conseguir datos del formulario
    let target = e.target;
    let nombre = target.nombre.value;
    let cantidad = target.cantidad.value;
    let precio = target.precio.value;

    //Crear objeto del producto a guardar

    let producto = {
      id: new Date().getTime(),
      nombre,
      cantidad,
      precio
    };

    //Guardar estado 
    setProductoState(producto);

    //Guardar en la BBDD MODIFICAR 
    guardarEnStorage(producto);
  }

  //MODIFICAR A BBDD
  const guardarEnStorage = producto => {
    //Conseguir los elementos de la BBDD
    let elementos = JSON.parse(localStorage.getItem("productos"));

    //Comprobar si es un array
    if(Array.isArray(elementos)){
        //Añadir dentro del array un elemento nuevo
        elementos.push(producto);
    }else{
        //Crear un array con el nuevo producto
        elementos = [producto];
    }

    //Guardar en la BBDD MODIFICAR
    localStorage.setItem("productos", JSON.stringify(elementos));

    //Devolver objeto guardado
    return producto;
  }


  return (
    <div className="add">
      <h3 className="title">{nombreComponente}</h3>

        <strong>
           {(nombre && cantidad && precio) && "Has creado el producto: "+nombre}
        </strong>
      
      <form onSubmit={conseguirDatosForm}>
        <input type="text" 
                id="nombre" 
                name="nombre"
                placeholder="Nombre"/>

        <textarea 
                  id="cantidad" 
                  name="cantidad"
                  placeholder="Cantidad"></textarea>

        <textarea 
                  id="precio" 
                  name="precio"
                  placeholder="Precio"></textarea>

        <input type="submit" 
                id="save" 
                value="Guardar"/>
      </form>
    </div>
  )
}
