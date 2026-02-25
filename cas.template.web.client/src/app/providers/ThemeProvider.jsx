/**
 * ThemeProvider - Manages application theme state
 * Single Responsibility: Controls theme mode and applies theme classes
 */
import { createContext, useContext, useEffect, useState } from "react";

const THEME_STORAGE_KEY = "app-theme";
const THEMES = {
  LIGHT: "light",
  DARK: "dark",
  SYSTEM: "system",
};

const ThemeContext = createContext({
  theme: THEMES.LIGHT,
  setTheme: () => {},
  resolvedTheme: THEMES.LIGHT,
});

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
};

const getStoredTheme = () => {
  try {
    return localStorage.getItem(THEME_STORAGE_KEY) || THEMES.SYSTEM;
  } catch {
    return THEMES.SYSTEM;
  }
};

const getSystemTheme = () => {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? THEMES.DARK
    : THEMES.LIGHT;
};

const resolveTheme = (theme) => {
  if (theme === THEMES.SYSTEM) {
    return getSystemTheme();
  }
  return theme;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setThemeState] = useState(getStoredTheme);
  const resolvedTheme = resolveTheme(theme);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove(THEMES.LIGHT, THEMES.DARK);
    root.classList.add(resolvedTheme);
  }, [resolvedTheme]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      if (theme === THEMES.SYSTEM) {
        const root = document.documentElement;
        root.classList.remove(THEMES.LIGHT, THEMES.DARK);
        root.classList.add(getSystemTheme());
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [theme]);

  const setTheme = (newTheme) => {
    try {
      localStorage.setItem(THEME_STORAGE_KEY, newTheme);
      setThemeState(newTheme);
    } catch (error) {
      console.error("Failed to save theme:", error);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, resolvedTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
