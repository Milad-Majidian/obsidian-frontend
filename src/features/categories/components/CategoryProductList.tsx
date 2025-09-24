'use client'
import Image from "next/image";
import { useState } from "react";
import SortBar from "./SortBar";
import FilterSidebar from "./FilterSidebar";
import { Category } from "../types";
import { Product } from "@/features/products/types";

const imageUrl = "/categories/banner.jpg";
const title = "All Furniture";


type CategoriesListProps = {
    categories: Category[];
};

interface CategoryProductListProps {
  products: Product[];
}

export default function CategoryProductList({products}:CategoryProductListProps) {
    const [category, setCategory] = useState("All");
    const [sort, setSort] = useState("date_desc");
    const [search, setSearch] = useState("");
    // const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);

    // Handlers
    const onSelectCategory = (c: string) => {
        setCategory(c);
        setPage(1);
        setHasMore(true);
        // fetchProducts({ category: c, sort, search, page: 1 });
    };
    const onChangeSort = (s: string) => {
        setSort(s);
        setPage(1);
        setHasMore(true);
        // fetchProducts({ category, sort: s, search, page: 1 });
    }
    const onSearchChange = (q: string) => {
        setSearch(q);
        setPage(1);
        setHasMore(true);
        // fetchProducts({ category, sort, search: q, page: 1 });
    }
    const onReset = () => {
        setCategory("All");
        setSort("date_desc");
        setSearch("");
        setPage(1);
        setHasMore(true);
        // fetchProducts({ category: "All", sort: "date_desc", search: "", page: 1 });
    }
       console.log('product',products)
  return (
    <div className="container mx-auto p-4 md:p-6">
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
        <div className="flex flex-col md:flex-row gap-6">
          <FilterSidebar
            selected={category}
            onSelect={onSelectCategory}
            onReset={onReset}
          />

          <section className="flex-1">
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted">
                Showing {products.length} results
              </div>
              <div className="flex items-center gap-3">
                <SortBar
                  sort={sort}
                  onChange={onChangeSort}
                  onSearch={onSearchChange}
                />
              </div>
            </div>

            <div className="mt-6">
              <>
                <ul className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {products.map((product) => (
                    <li
                      key={product._id}
                      className="border rounded-lg shadow-sm p-4 hover:shadow-md transition"
                    >
                      <img
                        src={product.image || '/categories/product-placeholder.png'}
                        alt={product.name}
                        className="w-full h-40 object-cover rounded"
                      />
                      <h2 className="mt-2 font-semibold">{product.name}</h2>
                      <p className="text-sm text-gray-600">
                        {product.description}
                      </p>
                    </li>
                  ))}
                </ul>

                {/* <div className="mt-6 flex justify-center">
                  {loading ? (
                    <Button disabled>
                      <Loader2 className="animate-spin mr-2" size={16} />{" "}
                      Loading
                    </Button>
                  ) : hasMore ? (
                    <Button onClick={loadMore}>Load more</Button>
                  ) : (
                    <div className="text-sm text-muted">No more results</div>
                  )}
                </div> */}
              </>
            </div>
          </section>
        </div>
      </div>

      {/* Helpful notes for integration (comments inside the same file) */}
      {/*
Integration Checklist:
1) Replace fetchProductsServer with real API calls (/api/products) or server-action + caching.
2) Move big UI pieces (FilterSidebar, ProductCard, SortBar, TopBanner) to separate files under features/categories/
3) For RTL support: set <html dir="rtl"> on server render for RTL locales and adjust Tailwind config with the rtl plugin or use "flex-row-reverse" conditionally.
4) Use React Query or SWR for caching, background revalidation and better UX. This example keeps state local for clarity.
5) Add accessibility: focus styles for keyboard nav, aria-live for dynamic results, and descriptive alt text for product images.
6) Add proper image sizes and next/image optimization via loader if using external CDN.
7) Add unit tests for FilterSidebar and ProductCard using React Testing Library and an e2e test for the page (Playwright).
*/}
    </div>
  );
}
