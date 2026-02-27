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
import { useState, useMemo } from 'react';
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';

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


export function CompletedProjectsTable({ projects = [] }: { projects?: any[] }) {
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);

  const computedProjects = useMemo(() => {
    return projects
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
      return <ArrowUpDown className="ml-2 h-3 w-3" />;
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
        <h3 className="text-lg font-semibold text-gray-900">Completed Projects</h3>
        <p className="text-sm text-gray-500 mt-1">Recently finished marketing initiatives</p>
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
                onClick={() => handleSort('completedDate')}
              >
                <div className="flex items-center">
                  Completed Date
                  {getSortIcon('completedDate')}
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
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Status
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
