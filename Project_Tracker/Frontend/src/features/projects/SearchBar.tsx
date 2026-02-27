import { Search } from 'lucide-react';
import { Input } from '../../shared/ui/input';
import { useState } from 'react';

type FilterChip = 'All' | 'Draft' | 'Editing' | 'Review' | 'Done';

export function SearchBar() {
  const [activeFilter, setActiveFilter] = useState<FilterChip>('All');

  const filters: FilterChip[] = ['All', 'Draft', 'Editing', 'Review', 'Done'];

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mt-8">
      {/* Search Input */}
      <div className="relative w-full sm:w-[500px]">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          type="text"
          placeholder="Search projects..."
          className="pl-12 h-11 bg-white border-gray-200 rounded-xl"
        />
      </div>

      {/* Filter Chips */}
      <div className="flex gap-2 flex-wrap w-full sm:w-auto">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all duration-200 border ${activeFilter === filter
              ? 'text-white border-transparent'
              : 'bg-white text-gray-600 hover:bg-gray-50 border-gray-200'
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