import React from 'react'
import { useState } from 'react'
import { supabase } from '../supabase/cliente.jsx'



export const Login = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handeSubmit = async(e) => {

    try{
      const data = await supabase.auth.singIn({
        email,
        password
      })

    }catch(error){
      console.error(error)
    }
    
  }

  //comentario

  return (
    <div>
        <h2>Inicia sesión</h2>
        <form onSubmit={handeSubmit}> 

          <input 
            onChange={(e) => setEmail(e.target.value)}
            name="email" 
            type="email" 
            placeholder='ejemplo@ejemplo.com' 
            required/>

          <input 
            onChange={(e) => setPassword(e.target.value)}
            name="password" 
            type="password" 
            placeholder='password' 
            required/>
          <button type='submit' value="Submit"/>

        </form>
        
    </div>
  )
}
