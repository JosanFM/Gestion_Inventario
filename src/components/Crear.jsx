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

    return (
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4 text-center">
            Nuevo Producto
          </h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Nombre del producto"
              onChange={(e) => setNombreProducto(e.target.value)}
            />
            
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Precio"
              onChange={(e) => setPrecioProducto(e.target.value)}
            />
            
            <input
              type="number"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Cantidad"
              onChange={(e) => setCantidadProducto(e.target.value)}
            />
            
            <div className="md:col-span-3 flex justify-center">
              <button
                type="submit"
                className="px-8 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors max-w-xs w-full"
              >
                Crear Producto
              </button>
            </div>
          </form>
        </div>
      );
    }
export default Crear