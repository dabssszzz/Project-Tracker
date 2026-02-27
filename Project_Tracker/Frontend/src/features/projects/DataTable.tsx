import { Edit2 } from 'lucide-react';
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
import { useTasks } from '../project-tracker/hooks/useProjectTracker';

type ProjectStatus = 'Draft' | 'Editing' | 'Review' | 'Done' | 'In Progress' | 'For Review' | 'Done/Published' | 'Cancelled';

const statusConfig: Record<string, { color: string; bgColor: string }> = {
  Draft: { color: '#6B7280', bgColor: '#F3F4F6' },
  Editing: { color: '#F59E0B', bgColor: '#FEF3C7' },
  Review: { color: '#3B82F6', bgColor: '#DBEAFE' },
  Done: { color: '#10B981', bgColor: '#D1FAE5' },
  'In Progress': { color: '#F59E0B', bgColor: '#FEF3C7' },
  'For Review': { color: '#3B82F6', bgColor: '#DBEAFE' },
  'Done/Published': { color: '#10B981', bgColor: '#D1FAE5' },
  Cancelled: { color: '#EF4444', bgColor: '#FEE2E2' },
};

export function DataTable() {
  const { data: tasks, isLoading, error } = useTasks();

  if (isLoading) return <div className="p-8 text-center text-gray-500">Loading tasks...</div>;
  if (error) return <div className="p-8 text-center text-red-600">Error loading tasks.</div>;

  const displayTasks = (tasks as any)?.map((t: any) => ({
    id: t.taskCode || `ST-${String(t.id).padStart(3, '0')}`,
    project: t.projectName || '-',
    category: t.categoryName || '-',
    mainTask: t.mainTaskName || '-',
    subTask: t.name || '-',
    details: t.details || '-',
    status: t.status as ProjectStatus,
    assignee: {
      name: t.assigneeName || '-',
      avatar: t.assigneeName ? `https://api.dicebear.com/7.x/avataaars/svg?seed=${t.assigneeName}` : undefined,
      initials: t.assigneeName ? t.assigneeName.split(' ').map((n: string) => n[0]).join('') : '?',
    },
    created: t.createdDate ? new Date(t.createdDate).toLocaleDateString() : '-',
    completed: t.status === 'Done/Published' && t.modifiedDate ? new Date(t.modifiedDate).toLocaleDateString() : '-',
  })) || [];

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
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
              {displayTasks.map((task: any, index: number) => (
                <tr
                  key={task.id}
                  className={`hover:bg-gray-50/50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-[#FAFBFC]'}`}
                >
                  <td className="px-6 py-4 text-[13px] font-medium text-gray-900">{task.id}</td>
                  <td className="px-6 py-4 text-[13px] text-gray-900 font-medium">{task.project}</td>
                  <td className="px-6 py-4 text-[13px] text-gray-600">{task.category}</td>
                  <td className="px-6 py-4 text-[13px] text-gray-600">{task.mainTask}</td>
                  <td className="px-6 py-4 text-[13px] text-gray-600">{task.subTask}</td>
                  <td className="px-6 py-4 text-[13px] text-gray-600 max-w-[200px] truncate">{task.details}</td>
                  <td className="px-6 py-4">
                    <Badge
                      className="font-semibold text-[10px] px-2.5 py-0.5 rounded-full"
                      style={{
                        color: statusConfig[task.status]?.color || '#6B7280',
                        backgroundColor: statusConfig[task.status]?.bgColor || '#F3F4F6',
                      }}
                    >
                      {task.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2.5">
                      <Avatar className="h-7 w-7">
                        <AvatarImage src={task.assignee.avatar} />
                        <AvatarFallback>{task.assignee.initials}</AvatarFallback>
                      </Avatar>
                      <span className="text-[13px] text-gray-900">
                        {task.assignee.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-[13px] text-gray-600">{task.created}</td>
                  <td className="px-6 py-4 text-[13px] text-gray-600">{task.completed}</td>
                  <td className="px-6 py-4">
                    <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
                      <Edit2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {displayTasks.length === 0 && (
                <tr>
                  <td colSpan={11} className="px-6 py-8 text-center text-gray-500">
                    No tasks found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="border-t border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Showing <span className="font-medium">1</span> to{' '}
              <span className="font-medium">{displayTasks.length}</span> of{' '}
              <span className="font-medium">{displayTasks.length}</span> results
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
