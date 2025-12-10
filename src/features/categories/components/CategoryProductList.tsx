"use client";

import { useEffect, useRef, useMemo } from "react";
import Image from "next/image";
import type { Product } from "@/features/products/types";
import type { CategoryProductsResponse } from "@/features/categories/types";
import { ProductListSkeleton } from "./productLIstSkeleton";
import { ProductCardSkeletonGrid } from "./ProductCardSkeleton";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/elements/Button";

interface CategoryProductListProps {
  data?: {
    pages: CategoryProductsResponse[];
    pageParams?: unknown[];
  } | null;
  fetchNextPage: () => void;
  hasNextPage?: boolean;
  isFetchingNextPage: boolean;
  isLoading: boolean;
  isError?: boolean;
  error?: Error | null;
}

export function CategoryProductList({
  data,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  isLoading,
  isError,
  error,
}: CategoryProductListProps) {
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  // Flatten and deduplicate products from all pages
  const products: Product[] = useMemo(() => {
    const all = data?.pages?.flatMap((page: CategoryProductsResponse) => page.data) ?? [];
    const uniqueMap = new Map<string, Product>();
    all.forEach((p: Product) => uniqueMap.set(p._id, p));
    return Array.from(uniqueMap.values());
  }, [data]);

  // Intersection Observer for infinite scroll
  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage || !loadMoreRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          fetchNextPage();
        }
      },
      { threshold: 0.5, rootMargin: "100px" }
    );

    observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  // Initial loading state
  if (isLoading && products.length === 0) {
    return <ProductListSkeleton />;
  }

  // Empty state
  if (!isLoading && products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
        <div className="rounded-full bg-gray-100 p-4 mb-4">
          <AlertCircle className="w-12 h-12 text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          No Products Found
        </h3>
        <p className="text-gray-600 mb-4">
          Try adjusting your filters or check back later.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Product Grid */}
      <ul className="grid gap-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {products.map((product) => (
          <li
            key={product._id}
            className="group border rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-all duration-200"
          >
            <div className="relative aspect-square bg-gray-100">
              <Image
                src={product.image || "/categories/product-placeholder.png"}
                alt={product.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-200"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
              />
            </div>
            <div className="p-2.5 space-y-1">
              <h3 className="font-semibold text-xs line-clamp-2 text-gray-900">
                {product.name}
              </h3>
              <p className="text-base font-bold text-emerald-600">
                ${product.price.toFixed(2)}
              </p>
              <p className="text-xs text-gray-500 line-clamp-1">
                {product.description}
              </p>
            </div>
          </li>
        ))}
      </ul>

      {/* Inline error for pagination failures (keeps existing products visible) */}
      {isError && products.length > 0 && (
        <div className="flex items-center justify-center gap-3 p-4 bg-red-50 rounded-lg">
          <AlertCircle className="w-5 h-5 text-red-500" />
          <p className="text-sm text-red-700">
            {error?.message || "Failed to load more products"}
          </p>
          <Button
            onClick={() => fetchNextPage()}
            variant="outline"
            size="sm"
          >
            Retry
          </Button>
        </div>
      )}

      {/* Loading next page - show skeleton cards */}
      {isFetchingNextPage && (
        <ProductCardSkeletonGrid count={8} />
      )}

      {/* Infinite scroll trigger (invisible anchor) */}
      <div ref={loadMoreRef} className="h-4" aria-hidden="true" />

      {/* End of list indicator */}
      {!hasNextPage && !isFetchingNextPage && products.length > 0 && (
        <div className="flex justify-center py-8">
          <p className="text-sm text-gray-400">
            You have reached the end
          </p>
        </div>
      )}
    </div>
  );
}
