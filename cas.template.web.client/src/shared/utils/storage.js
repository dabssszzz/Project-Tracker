/**
 * Storage Utilities - Local storage abstraction
 * Single Responsibility: Handle browser storage operations
 * DRY: Reusable storage helpers
 */

const TOKEN_KEY = "auth_token";
const USER_KEY = "user_data";

class StorageHelper {
  constructor(key) {
    this.key = key;
  }

  get() {
    try {
      const item = localStorage.getItem(this.key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error(`Error getting ${this.key} from storage:`, error);
      return null;
    }
  }

  set(value) {
    try {
      localStorage.setItem(this.key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error setting ${this.key} in storage:`, error);
    }
  }

  remove() {
    try {
      localStorage.removeItem(this.key);
    } catch (error) {
      console.error(`Error removing ${this.key} from storage:`, error);
    }
  }

  clear() {
    try {
      localStorage.clear();
    } catch (error) {
      console.error("Error clearing storage:", error);
    }
  }
}

export const tokenStorage = new StorageHelper(TOKEN_KEY);
export const userStorage = new StorageHelper(USER_KEY);

/**
 * Generic storage utility
 */
export const storage = {
  get: (key) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch {
      return null;
    }
  },

  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Storage set error:", error);
    }
  },

  remove: (key) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error("Storage remove error:", error);
    }
  },

  clear: () => {
    try {
      localStorage.clear();
    } catch (error) {
      console.error("Storage clear error:", error);
    }
  },
};
