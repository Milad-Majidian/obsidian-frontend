'use client';

import { Button } from '@/components/ui/elements/Button';
import { useEffect } from 'react';

export default function GlobalError({ error, reset }: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Global error:', error);
  }, [error]);

  return (  

    <div className="
      flex min-h-screen items-center justify-center bg-gray-100 dark:bg-background
      p-4 sm:p-8
    ">
      <div className="max-w-md w-full text-center">
        <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
        <p className="text-sm text-muted-foreground mb-6">
          {error.message || 'An unexpected error occurred.'}
        </p>
        <Button
          onClick={() => reset()}
          className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark"
        >
          Try Again
        </Button>
      </div>
    </div>

  );
}
