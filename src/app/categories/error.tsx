'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/elements/Button';


interface CategoryErrorProps {
  error: Error;
  reset?: () => void;
}

export default function CategoryError({ error }: CategoryErrorProps) {
  const router = useRouter()
  useEffect(() => {
    console.error('Category page error:', error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center h-[80vh] text-center">
      <h2 className="text-xl font-semibold mb-2">We couldn’t load this category 🛒</h2>
      <Button onClick={() => router.push('/') }>Go to Home</Button>
    </div>
  );
}
