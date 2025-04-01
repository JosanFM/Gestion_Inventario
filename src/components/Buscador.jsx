import React, { useState } from 'react'

export const Buscador = ({listadoState, setListadoState}) => {

    const [busqueda, setBusqueda] = useState('');

    //constante de productos no encontrados
    const [noEncontrado, setNoEncontrado] = useState(false);

    const buscarProducto = (e) => {
        //Crear estado y actualizarlo
        setBusqueda(e.target.value);
        //Listado completo de productos añadido en listado State y setListadoState

        //Filtrar para buscar coincidencias
        let productos_encontrados = listadoState.filter(producto => {
            //Hice un cambio de producto.titulo.toLowerCase a producto.nombre.toLowerCase REVISAR
            return producto.nombre.toLowerCase().includes(busqueda.toLocaleLowerCase());
        });
        //Filtro para que no de nada con solo una letra y en caso de de haber coincidencia lanzar mensaje, OJO cambiar el LocalStorage por la BBDD
        if (busqueda.length <= 1 || productos_encontrados <=0){
            productos_encontrados = JSON.parse(localStorage.getItem("productos"));
            setNoEncontrado(true);
        }else{
            setNoEncontrado(false);
        }

        //Actualizar estado del listado principal con lo que se ha filtrado
        setListadoState(productos_encontrados);
    }



  return (
    <div className="search">
        <h3 className="title">Buscador: {busqueda}</h3>
        
        //Mensaje de no hay coincidencia
        {(noEncontrado == true && busqueda.length > 1) && (
            <span className='no-encontrado'>No hay ninguna coincidencia</span>
        )}

        //Buscador
        <form>
            <input type="text" 
                    id="search_field"
                    name="busqueda"
                    autoComplete='off'
                    onChange={buscarProducto}
            />
            <button id="search">Buscar</button>
        </form>
    </div>
  )
}
