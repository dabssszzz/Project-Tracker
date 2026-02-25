/**
 * Protected Route Component
 * Guards routes that require authentication
 */
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../providers";
import { LoadingPage } from "@shared/components";

export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <LoadingPage />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};
