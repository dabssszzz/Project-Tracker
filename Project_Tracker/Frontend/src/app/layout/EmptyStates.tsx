import { FolderOpen, Search, AlertCircle, Plus } from 'lucide-react';
import { Button } from '../../shared/ui/button';

interface EmptyStateProps {
  type: 'no-data' | 'no-results' | 'error';
  onAction?: () => void;
}

export function EmptyState({ type, onAction }: EmptyStateProps) {
  const configs = {
    'no-data': {
      icon: FolderOpen,
      title: 'No projects yet',
      description: 'Get started by creating your first marketing project to track progress and collaborate with your team.',
      actionLabel: 'Create Project',
      iconBg: '#FEE2E2',
      iconColor: '#E10600',
    },
    'no-results': {
      icon: Search,
      title: 'No results found',
      description: 'We couldn\'t find any projects matching your search criteria. Try adjusting your filters or search terms.',
      actionLabel: 'Clear Filters',
      iconBg: '#E0E7FF',
      iconColor: '#6366F1',
    },
    'error': {
      icon: AlertCircle,
      title: 'Something went wrong',
      description: 'We encountered an error while loading your projects. Please try refreshing the page or contact support if the issue persists.',
      actionLabel: 'Retry',
      iconBg: '#FEE2E2',
      iconColor: '#EF4444',
    },
  };

  const config = configs[type];
  const Icon = config.icon;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="flex flex-col items-center justify-center py-16 px-6">
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center mb-6 transition-transform hover:scale-105"
          style={{ backgroundColor: config.iconBg }}
        >
          <Icon className="h-10 w-10" style={{ color: config.iconColor }} />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {config.title}
        </h3>
        <p className="text-sm text-gray-500 mb-6 text-center max-w-md">
          {config.description}
        </p>
        {onAction && (
          <Button
            onClick={onAction}
            className="text-white hover:opacity-90 transition-opacity"
            style={{ backgroundColor: '#E10600' }}
          >
            {type === 'no-data' && <Plus className="h-4 w-4 mr-2" />}
            {config.actionLabel}
          </Button>
        )}
      </div>
    </div>
  );
}
