import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, roleRequired }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  console.log("role", user?.role);
  if (!user) {
    // If user is not logged in, redirect to login page
    return <Navigate to="/login" />;
  }

  if (roleRequired && user?.role !== roleRequired) {
    console.log(roleRequired, user?.role !== roleRequired, user?.role);
    console.log("yo");
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
