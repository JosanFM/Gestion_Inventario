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

  //comentario

  return (
    <head>
      <title>Inicio de Sesion</title>

          {/* fondo */}
    <body className="bg-gray-300 flex justify-center items-center min-h-screen">
        
      <div>
        <div className="bg-gray-100 p-10 rounded-3xl shadow-2xl w-800 h-175 max-w-md">
          {/* Logo Centrado y FavIcon */}
          <div className="flex justify-center mb-8">
            <img
              src="imagenes/logo.png"
              alt="Logo de la Empresa"
              className="w-20 h-auto"
            />
            <link rel="icon" type="image/png" href="imagenes/logo.ico" />
          </div>

          <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">INICIAR SESION</h2>

          {/* Formulario de inicio de sesión */}

          {/* Placeholder de usuario */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Correo electrónico</label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                name="email"
                type="email"
                placeholder="ejemplo@ejemplo.com"
                required
                className="w-full p-4 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
              />
            </div>
    

              {/* Placeholder de contraseña */}
            <div>
              <label htmlFor="password" className="block text-gray-700 font-medium mb-2">Contraseña</label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                name="password"
                type="password"
                placeholder="••••••••"
                required
                className="w-full p-4 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
              />
            </div>

            {/* Botón de inicio de sesión */}
            <button
              type="submit"
              className="justify-center w-full py-3 bg-green-600 text-white text-lg font-semibold rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-300 custom-btn"
              disabled={loading}
            >
              {loading ? 'Cargando...' : 'Iniciar sesión'}
            </button>

            {/* Mostrar el error si existe */}
            {error && <p className="text-red-500 text-center mt-2">{error}</p>}
          </form>


            {/* Mensaje tipo enlace de "no tienes cuenta?" */}
          <div className="flex justify-center items-center mt-6">
            <p className="text-sm text-gray-500">
              ¿No tienes cuenta?{' '}
              <a href="/registro" className="text-blue-600 hover:text-blue-700 font-semibold">Regístrate</a>
            </p>
          </div>
        </div>
      </div>

    </body>
    </head>
  );
};