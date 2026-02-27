import { Badge } from '../../../shared/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../../../shared/ui/avatar';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '../../../shared/ui/pagination';

interface CompletedProject {
  id: string;
  project: string;
  category: string;
  assignee: {
    name: string;
    avatar: string;
    initials: string;
  };
  completedDate: string;
  duration: string;
}

const completedProjects: CompletedProject[] = [
  {
    id: 'PRJ-003',
    project: 'Brand Guidelines',
    category: 'Branding',
    assignee: {
      name: 'Emily Parker',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily',
      initials: 'EP',
    },
    completedDate: 'Feb 20, 2026',
    duration: '19 days',
  },
  {
    id: 'PRJ-007',
    project: 'Customer Survey',
    category: 'Research',
    assignee: {
      name: 'Michael Rodriguez',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
      initials: 'MR',
    },
    completedDate: 'Feb 22, 2026',
    duration: '17 days',
  },
  {
    id: 'PRJ-011',
    project: 'Social Media Calendar',
    category: 'Social Media',
    assignee: {
      name: 'Sarah Chen',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
      initials: 'SC',
    },
    completedDate: 'Feb 18, 2026',
    duration: '12 days',
  },
  {
    id: 'PRJ-014',
    project: 'Product Launch Plan',
    category: 'Marketing',
    assignee: {
      name: 'James Wilson',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James',
      initials: 'JW',
    },
    completedDate: 'Feb 25, 2026',
    duration: '21 days',
  },
];

export function CompletedProjectsTable({ projects = [] }: { projects?: any[] }) {
  const completedProjects = projects
    .filter((p) => !p.isActive)
    .map((p) => ({
      id: `PRJ-${String(p.id).padStart(3, '0')}`,
      project: p.name,
      category: 'General',
      assignee: {
        name: 'Unassigned',
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${p.id}`,
        initials: 'UA',
      },
      completedDate: new Date(p.createdDate).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
      duration: 'N/A',
    }));

  if (completedProjects.length === 0) return null;
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="px-6 py-5 border-b border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900">Completed Projects</h3>
        <p className="text-sm text-gray-500 mt-1">Recently finished marketing initiatives</p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr className="border-b border-gray-200">
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Project ID
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Project Name
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Assignee
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Completed Date
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Duration
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {completedProjects.map((project, index) => (
              <tr
                key={project.id}
                className={`hover:bg-gray-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'
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
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={project.assignee.avatar} />
                      <AvatarFallback>{project.assignee.initials}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-gray-900">
                      {project.assignee.name}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {project.completedDate}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {project.duration}
                </td>
                <td className="px-6 py-4">
                  <Badge
                    className="font-medium"
                    style={{
                      color: '#10B981',
                      backgroundColor: '#D1FAE5',
                    }}
                  >
                    Completed
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="border-t border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Showing <span className="font-medium">1</span> to{' '}
            <span className="font-medium">4</span> of{' '}
            <span className="font-medium">12</span> results
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
  );
}
