"use client";

import { useCategoryFilters } from "../hooks/useCategoryFilters";
import { ArrowUpDown, TrendingUp, TrendingDown, Clock } from "lucide-react";

type SortOption = {
  value: string;
  label: string;
  icon: React.ReactNode;
};

const SORT_OPTIONS: SortOption[] = [
  { value: "newest", label: "Newest", icon: <Clock className="w-4 h-4" /> },
  { value: "price_low", label: "Price: Low to High", icon: <TrendingUp className="w-4 h-4" /> },
  { value: "price_high", label: "Price: High to Low", icon: <TrendingDown className="w-4 h-4" /> },
];

/**
 * CategorySortBox - Horizontal button group for sorting products
 * 
 * Uses URL params for sort state so it's shareable and works with browser back/forward
 */
export function CategorySortBox() {
  const { filters, setFilter } = useCategoryFilters();
  const currentSort = filters.sort || "newest";

  return (
    <div className="flex items-center gap-2 mb-4">
      <div className="flex items-center gap-1.5 text-sm text-gray-600">
        <ArrowUpDown className="w-4 h-4" />
        <span className="font-medium">Sort by:</span>
      </div>
      
      <div className="flex items-center gap-2">
        {SORT_OPTIONS.map((option) => {
          const isActive = currentSort === option.value;
          
          return (
            <button
              key={option.value}
              onClick={() => setFilter("sort", option.value)}
              className={`
                flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium
                transition-all duration-200 cursor-pointer
                ${
                  isActive
                    ? "bg-emerald-600 text-white shadow-sm"
                    : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-gray-400"
                }
              `}
              aria-pressed={isActive}
            >
              {option.icon}
              <span>{option.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
