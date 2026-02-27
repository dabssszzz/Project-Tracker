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
import { useState, useMemo } from 'react';
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';

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


export function OngoingProjects({ projects = [] }: { projects?: any[] }) {
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);

  const computedProjects = useMemo(() => {
    return projects
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
  }, [projects]);

  const sortedProjects = useMemo(() => {
    const list = [...computedProjects];
    if (sortConfig !== null) {
      list.sort((a: any, b: any) => {
        let aValue = a[sortConfig.key];
        let bValue = b[sortConfig.key];

        // Handle nested assignee name
        if (sortConfig.key === 'assignee') {
          aValue = a.assignee.name;
          bValue = b.assignee.name;
        }

        if (aValue < bValue) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return list;
  }, [computedProjects, sortConfig]);

  const handleSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key: string) => {
    if (!sortConfig || sortConfig.key !== key) {
      return <ArrowUpDown className="ml-2 h-3 w-3 text-gray-400" />;
    }
    return sortConfig.direction === 'asc' ? (
      <ArrowUp className="ml-2 h-3 w-3 text-red-600" />
    ) : (
      <ArrowDown className="ml-2 h-3 w-3 text-red-600" />
    );
  };

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
              <th
                className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => handleSort('id')}
              >
                <div className="flex items-center">
                  Project ID
                  {getSortIcon('id')}
                </div>
              </th>
              <th
                className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => handleSort('project')}
              >
                <div className="flex items-center">
                  Project Name
                  {getSortIcon('project')}
                </div>
              </th>
              <th
                className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => handleSort('category')}
              >
                <div className="flex items-center">
                  Category
                  {getSortIcon('category')}
                </div>
              </th>
              <th
                className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => handleSort('assignee')}
              >
                <div className="flex items-center">
                  Assignee
                  {getSortIcon('assignee')}
                </div>
              </th>
              <th
                className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => handleSort('dueDate')}
              >
                <div className="flex items-center">
                  Due Date
                  {getSortIcon('dueDate')}
                </div>
              </th>
              <th
                className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => handleSort('duration')}
              >
                <div className="flex items-center">
                  Duration
                  {getSortIcon('duration')}
                </div>
              </th>
              <th
                className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => handleSort('status')}
              >
                <div className="flex items-center">
                  Status
                  {getSortIcon('status')}
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {sortedProjects.map((project, index) => (
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
  );
}
