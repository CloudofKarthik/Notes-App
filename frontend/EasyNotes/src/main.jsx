import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Layout from './Layout.jsx'
import Home from './Components/Home/Home'
import Login from './Components/Login/Login.jsx'
import Register from './Components/Register/Register.jsx'
import Dashboard from './Components/Dashboard/Dashboard.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element = {<Layout />}>
      
    <Route path='' element ={<Home/>} />
    <Route path='login' element = {<Login/>} />
    <Route path='register' element = {<Register/>} />
    <Route path='dashboard' element = {<Dashboard/>} />

    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(

   <RouterProvider router={router}/>
)
