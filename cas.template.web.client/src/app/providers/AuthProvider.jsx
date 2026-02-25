/**
 * AuthProvider - Manages authentication state
 * Single Responsibility: Handles user authentication and authorization
 * Open/Closed Principle: Extensible for different auth strategies (JWT, OAuth, etc.)
 */
import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { authService } from "@shared/services/auth.service";

const AuthContext = createContext({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => {},
  logout: async () => {},
  register: async () => {},
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  // TEMPORARY: Mock user for development - REMOVE IN PRODUCTION
  const TEMP_DEV_MODE = true;
  const mockUser = {
    id: 1,
    name: "Dev User",
    email: "dev@example.com",
    role: "admin"
  };

  const [user, setUser] = useState(TEMP_DEV_MODE ? mockUser : null);
  const [isLoading, setIsLoading] = useState(true);

  const initializeAuth = useCallback(async () => {
    // Skip auth initialization in temp dev mode
    if (TEMP_DEV_MODE) {
      setIsLoading(false);
      return;
    }
    
    try {
      const currentUser = await authService.getCurrentUser();
      setUser(currentUser);
    } catch (error) {
      console.error("Failed to initialize auth:", error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  const login = async (credentials) => {
    setIsLoading(true);
    try {
      const userData = await authService.login(credentials);
      setUser(userData);
      return userData;
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await authService.logout();
      setUser(null);
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData) => {
    setIsLoading(true);
    try {
      const newUser = await authService.register(userData);
      setUser(newUser);
      return newUser;
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    register,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
