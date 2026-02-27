import { ArrowLeft, Plus, Edit2, Trash2, Download, RefreshCw, TrendingUp, Users, FolderKanban, CheckCircle2 } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Calendar } from './ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { format } from 'date-fns';
import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from './ui/pagination';

interface DesignSystemProps {
  onBack: () => void;
}

export function DesignSystem({ onBack }: DesignSystemProps) {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [activeChip, setActiveChip] = useState('All');

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F8F9FB' }}>
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-6 py-6 max-w-[1600px] mx-auto">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={onBack}
              className="text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-3xl font-semibold text-gray-900">
                Marketing Dashboard Design System
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Reusable UI components for scalable SaaS applications
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="px-6 py-8 max-w-[1600px] mx-auto">
        <div className="space-y-12">
          {/* Color Palette */}
          <Section title="Color Palette" description="Primary brand colors and UI colors">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              <ColorSwatch color="#E10600" name="Primary Red" />
              <ColorSwatch color="#F8F9FB" name="Background" border />
              <ColorSwatch color="#FFFFFF" name="White" border />
              <ColorSwatch color="#10B981" name="Success Green" />
              <ColorSwatch color="#F59E0B" name="Warning Yellow" />
              <ColorSwatch color="#3B82F6" name="Info Blue" />
              <ColorSwatch color="#6366F1" name="Purple" />
              <ColorSwatch color="#6B7280" name="Gray" />
            </div>
          </Section>

          {/* Typography */}
          <Section title="Typography" description="Inter-style modern SaaS typography system">
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-semibold text-gray-900">
                  Heading 1 - 28-32px
                </h1>
                <p className="text-sm text-gray-500 mt-1">font-semibold, text-gray-900</p>
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-gray-900">
                  Heading 2 - 22-24px
                </h2>
                <p className="text-sm text-gray-500 mt-1">font-semibold, text-gray-900</p>
              </div>
              <div>
                <p className="text-base text-gray-900">
                  Body Text - 14-16px Regular
                </p>
                <p className="text-sm text-gray-500 mt-1">text-base, text-gray-900</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">
                  Small Text - 12-14px
                </p>
                <p className="text-sm text-gray-500 mt-1">text-sm, text-gray-600</p>
              </div>
            </div>
          </Section>

          {/* Spacing System */}
          <Section title="Spacing System" description="8px based spacing scale">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-32 text-sm text-gray-600">4px (0.5)</div>
                <div className="h-4 bg-red-500" style={{ width: '4px' }}></div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-32 text-sm text-gray-600">8px (2)</div>
                <div className="h-4 bg-red-500" style={{ width: '8px' }}></div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-32 text-sm text-gray-600">12px (3)</div>
                <div className="h-4 bg-red-500" style={{ width: '12px' }}></div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-32 text-sm text-gray-600">16px (4)</div>
                <div className="h-4 bg-red-500" style={{ width: '16px' }}></div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-32 text-sm text-gray-600">24px (6)</div>
                <div className="h-4 bg-red-500" style={{ width: '24px' }}></div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-32 text-sm text-gray-600">32px (8)</div>
                <div className="h-4 bg-red-500" style={{ width: '32px' }}></div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-32 text-sm text-gray-600">48px (12)</div>
                <div className="h-4 bg-red-500" style={{ width: '48px' }}></div>
              </div>
            </div>
          </Section>

          {/* Buttons */}
          <Section title="Buttons" description="Primary, secondary, ghost, and icon button variants">
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Primary Button</h3>
                <div className="flex flex-wrap gap-3">
                  <Button
                    className="text-white hover:opacity-90"
                    style={{ backgroundColor: '#E10600' }}
                  >
                    Primary Button
                  </Button>
                  <Button
                    className="text-white hover:opacity-90"
                    style={{ backgroundColor: '#E10600' }}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    With Icon
                  </Button>
                  <Button
                    className="text-white opacity-50 cursor-not-allowed"
                    style={{ backgroundColor: '#E10600' }}
                    disabled
                  >
                    Disabled
                  </Button>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Secondary Button (Outline)</h3>
                <div className="flex flex-wrap gap-3">
                  <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50">
                    Secondary Button
                  </Button>
                  <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50">
                    <Download className="h-4 w-4 mr-2" />
                    With Icon
                  </Button>
                  <Button variant="outline" disabled>
                    Disabled
                  </Button>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Ghost Button</h3>
                <div className="flex flex-wrap gap-3">
                  <Button variant="ghost" className="text-gray-600 hover:text-gray-900">
                    Ghost Button
                  </Button>
                  <Button variant="ghost" className="text-gray-600 hover:text-gray-900">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    With Icon
                  </Button>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Icon Buttons</h3>
                <div className="flex flex-wrap gap-3">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-gray-600 hover:text-gray-900"
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-gray-600 hover:text-gray-900"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-gray-600 hover:text-gray-900"
                  >
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </Section>

          {/* Status Badges */}
          <Section title="Status Badges" description="Color-coded status indicators">
            <div className="flex flex-wrap gap-3">
              <Badge
                className="font-medium"
                style={{ color: '#10B981', backgroundColor: '#D1FAE5' }}
              >
                Done / Published
              </Badge>
              <Badge
                className="font-medium"
                style={{ color: '#F59E0B', backgroundColor: '#FEF3C7' }}
              >
                Draft
              </Badge>
              <Badge
                className="font-medium"
                style={{ color: '#3B82F6', backgroundColor: '#DBEAFE' }}
              >
                Editing
              </Badge>
              <Badge
                className="font-medium"
                style={{ color: '#6366F1', backgroundColor: '#E0E7FF' }}
              >
                Review
              </Badge>
              <Badge
                className="font-medium"
                style={{ color: '#6B7280', backgroundColor: '#F3F4F6' }}
              >
                Inactive
              </Badge>
            </div>
          </Section>

          {/* Card Containers */}
          <Section title="Card Container" description="White background with 12px radius and soft shadow">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Basic Card
                </h3>
                <p className="text-sm text-gray-600">
                  White background, 12px border radius, soft shadow, and subtle border.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="px-6 py-4 border-b border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Card with Header
                  </h3>
                </div>
                <div className="p-6">
                  <p className="text-sm text-gray-600">
                    Separated header and content structure for organized layouts.
                  </p>
                </div>
              </div>
            </div>
          </Section>

          {/* Form Inputs */}
          <Section title="Form Inputs" description="Dropdown, date picker, search, and filter chips">
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Dropdown Select</h3>
                <Select>
                  <SelectTrigger className="bg-white max-w-xs">
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="option1">Option 1</SelectItem>
                    <SelectItem value="option2">Option 2</SelectItem>
                    <SelectItem value="option3">Option 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Date Picker</h3>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="justify-start text-left font-normal bg-white max-w-xs"
                    >
                      {date ? format(date, 'PPP') : 'Pick a date'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Search Input</h3>
                <div className="relative max-w-xs">
                  <Input
                    type="text"
                    placeholder="Search..."
                    className="bg-white border-gray-300"
                  />
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Filter Chips</h3>
                <div className="flex gap-2 flex-wrap">
                  {['All', 'Draft', 'Editing', 'Review', 'Done'].map((chip) => (
                    <button
                      key={chip}
                      onClick={() => setActiveChip(chip)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        activeChip === chip
                          ? 'text-white shadow-sm'
                          : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                      }`}
                      style={
                        activeChip === chip
                          ? { backgroundColor: '#E10600' }
                          : {}
                      }
                    >
                      {chip}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </Section>

          {/* Analytics Cards */}
          <Section title="Analytics Cards" description="Metric cards with numbers, labels, icons, and trends">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <AnalyticsCard
                label="Total Projects"
                value="24"
                icon={FolderKanban}
                trend="+12%"
                trendUp={true}
              />
              <AnalyticsCard
                label="Total Subtasks"
                value="156"
                icon={CheckCircle2}
                trend="+8%"
                trendUp={true}
              />
              <AnalyticsCard
                label="Completion Rate"
                value="87.5%"
                icon={TrendingUp}
                trend="+5.2%"
                trendUp={true}
              />
              <AnalyticsCard
                label="Active Assignees"
                value="12"
                icon={Users}
                trend="-2"
                trendUp={false}
              />
            </div>
          </Section>

          {/* Data Table */}
          <Section title="Data Table System" description="Header, rows, hover states, and pagination">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr className="border-b border-gray-200">
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      ID
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Assignee
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr className="hover:bg-gray-50 transition-colors bg-white">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">#001</td>
                    <td className="px-6 py-4 text-sm text-gray-900">Project Alpha</td>
                    <td className="px-6 py-4">
                      <Badge
                        className="font-medium"
                        style={{ color: '#10B981', backgroundColor: '#D1FAE5' }}
                      >
                        Done
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=User1" />
                          <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                        <span className="text-sm text-gray-900">John Doe</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-600 hover:text-gray-900">
                        <Edit2 className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors bg-gray-50/30">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">#002</td>
                    <td className="px-6 py-4 text-sm text-gray-900">Project Beta</td>
                    <td className="px-6 py-4">
                      <Badge
                        className="font-medium"
                        style={{ color: '#F59E0B', backgroundColor: '#FEF3C7' }}
                      >
                        Draft
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=User2" />
                          <AvatarFallback>JS</AvatarFallback>
                        </Avatar>
                        <span className="text-sm text-gray-900">Jane Smith</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-600 hover:text-gray-900">
                        <Edit2 className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </table>

              {/* Pagination */}
              <div className="border-t border-gray-200 px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    Showing <span className="font-medium">1</span> to{' '}
                    <span className="font-medium">2</span> of{' '}
                    <span className="font-medium">2</span> results
                  </div>
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious href="#" />
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink href="#" isActive>
                          1
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationNext href="#" />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              </div>
            </div>
          </Section>

          {/* Border Radius */}
          <Section title="Border Radius" description="Consistent corner rounding">
            <div className="flex flex-wrap gap-4">
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <p className="text-sm text-gray-600">8px (rounded-lg)</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <p className="text-sm text-gray-600">12px (rounded-xl)</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-full px-6 py-4">
                <p className="text-sm text-gray-600">Full (rounded-full)</p>
              </div>
            </div>
          </Section>
        </div>
      </main>
    </div>
  );
}

// Helper Components
function Section({ title, description, children }: { title: string; description: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">{title}</h2>
        <p className="text-sm text-gray-500 mt-1">{description}</p>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        {children}
      </div>
    </div>
  );
}

function ColorSwatch({ color, name, border }: { color: string; name: string; border?: boolean }) {
  return (
    <div>
      <div
        className={`h-20 rounded-lg mb-2 ${border ? 'border-2 border-gray-200' : ''}`}
        style={{ backgroundColor: color }}
      />
      <p className="text-sm font-medium text-gray-900">{name}</p>
      <p className="text-xs text-gray-500 font-mono">{color}</p>
    </div>
  );
}

function AnalyticsCard({
  label,
  value,
  icon: Icon,
  trend,
  trendUp,
}: {
  label: string;
  value: string;
  icon: any;
  trend: string;
  trendUp: boolean;
}) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-gray-600 mb-2">{label}</p>
          <p className="text-3xl font-semibold text-gray-900 mb-3">{value}</p>
          <div
            className={`flex items-center gap-1 text-sm ${
              trendUp ? 'text-green-600' : 'text-red-600'
            }`}
          >
            <TrendingUp className={`h-4 w-4 ${!trendUp && 'rotate-180'}`} />
            <span className="font-medium">{trend}</span>
            <span className="text-gray-500">vs last period</span>
          </div>
        </div>
        <div className="p-3 rounded-lg" style={{ backgroundColor: '#FEE2E2' }}>
          <Icon className="h-6 w-6" style={{ color: '#E10600' }} />
        </div>
      </div>
    </div>
  );
}
