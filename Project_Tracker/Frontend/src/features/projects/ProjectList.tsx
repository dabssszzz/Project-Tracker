import { DataTable } from './DataTable';
import { FilterSection } from './FilterSection';
import { SearchBar } from './SearchBar';
import { BreadcrumbNav } from '../../shared/ui/breadcrumb-nav';


export function ProjectList() {
    return (
        <main className="px-6 py-8 max-w-[1700px] mx-auto">
            {/* Breadcrumb Navigation - with Home icon placeholder logic */}
            <div className="mb-6">
                <BreadcrumbNav
                    items={[
                        { label: 'Projects', onClick: () => { } },
                        { label: 'All Projects' },
                    ]}
                />
            </div>

            <div className="space-y-8">
                <FilterSection />

                {/* Search Bar & Filter Chips */}
                <SearchBar />

                {/* Data Table */}
                <DataTable />
            </div>
        </main>
    );
}
