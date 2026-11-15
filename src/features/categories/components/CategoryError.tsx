import { Button } from "@/components/ui/elements/Button";
import { AlertCircle, RefreshCw } from "lucide-react";

interface CategoryErrorProps {
  error: Error | null;
  onRetry: () => void;
  slug: string;
}

/**
 * CategoryError - Full-page error state for category failures
 *
 * Handles:
 * - Network errors (503, timeout)
 * - Not found errors (404)
 * - Server errors (500)
 * - Provides actionable retry
 */
export function CategoryError({ error, onRetry, slug }: CategoryErrorProps) {
  const is404 = error?.message?.includes("404") || error?.message?.includes("not found");

  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
        <div className="rounded-full bg-red-50 p-6">
          <AlertCircle className="w-16 h-16 text-red-400" />
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">{is404 ? "Category Not Found" : "Unable to Load Category"}</h2>
          <p className="text-gray-600 max-w-md">
            {is404
              ? `The category "${slug}" doesn't exist or has been removed.`
              : error?.message || "Something went wrong while loading products. Please try again."}
          </p>
        </div>

        <div className="flex gap-3">
          <Button onClick={onRetry} variant="default" className="gap-2">
            <RefreshCw className="w-4 h-4" />
            Try Again
          </Button>
          <Button onClick={() => window.history.back()} variant="outline">
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
}
