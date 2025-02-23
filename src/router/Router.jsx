import React from 'react';
import { BrowserRouter, useLocation, Routes, Route, Navigate } from 'react-router-dom';
import UserRouter from './UserRouter';
import AdminRouter from './AdminRouter';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import Forgot from '../pages/Forgot/Forgot';

const Router = () => {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
};

const AppRoutes = () => {
  const location = useLocation();

  const publicRoutes = [
    { path: '/login', element: <Login /> } ,
    { path: '/register', element: <Register /> },
    { path: '/forgot', element: <Forgot /> },
    { path: '/verify', element: <Forgot /> },
  ];

  localStorage.setItem("role", "user");
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (token !== null && role !== null) {

    if (role === 'user') {
      return (
        <UserRouter />
      );
    }

    if (role === 'admin') {
      return (
          <AdminRouter />
      );
    }
  } else{
    const isPublicRoute = publicRoutes.some(route => route.path === location.pathname);
    if (isPublicRoute && token == null) {
      return (
        <Routes>
          {publicRoutes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Routes>
      );
    }
    else{
      return <Navigate to="/login" replace />;
    }
  }
};

export default Router;