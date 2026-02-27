import { useState } from 'react';
import {
  LayoutDashboard,
  FolderKanban,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
} from 'lucide-react';
import { Button } from './ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip';
import { cn } from './ui/utils';

interface SidebarProps {
  activeItem?: string;
  onNavigate?: (item: string) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

interface MenuItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const menuItems: MenuItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'projects', label: 'Projects', icon: FolderKanban },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export function Sidebar({ activeItem = 'projects', onNavigate, isCollapsed, onToggleCollapse }: SidebarProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const handleItemClick = (itemId: string) => {
    onNavigate?.(itemId);
    setIsMobileOpen(false);
  };

  const SidebarContent = ({ collapsed }: { collapsed: boolean }) => (
    <div className="flex flex-col h-full">
      {/* Top Section - Logo */}
      <div className="px-4 py-5 border-b border-gray-200">
        <div className="flex items-center justify-between">
          {!collapsed ? (
            <div className="flex items-center gap-3">
              <div
                className="flex items-center justify-center w-10 h-10 rounded-lg flex-shrink-0"
                style={{ backgroundColor: '#E10600' }}
              >
                <span className="text-white font-bold text-xl">C</span>
              </div>
              <div>
                <div className="font-semibold text-gray-900 text-sm">CORE Marketing</div>
                <div className="text-xs text-gray-500">Marketing Tracker</div>
              </div>
            </div>
          ) : (
            <div
              className="flex items-center justify-center w-10 h-10 rounded-lg mx-auto"
              style={{ backgroundColor: '#E10600' }}
            >
              <span className="text-white font-bold text-xl">C</span>
            </div>
          )}
        </div>
      </div>

      {/* Menu Items */}
      <div className="flex-1 overflow-y-auto py-4 px-3">
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.id;

            const menuItem = (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className={cn(
                  'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group relative',
                  isActive
                    ? 'bg-red-50 text-gray-900'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900',
                  collapsed && 'justify-center px-2'
                )}
              >
                {/* Active indicator bar */}
                {isActive && !collapsed && (
                  <div
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 rounded-r-full"
                    style={{ backgroundColor: '#E10600' }}
                  />
                )}
                <Icon
                  className={cn(
                    'h-5 w-5 flex-shrink-0 transition-colors',
                    isActive ? 'text-[#E10600]' : 'text-gray-500 group-hover:text-gray-700'
                  )}
                />
                {!collapsed && (
                  <span className="font-medium text-sm flex-1 text-left">{item.label}</span>
                )}
              </button>
            );

            if (collapsed) {
              return (
                <TooltipProvider key={item.id} delayDuration={0}>
                  <Tooltip>
                    <TooltipTrigger asChild>{menuItem}</TooltipTrigger>
                    <TooltipContent side="right" className="ml-2">
                      <p>{item.label}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              );
            }

            return menuItem;
          })}
        </nav>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsMobileOpen(true)}
          className="bg-white shadow-lg"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      {/* Desktop Sidebar */}
      <aside
        className={cn(
          'hidden lg:flex fixed left-0 top-0 h-screen bg-white border-r border-gray-200 flex-col transition-all duration-300 shadow-sm z-40',
          isCollapsed ? 'w-[80px]' : 'w-[260px]'
        )}
      >
        <SidebarContent collapsed={isCollapsed} />
        
        {/* Collapse Toggle Button */}
        <button
          onClick={onToggleCollapse}
          className="absolute -right-3 top-6 w-6 h-6 bg-white border border-gray-200 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm"
        >
          {isCollapsed ? (
            <ChevronRight className="h-3 w-3 text-gray-600" />
          ) : (
            <ChevronLeft className="h-3 w-3 text-gray-600" />
          )}
        </button>
      </aside>

      {/* Mobile Drawer */}
      {isMobileOpen && (
        <>
          {/* Overlay */}
          <div
            className="lg:hidden fixed inset-0 bg-black/50 z-40 transition-opacity"
            onClick={() => setIsMobileOpen(false)}
          />

          {/* Drawer */}
          <aside className="lg:hidden fixed left-0 top-0 h-screen w-[260px] bg-white flex flex-col shadow-xl z-50 animate-in slide-in-from-left duration-300">
            {/* Close Button */}
            <div className="flex items-center justify-between px-4 py-5 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div
                  className="flex items-center justify-center w-10 h-10 rounded-lg"
                  style={{ backgroundColor: '#E10600' }}
                >
                  <span className="text-white font-bold text-xl">C</span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900 text-sm">CORE Marketing</div>
                  <div className="text-xs text-gray-500">Marketing Tracker</div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileOpen(false)}
                className="text-gray-500 hover:text-gray-900"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            <SidebarContent collapsed={false} />
          </aside>
        </>
      )}
    </>
  );
}
