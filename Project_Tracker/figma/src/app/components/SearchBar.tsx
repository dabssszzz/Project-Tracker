import { Search } from 'lucide-react';
import { Input } from './ui/input';
import { useState } from 'react';

type FilterChip = 'All' | 'Draft' | 'Editing' | 'Review' | 'Done';

export function SearchBar() {
  const [activeFilter, setActiveFilter] = useState<FilterChip>('All');

  const filters: FilterChip[] = ['All', 'Draft', 'Editing', 'Review', 'Done'];

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
      {/* Search Input */}
      <div className="relative w-full sm:w-96">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          type="text"
          placeholder="Search projects..."
          className="pl-10 bg-white border-gray-300 transition-all focus:ring-2 focus:ring-red-100"
        />
      </div>

      {/* Filter Chips */}
      <div className="flex gap-2 flex-wrap w-full sm:w-auto">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              activeFilter === filter
                ? 'text-white shadow-sm transform scale-105'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 hover:shadow-sm'
            }`}
            style={
              activeFilter === filter
                ? { backgroundColor: '#E10600' }
                : {}
            }
          >
            {filter}
          </button>
        ))}
      </div>
    </div>
  );
}