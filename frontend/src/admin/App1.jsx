import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import AdminDashboard from './Pages/AdminDashboard';
import AdminBuildings from './Pages/AdminBuildings';
import AdminRooms from './Pages/AdminRooms';

const AdminApp = () => {
  return (
    <>
      <Routes>
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/buildings" element={<AdminBuildings />} />
        <Route path="/admin/rooms" element={<AdminRooms />} />
        {/* Redirect /admin to /admin/dashboard */}
        <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
      </Routes>
    </>
  );
};

export default AdminApp;