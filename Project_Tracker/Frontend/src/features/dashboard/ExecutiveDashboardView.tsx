import {
  TrendingUp,
  TrendingDown,
  FolderKanban,
  PlayCircle,
  CheckCircle2,
  Clock,
  ListChecks,
  Target,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { Avatar, AvatarFallback, AvatarImage } from '../../shared/ui/avatar';
import { useAnalyticsDashboard } from '../../hooks/useAnalytics';

// Mock data (fallback)
const completionTrendData = [
  { date: 'Feb 19', completed: 12 },
  { date: 'Feb 20', completed: 19 },
  { date: 'Feb 21', completed: 15 },
  { date: 'Feb 22', completed: 25 },
  { date: 'Feb 23', completed: 22 },
  { date: 'Feb 24', completed: 30 },
  { date: 'Feb 25', completed: 28 },
  { date: 'Feb 26', completed: 35 },
  { date: 'Feb 27', completed: 32 },
];

const tasksByStatusData = [
  { status: 'Done', count: 145, color: '#10B981' },
  { status: 'Review', count: 78, color: '#F59E0B' },
  { status: 'Editing', count: 92, color: '#3B82F6' },
  { status: 'Draft', count: 45, color: '#6B7280' },
];

const projectDistributionData = [
  { name: 'Blog Posts', value: 35, color: '#E10600' },
  { name: 'Social Media', value: 25, color: '#F59E0B' },
  { name: 'Email Campaigns', value: 20, color: '#3B82F6' },
  { name: 'Video Content', value: 15, color: '#8B5CF6' },
  { name: 'Infographics', value: 5, color: '#10B981' },
];

const workloadData = [
  { name: 'Sarah C.', tasks: 28 },
  { name: 'Michael R.', tasks: 24 },
  { name: 'Emily P.', tasks: 21 },
  { name: 'James W.', tasks: 18 },
  { name: 'Olivia M.', tasks: 15 },
];

const recentActivities = [
  {
    id: 1,
    user: 'Sarah Chen',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    action: 'Published project',
    project: '"Q1 Product Launch Campaign"',
    time: '2 hours ago',
  },
  {
    id: 2,
    user: 'Michael Rodriguez',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
    action: 'Moved task to Review',
    project: '"Social Media Strategy"',
    time: '4 hours ago',
  },
  {
    id: 3,
    user: 'Emily Parker',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily',
    action: 'Created new subtask in',
    project: '"Email Newsletter"',
    time: '6 hours ago',
  },
  {
    id: 4,
    user: 'James Wilson',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James',
    action: 'Completed project',
    project: '"Brand Guidelines Update"',
    time: '1 day ago',
  },
  {
    id: 5,
    user: 'Olivia Martinez',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Olivia',
    action: 'Added comment on',
    project: '"Website Redesign"',
    time: '1 day ago',
  },
];

export function ExecutiveDashboardView() {
  const { data: dashboardData, isLoading, error } = useAnalyticsDashboard();

  if (isLoading) return <div className="p-8 text-center">Loading dashboard...</div>;
  if (error) return <div className="p-8 text-center text-red-600">Error loading dashboard data.</div>;

  const metrics = dashboardData || {};

  const kpiMetrics = [
    {
      icon: FolderKanban,
      label: 'Total Tasks',
      value: metrics.totalTasks || '0',
      trend: '+12%',
      trendUp: true,
      color: '#E10600',
    },
    {
      icon: PlayCircle,
      label: 'In Progress',
      value: metrics.inProgressTasks || '0',
      trend: '+8%',
      trendUp: true,
      color: '#3B82F6',
    },
    {
      icon: CheckCircle2,
      label: 'Completed Tasks',
      value: metrics.completedTasks || '0',
      trend: '+15%',
      trendUp: true,
      color: '#10B981',
    },
    {
      icon: Clock,
      label: 'Pending Review',
      value: metrics.forReviewTasks || '0',
      trend: '-3%',
      trendUp: false,
      color: '#F59E0B',
    },
    {
      icon: ListChecks,
      label: 'Active Projects',
      value: metrics.projectProgress?.length || '0',
      trend: '+22%',
      trendUp: true,
      color: '#8B5CF6',
    },
    {
      icon: Target,
      label: 'Success Rate',
      value: metrics.totalTasks > 0
        ? `${Math.round((metrics.completedTasks / metrics.totalTasks) * 100)}%`
        : '0%',
      trend: '+5%',
      trendUp: true,
      color: '#EC4899',
    },
  ];

  // Map API data to charts
  const statusChartData = metrics.tasksByStatus?.map(s => ({
    status: s.status,
    count: s.count,
    color: s.status === 'Done' ? '#10B981' : s.status === 'Review' ? '#F59E0B' : '#E10600'
  })) || tasksByStatusData;

  const distributionChartData = metrics.projectProgress?.map(p => ({
    name: p.projectName,
    value: p.completionPercentage,
    color: '#E10600'
  })) || projectDistributionData;

  const workloads = metrics.tasksByAssignee?.map(a => ({
    name: a.assignee,
    tasks: a.count
  })) || workloadData;

  return (
    <div className="px-4 sm:px-6 py-6 sm:py-8 max-w-[1600px] mx-auto space-y-6">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
          Welcome back, Sarah 👋
        </h1>
        <p className="text-base text-gray-600">
          Here's what's happening with your marketing projects today.
        </p>
      </div>

      {/* KPI Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {kpiMetrics.map((metric, index) => {
          const IconComponent = metric.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all cursor-pointer group"
            >
              <div className="flex items-start justify-between mb-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110"
                  style={{ backgroundColor: `${metric.color}15` }}
                >
                  <IconComponent className="h-6 w-6" style={{ color: metric.color }} />
                </div>
                <div
                  className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${metric.trendUp
                    ? 'text-green-700 bg-green-50'
                    : 'text-red-700 bg-red-50'
                    }`}
                >
                  {metric.trendUp ? (
                    <TrendingUp className="h-3 w-3" />
                  ) : (
                    <TrendingDown className="h-3 w-3" />
                  )}
                  {metric.trend}
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{metric.value}</div>
              <div className="text-sm text-gray-500 font-medium">
                {metric.label}
              </div>
            </div>
          );
        })}
      </div>

      {/* Two-Column Analytics Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left Column - Primary Charts */}
        <div className="xl:col-span-2 space-y-6">
          {/* Project Completion Trend */}
          <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                Project Completion Trend
              </h3>
              <p className="text-sm text-gray-500">
                Daily completion metrics over the selected period
              </p>
            </div>
            <ResponsiveContainer width="100%" height={320}>
              <AreaChart data={completionTrendData}>
                <defs>
                  <linearGradient id="colorCompleted" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#E10600" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#E10600" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis
                  dataKey="date"
                  stroke="#9CA3AF"
                  style={{ fontSize: '12px' }}
                  tickLine={false}
                />
                <YAxis
                  stroke="#9CA3AF"
                  style={{ fontSize: '12px' }}
                  tickLine={false}
                />
                <RechartsTooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #E5E7EB',
                    borderRadius: '12px',
                    fontSize: '12px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="completed"
                  stroke="#E10600"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorCompleted)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Tasks by Status */}
          <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Tasks by Status</h3>
              <p className="text-sm text-gray-500">Current distribution across workflow stages</p>
            </div>
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={statusChartData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis type="number" stroke="#9CA3AF" style={{ fontSize: '12px' }} tickLine={false} />
                <YAxis
                  type="category"
                  dataKey="status"
                  stroke="#9CA3AF"
                  style={{ fontSize: '12px' }}
                  width={80}
                  tickLine={false}
                />
                <RechartsTooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #E5E7EB',
                    borderRadius: '12px',
                    fontSize: '12px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                  }}
                />
                <Bar dataKey="count" radius={[0, 8, 8, 0]}>
                  {statusChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right Column - Secondary Charts */}
        <div className="space-y-6">
          {/* Project Distribution */}
          <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                Project Distribution
              </h3>
              <p className="text-sm text-gray-500">By content type</p>
            </div>
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie
                  data={distributionChartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {distributionChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <RechartsTooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #E5E7EB',
                    borderRadius: '12px',
                    fontSize: '12px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {distributionChartData.map((item, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-gray-700 font-medium">{item.name}</span>
                  </div>
                  <span className="font-semibold text-gray-900">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Workload by Assignee */}
          <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                Workload by Assignee
              </h3>
              <p className="text-sm text-gray-500">Active task distribution</p>
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={workloads}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis
                  dataKey="name"
                  stroke="#9CA3AF"
                  style={{ fontSize: '11px' }}
                  angle={-15}
                  textAnchor="end"
                  height={60}
                  tickLine={false}
                />
                <YAxis stroke="#9CA3AF" style={{ fontSize: '12px' }} tickLine={false} />
                <RechartsTooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #E5E7EB',
                    borderRadius: '12px',
                    fontSize: '12px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                  }}
                />
                <Bar dataKey="tasks" fill="#E10600" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">Recent Activity</h3>
          <p className="text-sm text-gray-500">Latest updates from your team</p>
        </div>
        <div className="space-y-4">
          {recentActivities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <Avatar className="h-10 w-10 flex-shrink-0 ring-2 ring-gray-100">
                <AvatarImage src={activity.avatar} />
                <AvatarFallback>{activity.user.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-900">
                  <span className="font-semibold">{activity.user}</span>{' '}
                  <span className="text-gray-600">{activity.action}</span>{' '}
                  <span className="font-medium text-gray-900">{activity.project}</span>
                </p>
                <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {activity.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
