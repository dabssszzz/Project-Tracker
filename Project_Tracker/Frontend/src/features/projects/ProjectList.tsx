import { useState } from 'react';
import { DataTable } from './DataTable';
import { FilterSection } from './FilterSection';
import { SearchBar } from './SearchBar';
import { BreadcrumbNav } from '../../shared/ui/breadcrumb-nav';

export function ProjectList() {
    const [searchQuery, setSearchQuery] = useState('');
    const [filters, setFilters] = useState({
        assignee: 'all',
        status: 'all',
        startDate: undefined as Date | undefined,
        endDate: undefined as Date | undefined,
    });
    const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);

    const handleSearch = (query: string) => {
        setSearchQuery(query);
    };

    const handleFilterChange = (newFilters: any) => {
        setFilters((prev) => ({ ...prev, ...newFilters }));
    };

    const handleSort = (key: string) => {
        let direction: 'asc' | 'desc' = 'asc';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    return (
        <main className="px-6 py-8 max-w-[1700px] mx-auto min-h-screen" style={{ backgroundColor: '#F8F9FB' }}>
            {/* Breadcrumb Navigation */}
            <div className="mb-6">
                <BreadcrumbNav
                    items={[
                        { label: 'Projects', onClick: () => { } },
                        { label: 'All Projects' },
                    ]}
                />
            </div>

            {/* Page Header */}
            <div className="mb-10">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                    Project Management
                </h1>
                <p className="text-sm sm:text-base text-gray-500 mt-1">
                    Monitor, organize and manage all your ongoing and completed projects
                </p>
            </div>

            <div className="space-y-8">
                {/* Data Filters Section */}
                <FilterSection filters={filters} onFilterChange={handleFilterChange} />

                {/* Search Bar */}
                <SearchBar onSearch={handleSearch} />

                {/* Data Table */}
                <DataTable
                    searchQuery={searchQuery}
                    filters={filters}
                    sortConfig={sortConfig}
                    onSort={handleSort}
                />
            </div>
        </main>
    );
}
