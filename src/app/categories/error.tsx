'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function CategoryError({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter()
  useEffect(() => {
    console.error('Category page error:', error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center h-[80vh] text-center">
      <h2 className="text-xl font-semibold mb-2">We couldn’t load this category 🛒</h2>
      {/* <p className="text-gray-500 mb-6">{error.message || 'Please try again later.'}</p> */}
      {/* <Button onClick={() => reset()}>Reload Category</Button> */}
      <Button onClick={() => router.push('/') }>Go to Home</Button>

    </div>
  );
}
