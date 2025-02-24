import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from '../pages/AdminPages/Dashboard/Dashboard';
import Users from '../pages/AdminPages/Users/Users';
import Roles from '../pages/AdminPages/Roles/Roles';
import NotFound from '../pages/NotFound/NotFound';
import NavBarCom from '../components/NavBarCom/NavBarCom';
import FooterCom from '../components/FooterCom/FooterCom';
import EditCom from '../components/ProfileComponents/EditCom/EditCom';

const AdminRouter = () => {
  const adminEndpoints = [
    {key: 1, href: '/', value: "DASHBOARD"},
    {key: 2, href: '/users', value: "USERS"},
    {key: 3, href: '/roles', value: "ROLES"}
  ]

  return (
    <div className="flex flex-col min-h-screen">
      <NavBarCom tabs={adminEndpoints} />
      <main className="flex-grow dark:bg-gray-700 dark:text-white">
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/admin' element={<Navigate to='/' replace />} />
          <Route path='/home' element={<Navigate to='/' replace />} />
          <Route path='/dashboard' element={<Navigate to='/' replace />} />
          <Route path='/users' element={<Users />} />
          <Route path='/roles' element={<Roles />} />
          <Route path='/profile' element={<EditCom />} />
          <Route path='/*' element={<NotFound />} />
        </Routes>
      </main>
      <FooterCom type='admin' />
    </div>
  );
};

export default AdminRouter;