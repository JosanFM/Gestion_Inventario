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
        setError(null)
        setSuccess(false)

        const {name, email, password} = formData
        let response

        if(mode === 'singup'){
            response = await supabase.auth.signUp({name, email, password})
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


    return(
        <form onSubmit={handleSubmit}>
            <h2> { mode === 'singup' ? 'Registrate' : 'Inicia sesión'}</h2>
            <p>
                { mode === 'singup' ? '¿Tienes cuenta?' : 'Aun no tienes cuenta'}
                <Link to={mode === 'singup' ? '/singin' : '/singup'}>
                      {mode === 'singup' ? 'Inicia sesiçon' : 'Registrate'}
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

            <button type="submit" >{ mode === 'singup' ? 'Registrate' : 'Inicia sesión'}</button>    

            {error ? <p style={{color: 'red'}}>{ error }</p> : success && <p style={{color: 'green'}}>Correcto</p>}
        </form>
    )
}