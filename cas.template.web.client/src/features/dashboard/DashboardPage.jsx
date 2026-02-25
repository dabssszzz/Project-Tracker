/**
 * Dashboard Page
 * Example dashboard with stats
 */
import { Card, CardHeader, CardTitle, CardContent } from "@shared/components";

export const DashboardPage = () => {
  const stats = [
    { label: "Total Users", value: "1,234", change: "+12%" },
    { label: "Revenue", value: "$45,678", change: "+8%" },
    { label: "Active Projects", value: "42", change: "+3%" },
    { label: "Completion Rate", value: "89%", change: "+5%" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of your application metrics.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.label}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-green-600 mt-1">{stat.change} from last month</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-2 border-b">
              <div>
                <p className="font-medium">New user registered</p>
                <p className="text-sm text-muted-foreground">2 minutes ago</p>
              </div>
            </div>
            <div className="flex items-center justify-between py-2 border-b">
              <div>
                <p className="font-medium">Project completed</p>
                <p className="text-sm text-muted-foreground">1 hour ago</p>
              </div>
            </div>
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="font-medium">System update deployed</p>
                <p className="text-sm text-muted-foreground">3 hours ago</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
