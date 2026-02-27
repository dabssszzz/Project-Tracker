import { Badge } from '../../../shared/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../../../shared/ui/avatar';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '../../../shared/ui/pagination';

interface OngoingProject {
  id: string;
  project: string;
  category: string;
  assignee: {
    name: string;
    avatar: string;
    initials: string;
  };
  dueDate: string;
  duration: string;
  status: string;
}

const fallbackOngoingProjects: OngoingProject[] = [
  {
    id: 'PRJ-015',
    project: 'Website Redesign',
    category: 'Web Development',
    assignee: {
      name: 'Olivia Martinez',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Olivia',
      initials: 'OM',
    },
    dueDate: 'Mar 15, 2026',
    duration: '45 days',
    status: 'In Progress'
  },
  {
    id: 'PRJ-016',
    project: 'SEO Optimization',
    category: 'Marketing',
    assignee: {
      name: 'Sarah Chen',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
      initials: 'SC',
    },
    dueDate: 'Mar 10, 2026',
    duration: '30 days',
    status: 'Review'
  },
  {
    id: 'PRJ-018',
    project: 'Q2 Content Strategy',
    category: 'Content',
    assignee: {
      name: 'James Wilson',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James',
      initials: 'JW',
    },
    dueDate: 'Apr 02, 2026',
    duration: '60 days',
    status: 'In Progress'
  },
];

export function OngoingProjects({ projects = [] }: { projects?: any[] }) {
  const computedProjects = projects
    .filter((p) => p.isActive)
    .map((p) => ({
      id: `PRJ-${String(p.id).padStart(3, '0')}`,
      project: p.name,
      category: 'General',
      assignee: {
        name: 'Unassigned',
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${p.id}`,
        initials: 'UA',
      },
      dueDate: new Date(p.createdDate).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
      duration: 'Ongoing',
      status: 'In Progress'
    }));

  const displayProjects = computedProjects.length > 0 ? computedProjects : fallbackOngoingProjects;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="px-6 py-5 border-b border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900">Ongoing Projects</h3>
        <p className="text-sm text-gray-500 mt-1">Projects currently in progress</p>
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
                Due Date
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
            {displayProjects.map((project, index) => (
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
                  {project.dueDate}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {project.duration}
                </td>
                <td className="px-6 py-4">
                  <Badge
                    className="font-medium hover:opacity-100 cursor-default shadow-none border-0"
                    style={{
                      color: project.status === 'Review' ? '#B45309' : '#B91C1C',
                      backgroundColor: project.status === 'Review' ? '#FEF3C7' : '#FEE2E2',
                    }}
                  >
                    {project.status}
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
            <span className="font-medium">{displayProjects.length}</span> of{' '}
            <span className="font-medium">{displayProjects.length}</span> results
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
  );
}
