import { RefreshCw, User } from 'lucide-react';
import { Button } from '../../shared/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../../shared/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '../../shared/ui/avatar';

interface TopNavProps {
  onGoToAnalytics: () => void;
  onAddProject: () => void;
}

export function TopNav({ onGoToAnalytics, onAddProject }: TopNavProps) {
  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Left section ... */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex-shrink-0" style={{ backgroundColor: '#E10600' }}>
                <span className="text-white font-bold text-lg sm:text-xl">C</span>
              </div>
              <div className="min-w-0">
                <div className="font-semibold text-gray-900 text-sm sm:text-base truncate">CORE Marketing</div>
                <div className="text-xs sm:text-sm text-gray-500 hidden sm:block truncate">Marketing Project Tracker</div>
              </div>
            </div>
          </div>

          {/* Right section */}
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-600 hover:text-gray-900 transition-all hover:scale-110 h-8 w-8 sm:h-10 sm:w-10"
              title="Refresh data"
            >
              <RefreshCw className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>

            <Button
              className="text-white hover:opacity-90 transition-all hover:shadow-lg text-sm sm:text-base px-3 sm:px-4 h-8 sm:h-10 font-medium"
              style={{ backgroundColor: '#E10600' }}
              onClick={onAddProject}
            >
              <span className="hidden sm:inline">Add Project</span>
              <span className="sm:hidden">Add</span>
            </Button>

            <Button
              variant="outline"
              className="border-gray-300 text-gray-700 hover:bg-gray-50 transition-all hidden md:flex text-sm sm:text-base"
              onClick={onGoToAnalytics}
            >
              Go to Analytics
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="rounded-full transition-transform hover:scale-110 p-0 bg-transparent border-0 cursor-pointer">
                  <Avatar className="h-7 w-7 sm:h-9 sm:w-9">
                    <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin" />
                    <AvatarFallback>AD</AvatarFallback>
                  </Avatar>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="md:hidden" onClick={onGoToAnalytics}>
                  Analytics
                </DropdownMenuItem>
                <DropdownMenuSeparator className="md:hidden" />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
}