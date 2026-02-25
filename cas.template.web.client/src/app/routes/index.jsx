/**
 * Router Configuration
 * Central routing setup following SOLID principles
 */
import { Routes, Route, Navigate } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";

// Layouts
import { MainLayout } from "../layouts/MainLayout";
import { AuthLayout } from "../layouts/AuthLayout";

// Pages
import { HomePage } from "@features/home/HomePage";
import { LoginPage } from "@features/auth/LoginPage";
import { RegisterPage } from "@features/auth/RegisterPage";
import { ForgotPasswordPage } from "@features/auth/ForgotPasswordPage";
import { DashboardPage } from "@features/dashboard/DashboardPage";
import { NotFoundPage } from "@features/error/NotFoundPage";

export const Router = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />\
        {/* <Route path="/dashboard" element={<DashboardPage />} /> */}
      </Route>

      {/* Public Routes with MainLayout */}
      <Route element={<MainLayout />}>
        <Route path="/dashboard" element={<DashboardPage />} />
      </Route>

      {/* Protected Routes */}
      <Route
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/" element={<HomePage />} />
      </Route>

      {/* Fallback Routes */}
      <Route path="/404" element={<NotFoundPage />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
};
