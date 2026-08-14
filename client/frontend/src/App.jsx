import React from 'react'
import { Register } from './pages/Register'
import { Routes, Route } from 'react-router'
import { Dashboard } from './pages/Dashboard'
import { Login } from './pages/Login'


export const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Dashboard/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
    </Routes>
  )
}
