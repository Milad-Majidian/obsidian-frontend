"use client";

import { useEffect, useRef, useMemo } from "react";
import type { Product } from "@/features/products/types";
import { ProductListSkeleton } from "./productLIstSkeleton";
import Image from "next/image";

interface Props {
  data: any;
  fetchNextPage: () => void;
  hasNextPage?: boolean;
  isFetchingNextPage: boolean;
  isLoading: boolean;
}

export function CategoryProductList({
  data,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  isLoading,
}: Props) {
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Avoid duplicate products using a Map (by _id)
  const products: Product[] = useMemo(() => {
    const all = data?.pages.flatMap((page: any) => page.data) ?? [];
    const uniqueMap = new Map<string, Product>();
    for (const p of all) uniqueMap.set(p._id, p);
    return Array.from(uniqueMap.values());
  }, [data]);

  // Debounced infinite scroll observer
  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage) return;

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        // Debounce so it won't fire multiple times fast
        if (observerRef.current) {
          clearTimeout((observerRef.current as any).debounceTimer);
        }
        (observerRef.current as any).debounceTimer = setTimeout(() => {
          fetchNextPage();
        }, 500);
      }
    };

    const observer = new IntersectionObserver(handleIntersect, {
      threshold: 0.4,
    });
    observerRef.current = observer;

    const el = loadMoreRef.current;
    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
      observer.disconnect();
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  // --- Render ---
  if (isLoading && !products.length) {
    return <ProductListSkeleton />;
  }

  return (
    <div className="mt-6">
      <ul className="grid gap-4 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <li
            key={product._id}
            className="border rounded-lg shadow-sm p-4 hover:shadow-md transition"
          >
            {/* <img
              src={product.image || "/categories/product-placeholder.png"}
              alt={product.name}
              className="w-full h-40 object-cover rounded"
              loading="lazy"
            /> */}
            <Image
              src={product.image || "/categories/product-placeholder.png"}
              alt={product.name}
              width={250}
              height={250}
              placeholder="blur"
              blurDataURL="/categories/product-placeholder.png" // a tiny base64 or static blur image
              className="rounded-lg"
            />
            <h2 className="mt-2 font-semibold line-clamp-1">{product.name}</h2>
            <span className="text-sm text-gray-700 font-medium">
              ${product.price}
            </span>
            <p className="text-xs text-gray-600 line-clamp-2">
              {product.description}
            </p>
          </li>
        ))}
      </ul>

      {/* Infinite scroll status */}
      <div ref={loadMoreRef} className="flex justify-center py-8">
        {isFetchingNextPage && (
          <p className="text-gray-500 text-sm animate-pulse">
            Loading more products...
          </p>
        )}
        {!hasNextPage && !isFetchingNextPage && products.length > 0 && (
          <p className="text-gray-400 text-sm">No more products</p>
        )}
      </div>
    </div>
  );
}
