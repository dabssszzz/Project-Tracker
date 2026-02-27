import { ArrowLeft, TrendingUp, FolderKanban, CheckCircle2, Users, Calendar } from 'lucide-react';
import { Button } from '../../shared/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../shared/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '../../shared/ui/popover';
import { Calendar as CalendarComponent } from '../../shared/ui/calendar';
import { format } from 'date-fns';
import { useState } from 'react';
import { SummaryCards } from './components/SummaryCards';
import { ChartsSection } from './components/ChartsSection';
import { CompletedProjectsTable } from './components/CompletedProjectsTable';
import { OngoingProjects } from './components/OngoingProjects';
import { BreadcrumbNav } from '../../shared/ui/breadcrumb-nav';
import { useAnalyticsDashboard } from '../../hooks/useAnalytics';
import { useProjects } from '../../hooks/useProjects';
import { AnalyticsFilterSection } from './components/AnalyticsFilterSection';

interface AnalyticsDashboardProps {
  onBackToProjects: () => void;
}

export function AnalyticsDashboard({ onBackToProjects }: AnalyticsDashboardProps) {
  const [startDate, setStartDate] = useState<Date | undefined>(new Date(2026, 1, 1));
  const [endDate, setEndDate] = useState<Date | undefined>(new Date(2026, 1, 26));
  const [groupBy, setGroupBy] = useState('weekly');
  const [assignee, setAssignee] = useState('all');
  const [status, setStatus] = useState('all');
  const [category, setCategory] = useState('all');
  const [completionStatus, setCompletionStatus] = useState('all');

  const { data: analyticsData, isLoading: isAnalyticsLoading, error: analyticsError } = useAnalyticsDashboard();
  const { data: projectsData, isLoading: isProjectsLoading, error: projectsError } = useProjects();

  if (isAnalyticsLoading || isProjectsLoading) return <div className="p-8 text-center text-gray-500">Loading analytics...</div>;
  if (analyticsError || projectsError) return <div className="p-8 text-center text-red-600">Error loading analytics data.</div>;

  const metrics = analyticsData || {};
  const apiProjects = projectsData || [];

  // Fallback data consolidated from table components
  const fallbackProjects = [
    {
      id: 'mock-1',
      name: 'Brand Guidelines',
      category: 'Branding',
      assignee: 'Emily Parker',
      createdDate: '2026-02-01',
      isActive: false,
      status: 'Done'
    },
    {
      id: 'mock-2',
      name: 'Customer Survey',
      category: 'Research',
      assignee: 'Michael Rodriguez',
      createdDate: '2026-02-05',
      isActive: false,
      status: 'Done'
    },
    {
      id: 'mock-3',
      name: 'Social Media Calendar',
      category: 'Social Media',
      assignee: 'Sarah Chen',
      createdDate: '2026-02-10',
      isActive: false,
      status: 'Done'
    },
    {
      id: 'mock-4',
      name: 'Website Redesign',
      category: 'Web Development',
      assignee: 'Olivia Martinez',
      createdDate: '2026-02-12',
      isActive: true,
      status: 'In Progress'
    },
    {
      id: 'mock-5',
      name: 'SEO Optimization',
      category: 'Marketing',
      assignee: 'Sarah Chen',
      createdDate: '2026-02-15',
      isActive: true,
      status: 'Review'
    }
  ];

  const allProjects = [
    ...(apiProjects.map((p: any) => ({
      ...p,
      assignee: 'Sarah Chen', // Consistent with DataTable.tsx hardcoding
      category: 'Social Media',
      status: p.isActive ? 'Editing' : 'Done',
      createdDate: p.createdDate || '2026-02-15'
    }))),
    ...(apiProjects.length === 0 ? fallbackProjects : [])
  ];

  // Client-side filtering logic
  const filteredProjects = allProjects.filter((project: any) => {
    const projectAssignee = project.assignee || 'Unassigned';

    const matchesAssignee = assignee === 'all' || projectAssignee.toLowerCase().includes(assignee.toLowerCase());
    const matchesStatus = status === 'all' || project.status === status;
    const matchesCategory = category === 'all' || project.category === category;
    const matchesCompletion =
      completionStatus === 'all' ||
      (completionStatus === 'active' && project.isActive) ||
      (completionStatus === 'completed' && !project.isActive);

    // Date filtering
    const projectDate = new Date(project.createdDate);
    const matchesStartDate = !startDate || projectDate >= startDate;
    const matchesEndDate = !endDate || projectDate <= endDate;

    return (
      matchesAssignee &&
      matchesStatus &&
      matchesCategory &&
      matchesCompletion &&
      matchesStartDate &&
      matchesEndDate
    );
  });

  // Re-calculate complex metrics for charts derived from filtered projects
  const tasksByStatusMap: Record<string, number> = {};
  const tasksByAssigneeMap: Record<string, number> = {};

  filteredProjects.forEach((p: any) => {
    // Status counts
    const s = p.status || 'Draft';
    tasksByStatusMap[s] = (tasksByStatusMap[s] || 0) + 1;

    // Assignee counts
    const a = p.assignee || 'Unassigned';
    tasksByAssigneeMap[a] = (tasksByAssigneeMap[a] || 0) + 1;
  });

  const tasksByStatus = Object.entries(tasksByStatusMap).map(([name, value]) => ({ name, value }));
  const tasksByAssignee = Object.entries(tasksByAssigneeMap).map(([name, value]) => ({ name, value }));

  // Re-calculate Stacked Bar data (Assignee & Category)
  const assigneeProjectMap: Record<string, any> = {};
  filteredProjects.forEach((p: any) => {
    const a = p.assignee || 'Unassigned';
    const cat = p.category || 'Other';
    if (!assigneeProjectMap[a]) {
      assigneeProjectMap[a] = { assignee: a };
    }
    assigneeProjectMap[a][cat] = (assigneeProjectMap[a][cat] || 0) + 1;
  });
  const tasksByAssigneeProject = Object.values(assigneeProjectMap);

  // Simple Trend Data based on filtered count
  const completionTrend = [
    { week: 'Week 1', completed: Math.floor(filteredProjects.length * 0.2), total: Math.floor(filteredProjects.length * 0.3) },
    { week: 'Week 2', completed: Math.floor(filteredProjects.length * 0.4), total: Math.floor(filteredProjects.length * 0.5) },
    { week: 'Week 3', completed: Math.floor(filteredProjects.length * 0.6), total: Math.floor(filteredProjects.length * 0.7) },
    { week: 'Week 4', completed: Math.floor(filteredProjects.length * 0.8), total: Math.floor(filteredProjects.length * 0.9) },
    { week: 'Week 5', completed: filteredProjects.length, total: filteredProjects.length + 2 },
  ];

  // Derived metrics from filtered projects for charts and cards
  const derivedMetrics = {
    ...metrics,
    totalTasks: filteredProjects.length,
    completedTasks: filteredProjects.filter((p: any) => !p.isActive).length,
    inProgressTasks: filteredProjects.filter((p: any) => p.isActive).length,
    forReviewTasks: filteredProjects.filter((p: any) => p.status === 'Review').length,
    tasksByStatus: tasksByStatus.length > 0 ? tasksByStatus : (filteredProjects.length === 0 ? [] : metrics.tasksByStatus),
    tasksByAssignee: tasksByAssignee.length > 0 ? tasksByAssignee : (filteredProjects.length === 0 ? [] : metrics.tasksByAssignee),
    tasksByAssigneeProject: tasksByAssigneeProject.length > 0 ? tasksByAssigneeProject : [],
    completionTrend: filteredProjects.length > 0 ? completionTrend : [],
  };

  const resetFilters = () => {
    setStartDate(new Date(2026, 1, 1));
    setEndDate(new Date(2026, 1, 26));
    setAssignee('all');
    setStatus('all');
    setCategory('all');
    setCompletionStatus('all');
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F8F9FB' }}>
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="px-4 sm:px-6 py-4 sm:py-6 max-w-[1600px] mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Left: Back button and Title */}
            <div className="flex items-center gap-3 sm:gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={onBackToProjects}
                className="text-gray-600 hover:text-gray-900 transition-all hover:scale-110"
                title="Back to projects"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">
                  Marketing Project Report
                </h1>
                <p className="text-xs sm:text-sm text-gray-500 mt-1">
                  Analytics and insights for your marketing projects
                </p>
              </div>
            </div>

            {/* Right: Date filters and Group By */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              {/* Start Date */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="justify-start text-left font-normal bg-white min-w-[120px] sm:min-w-[140px] transition-all hover:border-gray-400 text-sm"
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    <span className="truncate">{startDate ? format(startDate, 'MMM dd') : 'Start date'}</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent
                    mode="single"
                    selected={startDate}
                    onSelect={setStartDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>

              <span className="text-gray-400 hidden sm:inline">—</span>

              {/* End Date */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="justify-start text-left font-normal bg-white min-w-[120px] sm:min-w-[140px] transition-all hover:border-gray-400 text-sm"
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    <span className="truncate">{endDate ? format(endDate, 'MMM dd') : 'End date'}</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent
                    mode="single"
                    selected={endDate}
                    onSelect={setEndDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>

              {/* Group By Dropdown */}
              <Select value={groupBy} onValueChange={setGroupBy}>
                <SelectTrigger className="bg-white min-w-[120px] sm:min-w-[140px] text-sm">
                  <SelectValue placeholder="Group by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="px-4 sm:px-6 py-6 sm:py-8 max-w-[1600px] mx-auto">
        {/* Breadcrumb Navigation */}
        <BreadcrumbNav
          items={[
            { label: 'Projects', onClick: onBackToProjects },
            { label: 'Analytics' },
          ]}
        />

        <div className="space-y-6 sm:space-y-8">
          {/* Analytics Filters */}
          <AnalyticsFilterSection
            startDate={startDate}
            endDate={endDate}
            assignee={assignee}
            status={status}
            category={category}
            completionStatus={completionStatus}
            onStartDateChange={setStartDate}
            onEndDateChange={setEndDate}
            onAssigneeChange={setAssignee}
            onStatusChange={setStatus}
            onCategoryChange={setCategory}
            onCompletionStatusChange={setCompletionStatus}
            onReset={resetFilters}
          />

          {/* Summary Cards */}
          <SummaryCards metrics={derivedMetrics} />

          {/* Charts Section */}
          <ChartsSection metrics={derivedMetrics} />

          {/* Completed Projects Table */}
          <CompletedProjectsTable projects={filteredProjects} />

          {/* Ongoing Projects */}
          <OngoingProjects projects={filteredProjects} />
        </div>
      </main>
    </div>
  );
}