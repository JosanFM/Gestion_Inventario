import React from "react";
import { useState } from 'react'  
import { supabase } from "../supabase/cliente";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export const AuthForm = ({ mode }) => {

    const [ formData, setFormData ] = useState({
        name: '',
        email:'',
        password: ''
    })
    const [error, setError] = useState (null)
    const [success, setSuccess] = useState(false)
    const navigate = useNavigate()
    

    const handleChange = (e) => {
        const { name, value} = e.target
        setFormData({...formData, [name]: value})
     }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const { email, password} = formData

        let response

        if(mode === 'singup'){
            response = await supabase.auth.signUp({ email, password})
        } else {
            response = await supabase.auth.signInWithPassword({ email, password})
        }

        if(response.error){
            setError(response.error.message)
        } else {
            setSuccess(true)
            navigate(mode === 'singup' ? '/singin' : '/dashboard' )
        }
    }

    const handleSocialLogin = async (provider) =>{
        try{
            const {error} = await supabase.auth.signInWithOAuth({
                provider: provider
            })

            if(error)  throw error
           // navigate('/dashboard')
        } catch(error){
            setError(error.message)
        }
    }

return (
    <div className="min-h-screen flex items-center justify-center p-4">
        <div className="w-[500px] h-[730px] bg-white rounded-xl shadow-2xl p-8 overflow-y-auto transition-all duration-300">

            {/* logo */}
            
            <div className="flex justify-center mb-8">
                <img 
                    src="imagenes/logo.png"
                    alt="imagenes/logo.png" 
                    className="h-16 w-16"
                />
            </div>

            <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
                {mode === 'singup' ? "Crea tu cuenta" : "Bienvenido de nuevo"}
            </h2>
                    
            <p className="text-center text-gray-500 mb-8">
                {mode === 'singup' 
                    ? "Ya tienes una cuenta? "
                    : "Nuevo en nuestra plataforma? "}
                <Link 
                    to={mode === 'singup' ? '/singin' : '/singup'} 
                    className="text-indigo-600 hover:text-indigo-800 font-semibold transition-colors"
                >
                    {mode === 'singup' ? "Iniciar sesión" : "Regístrate aquí"}
                </Link>
            </p>


            {/* formulario */}

            <form onSubmit={handleSubmit} className="space-y-6" >
                <div>
                    <input
                        type="email"
                        name="email"
                        placeholder="Correo electrónico"
                        onChange={handleChange}
                        className="text-gray-800 w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder-gray-400 transition-all"
                    />
                </div>

                <div>
                    <input
                        type="password"
                        name="password"
                        placeholder="Contraseña"
                        onChange={handleChange}
                        className="text-gray-800 w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder-gray-400 transition-all"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-indigo-500 to-blue-600 text-white py-3 rounded-lg font-semibold hover:from-indigo-600 hover:to-blue-700 transition-all transform hover:scale-[1.01] shadow-md"
                >
                    {mode === 'singup' ? "Registrarse ahora" : "Iniciar sesión"}
                </button>

                {error && (
                    <div className="p-3 bg-red-50 text-red-700 rounded-lg flex items-center gap-2">
                        <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                        </svg>
                        <span className="text-sm">{error}</span>
                    </div>
                )}

                {success && (
                    <div className="p-3 bg-green-50 text-green-700 rounded-lg flex items-center gap-2">
                        <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                        </svg>
                        <span className="text-sm">Acceso exitoso</span>
                    </div>
                )}

                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-200"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="p-4 bg-white text-gray-500">O continúa con</span>
                    </div>
                </div>

                {/* boton de iniciar sesion con google */}

                <button
                    type="button"
                    onClick={() => handleSocialLogin('google')}
                    className="w-full flex items-center justify-center gap-2 py-3 border border-gray-200 rounded-lg font-medium text-gray-600 hover:border-gray-300 hover:bg-gray-50 transition-all"
                >
                    <svg className="w-5 h-5" viewBox="0 0 48 48">
                        <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                        <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                        <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                        <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                        <path fill="none" d="M0 0h48v48H0z"/>
                    </svg>
                    Continuar con Google
                </button>
            </form>
        </div>
    </div>
);
}