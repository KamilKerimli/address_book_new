import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Admin from '../pages/Admin/Admin';

const AdminRouter = () => {
  return (
    <Routes>
      <Route path='/admin' element={<Admin />} />
    </Routes>
  );
};

export default AdminRouter;