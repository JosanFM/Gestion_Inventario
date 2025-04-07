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



    return(
        <form onSubmit={handleSubmit}>
            <h2> { mode === 'singup' ? 'Regístrate' : 'Inicia sesión'}</h2>
            <p>
                { mode === 'singup' ? '¿Tienes cuenta? ' : 'Aun no tienes cuenta '}
                <Link to={mode === 'singup' ? '/singin' : '/singup'}>
                      {mode === 'singup' ? 'Inicia sesión' : 'Regístrate'}
                </Link>
            </p>

            <input  type= "email" 
                    name="email" 
                    placeholder="Email" 
                    onChange={handleChange}/>

            <input  type= "password" 
                    name="password" 
                    placeholder="Password" 
                    onChange={handleChange}/>    

            <button type="submit" >{ mode === 'singup' ? ' Regístrate' : ' Inicia sesión'}</button>    

            {error ?  (<p style={{color: 'red'}}>{ error }</p>) 
                    : (success && <p style={{color: 'green'}}>Correcto</p>)}

            
            <button type ='button' onClick={() => handleSocialLogin('google')}>Inicia sesion con google</button>
            
                   
        </form>
        
    )
}