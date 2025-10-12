"use client";

import { useCategoryFilters } from "../hooks/useCategoryFilters";

export function CategorySortBox() {
  const { filters, setFilter } = useCategoryFilters();

  return (
    <div className="flex justify-end mb-4">
      <select
        value={filters.sortBy}
        onChange={(e) => setFilter("sortBy", e.target.value)}
        className="border rounded-md px-3 py-1"
      >
        <option value="createdAt">Newest</option>
        <option value="priceAsc">Price: Low to High</option>
        <option value="priceDesc">Price: High to Low</option>
      </select>
    </div>
  );
}
