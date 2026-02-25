/**
 * Login Page
 * Authentication login form
 */
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock } from "lucide-react";
import { useAuth } from "@app/providers";
import { Button, Input, Card, CardHeader, CardTitle, CardContent } from "@shared/components";
import { toast } from "sonner";

export const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await login(formData);
      toast.success("Login successful!");
      navigate("/");
    } catch (error) {
      toast.error(error.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <Card className="w-full max-w-md shadow-lg-light dark:shadow-lg-dark">
        <CardHeader className="space-y-4 pb-6">
          {/* Logo */}
          <div className="flex justify-center">
            <div className="flex-center w-16 h-16 rounded-2xl bg-primary">
              <span className="text-3xl font-bold text-primary-foreground">T</span>
            </div>
          </div>
          <CardTitle className="text-center text-2xl font-bold">
            Welcome Back
          </CardTitle>
          <p className="text-center text-2sm text-gray-600 dark:text-gray-400">
            Sign in to your account to continue
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-2sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="you@example.com"
                  className="h-11 pl-10"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="password" className="block text-2sm font-medium text-gray-700 dark:text-gray-300">
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-2sm text-primary hover:text-primary-active"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="••••••••"
                  className="h-11 pl-10"
                />
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full h-11 bg-primary hover:bg-primary-active text-primary-foreground"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          {/* Register Link */}
          <p className="text-center text-2sm text-gray-600 dark:text-gray-400 mt-6">
            Don't have an account?{" "}
            <Link to="/register" className="text-primary hover:text-primary-active font-medium">
              Create an account
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
