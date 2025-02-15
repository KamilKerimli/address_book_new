import React, { useEffect } from 'react';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import Home from '../pages/Home/Home';
import Advenced from '../pages/Advenced/Advenced';
import About from '../pages/About/About';
import ContactUs from '../pages/ContactUs/ContactUs';
import NavBarCom from '../components/NavBarCom/NavBarCom';
import NotFound from '../pages/NotFound/NotFound';

const UserRouter = () => {
  return (
    <div>
      <NavBarCom />
      <Routes>
        <Route
          path='/'
          element={<Home/>}
        />
        <Route path='/home' element={<Navigate to='/' replace />} />
        <Route
          path='/advsearch'
          element={<Advenced />}
        />
        <Route
          path='/about'
          element={<About />}
        />
        <Route
          path='/contact-us'
          element={<ContactUs />}
        />
        <Route
          path='/profile/settings'
          element={<ContactUs />}
        />
        <Route
          path='/*'
          element={<NotFound />}
        />
      </Routes>
    </div>
  );
};

export default UserRouter;