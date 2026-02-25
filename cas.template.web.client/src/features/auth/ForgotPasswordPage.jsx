/**
 * Forgot Password Page
 * Password reset request form
 */
import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, ArrowLeft, CheckCircle2 } from "lucide-react";
import { Button, Input, Card, CardHeader, CardTitle, CardContent } from "@shared/components";
import { toast } from "sonner";

export const ForgotPasswordPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      setIsSuccess(true);
      toast.success("Reset link sent!");
    } catch (error) {
      toast.error(error.message || "Failed to send reset link");
    } finally {
      setIsLoading(false);
    }
  };

  const handleTryAgain = () => {
    setIsSuccess(false);
    setEmail("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <Card className="w-full max-w-md shadow-lg-light dark:shadow-lg-dark">
        {!isSuccess ? (
          <>
            {/* Form State */}
            <CardHeader className="space-y-4 pb-6">
              {/* Logo */}
              <div className="flex justify-center">
                <div className="flex-center w-16 h-16 rounded-2xl bg-primary">
                  <Mail className="h-8 w-8 text-primary-foreground" />
                </div>
              </div>
              <CardTitle className="text-center text-2xl font-bold">
                Forgot Password?
              </CardTitle>
              <p className="text-center text-2sm text-gray-600 dark:text-gray-400">
                No worries, we'll send you reset instructions
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
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="you@example.com"
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
                  {isLoading ? "Sending..." : "Send Reset Link"}
                </Button>

                {/* Back to Login Button */}
                <Link to="/login" className="block">
                  <Button
                    type="button"
                    variant="ghost"
                    className="w-full h-11"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    <span className="text-2sm">Back to Login</span>
                  </Button>
                </Link>
              </form>
            </CardContent>
          </>
        ) : (
          <>
            {/* Success State */}
            <CardHeader className="space-y-4 pb-6">
              {/* Success Icon */}
              <div className="flex justify-center">
                <div className="flex-center w-16 h-16 rounded-full bg-success-light dark:bg-success-light/20">
                  <CheckCircle2 className="h-8 w-8 text-success" />
                </div>
              </div>
              <CardTitle className="text-center text-2xl font-bold">
                Check Your Email
              </CardTitle>
              <p className="text-center text-2sm text-gray-600 dark:text-gray-400">
                We've sent password reset instructions to
              </p>
              <p className="text-center text-2sm font-medium text-gray-900 dark:text-gray-100">
                {email}
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Back to Login Button */}
                <Link to="/login" className="block">
                  <Button
                    type="button"
                    className="w-full h-11 bg-primary hover:bg-primary-active text-primary-foreground"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    <span className="text-2sm">Back to Login</span>
                  </Button>
                </Link>

                {/* Help Text */}
                <p className="text-center text-2xs text-gray-600 dark:text-gray-400">
                  Didn't receive the email?{" "}
                  <button
                    type="button"
                    onClick={handleTryAgain}
                    className="text-primary hover:text-primary-active font-medium"
                  >
                    Try again
                  </button>
                </p>
              </div>
            </CardContent>
          </>
        )}
      </Card>
    </div>
  );
};
