import { usePathname, useRouter,useSearchParams } from "next/navigation";

/**
 * useCategoryFilters - A custom hook to manage category filters using URL search parameters.
 *
 * @returns {object} - An object containing current filter values and functions to set and reset filters.
 * - filters: Current filter values (brand, minPrice, maxPrice, inStock, sort, order, page).
 * - setFilter: Function to update a specific filter and modify the URL accordingly.
 * - resetFilters: Function to clear all filters and reset the URL to the base category path.
 *
 * This hook reads filter values from the URL's search parameters, allowing for easy sharing and bookmarking of filtered views.
 * It also provides functions to update these parameters, which in turn updates the displayed products based on the selected filters.
 */

export function useCategoryFilters() {
    const searchParams = useSearchParams();
    const searchParamsString = searchParams.toString();
    const pathname = usePathname()
    const router = useRouter();
    
    const filters = {
        brand : searchParams.get('brand') || undefined,
        minPrice: searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : undefined,
        maxPrice: searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : undefined,
        inStock: searchParams.get('inStock') === 'true' ? true : searchParams.get('inStock') ==='false' ? false : undefined,
        sort: searchParams.get('sort') || undefined,
        order: searchParams.get('order') || undefined,
        page: searchParams.get('page') ? Number(searchParams.get('page')) : 1,
    }

    const setFilter = (key: string, value: string | number | boolean | undefined) => {
        const params = new URLSearchParams(searchParamsString);
        if(value === undefined || value === null || value === ''){
            params.delete(key);
        } else {
            params.set(key, value.toString());
        }
        // Reset to first page when filters change
        if(key !== 'page'){
            params.delete('page');
        }
        const queryString = params.toString();
        const url = queryString ? `${pathname}?${queryString}` : pathname;
        router.push(url);
    }

    const resetFilters = () => {
        router.push(pathname);
    }

    return {
        filters,
        setFilter,
        resetFilters,
    };

}