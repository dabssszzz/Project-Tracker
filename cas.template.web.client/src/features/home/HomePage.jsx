/**
 * Home Page
 * Landing page for authenticated users
 */
import { Card, CardHeader, CardTitle, CardContent, Button } from "@shared/components";
import { Link } from "react-router-dom";
import { useAuth } from "@app/providers";

export const HomePage = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold mb-2">
          Welcome back, {user?.name || "User"}!
        </h1>
        <p className="text-muted-foreground">
          This is your clean template application.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Getting Started</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Learn how to use this template and customize it for your needs.
            </p>
            <Button variant="outline" size="sm" asChild>
              <Link to="/dashboard">View Dashboard</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Documentation</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Check out the README for detailed information about the template structure.
            </p>
            <Button variant="outline" size="sm">
              Read Docs
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Components</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Explore pre-built components following SOLID principles.
            </p>
            <Button variant="outline" size="sm">
              View Components
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
