import { FolderKanban, CheckCircle2, Users, TrendingUp } from 'lucide-react';

const summaryData = [
  {
    label: 'Total Projects',
    value: '24',
    icon: FolderKanban,
    trend: '+12%',
    trendUp: true,
  },
  {
    label: 'Total Subtasks',
    value: '156',
    icon: CheckCircle2,
    trend: '+8%',
    trendUp: true,
  },
  {
    label: 'Completion Rate',
    value: '87.5%',
    icon: TrendingUp,
    trend: '+5.2%',
    trendUp: true,
  },
  {
    label: 'Active Assignees',
    value: '12',
    icon: Users,
    trend: '+2',
    trendUp: true,
  },
];

export function SummaryCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {summaryData.map((item, index) => {
        const Icon = item.icon;
        return (
          <div
            key={index}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-200 hover:-translate-y-1"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm text-gray-600 mb-2">{item.label}</p>
                <p className="text-3xl font-semibold text-gray-900 mb-3">
                  {item.value}
                </p>
                {item.trend && (
                  <div
                    className={`flex items-center gap-1 text-sm ${
                      item.trendUp ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    <TrendingUp
                      className={`h-4 w-4 transition-transform ${!item.trendUp && 'rotate-180'}`}
                    />
                    <span className="font-medium">{item.trend}</span>
                    <span className="text-gray-500">vs last period</span>
                  </div>
                )}
              </div>
              <div
                className="p-3 rounded-lg transition-transform hover:scale-110"
                style={{ backgroundColor: '#FEE2E2' }}
              >
                <Icon className="h-6 w-6" style={{ color: '#E10600' }} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}