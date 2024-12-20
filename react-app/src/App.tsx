// src/App.jsx
import React, { ReactNode } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/dashboard/Dashboard';
import HotelList from './components/hotels/HotelList';
import HotelManager from './components/hotels/HotelManager';
import AdminPanel from './components/admin/AdminPanel';
import Layout from './components/layout/Layout';

interface PrivateRouteProps {
  children: ReactNode;
  requiredRoles?: string[];
}

const PrivateRoute = ({ children, requiredRoles = [] }: PrivateRouteProps) => {
  const { isAuthenticated, user } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  if (requiredRoles.length > 0 && !requiredRoles.includes(user?.role)) {
    return <Navigate to="/dashboard" />;
  }
  
  return children;
};

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<Layout />}>
            <Route path="/" element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            } />
            <Route path="/hotels" element={
              <PrivateRoute>
                <HotelList />
              </PrivateRoute>
            } />
            <Route path="/hotel-manager" element={
              <PrivateRoute requiredRoles={['HOTEL_MANAGER', 'GROUP_MANAGER']}>
                <HotelManager />
              </PrivateRoute>
            } />
            <Route path="/admin" element={
              <PrivateRoute requiredRoles={['ADMINISTRATOR']}>
                <AdminPanel />
              </PrivateRoute>
            } />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;