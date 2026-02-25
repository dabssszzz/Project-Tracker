/**
 * Loading Spinner Component
 * Simple, reusable loading indicator
 */
import { cn } from "@shared/utils";

export const Spinner = ({ className, size = "default" }) => {
  const sizeClasses = {
    sm: "w-4 h-4 border-2",
    default: "w-8 h-8 border-2",
    lg: "w-12 h-12 border-3",
  };

  return (
    <div
      className={cn(
        "animate-spin rounded-full border-primary border-t-transparent",
        sizeClasses[size],
        className
      )}
    />
  );
};

export const LoadingPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Spinner size="lg" />
    </div>
  );
};
