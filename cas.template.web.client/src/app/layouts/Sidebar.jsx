/**
 * Sidebar Component
 */
import { Link, useLocation } from "react-router-dom";
import { Home, LayoutDashboard } from "lucide-react";
import { cn } from "@shared/utils";

const menuItems = [
  { path: "/", label: "Home", icon: Home },
  { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
];

export const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className="sidebar bg-card lg:border-e lg:border-e-gray-200 dark:border-e-gray-700 lg:fixed lg:top-0 lg:bottom-0 lg:z-20 lg:flex flex-col items-stretch shrink-0">
      {/* Sidebar Header */}
      <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex-center w-10 h-10 rounded-lg bg-primary">
          <span className="text-xl text-primary-foreground">T</span>
        </div>
        <div className="flex flex-col">
          <span className="text-base font-semibold text-gray-900 dark:text-gray-100">
            Template
          </span>
          <span className="text-2xs text-gray-600 dark:text-gray-400">
            CAS Application
          </span>
        </div>
      </div>

      {/* Sidebar Content */}
      <div className="sidebar-content scrollable-y-hover">
        <nav className="menu p-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <div
                key={item.path}
                className={cn("menu-item", isActive && "menu-item-active")}
              >
                <Link to={item.path} className="menu-link">
                  <span className="menu-icon">
                    <Icon className="w-[20px] h-[20px]" />
                  </span>
                  <span className="menu-title text-2sm">{item.label}</span>
                </Link>
              </div>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};
