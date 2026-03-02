import { Button } from '../../shared/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../shared/ui/select';
import { Calendar } from '../../shared/ui/calendar';
import { Card, CardContent } from '../../shared/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '../../shared/ui/popover';
import { CalendarIcon, X, Filter, ChevronDown, ChevronUp } from 'lucide-react';
import { format } from 'date-fns';
import { useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../../shared/ui/sheet';

interface FilterSectionProps {
  filters: {
    assignee: string;
    status: string;
    startDate: Date | undefined;
    endDate: Date | undefined;
  };
  onFilterChange: (newFilters: any) => void;
}

export function FilterSection({ filters, onFilterChange }: FilterSectionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);

  const resetFilters = () => {
    onFilterChange({
      startDate: undefined,
      endDate: undefined,
      assignee: 'all',
      status: 'all',
    });
  };

  const FilterContent = () => (
    <div className="flex flex-row gap-6 items-end flex-wrap lg:flex-nowrap">
      {/* Assignee Dropdown */}
      <div className="flex-1 min-w-[180px]">
        <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">
          Assignee
        </label>
        <Select
          value={filters.assignee}
          onValueChange={(val) => onFilterChange({ assignee: val })}
        >
          <SelectTrigger className="bg-white border-gray-200 h-10 text-sm">
            <SelectValue placeholder="Select assignee" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Assignees</SelectItem>
            <SelectItem value="sarah">Sarah Chen</SelectItem>
            <SelectItem value="michael">Michael Rodriguez</SelectItem>
            <SelectItem value="emily">Emily Parker</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Status Dropdown */}
      <div className="flex-1 min-w-[180px]">
        <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">
          Status
        </label>
        <Select
          value={filters.status}
          onValueChange={(val) => onFilterChange({ status: val })}
        >
          <SelectTrigger className="bg-white border-gray-200 h-10 text-sm">
            <SelectValue placeholder="Select status" />
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

      {/* Start Date Picker */}
      <div className="flex-1 min-w-[180px]">
        <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">
          Start Date
        </label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-start text-left font-normal bg-white border-gray-200 h-10 text-sm"
            >
              <CalendarIcon className="mr-2 h-4 w-4 text-gray-400" />
              {filters.startDate ? format(filters.startDate, 'MMM dd, yyyy') : <span className="text-gray-400">Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 border-0 shadow-none bg-transparent" align="start">
            <Card className="p-0 border-0 shadow-lg overflow-hidden">
              <CardContent className="p-0">
                <Calendar
                  mode="single"
                  selected={filters.startDate}
                  onSelect={(date) => onFilterChange({ startDate: date })}
                  initialFocus
                />
              </CardContent>
            </Card>
          </PopoverContent>
        </Popover>
      </div>

      {/* End Date Picker */}
      <div className="flex-1 min-w-[180px]">
        <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">
          End Date
        </label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-start text-left font-normal bg-white border-gray-200 h-10 text-sm"
            >
              <CalendarIcon className="mr-2 h-4 w-4 text-gray-400" />
              {filters.endDate ? format(filters.endDate, 'MMM dd, yyyy') : <span className="text-gray-400">Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 border-0 shadow-none bg-transparent" align="start">
            <Card className="p-0 border-0 shadow-lg overflow-hidden">
              <CardContent className="p-0">
                <Calendar
                  mode="single"
                  selected={filters.endDate}
                  onSelect={(date) => onFilterChange({ endDate: date })}
                  initialFocus
                />
              </CardContent>
            </Card>
          </PopoverContent>
        </Popover>
      </div>

      {/* Reset Filters Link */}
      <div className="flex items-center gap-2 pb-2">
        <button
          onClick={resetFilters}
          className="text-sm font-medium text-gray-500 hover:text-red-600 transition-colors flex items-center gap-1"
        >
          <X className="h-4 w-4" />
          Reset Filters
        </button>
      </div>
    </div>
  );

  return (
    <div className="space-y-4">
      {/* Label and Icon Header with Toggle */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-red-50 rounded-lg">
            <Filter className="h-4 w-4 text-[#E10600]" />
          </div>
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-widest">
            Data Filters
          </h2>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-gray-500 hover:text-gray-900 hidden md:flex items-center gap-2"
        >
          <span className="text-xs font-medium">{isExpanded ? 'Collapse' : 'Expand'}</span>
          {isExpanded ? (
            <ChevronUp className="h-4 w-4 transition-transform duration-200" />
          ) : (
            <ChevronDown className="h-4 w-4 transition-transform duration-200" />
          )}
        </Button>
      </div>

      {/* Desktop/Tablet Filter Card */}
      <div
        className={`hidden md:block bg-white rounded-xl shadow-sm border border-gray-100 transition-all duration-300 ease-in-out overflow-hidden ${isExpanded ? 'max-h-[500px] p-6 opacity-100 border-t' : 'max-h-0 p-0 opacity-0 border-none'
          } hover:shadow-md`}
      >
        <FilterContent />
      </div>

      {/* Mobile Filter Drawer */}
      <div className="md:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-start bg-white transition-all hover:bg-gray-50 h-12"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
              {(filters.assignee !== 'all' || filters.status !== 'all' || filters.startDate || filters.endDate) && (
                <span className="ml-2 px-2 py-0.5 bg-red-100 text-[#E10600] rounded-full text-[10px] font-bold">
                  ACTIVE
                </span>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[400px]">
            <SheetHeader>
              <SheetTitle>Filter Projects</SheetTitle>
              <SheetDescription>
                Refine your project list with filters
              </SheetDescription>
            </SheetHeader>
            <div className="mt-8 space-y-6">
              <FilterContent />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}