import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import AdminDashboard from "../pages/admin/AdminDashboard";
import ProtectedRoute from "./ProtectedRoute";

const Router = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Admin Routes */}
      <Route
        path="/admin/home"
        element={
          <ProtectedRoute roleRequired="Administrator">
            <AdminDashboard />
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
