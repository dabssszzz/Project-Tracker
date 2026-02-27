import { Edit2 } from 'lucide-react';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from './ui/pagination';
import { Button } from './ui/button';
import { MobileProjectCard } from './MobileProjectCard';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';

type ProjectStatus = 'Draft' | 'Editing' | 'Review' | 'Done';

interface Project {
  id: string;
  project: string;
  category: string;
  mainTask: string;
  subtask: string;
  details: string;
  status: ProjectStatus;
  assignee: {
    name: string;
    avatar: string;
    initials: string;
  };
  created: string;
  completed: string;
}

const mockData: Project[] = [
  {
    id: 'PRJ-001',
    project: 'Q1 Campaign Launch',
    category: 'Social Media',
    mainTask: 'Content Creation',
    subtask: 'Video Production',
    details: 'Create 15-second Instagram reels for product launch',
    status: 'Editing',
    assignee: {
      name: 'Sarah Chen',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
      initials: 'SC',
    },
    created: 'Feb 15, 2026',
    completed: 'Feb 28, 2026',
  },
  {
    id: 'PRJ-002',
    project: 'Email Newsletter',
    category: 'Email Marketing',
    mainTask: 'Design',
    subtask: 'Template Creation',
    details: 'Design responsive email template for monthly newsletter',
    status: 'Review',
    assignee: {
      name: 'Michael Rodriguez',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
      initials: 'MR',
    },
    created: 'Feb 10, 2026',
    completed: 'Feb 25, 2026',
  },
  {
    id: 'PRJ-003',
    project: 'Brand Guidelines',
    category: 'Branding',
    mainTask: 'Documentation',
    subtask: 'Style Guide',
    details: 'Update brand color palette and typography guidelines',
    status: 'Done',
    assignee: {
      name: 'Emily Parker',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily',
      initials: 'EP',
    },
    created: 'Feb 01, 2026',
    completed: 'Feb 20, 2026',
  },
  {
    id: 'PRJ-004',
    project: 'SEO Optimization',
    category: 'Content',
    mainTask: 'Research',
    subtask: 'Keyword Analysis',
    details: 'Conduct keyword research for blog content strategy',
    status: 'Draft',
    assignee: {
      name: 'James Wilson',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James',
      initials: 'JW',
    },
    created: 'Feb 18, 2026',
    completed: 'Mar 05, 2026',
  },
  {
    id: 'PRJ-005',
    project: 'Webinar Series',
    category: 'Events',
    mainTask: 'Promotion',
    subtask: 'Landing Page',
    details: 'Build landing page for upcoming webinar series',
    status: 'Editing',
    assignee: {
      name: 'Olivia Martinez',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Olivia',
      initials: 'OM',
    },
    created: 'Feb 12, 2026',
    completed: 'Feb 26, 2026',
  },
  {
    id: 'PRJ-006',
    project: 'Product Launch Video',
    category: 'Video',
    mainTask: 'Production',
    subtask: 'Editing',
    details: 'Edit 2-minute product demo video for website',
    status: 'Review',
    assignee: {
      name: 'Sarah Chen',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
      initials: 'SC',
    },
    created: 'Feb 08, 2026',
    completed: 'Feb 24, 2026',
  },
  {
    id: 'PRJ-007',
    project: 'Customer Survey',
    category: 'Research',
    mainTask: 'Data Collection',
    subtask: 'Survey Design',
    details: 'Create customer satisfaction survey questionnaire',
    status: 'Done',
    assignee: {
      name: 'Michael Rodriguez',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
      initials: 'MR',
    },
    created: 'Feb 05, 2026',
    completed: 'Feb 22, 2026',
  },
  {
    id: 'PRJ-008',
    project: 'Blog Content Calendar',
    category: 'Content',
    mainTask: 'Planning',
    subtask: 'Topic Research',
    details: 'Plan blog topics for Q2 content calendar',
    status: 'Draft',
    assignee: {
      name: 'Emily Parker',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily',
      initials: 'EP',
    },
    created: 'Feb 19, 2026',
    completed: 'Mar 01, 2026',
  },
];

const statusConfig: Record<ProjectStatus, { color: string; bgColor: string }> = {
  Draft: { color: '#6B7280', bgColor: '#F3F4F6' },
  Editing: { color: '#F59E0B', bgColor: '#FEF3C7' },
  Review: { color: '#3B82F6', bgColor: '#DBEAFE' },
  Done: { color: '#10B981', bgColor: '#D1FAE5' },
};

export function DataTable() {
  return (
    <>
      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {mockData.map((project) => (
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
        
        {/* Mobile Pagination */}
        <div className="flex justify-center pt-4">
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
                <PaginationLink href="#">2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>

      {/* Desktop/Tablet Table View */}
      <div className="hidden md:block bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-shadow hover:shadow-md">
        {/* Table Container with horizontal scroll */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 sticky top-0 z-10">
              <tr className="border-b border-gray-200">
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider min-w-[180px]">
                  Project
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Main Task
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Subtask
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider min-w-[280px]">
                  Details
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider min-w-[180px]">
                  Assignee
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Created
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Completed
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {mockData.map((project, index) => (
                <tr
                  key={project.id}
                  className={`hover:bg-gray-50 transition-colors duration-150 ${
                    index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'
                  }`}
                >
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {project.id}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {project.project}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {project.category}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {project.mainTask}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {project.subtask}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {project.details}
                  </td>
                  <td className="px-6 py-4">
                    <Badge
                      className="font-medium transition-transform hover:scale-105"
                      style={{
                        color: statusConfig[project.status].color,
                        backgroundColor: statusConfig[project.status].bgColor,
                      }}
                    >
                      {project.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8 transition-transform hover:scale-110">
                        <AvatarImage src={project.assignee.avatar} />
                        <AvatarFallback>{project.assignee.initials}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-gray-900">
                        {project.assignee.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {project.created}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {project.completed}
                  </td>
                  <td className="px-6 py-4">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-gray-600 hover:text-gray-900 transition-all hover:scale-110"
                      title="Edit project"
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
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
              <span className="font-medium">8</span> of{' '}
              <span className="font-medium">8</span> results
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
                  <PaginationLink href="#">2</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
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