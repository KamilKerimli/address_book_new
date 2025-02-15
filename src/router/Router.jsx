import React from 'react';
import { BrowserRouter, useLocation, Routes, Route, Navigate } from 'react-router-dom';
import UserRouter from './UserRouter';
import AdminRouter from './AdminRouter';
/* import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import Forgot from '../pages/Forgot/Forgot';
import Verify from '../pages/Verify/Verify'; */
import NotFound from '../pages/NotFound/NotFound';

const Router = () => {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
};

const ProtectedRoute = ({ children, requiredRole }) => {
  // const token = localStorage.getItem("token");
  // const role = localStorage.getItem("role");

  const token = "das";
  const role = "user";

  if (!token || !role) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && role !== requiredRole) {
    return <Navigate to="/not-found" replace />;
  }

  return children;
};

const AppRoutes = () => {
  const location = useLocation();

  /* const publicRoutes = [
    { path: '/login', element: <Login /> },
    { path: '/register', element: <Register /> },
    { path: '/forgot', element: <Forgot /> },
    { path: '/verify', element: <Verify /> },
  ]; */

  const userRoutes = [
    '/',
    '/home',
    '/about',
    '/contact-us',
    '/advsearch',
    '/profile/settings',
  ];

  const adminRoutes = [
    '/admin',
    '/admin/dashboard',
    '/admin/settings',
  ];

  /* const isPublicRoute = publicRoutes.some(route => route.path === location.pathname); */

  const isUserRoute = userRoutes.includes(location.pathname);

  const isAdminRoute = adminRoutes.includes(location.pathname);

  // const token = localStorage.getItem("token");
  // const role = localStorage.getItem("role");

  const token = "das";
  const role = "user";  

  /* if (isPublicRoute) {
    return (
      <Routes>
        {publicRoutes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
      </Routes>
    );
  } */

  if (!token || !role) {
    return <Navigate to="/login" replace />;
  }

  if (role === "user" && isUserRoute) {
    return (
      <ProtectedRoute requiredRole="user">
        <UserRouter />
      </ProtectedRoute>
    );
  }

  if (role === "admin" && isAdminRoute) {
    return (
      <ProtectedRoute requiredRole="admin">
        <AdminRouter />
      </ProtectedRoute>
    );
  }

  return <NotFound />;
};

export default Router;