import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import AdminDashboard from "../pages/admin/AdminDashboard";
import ProtectedRoute from "./ProtectedRoute";
import VendorManagement from "../components/admin/VendorManagement";

const Router = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Admin Routes */}
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute roleRequired="Administrator">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/vendor-management"
        element={
          <ProtectedRoute roleRequired="Administrator">
            <VendorManagement />
          </ProtectedRoute>
        }
      />

      {/* Example Protected Route for Logged-In Users */}
      <Route
        path="/protected"
        element={
          <ProtectedRoute>
            <div>Protected Content for Logged-In Users</div>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default Router;
