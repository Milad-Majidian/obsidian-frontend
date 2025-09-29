import { usePathname, useRouter,useSearchParams } from "next/navigation";

/**
 * useCategoryFilters - Manages the state and logic for product category filters.
 *
 * Responsibilities:
 * - Keeps track of selected filters (brand, price range, stock availability).
 * - Syncs filter state with the URL query params.
 * - Provides callbacks to update or reset filters.
 *
 * Returns:
 * - filters: Current filter values
 * - setFilter: Function to update a specific filter
 * - resetFilters: Function to reset all filters
 *
 * Example:
 * const { filters, setFilter, resetFilters } = useCategoryFilters();
 *
 * setFilter("brand", "Apple");
 * setFilter("minPrice", 1000);
 */

export function useCategoryFilters(){
    const searchParams = useSearchParams();
    const pathname = usePathname()
    const router = useRouter();
    const category = searchParams.get("category") || "All";

    const onSelectCategory = (cat: string) => {
        setFilter("category", cat === "All" ? null : cat);
    };

    const onReset = () => {
        router.push(pathname); // Navigate to the base path without any query parameters
    };

    const setFilter = (key: string, value: string | null) => {
        const params = new URLSearchParams(searchParams.toString());
        if (value) {
            params.set(key, value);
            }
        else {
            params.delete(key);
        }
        router.push(`${pathname}?${params.toString()}`); 
    }

    return {
        brand: searchParams.get("brand") || null,
        maxPrice: searchParams.get("maxPrice") || null,
        minPrice: searchParams.get("minPrice") || null,
        inStock: searchParams.get("inStock"),
        sortBy: searchParams.get("sortBy") || "createdAt",
        order: searchParams.get("order") || "desc",
        category,
        onSelectCategory,
        onReset,
        setFilter
    }
}