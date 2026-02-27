import { ArrowLeft, TrendingUp, FolderKanban, CheckCircle2, Users, Calendar } from 'lucide-react';
import { Button } from './ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Calendar as CalendarComponent } from './ui/calendar';
import { format } from 'date-fns';
import { useState } from 'react';
import { SummaryCards } from './analytics/SummaryCards';
import { ChartsSection } from './analytics/ChartsSection';
import { CompletedProjectsTable } from './analytics/CompletedProjectsTable';
import { OngoingProjects } from './analytics/OngoingProjects';
import { BreadcrumbNav } from './ui/breadcrumb-nav';

interface AnalyticsDashboardProps {
  onBackToProjects: () => void;
}

export function AnalyticsDashboard({ onBackToProjects }: AnalyticsDashboardProps) {
  const [startDate, setStartDate] = useState<Date | undefined>(new Date(2026, 1, 1));
  const [endDate, setEndDate] = useState<Date | undefined>(new Date(2026, 1, 26));
  const [groupBy, setGroupBy] = useState('weekly');

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
          {/* Summary Cards */}
          <SummaryCards />

          {/* Charts Section */}
          <ChartsSection />

          {/* Completed Projects Table */}
          <CompletedProjectsTable />

          {/* Ongoing Projects */}
          <OngoingProjects />
        </div>
      </main>
    </div>
  );
}