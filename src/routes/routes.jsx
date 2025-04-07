import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from 'react-router-dom'
import { SingIn } from "../components/SingIn";
import { SingUp } from "../components/SingUp";
import { DashBoard } from "../components/DashBoard";
import { supabase } from "../supabase/cliente";
import { useNavigate } from "react-router-dom";


const AppRoutes= () => {

    const navigate = useNavigate()
        

    const [user, setUser] = useState(null)

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setUser(session?.user || null)
        })
            
        

        const {data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
            if(session?.user){
                setUser(session?.user || null)
                navigate('/dashboard')

            } else {
                setUser(null)
                navigate('/singin')
            }
            
        })
        return() => {
            listener?.subscription?.unsubscribe()
        }
    },[])

    
    return(
            <Routes>
                <Route path="/" element={<SingUp/>}/>
                <Route path="/singin" element={<SingIn/>} />
                <Route path="/singup" element={<SingUp/>} />
                <Route path="/dashboard" element={user ? <DashBoard/> : <Navigate to='/singin' />} />
                <Route path="*" element={<Navigate to='/singin'/>}></Route>
            </Routes>
        
            
            
    )
}

export default AppRoutes