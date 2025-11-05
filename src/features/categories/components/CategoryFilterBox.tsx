import { Checkbox } from "@/components/ui/checkbox";
import { useCategoryFilters } from "../hooks/useCategoryFilters";
import { Separator } from "@radix-ui/react-select";
import { FilterBoxBrand } from "./FilterBoxBrand";


export function CategoryFilterBox() {
  const { filters, setFilter } = useCategoryFilters();
  
  return (
    <aside className="sticky top-6 space-y-4 p-4 border rounded-lg bg-white shadow-sm">
      <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
      
      {/* Brand Filter */}
      <div>
        <FilterBoxBrand />
      </div>
      
      <Separator className="my-4" />
      
      {/* Stock Filter */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Availability</label>
        <div className="flex items-center gap-2">
          <Checkbox
            id="in-stock"
            checked={filters.inStock}
            onCheckedChange={(checked) => setFilter("inStock", checked)}
          />
          <label 
            htmlFor="in-stock"
            className="text-sm text-gray-600 cursor-pointer select-none"
          >
            In Stock Only
          </label>
        </div>
      </div>
    </aside>
  );
}

export default CategoryFilterBox;
