import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import AdminDashboard from './Pages/AdminDashboard';

const AdminApp = () => {
  return (
    <>
      <Routes>
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        {/* Redirect /admin to /admin/dashboard */}
        <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
      </Routes>
    </>
  );
};

export default AdminApp;