import React from 'react';
import { Calendar } from 'lucide-react';

const TaskFilters = ({ filters, setFilters }) => {
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const handleReset = () => {
        setFilters({});
    };

    return (
        <div className="flex flex-wrap items-end gap-0 mb-6 w-full">
            {/* Assignee Filter */}
            <div className="flex-1 min-w-[200px] border border-gray-300 border-r-0 bg-white">
                <label className="block text-[11px] text-gray-500 px-3 pt-2">Assignee</label>
                <select
                    name="assignee"
                    className="w-full px-3 pb-2 pt-1 text-sm bg-transparent outline-none text-gray-700 cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M5%207.5L10%2012.5L15%207.5%22%20stroke%3D%22%236B7280%22%20stroke-width%3D%221.5%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3C%2Fsvg%3E')] bg-[length:16px_16px] bg-[right_12px_center] bg-no-repeat pr-10"
                    value={filters.assignee || ''}
                    onChange={handleChange}
                >
                    <option value="">-- Select All Assignees --</option>
                    <option value="Marie Dennielle">Marie Dennielle</option>
                    <option value="Jasmine Benitez">Jasmine Benitez</option>
                    <option value="John Doe">John Doe</option>
                </select>
            </div>

            {/* Status Filter */}
            <div className="flex-1 min-w-[200px] border border-gray-300 border-r-0 bg-white">
                <label className="block text-[11px] text-gray-500 px-3 pt-2">Status</label>
                <select
                    name="status"
                    className="w-full px-3 pb-2 pt-1 text-sm bg-transparent outline-none text-gray-700 cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M5%207.5L10%2012.5L15%207.5%22%20stroke%3D%22%236B7280%22%20stroke-width%3D%221.5%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3C%2Fsvg%3E')] bg-[length:16px_16px] bg-[right_12px_center] bg-no-repeat pr-10"
                    value={filters.status || ''}
                    onChange={handleChange}
                >
                    <option value="">-- Select All Statuses --</option>
                    <option value="Done/Published">Done/Published</option>
                    <option value="In Progress">In Progress</option>
                    <option value="For Review">For Review</option>
                    <option value="Cancelled">Cancelled</option>
                </select>
            </div>

            {/* Start Date */}
            <div className="flex-1 min-w-[200px] border border-gray-300 border-r-0 bg-white relative">
                <label className="block text-[11px] text-gray-500 px-3 pt-2">Start Date</label>
                <div className="relative">
                    <input
                        type="date"
                        name="startDate"
                        className="w-full px-3 pb-2 pt-1 text-sm bg-transparent outline-none text-gray-700 [color-scheme:light] [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full cursor-pointer"
                        value={filters.startDate || ''}
                        onChange={handleChange}
                    />
                    <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
            </div>

            {/* End Date */}
            <div className="flex-1 min-w-[200px] border border-gray-300 bg-white relative">
                <label className="block text-[11px] text-gray-500 px-3 pt-2">End Date</label>
                <div className="relative">
                    <input
                        type="date"
                        name="endDate"
                        className="w-full px-3 pb-2 pt-1 text-sm bg-transparent outline-none text-gray-700 [color-scheme:light] [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full cursor-pointer"
                        value={filters.endDate || ''}
                        onChange={handleChange}
                    />
                    <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
            </div>

            {/* Reset Button */}
            <button
                onClick={handleReset}
                className="ml-4 h-[50px] px-8 bg-[#6b7280] hover:bg-[#4b5563] text-white text-sm font-medium transition-colors"
            >
                Reset Filters
            </button>
        </div>
    );
};

export default TaskFilters;
