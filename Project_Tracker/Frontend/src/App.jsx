import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import { cn } from './shared/ui/utils';
import { Sidebar } from './app/layout/Sidebar';
import { ExecutiveDashboardView } from './features/dashboard/ExecutiveDashboardView';
import { AnalyticsDashboard } from './features/analytics/AnalyticsDashboard';
import { ProjectList } from './features/projects/ProjectList';
import { SettingsView } from './features/settings/SettingsView';

const queryClient = new QueryClient({
  // ... (queryClient options remains same)
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

import { useNavigate } from 'react-router-dom';
import { TopNav } from './app/layout/TopNav';
import { AddProjectModal } from './features/projects/components/AddProjectModal';

function AppLayout({ children, isSidebarCollapsed, setIsSidebarCollapsed }) {
  const [isAddProjectModalOpen, setIsAddProjectModalOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F8F9FB' }}>
      <TopNav
        onGoToAnalytics={() => navigate('/analytics')}
        onAddProject={() => setIsAddProjectModalOpen(true)}
      />
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />
      <main
        className={cn(
          'transition-all duration-300 min-h-[calc(100vh-73px)] pt-4',
          isSidebarCollapsed ? 'lg:ml-[80px]' : 'lg:ml-[260px]'
        )}
      >
        {children}
      </main>

      <AddProjectModal
        isOpen={isAddProjectModalOpen}
        onClose={() => setIsAddProjectModalOpen(false)}
      />
    </div>
  );
}

function App() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout isSidebarCollapsed={isSidebarCollapsed} setIsSidebarCollapsed={setIsSidebarCollapsed}><ExecutiveDashboardView /></AppLayout>} />
          <Route path="/projects" element={<AppLayout isSidebarCollapsed={isSidebarCollapsed} setIsSidebarCollapsed={setIsSidebarCollapsed}><ProjectList /></AppLayout>} />
          <Route path="/analytics" element={<AppLayout isSidebarCollapsed={isSidebarCollapsed} setIsSidebarCollapsed={setIsSidebarCollapsed}><AnalyticsDashboard onBackToProjects={() => window.history.back()} /></AppLayout>} />
          <Route path="/settings" element={<AppLayout isSidebarCollapsed={isSidebarCollapsed} setIsSidebarCollapsed={setIsSidebarCollapsed}><SettingsView /></AppLayout>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
