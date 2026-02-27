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
} from '../../shared/ui/sheet';

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
    <div className="flex flex-row gap-8 items-end flex-wrap md:flex-nowrap">
      {/* Assignee Dropdown */}
      <div className="flex-1 min-w-[200px]">
        <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">
          Assignee
        </label>
        <Select value={assignee} onValueChange={setAssignee}>
          <SelectTrigger className="bg-white border-gray-200 h-11">
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
      <div className="flex-1 min-w-[200px]">
        <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">
          Status
        </label>
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger className="bg-white border-gray-200 h-11">
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="editing">Editing</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Start Date Picker */}
      <div className="flex-1 min-w-[200px]">
        <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">
          Start Date
        </label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-start text-left font-normal bg-white border-gray-200 h-11"
            >
              <CalendarIcon className="mr-2 h-4 w-4 text-gray-400" />
              {startDate ? format(startDate, 'PPP') : <span className="text-gray-400">Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 border-0 shadow-none bg-transparent" align="start">
            <Card className="p-0 border-0 shadow-lg overflow-hidden">
              <CardContent className="p-0">
                <Calendar mode="single" selected={startDate} onSelect={setStartDate} initialFocus />
              </CardContent>
            </Card>
          </PopoverContent>
        </Popover>
      </div>

      {/* End Date Picker */}
      <div className="flex-1 min-w-[200px]">
        <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">
          End Date
        </label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-start text-left font-normal bg-white border-gray-200 h-11"
            >
              <CalendarIcon className="mr-2 h-4 w-4 text-gray-400" />
              {endDate ? format(endDate, 'PPP') : <span className="text-gray-400">Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 border-0 shadow-none bg-transparent" align="start">
            <Card className="p-0 border-0 shadow-lg overflow-hidden">
              <CardContent className="p-0">
                <Calendar mode="single" selected={endDate} onSelect={setEndDate} initialFocus />
              </CardContent>
            </Card>
          </PopoverContent>
        </Popover>
      </div>

      {/* Reset Filters Link */}
      <div className="flex items-center gap-2 pb-3">
        <span className="text-gray-300">×</span>
        <button
          onClick={resetFilters}
          className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
        >
          Reset Filters
        </button>
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