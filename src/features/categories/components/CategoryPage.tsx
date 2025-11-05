"use client";

import { CategoryProductsResponse, FilterParams } from "../types";
import { useCategoryProducts } from "../hooks/useCategoryProducts";
import CategoryFilterBox from "./CategoryFilterBox";
import { CategorySortBox } from "./CategorySortBox";
import { CategoryProductList } from "./CategoryProductList";
import { CategoryError } from "./CategoryError";
import { CategoryBanner } from "./CategoryBanner";


interface CategoryPageProps {
  slug: string;
  initialData: CategoryProductsResponse;
  initialFilters: FilterParams;
}

/**
 * CategoryPage - Main category view with filters, sort, and infinite scroll
 * 
 * Architecture:
 * - Hydrates with SSR initialData for instant first paint
 * - Delegates infinite scroll to CategoryProductList
 * - Filter/sort controls update query params via useCategoryFilters
 * - Each section has its own error boundary via child components
 */
export default function CategoryPage({
  slug,
  initialData,
  initialFilters,
}: CategoryPageProps) {
  const query = useCategoryProducts(slug, initialData, initialFilters);

  // Global error state (network/server failures)
  if (query.isError && !query.data) {
    return (
      <CategoryError
        error={query.error}
        onRetry={() => query.refetch()}
        slug={slug}
      />
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-6">
      <CategoryBanner slug={slug} imageUrl="/categories/banner.jpg" />

      <div className="mt-6">
        <div className="flex flex-col lg:flex-row gap-6 py-6">
          {/* Filters Sidebar */}
          <div className="lg:w-1/6 w-full">
            <CategoryFilterBox />
          </div>

          {/* Main Content Area */}
          <main className="flex-1 space-y-4">
            <CategorySortBox />
            <CategoryProductList
              data={query.data}
              fetchNextPage={query.fetchNextPage}
              hasNextPage={query.hasNextPage}
              isFetchingNextPage={query.isFetchingNextPage}
              isLoading={query.isLoading}
              isError={query.isError}
              error={query.error}
            />
          </main>
        </div>
      </div>
    </div>
  );
}
