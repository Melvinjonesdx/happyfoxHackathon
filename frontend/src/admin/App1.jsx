import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import AdminHeader from './components/AdminHeader';
import AdminDashboard from './Pages/AdminDashboard';
import AdminBuildings from './Pages/AdminBuildings';
import AdminRooms from './Pages/AdminRooms';

const AdminApp = () => {
  return (
    <>
      {/* Ensure AdminHeader is here, not inside individual pages */}
      <AdminHeader />
      <Routes>
        <Route path="/dashboard" element={<AdminDashboard />} />
        <Route path="/buildings" element={<AdminBuildings />} />
        <Route path="/rooms" element={<AdminRooms />} />
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </>
  );
};

export default AdminApp;
