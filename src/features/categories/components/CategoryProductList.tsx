"use client";
import Image from "next/image";
import { useState } from "react";
import SortBar from "./SortBar";
import { Category } from "../types";
import { Product } from "@/features/products/types";
import { useCategoryProducts } from "../hooks/useCategoryProducts";
import { is } from "zod/v4/locales";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/elements/Button";
import { useResponsive } from "@/hooks/useMediaQuery";
import CategoryFilter from "./CategoryFilter";

const imageUrl = "/categories/banner.jpg";
const title = "All Furniture";

type CategoriesListProps = {
  categories: Category[];
};

interface CategoryProductListProps {
  products: Product[];
}

export default function CategoryProductList({ slug }: { slug: string }) {
  const { data, isLoading, isError, error, refetch } =
    useCategoryProducts(slug);
  const products = data?.data || [];

  const { isMobile, isDesktop } = useResponsive();

  if (isLoading) {
    return (
      <div className="container mx-auto p-4 md:p-6">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
          <div className="col-span-1">
            <Skeleton className="h-84 w-full rounded-lg" />
          </div>
          <div className={isDesktop ? "md:col-span-5 space-y-4" : "col-span-6"}>
            <ul className="grid gap-4 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <Skeleton key={i} className="h-40 w-full rounded-lg" />
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-4">
        <p className="text-red-600">{(error as any).message}</p>
        <Button onClick={() => refetch()}>Try Again</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-6">
      {/* Banner */}
      <div className="w-full rounded-2xl overflow-hidden relative bg-gray-100">
        <div className="relative h-40 md:h-56 lg:h-72">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={title}
              fill
              style={{ objectFit: "cover" }}
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-100 to-amber-50" />
          )}
        </div>
        <div className="absolute left-6 top-6 md:top-8">
          <h1 className="text-2xl md:text-3xl font-semibold text-white drop-shadow-md">
            {title}
          </h1>
        </div>
      </div>

      <div className="mt-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
          {isDesktop && (
              <aside className="md:col-span-1">
            <CategoryFilter />
          </aside>
          ) }
           <section className={isDesktop ? "md:col-span-5 space-y-4" : "col-span-6"}>
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted">
                Showing {products.length} results
              </div>
              <div className="flex items-center gap-3">
                {/* <SortBar
                  sort={sort}
                  onChange={onChangeSort}
                  onSearch={onSearchChange}
                /> */}
              </div>
            </div>

            <div className="mt-6">
              <>
                <ul className="grid gap-4 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4">
                  {products.map((product) => (
                    <li
                      key={product._id}
                      className="border rounded-lg shadow-sm p-4 hover:shadow-md transition"
                    >
                      <img
                        src={
                          product.image || "/categories/product-placeholder.png"
                        }
                        alt={product.name}
                        className="w-full h-40 object-cover rounded"
                      />
                      <h2 className="mt-2 font-semibold">{product.name}</h2>
                      <span className="">{product.price}</span>
                      <p className="text-sm text-gray-600">
                        {product.description}
                      </p>
                    </li>
                  ))}
                </ul>
              </>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
