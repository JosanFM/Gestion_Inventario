import React, { useState } from 'react'
import { supabase } from '../supabase/cliente.jsx'

export const Login = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)  // Para manejar errores de login
  const [loading, setLoading] = useState(false)  // Para mostrar el estado de carga

  const handleSubmit = async (e) => {
    e.preventDefault();  // Evitar el comportamiento predeterminado del formulario

    setLoading(true);  // Activar el estado de carga
    setError(null);  // Limpiar cualquier error previo

    try {
      const { error } = await supabase.auth.signIn({
        email,
        password
      });

      if (error) {
        throw error;  // Lanzar el error si hay un problema al hacer login
      }

      // Aquí puedes redirigir al usuario a otra página si el login es exitoso
      console.log("Inicio de sesión exitoso");
    } catch (error) {
      setError(error.message);  // Mostrar el mensaje de error
    } finally {
      setLoading(false);  // Desactivar el estado de carga después de que termine el proceso
    }
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Inicia sesión</h2>
      <form onSubmit={handleSubmit} className="space-y-4"> 

        <input 
          onChange={(e) => setEmail(e.target.value)}
          name="email" 
          type="email" 
          placeholder="ejemplo@ejemplo.com" 
          required
          className="w-full p-2 border border-gray-300 rounded"
        />

        <input 
          onChange={(e) => setPassword(e.target.value)}
          name="password" 
          type="password" 
          placeholder="Password" 
          required
          className="w-full p-2 border border-gray-300 rounded"
        />
        
        <button 
          type="submit" 
          className="w-full bg-blue-500 text-white p-2 rounded"
          disabled={loading}  // Deshabilitar el botón mientras se está haciendo el login
        >
          {loading ? 'Cargando...' : 'Iniciar sesión'}
        </button>
        
        {error && <p className="text-red-500">{error}</p>}  {/* Mostrar el error si existe */}
      </form>
    </div>
  )
}
