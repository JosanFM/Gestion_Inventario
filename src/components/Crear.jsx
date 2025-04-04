import React from 'react'
import {supabase} from '../supabase/cliente'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Crear() {
    const [nombreProducto, setNombreProducto] = useState("");
    const [precioProducto, setPrecioProducto] = useState("");
    const [cantidadProducto, setCantidadProducto] = useState("");
    const handleSubmit = async e => {
        e.preventDefault()
        const result = await supabase.from('Productos').insert({
            Nombre: nombreProducto,
            Precio: precioProducto,
            Cantidad: cantidadProducto
        })
    }

    const navigate = useNavigate()

    const handleLogOut = async () => {
      await supabase.auth.signOut()
      navigate('/singin')
    }

  return (
    <div>
        <h2>Bienvenido</h2>
        <button onClick={handleLogOut}>Cerrar sesion</button>
        <form onSubmit={handleSubmit}>
            <input 
            type="text" 
            name="nombreProducto" 
            placeholder="Escribe un producto " 
            onChange={(e) => setNombreProducto(e.target.value)}
            />
            <input 
            type="text" 
            name="precioProducto" 
            placeholder="Precio" 
            onChange={(e) => setPrecioProducto(e.target.value)}
            />
            <input 
            type="number" 
            name="cantidadProducto" 
            placeholder="Cantidad" 
            onChange={(e) => setCantidadProducto(e.target.value)}
            />
            <button>
                Añadir
            </button>
        </form>
    </div>
  )
}

export default Crear