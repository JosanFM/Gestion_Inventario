import React from 'react'
import { useState } from 'react'
import { supabase } from '../supabase/cliente'
import { Link } from 'react-router-dom'


export const SingUp = () => {

  const [ formData, setFormData] = useState({
    email:'',
    password:''
  })

  const [error, setError] = useState(null)
  const [succes, setSucces] = useState(false)

 
  const handleChange = (e) => {
    const {name, value} = e.target
    setFormData({...formData, [name]: value})
  }

  const handleSubmitReg = async (e) => {

    e.preventDefault()
    setError(null)
    setSucces(false)

    const { email, password } = formData

    const { data, error } = await supabase.auth.signUp({
      email,
      password
    })

    if(error){
      setError(error.message)
    } else {
      setSucces(true)

    }
  }


  return (
    <>
      <form onSubmit={handleSubmitReg}> 
          <h2>Registro de usuario</h2>
          <p><Link to='/singin'>¿Ya tienes una cuenta?</Link></p>
          <div>
            <input onChange={handleChange}
                  type="email" 
                  placeholder="Email"
                  name="email"
                  value={formData.email}/>

            <input onChange={handleChange}
                  type="password" 
                  placeholder="Password"
                  name="password"
                  value={formData.password}/>

            <button type="submit">
              Registrar
            </button>

            { error ? <p style={{ color: "red" }}>{error}</p> : succes && <p style={{color: "green"}}>Se ha registrado correctamente</p>}
            
          </div>
      </form>
  
    </>
  )
}
