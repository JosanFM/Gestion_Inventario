import React, { useState } from "react"
import {supabase} from '../supabase/cliente'
import { Link, useNavigate } from 'react-router-dom'


export const SingIn = () => {
  
  const [formData, setFormData] = useState({
    email: '',
    password:''
  })

  const [error, setError] = useState(null)
  const [succes, setSucces] = useState(false)
  const navigate = useNavigate()

  const handleChangeIn = (e) => {
    const {name, value} = e.target
    setFormData({...formData, [name]:value})
  }



const handleSubmitIn = async (e) => {
  e.preventDefault()
  setError(null)
  setSucces(false)

  const { email, password } = formData

  try{
    const {data, error} = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if(error){
      setError(error.message)
    } else {
      setSucces(true)
      navigate('/dashboard')
    }
  } catch(err){
    setError('Ocurrio un error al iniciar sesión')
  }
}
  

  return (
    <>
       
      <form onSubmit={handleSubmitIn}> 
          <h2>Inicio</h2>
          <p>¿Aun no tienes cuenta?</p>
          <p><Link to='/singup'>Crear una cuenta</Link></p>
          <div>
            <input onChange={handleChangeIn}
                    type="email" 
                    placeholder="Email"
                    name="email"
                    value={formData.email}/>

            <input onChange={handleChangeIn}
                    type="password" 
                    placeholder="Password"
                    name="password"
                    value={formData.password}/>

            <button type="submit">Iniciar sesion</button>
            {error ? <p style={{color: 'red' }}>{error}</p> : succes && <p style={{color: 'green'}}>Has iniciado sesion correctamente</p>} 
            
          </div>
      </form>
        
    </>
  )
}
