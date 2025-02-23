import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Home from '../pages/Home/Home';
import AdvencedSearch from '../pages/AdvencedSearch/AdvencedSearch';
import About from '../pages/About/About';
import ContactUs from '../pages/ContactUs/ContactUs';
import Profile from '../pages/Profile/Profile';
import NotFound from '../pages/NotFound/NotFound';
import NavBarCom from '../components/NavBarCom/NavBarCom';
import FooterCom from '../components/FooterCom/FooterCom';




const UserRouter = () => {
  const userEndpoints = [
    {key: 1, href: '/', value: "HOME"},
    {key: 2, href: '/advsearch', value: "SERACH"},
    {key: 3, href: '/about', value: "ABOUT"},
    {key: 4, href: '/contact-us', value: "CONTACT US"}
  ]

  return (
    <div className="flex flex-col min-h-screen">
      <NavBarCom tabs={userEndpoints} />
      <main className="flex-grow dark:bg-gray-700 dark:text-white">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="/advsearch" element={<AdvencedSearch />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </main>
      <FooterCom />
    </div>
  );
};

export default UserRouter;