import React from 'react'

export const Login = () => {



  return (
    <div>
        <h2>Inicia sesión</h2>
        <form>
          <input type="email" placeholder='ejemplo@ejemplo.com' required/>
          <input type="password" placeholder='password' required/>
          <input type='submit' value="Submit"/>
        </form>
        
    </div>
  )
}
