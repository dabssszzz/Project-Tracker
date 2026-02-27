import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
  onClick?: () => void;
}

interface BreadcrumbNavProps {
  items: BreadcrumbItem[];
}

export function BreadcrumbNav({ items }: BreadcrumbNavProps) {
  return (
    <nav className="flex items-center space-x-2 text-sm mb-6">
      <button
        className="text-gray-500 hover:text-gray-700 transition-colors"
        onClick={() => window.location.href = '/'}
      >
        <Home className="h-4 w-4" />
      </button>
      {items.map((item, index) => (
        <div key={index} className="flex items-center space-x-2">
          <ChevronRight className="h-4 w-4 text-gray-400" />
          {item.onClick ? (
            <button
              onClick={item.onClick}
              className={`${
                index === items.length - 1
                  ? 'text-gray-900 font-medium'
                  : 'text-gray-500 hover:text-gray-700'
              } transition-colors`}
            >
              {item.label}
            </button>
          ) : (
            <span
              className={
                index === items.length - 1
                  ? 'text-gray-900 font-medium'
                  : 'text-gray-500'
              }
            >
              {item.label}
            </span>
          )}
        </div>
      ))}
    </nav>
  );
}