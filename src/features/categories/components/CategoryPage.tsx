"use client";
import Image from "next/image";
import { CategoryProductsResponse } from "../types";
import { Button } from "@/components/ui/elements/Button";
import { Suspense } from "react";
import CategoryFilterBox from "./CategoryFilterBox";
import { useCategoryProducts } from "../hooks/useCategoryProducts";
import { FiltersSkeleton } from "./FiltersSkeleton";
import { SortSkeleton } from "./SortSkeleton";
import { CategorySortBox } from "./CategorySortBox";
import { CategoryProductList } from "./CategoryProductList";
import { ProductListSkeleton } from "./productLIstSkeleton";
import { ErrorBoundary } from "@/common/components/ErrorBoundary";
import SortBar from "./SortBar";

const imageUrl = "/categories/banner.jpg";
interface CategoryProductListProps {
  slug: string;
  initialData: CategoryProductsResponse;
  initialFilters: any;
}

export default function CategoryPage({
  slug,
  initialData,
  initialFilters,
}: CategoryProductListProps) {
  const { data, isLoading, isError, error, refetch, isFetching } =
    useCategoryProducts(slug, initialData, initialFilters);
  const products = data?.data || [];

  // if (isError) {
  //   return (
  //     <div className="flex flex-col items-center justify-center h-64 space-y-4">
  //       <p className="text-red-600">{(error as any).message}</p>
  //       <Button onClick={() => refetch()}>Try Again</Button>
  //     </div>
  //   );
  // }

  return (
    <div className="container mx-auto p-4 md:p-6">
      {/* Banner */}
      <div className="w-full rounded-2xl overflow-hidden relative bg-gray-100">
        <div className="relative h-40 md:h-56 lg:h-72">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={slug}
              fill
              style={{ objectFit: "cover" }}
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-100 to-amber-50" />
          )}
        </div>
        <div className="absolute left-6 top-6 md:top-8">
          <h1 className="text-2xl md:text-3xl font-semibold text-white drop-shadow-md">
            {slug}
          </h1>
        </div>
      </div>
      {/* ---------- Main Layout ---------- */}
      <div className="mt-6 space-y-6">
        <div className="flex flex-col lg:flex-row gap-6 py-6">
          {/* Filters Section */}
          <aside className="lg:w-1/6 w-full">
            <ErrorBoundary>
              <Suspense fallback={<FiltersSkeleton />}>
                <CategoryFilterBox />
              </Suspense>
            </ErrorBoundary>
          </aside>

          {/* Products + Sort Section */}
          <main className="flex-1">
            <ErrorBoundary>
              <Suspense fallback={<SortSkeleton />}>
                <CategorySortBox />
              </Suspense>
            </ErrorBoundary>

            {isLoading ? (
              <ProductListSkeleton />
            ) : (
                <CategoryProductList products={products} />
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
