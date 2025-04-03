import React from "react";
import { Routes, Route } from 'react-router-dom'
import { SingIn } from "../components/SingIn";
import { SingUp } from "../components/SingUp";
import { DashBoard } from "../components/DashBoard";


const AppRoutes= () => {
    return(
        <Routes>
            <Route path="/" element={<SingUp/>}/>
            <Route path="/singin" element={<SingIn/>} />
            <Route path="/singup" element={<SingUp/>} />
            <Route path="/dashboard" element={<DashBoard/>} />
        </Routes>
    )
}

export default AppRoutes