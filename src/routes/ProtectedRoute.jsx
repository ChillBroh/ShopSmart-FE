import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, roleRequired }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    // If user is not logged in, redirect to login page
    return <Navigate to="/login" />;
  }

  if (roleRequired && user?.role !== roleRequired) {
    // If user does not have the required role, redirect to home or unauthorized page
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
