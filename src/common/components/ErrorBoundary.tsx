// src/features/shared/components/ErrorBoundary.tsx
"use client";
import { ReactNode, use } from "react";
import { ErrorBoundary as ReactErrorBoundary, FallbackProps } from "react-error-boundary";
import { Button } from "@/components/ui/elements/Button";
import { useRouter } from "next/router";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onReset?: () => void;
}

function FallbackComponent({ error, resetErrorBoundary }: FallbackProps) {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center h-64 space-y-4">
      <p className="text-red-600">{error?.message || "Something went wrong."}</p>
      <Button onClick={()=> router.push('/')}>Try Again</Button>
    </div>
  );
}

export function ErrorBoundary({ children, fallback, onReset }: ErrorBoundaryProps) {
  if (fallback !== undefined) {
    return (
      <ReactErrorBoundary fallback={fallback} onReset={onReset}>
        {children}
      </ReactErrorBoundary>
    );
  }

  return (
    <ReactErrorBoundary FallbackComponent={FallbackComponent} onReset={onReset}>
      {children}
    </ReactErrorBoundary>
  );
}
