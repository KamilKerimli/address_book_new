import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
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
    { path: '/', element: <Login /> },
    { path: '/login', element: <Navigate to={'/'} replace /> },
    { path: '/register', element: <Register /> },
    { path: '/forgot', element: <Forgot /> },
    { path: '/verify', element: <Forgot /> }
  ];

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (token && role) {
    if (role === 'user') {
      return <UserRouter />;
    }

    if (role === 'admin') {
      return <AdminRouter />;
    }

    localStorage.removeItem("token");
    localStorage.removeItem("role");
    return <Navigate to="/" replace />;
  } 

  const isPublicRoute = publicRoutes.some(route => route.path === location.pathname);

  if (isPublicRoute) {
    return (
      <Routes>
        {publicRoutes.map(route => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Routes>
    );
  }

  return <Navigate to="/login" replace />;
};

export default Router;
