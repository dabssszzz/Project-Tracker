import { FolderOpen, Plus } from 'lucide-react';
import { Button } from '../../../shared/ui/button';

export function OngoingProjects({ projects = [] }: { projects?: any[] }) {
  const ongoingProjectsList = projects.filter((p) => p.isActive);

  if (ongoingProjectsList.length > 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="px-6 py-5 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">Ongoing Projects</h3>
          <p className="text-sm text-gray-500 mt-1">Projects currently in progress</p>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {ongoingProjectsList.map((project) => (
              <div key={project.id} className="p-4 border border-gray-100 rounded-lg hover:shadow-sm transition-shadow">
                <h4 className="font-semibold text-gray-900 mb-1">{project.name}</h4>
                <p className="text-sm text-gray-500">Created: {new Date(project.createdDate).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="px-6 py-5 border-b border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900">Ongoing Projects</h3>
        <p className="text-sm text-gray-500 mt-1">Projects currently in progress</p>
      </div>

      {/* Empty State */}
      <div className="flex flex-col items-center justify-center py-16 px-6">
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
          style={{ backgroundColor: '#FEE2E2' }}
        >
          <FolderOpen className="h-10 w-10" style={{ color: '#E10600' }} />
        </div>
        <h4 className="text-lg font-semibold text-gray-900 mb-2">
          No ongoing projects
        </h4>
        <p className="text-sm text-gray-500 mb-6 text-center max-w-md">
          All projects have been completed. Start a new project to track progress and analytics.
        </p>
        <Button
          className="text-white hover:opacity-90"
          style={{ backgroundColor: '#E10600' }}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add New Project
        </Button>
      </div>
    </div>
  );
}
