import { Edit2 } from 'lucide-react';
import { Badge } from '../../shared/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../../shared/ui/avatar';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '../../shared/ui/pagination';
import { Button } from '../../shared/ui/button';
import { MobileProjectCard } from './MobileProjectCard';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../../shared/ui/tooltip';
import { useProjects } from '../../hooks/useProjects';

type ProjectStatus = 'Draft' | 'Editing' | 'Review' | 'Done';

const statusConfig: Record<ProjectStatus, { color: string; bgColor: string }> = {
  Draft: { color: '#6B7280', bgColor: '#F3F4F6' },
  Editing: { color: '#F59E0B', bgColor: '#FEF3C7' },
  Review: { color: '#3B82F6', bgColor: '#DBEAFE' },
  Done: { color: '#10B981', bgColor: '#D1FAE5' },
};

export function DataTable() {
  const { data: projectsData, isLoading, error } = useProjects();

  if (isLoading) return <div className="p-8 text-center text-gray-500">Loading projects...</div>;
  if (error) return <div className="p-8 text-center text-red-600">Error loading projects.</div>;

  const displayProjects = projectsData?.map((p: any) => ({
    id: `PRJ-${String(p.id).padStart(3, '0')}`,
    project: p.name,
    category: 'Social Media', // Placeholder
    mainTask: 'Content Creation', // Placeholder
    subTask: 'Video Production', // Placeholder
    details: 'Create 15-second Instagram reels for product launch', // Placeholder
    status: (p.isActive ? 'Editing' : 'Done') as ProjectStatus,
    assignee: {
      name: 'Sarah Chen',
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah`,
      initials: 'SC',
    },
    created: 'Feb 15, 2026',
    completed: 'Feb 28, 2026',
  })) || [];

  return (
    <>
      {/* Mobile Card View (remains same for now) */}
      <div className="md:hidden space-y-4">
        {displayProjects.map((project: any) => (
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
            <thead className="bg-[#FFFFFF] border-b border-gray-100">
              <tr>
                {[
                  'ID', 'PROJECT', 'CATEGORY', 'MAIN TASK', 'SUBTASK', 'DETAILS', 'STATUS', 'ASSIGNEE', 'CREATED', 'COMPLETED', 'ACTIONS'
                ].map((header) => (
                  <th key={header} className="px-6 py-5 text-left">
                    <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                      {header}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {displayProjects.map((project: any, index: number) => (
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
                    <div className="flex items-center gap-2.5">
                      <Avatar className="h-7 w-7">
                        <AvatarImage src={project.assignee.avatar} />
                        <AvatarFallback>{project.assignee.initials}</AvatarFallback>
                      </Avatar>
                      <span className="text-[13px] text-gray-900">
                        {project.assignee.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-[13px] text-gray-600">{project.created}</td>
                  <td className="px-6 py-4 text-[13px] text-gray-600">{project.completed}</td>
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
              Showing <span className="font-medium">1</span> to{' '}
              <span className="font-medium">{displayProjects.length}</span> of{' '}
              <span className="font-medium">{displayProjects.length}</span> results
            </div>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" size="default" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive size="default">
                    1
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" size="default" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </div>
    </>
  );
}