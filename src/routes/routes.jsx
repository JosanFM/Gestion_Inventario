import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from 'react-router-dom'
import { SingIn } from "../components/SingIn";
import { SingUp } from "../components/SingUp";
import { DashBoard } from "../components/DashBoard";
import { supabase } from "../supabase/cliente";



const AppRoutes= () => {

    const [user, setUser] = useState(null)

    useEffect(() => {
        supabase.auth.getUser().then(({data}) => {
            setUser(data?.user || null)
        })

        const {data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user || null)
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