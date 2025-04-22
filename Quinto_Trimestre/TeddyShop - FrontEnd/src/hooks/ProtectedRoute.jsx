import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ allowedRoles, children }) => {
  const token = localStorage.getItem("authToken");
  let isAllowed = false;

  if (allowedRoles && allowedRoles.includes("PUBLIC")) {
    isAllowed = true;
  } else if (!token) {
    isAllowed = false;
  } else {
    try {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      const userRole = decodedToken.roles && decodedToken.roles[0];
      isAllowed = allowedRoles.includes(userRole);
    } catch (error) {
      isAllowed = false;
    }
  }

  if (!isAllowed) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;
