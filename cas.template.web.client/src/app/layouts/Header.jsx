/**
 * Header Component
 */
import { Link } from "react-router-dom";
import { Moon, Sun, LogOut, User } from "lucide-react";
import { useAuth } from "../providers";
import { Button } from "@shared/components";
import { useTheme } from "../providers";

export const Header = () => {
  const { user, logout } = useAuth();
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <header className="sticky top-0 z-10 border-b border-gray-200 dark:border-gray-700 bg-card h-16">
      <div className="container mx-auto flex h-full items-center justify-between px-4">
        <Link to="/" className="text-xl font-bold text-gray-900 dark:text-gray-100">
          Template
        </Link>

        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleTheme}
            className="rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>

          {/* User Info */}
          <div className="flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <User className="h-4 w-4 text-gray-600 dark:text-gray-400" />
            <span className="text-2sm font-medium text-gray-900 dark:text-gray-100">
              {user?.name || user?.email || "User"}
            </span>
          </div>

          {/* Logout Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={logout}
            className="rounded-lg text-danger hover:bg-danger-light dark:hover:bg-danger-light/20"
          >
            <LogOut className="h-4 w-4 mr-2" />
            <span className="text-2sm">Logout</span>
          </Button>
        </div>
      </div>
    </header>
  );
};
