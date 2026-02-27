import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

// Project Distribution Data
const projectDistributionData = [
  { name: 'Social Media', value: 35, color: '#E10600' },
  { name: 'Email Marketing', value: 25, color: '#F59E0B' },
  { name: 'Content', value: 20, color: '#3B82F6' },
  { name: 'Events', value: 12, color: '#10B981' },
  { name: 'Branding', value: 8, color: '#6366F1' },
];

// Assignee by Subtask Data
const assigneeSubtaskData = [
  { name: 'Sarah Chen', value: 32, color: '#E10600' },
  { name: 'Michael Rodriguez', value: 28, color: '#F59E0B' },
  { name: 'Emily Parker', value: 24, color: '#3B82F6' },
  { name: 'James Wilson', value: 20, color: '#10B981' },
  { name: 'Olivia Martinez', value: 18, color: '#6366F1' },
];

// Tasks by Status Data
const tasksByStatusData = [
  { status: 'Done', count: 48, color: '#10B981' },
  { status: 'Review', count: 24, color: '#3B82F6' },
  { status: 'Editing', count: 18, color: '#F59E0B' },
  { status: 'Draft', count: 12, color: '#6B7280' },
];

// Subtasks by Assignee & Project (Stacked Bar)
const stackedBarData = [
  {
    assignee: 'Sarah',
    'Social Media': 12,
    'Email': 8,
    'Content': 6,
    'Events': 4,
  },
  {
    assignee: 'Michael',
    'Social Media': 10,
    'Email': 7,
    'Content': 8,
    'Events': 3,
  },
  {
    assignee: 'Emily',
    'Social Media': 8,
    'Email': 6,
    'Content': 7,
    'Events': 5,
  },
  {
    assignee: 'James',
    'Social Media': 6,
    'Email': 5,
    'Content': 4,
    'Events': 3,
  },
  {
    assignee: 'Olivia',
    'Social Media': 7,
    'Email': 6,
    'Content': 5,
    'Events': 4,
  },
];

// Project Completion Trend (Area Chart)
const completionTrendData = [
  { week: 'Week 1', completed: 12, total: 15 },
  { week: 'Week 2', completed: 18, total: 22 },
  { week: 'Week 3', completed: 25, total: 30 },
  { week: 'Week 4', completed: 32, total: 38 },
  { week: 'Week 5', completed: 40, total: 45 },
  { week: 'Week 6', completed: 48, total: 52 },
];

export function ChartsSection({ metrics = {} }: { metrics?: any }) {
  // Map API data to charts
  const statusChartData = metrics.tasksByStatus?.map((s: any) => ({
    status: s.status,
    count: s.count,
    color: s.status === 'Done' ? '#10B981' : s.status === 'Review' ? '#3B82F6' : '#E10600'
  })) || tasksByStatusData;

  const distributionChartData = metrics.projectProgress?.map((p: any) => ({
    name: p.projectName,
    value: p.completionPercentage,
    color: '#E10600'
  })) || projectDistributionData;

  const assigneeData = metrics.tasksByAssignee?.map((a: any) => ({
    name: a.assignee,
    value: a.count,
    color: '#E10600'
  })) || assigneeSubtaskData;
  return (
    <div className="space-y-6">
      {/* First Row: 3 Donut Charts - Responsive: Stack on mobile, 2 per row on tablet, 3 on desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Project Distribution */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 transition-shadow hover:shadow-md">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            Project Distribution
          </h3>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={distributionChartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={2}
                dataKey="value"
              >
                {distributionChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {distributionChartData.map((item, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full transition-transform hover:scale-125"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-gray-600">{item.name}</span>
                </div>
                <span className="font-medium text-gray-900">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Assignee by Subtask */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 transition-shadow hover:shadow-md">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            Subtasks by Assignee
          </h3>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={assigneeData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={2}
                dataKey="value"
              >
                {assigneeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {assigneeData.map((item, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full transition-transform hover:scale-125"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-gray-600">{item.name}</span>
                </div>
                <span className="font-medium text-gray-900">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tasks by Status */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 transition-shadow hover:shadow-md md:col-span-2 lg:col-span-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            Tasks by Status
          </h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={statusChartData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
              <XAxis type="number" stroke="#9CA3AF" />
              <YAxis dataKey="status" type="category" stroke="#9CA3AF" />
              <Tooltip />
              <Bar dataKey="count" radius={[0, 8, 8, 0]}>
                {statusChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Second Row: Stacked Bar and Area Chart - Responsive: Stack on mobile/tablet, 2 on desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Subtasks by Assignee & Project */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 transition-shadow hover:shadow-md">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            Subtasks by Assignee & Project
          </h3>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={stackedBarData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
              <XAxis dataKey="assignee" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip />
              <Legend />
              <Bar dataKey="Social Media" stackId="a" fill="#E10600" radius={[0, 0, 0, 0]} />
              <Bar dataKey="Email" stackId="a" fill="#F59E0B" radius={[0, 0, 0, 0]} />
              <Bar dataKey="Content" stackId="a" fill="#3B82F6" radius={[0, 0, 0, 0]} />
              <Bar dataKey="Events" stackId="a" fill="#10B981" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Project Completion Trend */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 transition-shadow hover:shadow-md">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            Project Completion Trend
          </h3>
          <ResponsiveContainer width="100%" height={320}>
            <AreaChart data={completionTrendData}>
              <defs>
                <linearGradient id="colorCompleted" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#E10600" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#E10600" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#64748B" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#64748B" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
              <XAxis dataKey="week" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip />
              <Legend />
              <Area
                type="monotone"
                dataKey="total"
                stroke="#64748B"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorTotal)"
                name="Total Projects"
              />
              <Area
                type="monotone"
                dataKey="completed"
                stroke="#E10600"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorCompleted)"
                name="Completed"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}