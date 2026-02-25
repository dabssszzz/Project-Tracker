/**
 * Auth Service - Authentication business logic
 * Single Responsibility: Handle authentication operations
 * Interface Segregation: Only expose needed auth methods
 */
import { httpClient } from "./http.service";
import { tokenStorage, userStorage } from "../utils/storage";
import { jwtDecode } from "jwt-decode";

class AuthService {
  async login(credentials) {
    const response = await httpClient.post("/auth/login", credentials);
    const { token, user } = response;

    if (token) {
      tokenStorage.set(token);
      userStorage.set(user);
    }

    return user;
  }

  async register(userData) {
    const response = await httpClient.post("/auth/register", userData);
    const { token, user } = response;

    if (token) {
      tokenStorage.set(token);
      userStorage.set(user);
    }

    return user;
  }

  async logout() {
    try {
      await httpClient.post("/auth/logout");
    } finally {
      tokenStorage.remove();
      userStorage.remove();
    }
  }

  async getCurrentUser() {
    const token = tokenStorage.get();
    
    if (!token) {
      return null;
    }

    try {
      // Validate token expiration
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      if (decoded.exp < currentTime) {
        this.logout();
        return null;
      }

      // Try to get user from storage first
      const cachedUser = userStorage.get();
      if (cachedUser) {
        return cachedUser;
      }

      // Fetch fresh user data
      const user = await httpClient.get("/auth/me");
      userStorage.set(user);
      return user;
    } catch (error) {
      this.logout();
      return null;
    }
  }

  async refreshToken() {
    const response = await httpClient.post("/auth/refresh");
    const { token } = response;
    
    if (token) {
      tokenStorage.set(token);
    }

    return token;
  }

  isAuthenticated() {
    const token = tokenStorage.get();
    if (!token) return false;

    try {
      const decoded = jwtDecode(token);
      return decoded.exp > Date.now() / 1000;
    } catch {
      return false;
    }
  }
}

export const authService = new AuthService();
