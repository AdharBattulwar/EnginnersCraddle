import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import Registration from './components/Registration'
import Landing from './components/Landing'

function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<Registration/>}/>
      <Route path='/landing' element={<Landing/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/registration' element={<Registration/>}/>
    </Routes>
    </>
  )
}

export default App
