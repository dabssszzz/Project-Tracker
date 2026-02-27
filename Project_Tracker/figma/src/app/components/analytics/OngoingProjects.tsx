import { FolderOpen, Plus } from 'lucide-react';
import { Button } from '../ui/button';

export function OngoingProjects() {
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
