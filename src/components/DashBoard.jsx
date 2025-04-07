import React from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../supabase/cliente'


export const DashBoard = () => {

  const navigate = useNavigate()

  const handleLogOut = async () => {
    await supabase.auth.signOut()
    navigate('/singin')
  }


  return (
    <div>
      <h2>Bienvenido</h2>
      <button onClick={handleLogOut}>Cerrar sesion</button>
    </div>
  )
}
