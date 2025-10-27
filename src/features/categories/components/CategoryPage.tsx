"use client";
import Image from "next/image";
import { CategoryProductsResponse } from "../types";
import React, { Suspense, useEffect, useRef } from "react";
import CategoryFilterBox from "./CategoryFilterBox";
import { useCategoryProducts } from "../hooks/useCategoryProducts";
import { FiltersSkeleton } from "./FiltersSkeleton";
import { SortSkeleton } from "./SortSkeleton";
import { CategorySortBox } from "./CategorySortBox";
import { CategoryProductList } from "./CategoryProductList";
import { ErrorBoundary } from "@/common/components/ErrorBoundary";

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

  const query = useCategoryProducts(slug, initialData, initialFilters);

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

            {/* Product List (with infinite scroll inside) */}
          <CategoryProductList {...query} />
          </main>
        </div>
      </div>
    </div>
  );
}
