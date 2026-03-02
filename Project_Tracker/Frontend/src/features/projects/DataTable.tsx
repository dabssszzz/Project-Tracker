import { Edit2, ChevronUp, ChevronDown } from 'lucide-react';
import { Badge } from '../../shared/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../../shared/ui/avatar';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '../../shared/ui/pagination';
import { Button } from '../../shared/ui/button';
import { MobileProjectCard } from './MobileProjectCard';
import { useProjects } from '../../hooks/useProjects';
import { useMemo } from 'react';

type ProjectStatus = 'Draft' | 'Editing' | 'Review' | 'Done';

const statusConfig: Record<ProjectStatus, { color: string; bgColor: string }> = {
  Draft: { color: '#6B7280', bgColor: '#F3F4F6' },
  Editing: { color: '#F59E0B', bgColor: '#FEF3C7' },
  Review: { color: '#3B82F6', bgColor: '#DBEAFE' },
  Done: { color: '#10B981', bgColor: '#D1FAE5' },
};

interface DataTableProps {
  searchQuery: string;
  filters: {
    assignee: string;
    status: string;
    startDate: Date | undefined;
    endDate: Date | undefined;
  };
  sortConfig: { key: string; direction: 'asc' | 'desc' } | null;
  onSort: (key: string) => void;
}

export function DataTable({ searchQuery, filters, sortConfig, onSort }: DataTableProps) {
  const { data: projectsData, isLoading, error } = useProjects();

  const allProjects = useMemo(() => {
    if (!projectsData) return [];

    return projectsData.map((p: any) => ({
      id: `PRJ-${String(p.id).padStart(3, '0')}`,
      project: p.name,
      category: 'Social Media', // Consistent with Analytics/hardcoding for now
      mainTask: 'Content Creation',
      subTask: 'Video Production',
      details: 'Create 15-second Instagram reels for product launch',
      status: (p.isActive ? 'Editing' : 'Done') as ProjectStatus,
      assignee: {
        name: 'Sarah Chen',
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah`,
        initials: 'SC',
      },
      createdDate: p.createdDate || '2026-02-15',
      completed: 'Feb 28, 2026',
      isActive: p.isActive
    }));
  }, [projectsData]);

  const filteredProjects = useMemo(() => {
    return allProjects.filter((project: any) => {
      // Search
      const matchesSearch = searchQuery === '' ||
        project.project.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.id.toLowerCase().includes(searchQuery.toLowerCase());

      // Assignee
      const matchesAssignee = filters.assignee === 'all' ||
        project.assignee.name.toLowerCase().includes(filters.assignee.toLowerCase());

      // Status
      const matchesStatus = filters.status === 'all' || project.status === filters.status;

      // Date Range
      const projectDate = new Date(project.createdDate);
      const matchesStartDate = !filters.startDate || projectDate >= filters.startDate;
      const matchesEndDate = !filters.endDate || projectDate <= filters.endDate;

      return matchesSearch && matchesAssignee && matchesStatus && matchesStartDate && matchesEndDate;
    });
  }, [allProjects, searchQuery, filters]);

  const sortedProjects = useMemo(() => {
    if (!sortConfig) return filteredProjects;

    return [...filteredProjects].sort((a, b) => {
      let aValue: any = a[sortConfig.key as keyof typeof a];
      let bValue: any = b[sortConfig.key as keyof typeof b];

      // Handle nested assignee name
      if (sortConfig.key === 'assignee') {
        aValue = a.assignee.name;
        bValue = b.assignee.name;
      }

      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredProjects, sortConfig]);

  if (isLoading) return <div className="p-8 text-center text-gray-500">Loading projects...</div>;
  if (error) return <div className="p-8 text-center text-red-600">Error loading projects.</div>;

  const SortIcon = ({ column }: { column: string }) => {
    if (sortConfig?.key !== column) return null;
    return sortConfig.direction === 'asc' ? (
      <ChevronUp className="h-4 w-4 text-[#E10600]" />
    ) : (
      <ChevronDown className="h-4 w-4 text-[#E10600]" />
    );
  };

  return (
    <>
      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {sortedProjects.map((project: any) => (
          <MobileProjectCard
            key={project.id}
            project={{
              id: project.id,
              project: project.project,
              category: project.category,
              status: project.status,
              assignee: project.assignee,
              completed: project.completed,
            }}
          />
        ))}
      </div>

      {/* Desktop/Tablet Table View */}
      <div className="hidden md:block bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#FFFFFF] border-b border-gray-100 text-nowrap">
              <tr>
                {[
                  { label: 'ID', key: 'id' },
                  { label: 'PROJECT', key: 'project' },
                  { label: 'CATEGORY', key: 'category' },
                  { label: 'MAIN TASK', key: 'mainTask' },
                  { label: 'SUBTASK', key: 'subTask' },
                  { label: 'DETAILS', key: 'details' },
                  { label: 'STATUS', key: 'status' },
                  { label: 'ASSIGNEE', key: 'assignee' },
                  { label: 'CREATED', key: 'createdDate' },
                  { label: 'COMPLETED', key: 'completed' },
                  { label: 'ACTIONS', key: null }
                ].map((col) => (
                  <th
                    key={col.label}
                    className={`px-6 py-5 text-left ${col.key ? 'cursor-pointer select-none group' : ''}`}
                    onClick={() => col.key && onSort(col.key)}
                  >
                    <div className="flex items-center gap-1">
                      <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider group-hover:text-gray-900 transition-colors">
                        {col.label}
                      </span>
                      {col.key && <SortIcon column={col.key} />}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {sortedProjects.map((project: any, index: number) => (
                <tr
                  key={project.id}
                  className={`hover:bg-gray-50/50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-[#FAFBFC]'
                    }`}
                >
                  <td className="px-6 py-4 text-[13px] font-medium text-gray-900">{project.id}</td>
                  <td className="px-6 py-4 text-[13px] text-gray-900 font-medium">{project.project}</td>
                  <td className="px-6 py-4 text-[13px] text-gray-600">{project.category}</td>
                  <td className="px-6 py-4 text-[13px] text-gray-600">{project.mainTask}</td>
                  <td className="px-6 py-4 text-[13px] text-gray-600">{project.subTask}</td>
                  <td className="px-6 py-4 text-[13px] text-gray-600 max-w-[200px] truncate">{project.details}</td>
                  <td className="px-6 py-4">
                    <Badge
                      className="font-semibold text-[10px] px-2.5 py-0.5 rounded-full"
                      style={{
                        color: statusConfig[project.status as ProjectStatus].color,
                        backgroundColor: statusConfig[project.status as ProjectStatus].bgColor,
                      }}
                    >
                      {project.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2.5 text-nowrap">
                      <Avatar className="h-7 w-7">
                        <AvatarImage src={project.assignee.avatar} />
                        <AvatarFallback>{project.assignee.initials}</AvatarFallback>
                      </Avatar>
                      <span className="text-[13px] text-gray-900">
                        {project.assignee.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-[13px] text-nowrap text-gray-600">{project.createdDate}</td>
                  <td className="px-6 py-4 text-[13px] text-nowrap text-gray-600">{project.completed}</td>
                  <td className="px-6 py-4">
                    <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
                      <Edit2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="border-t border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Showing <span className="font-medium">{sortedProjects.length > 0 ? 1 : 0}</span> to{' '}
              <span className="font-medium">{sortedProjects.length}</span> of{' '}
              <span className="font-medium">{sortedProjects.length}</span> results
            </div>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>
                    1
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </div>
    </>
  );
}