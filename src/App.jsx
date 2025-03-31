import { useState } from 'react'
import './App.css'
import { Listado } from './components/Listado'
import { Login } from './components/Login'


function App() {

  const [listadoState, setListadoState] = useState([]);

  return (
    <>
      <Login/>
      <Listado listadoState = {listadoState} setListadoState = {setListadoState}/>
    </>
  )
}

export default App
