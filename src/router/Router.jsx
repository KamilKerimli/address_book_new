import React from 'react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import Home from '../pages/Home/Home'
import Advenced from '../pages/Advenced/Advenced'
import  About  from "../pages/About/About";
import ContactUs  from "../pages/ContactUs/ContactUs";
import NotFound from '../pages/NotFound/NotFound'
import Admin from '../pages/Admin/Admin'

const Router = () => {
  return (
    <div>
        <BrowserRouter>
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/home' element={<Navigate to="/" replace />}/>
            <Route path='/advsearch' element={<Advenced/>}/>
            <Route path='/about' element={<About/>}/>
            <Route path='/contact-us' element={<ContactUs/>}/>
            <Route path='/admin' element={<Admin/>}/>
            <Route path='/*' element={<NotFound/>}/>
        </Routes>
        </BrowserRouter>
    </div>
  )
}

export default Router