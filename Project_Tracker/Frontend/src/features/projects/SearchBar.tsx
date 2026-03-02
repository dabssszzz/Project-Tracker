import { Search } from 'lucide-react';
import { Input } from '../../shared/ui/input';
import { useState } from 'react';

type FilterChip = 'All' | 'Draft' | 'Editing' | 'Review' | 'Done';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    onSearch(query);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mt-8">
      {/* Search Input with Clickable Icon */}
      <div className="relative w-full sm:w-[500px] flex items-center">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search projects..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="pl-12 pr-12 h-11 bg-white border-gray-200 rounded-xl focus-visible:ring-red-500"
          />
          <button
            onClick={handleSearch}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-red-50 hover:bg-red-100 text-[#E10600] rounded-lg transition-colors group"
            title="Search"
          >
            <Search className="h-4 w-4 group-hover:scale-110 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}