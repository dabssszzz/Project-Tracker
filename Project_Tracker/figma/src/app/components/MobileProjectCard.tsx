import { Edit2, Calendar } from 'lucide-react';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';

type ProjectStatus = 'Draft' | 'Editing' | 'Review' | 'Done';

interface MobileProject {
  id: string;
  project: string;
  category: string;
  status: ProjectStatus;
  assignee: {
    name: string;
    avatar: string;
    initials: string;
  };
  completed: string;
}

const statusConfig: Record<ProjectStatus, { color: string; bgColor: string }> = {
  Draft: { color: '#6B7280', bgColor: '#F3F4F6' },
  Editing: { color: '#F59E0B', bgColor: '#FEF3C7' },
  Review: { color: '#3B82F6', bgColor: '#DBEAFE' },
  Done: { color: '#10B981', bgColor: '#D1FAE5' },
};

interface MobileProjectCardProps {
  project: MobileProject;
}

export function MobileProjectCard({ project }: MobileProjectCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-all duration-200">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 mb-1">{project.project}</h3>
          <p className="text-sm text-gray-500">{project.category}</p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-gray-600 hover:text-gray-900 -mt-1 -mr-1 transition-colors"
        >
          <Edit2 className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex items-center justify-between mb-3">
        <Badge
          className="font-medium"
          style={{
            color: statusConfig[project.status].color,
            backgroundColor: statusConfig[project.status].bgColor,
          }}
        >
          {project.status}
        </Badge>
        <div className="flex items-center gap-1 text-sm text-gray-500">
          <Calendar className="h-4 w-4" />
          <span>{project.completed}</span>
        </div>
      </div>

      <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
        <Avatar className="h-7 w-7">
          <AvatarImage src={project.assignee.avatar} />
          <AvatarFallback className="text-xs">{project.assignee.initials}</AvatarFallback>
        </Avatar>
        <span className="text-sm text-gray-700">{project.assignee.name}</span>
      </div>
    </div>
  );
}
