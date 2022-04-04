import React from 'react'
import Home from './pages/Home'
import Papers from './pages/Papers'
import Login from './pages/Login'
import { Routes, Route } from 'react-router-dom'
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/home" element={<Home />}/>
      <Route path="/login" element={<Login />}/>
      <Route path="/play" element={<Papers />}/>
      <Route path="*" element={<Home />}/>
    </Routes>
  )
}

export default App