import { TopNav } from './components/TopNav';
import { FilterSection } from './components/FilterSection';
import { SearchBar } from './components/SearchBar';
import { DataTable } from './components/DataTable';
import { AnalyticsDashboard } from './components/AnalyticsDashboard';
import { BreadcrumbNav } from './components/ui/breadcrumb-nav';
import { Sidebar } from './components/Sidebar';
import { ExecutiveDashboardView } from './components/ExecutiveDashboardView';
import { useState } from 'react';
import { cn } from './components/ui/utils';

type View = 'dashboard' | 'tracker' | 'analytics';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [activeMenuItem, setActiveMenuItem] = useState('dashboard');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const handleMenuNavigation = (itemId: string) => {
    setActiveMenuItem(itemId);
    if (itemId === 'analytics') {
      setCurrentView('analytics');
    } else if (itemId === 'projects') {
      setCurrentView('tracker');
    } else if (itemId === 'dashboard') {
      setCurrentView('dashboard');
    }
    // Settings can be added later
  };

  // Dashboard View
  if (currentView === 'dashboard') {
    return (
      <div className="min-h-screen" style={{ backgroundColor: '#F8F9FB' }}>
        <Sidebar
          activeItem={activeMenuItem}
          onNavigate={handleMenuNavigation}
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        />
        <div
          className={cn(
            'transition-all duration-300',
            'lg:ml-[260px]',
            isSidebarCollapsed && 'lg:ml-[80px]'
          )}
        >
          <ExecutiveDashboardView />
        </div>
      </div>
    );
  }

  // Analytics View
  if (currentView === 'analytics') {
    return (
      <div className="min-h-screen" style={{ backgroundColor: '#F8F9FB' }}>
        <Sidebar
          activeItem={activeMenuItem}
          onNavigate={handleMenuNavigation}
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        />
        <div
          className={cn(
            'transition-all duration-300',
            'lg:ml-[260px]',
            isSidebarCollapsed && 'lg:ml-[80px]'
          )}
        >
          <AnalyticsDashboard onBackToProjects={() => {
            setCurrentView('tracker');
            setActiveMenuItem('projects');
          }} />
        </div>
      </div>
    );
  }

  // Projects Tracker View (default)
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F8F9FB' }}>
      {/* Sidebar */}
      <Sidebar
        activeItem={activeMenuItem}
        onNavigate={handleMenuNavigation}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />

      {/* Main Content Area */}
      <div
        className={cn(
          'transition-all duration-300',
          'lg:ml-[260px]',
          isSidebarCollapsed && 'lg:ml-[80px]'
        )}
      >
        {/* Top Navigation */}
        <TopNav 
          onGoToAnalytics={() => {
            setCurrentView('analytics');
            setActiveMenuItem('analytics');
          }}
        />

        {/* Main Content */}
        <main className="px-4 sm:px-6 py-6 sm:py-8 max-w-[1600px] mx-auto">
          {/* Breadcrumb Navigation */}
          <BreadcrumbNav
            items={[
              { label: 'Projects', onClick: () => setCurrentView('tracker') },
              { label: 'All Projects' },
            ]}
          />

          <div className="space-y-4 sm:space-y-6">
            {/* Filter Section */}
            <FilterSection />

            {/* Search Bar & Filter Chips */}
            <SearchBar />

            {/* Data Table */}
            <DataTable />
          </div>
        </main>
      </div>
    </div>
  );
}