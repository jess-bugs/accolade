import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'


import { Routes, Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import MainLayout from './layout/MainLayout'
import NotFound from './pages/NotFound'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'


function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<MainLayout />}>
        <Route path='*' element={<NotFound />} />
        <Route index element={<Login />} />
        <Route path='/login' element={<Login />} />
        <Route path='/dash/:page' element={<Dashboard />} />

      </Route>
    )
  )


  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
