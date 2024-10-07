import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import AdminDashboard from "../pages/admin/AdminDashboard";
import ProtectedRoute from "./ProtectedRoute";
import VendorManagement from "../pages/admin/VendorManagement";
import ProductManagement from "../pages/admin/ProductManagement";
import UserManagement from "../pages/admin/UserManagement";
import VendorDashboard from "../pages/vendor/VendorDashboard";
import ProductPage from "../pages/vendor/Product";
import CSRManagement from "../pages/admin/CSRManagement";
import CSRDashBoard from "../pages/csr/CSRDashboard";
import UserManagementCSR from "../pages/csr/UserManagement";
import OrderManagementCSR from "../pages/csr/OrderManagementCSR";

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
      <Route
        path="/admin/csr-management"
        element={
          <ProtectedRoute roleRequired="Administrator">
            <CSRManagement />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/user-management"
        element={
          <ProtectedRoute roleRequired="Administrator">
            <UserManagement />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/product-management"
        element={
          <ProtectedRoute roleRequired="Administrator">
            <ProductManagement />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/order-management"
        element={
          <ProtectedRoute roleRequired="Administrator">
            <OrderManagementCSR />
          </ProtectedRoute>
        }
      />
      {/* Vendor Routes */}
      <Route
        path="/vendor/dashboard"
        element={
          <ProtectedRoute roleRequired="Vendor">
            <VendorDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/vendor/product-management"
        element={
          <ProtectedRoute roleRequired="Vendor">
            <ProductPage />
          </ProtectedRoute>
        }
      />
      {/* CSR Routes */}
      <Route
        path="/csr/dashboard"
        element={
          <ProtectedRoute roleRequired="CSR">
            <CSRDashBoard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/csr/user-management"
        element={
          <ProtectedRoute roleRequired="CSR">
            <UserManagementCSR />
          </ProtectedRoute>
        }
      />
      <Route
        path="/csr/order-management"
        element={
          <ProtectedRoute roleRequired="CSR">
            <OrderManagementCSR />
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
