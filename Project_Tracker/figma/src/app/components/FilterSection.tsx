import { Button } from './ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Calendar } from './ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
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
} from './ui/sheet';

export function FilterSection() {
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [assignee, setAssignee] = useState<string>('');
  const [status, setStatus] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);

  const resetFilters = () => {
    setStartDate(undefined);
    setEndDate(undefined);
    setAssignee('');
    setStatus('');
  };

  const FilterContent = () => (
    <div className="flex flex-row gap-4 flex-wrap items-end">
      {/* Assignee Dropdown */}
      <div className="flex-1 min-w-[180px]">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Assignee
        </label>
        <Select value={assignee} onValueChange={setAssignee}>
          <SelectTrigger className="bg-white">
            <SelectValue placeholder="Select assignee" />
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

      {/* Status Dropdown */}
      <div className="flex-1 min-w-[180px]">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Status
        </label>
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger className="bg-white">
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="editing">Editing</SelectItem>
            <SelectItem value="review">Review</SelectItem>
            <SelectItem value="done">Done</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Start Date Picker */}
      <div className="flex-1 min-w-[180px]">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Start Date
        </label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-start text-left font-normal bg-white transition-all hover:border-gray-400"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {startDate ? format(startDate, 'PPP') : 'Pick a date'}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={startDate}
              onSelect={setStartDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* End Date Picker */}
      <div className="flex-1 min-w-[180px]">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          End Date
        </label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-start text-left font-normal bg-white transition-all hover:border-gray-400"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {endDate ? format(endDate, 'PPP') : 'Pick a date'}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={endDate}
              onSelect={setEndDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* Reset Filters Button */}
      <div>
        <Button
          variant="ghost"
          className="text-gray-600 hover:text-gray-900 transition-colors"
          onClick={resetFilters}
          title="Clear all filters"
        >
          <X className="h-4 w-4 mr-2" />
          Reset Filters
        </Button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop/Tablet Filter Card */}
      <div className="hidden md:block bg-white rounded-xl shadow-sm border border-gray-100 p-6 transition-shadow hover:shadow-md">
        <FilterContent />
      </div>

      {/* Mobile Filter Drawer */}
      <div className="md:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-start bg-white transition-all hover:bg-gray-50"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
              {(assignee || status || startDate || endDate) && (
                <span className="ml-2 px-2 py-0.5 bg-red-100 text-red-600 rounded-full text-xs font-medium">
                  Active
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
            <div className="mt-6">
              <FilterContent />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}