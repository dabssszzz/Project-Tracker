import { Button } from '../../../shared/ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '../../../shared/ui/select';
import { Calendar } from '../../../shared/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../../../shared/ui/popover';
import { CalendarIcon, X, Filter } from 'lucide-react';
import { format } from 'date-fns';
import { useState } from 'react';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '../../../shared/ui/sheet';

interface AnalyticsFilterSectionProps {
    startDate: Date | undefined;
    endDate: Date | undefined;
    assignee: string;
    status: string;
    category: string;
    completionStatus: string;
    onStartDateChange: (date: Date | undefined) => void;
    onEndDateChange: (date: Date | undefined) => void;
    onAssigneeChange: (value: string) => void;
    onStatusChange: (value: string) => void;
    onCategoryChange: (value: string) => void;
    onCompletionStatusChange: (value: string) => void;
    onReset: () => void;
}

export function AnalyticsFilterSection({
    startDate,
    endDate,
    assignee,
    status,
    category,
    completionStatus,
    onStartDateChange,
    onEndDateChange,
    onAssigneeChange,
    onStatusChange,
    onCategoryChange,
    onCompletionStatusChange,
    onReset,
}: AnalyticsFilterSectionProps) {
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    const FilterContent = () => (
        <div className="flex flex-col gap-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Assignee Filter */}
                <div className="space-y-2">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Assignee
                    </label>
                    <Select value={assignee} onValueChange={onAssigneeChange}>
                        <SelectTrigger className="bg-white border-gray-200 h-10 shadow-sm transition-all hover:border-gray-300">
                            <SelectValue placeholder="All Assignees" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Assignees</SelectItem>
                            <SelectItem value="sarah">Sarah Chen</SelectItem>
                            <SelectItem value="michael">Michael Rodriguez</SelectItem>
                            <SelectItem value="emily">Emily Parker</SelectItem>
                            <SelectItem value="james">James Wilson</SelectItem>
                            <SelectItem value="olivia">Olivia Martinez</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Status Filter */}
                <div className="space-y-2">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Status
                    </label>
                    <Select value={status} onValueChange={onStatusChange}>
                        <SelectTrigger className="bg-white border-gray-200 h-10 shadow-sm transition-all hover:border-gray-300">
                            <SelectValue placeholder="All Statuses" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Statuses</SelectItem>
                            <SelectItem value="Draft">Draft</SelectItem>
                            <SelectItem value="Editing">Editing</SelectItem>
                            <SelectItem value="Review">Review</SelectItem>
                            <SelectItem value="Done">Done</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Category Filter */}
                <div className="space-y-2">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Category
                    </label>
                    <Select value={category} onValueChange={onCategoryChange}>
                        <SelectTrigger className="bg-white border-gray-200 h-10 shadow-sm transition-all hover:border-gray-300">
                            <SelectValue placeholder="All Categories" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Categories</SelectItem>
                            <SelectItem value="Social Media">Social Media</SelectItem>
                            <SelectItem value="Email Marketing">Email Marketing</SelectItem>
                            <SelectItem value="Web Development">Web Development</SelectItem>
                            <SelectItem value="Branding">Branding</SelectItem>
                            <SelectItem value="Content">Content</SelectItem>
                            <SelectItem value="Research">Research</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Completion Filter */}
                <div className="space-y-2">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Completion
                    </label>
                    <Select value={completionStatus} onValueChange={onCompletionStatusChange}>
                        <SelectTrigger className="bg-white border-gray-200 h-10 shadow-sm transition-all hover:border-gray-300">
                            <SelectValue placeholder="Any Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Any Status</SelectItem>
                            <SelectItem value="active">Active Only</SelectItem>
                            <SelectItem value="completed">Completed Only</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row items-end gap-6 pt-2">
                {/* Date Range Group */}
                <div className="flex-1 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                    <div className="w-full sm:w-auto flex-1 space-y-2">
                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                            Date Range
                        </label>
                        <div className="flex items-center gap-2">
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className="w-full justify-start text-left font-normal bg-white border-gray-200 h-10 shadow-sm"
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4 text-gray-400" />
                                        {startDate ? format(startDate, 'MMM dd, yyyy') : <span className="text-gray-400">Start date</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={startDate}
                                        onSelect={onStartDateChange}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                            <span className="text-gray-400">—</span>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className="w-full justify-start text-left font-normal bg-white border-gray-200 h-10 shadow-sm"
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4 text-gray-400" />
                                        {endDate ? format(endDate, 'MMM dd, yyyy') : <span className="text-gray-400">End date</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={endDate}
                                        onSelect={onEndDateChange}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-3 w-full sm:w-auto">
                    <Button
                        variant="ghost"
                        onClick={onReset}
                        className="flex-1 sm:flex-none text-gray-500 hover:text-gray-900 transition-colors h-10"
                    >
                        <X className="h-4 w-4 mr-2" />
                        Reset Filters
                    </Button>
                    <Button
                        className="flex-1 sm:flex-none h-10 text-white transition-opacity hover:opacity-90"
                        style={{ backgroundColor: '#E10600' }}
                    >
                        Apply Filters
                    </Button>
                </div>
            </div>
        </div>
    );

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Filter className="h-5 w-5 text-gray-400" />
                    <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
                        Data Filters
                    </h2>
                </div>
            </div>

            {/* Desktop View */}
            <div className="hidden lg:block bg-white rounded-xl shadow-sm border border-gray-100 p-6 transition-all hover:shadow-md">
                <FilterContent />
            </div>

            {/* Mobile/Tablet View */}
            <div className="lg:hidden">
                <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
                    <SheetTrigger asChild>
                        <Button
                            variant="outline"
                            className="w-full justify-start bg-white h-11 border-gray-200 shadow-sm"
                        >
                            <Filter className="h-4 w-4 mr-2 text-gray-400" />
                            Advanced Filters
                            {(assignee !== 'all' || status !== 'all' || category !== 'all' || completionStatus !== 'all' || startDate || endDate) && (
                                <span className="ml-2 px-2 py-0.5 bg-red-50 text-red-600 rounded-full text-xs font-semibold border border-red-100">
                                    Active
                                </span>
                            )}
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="right" className="w-full sm:w-[400px] p-0">
                        <SheetHeader className="p-6 border-b border-gray-100">
                            <SheetTitle className="text-xl font-bold">Filters</SheetTitle>
                            <SheetDescription>
                                Customize your analytics view
                            </SheetDescription>
                        </SheetHeader>
                        <div className="p-6">
                            <FilterContent />
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </div>
    );
}
