import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { useCategoryFilters } from "../hooks/useCategoryFilters";
import { Separator } from "@radix-ui/react-select";
import { FilterBoxBrand } from "./FilterBoxBrand";

export default function CategoryFilterBox() {
  const { filters, setFilter } = useCategoryFilters();
  return (
    <div className="sticky top-6 space-y-4">
      {/* Brand */}
      <FilterBoxBrand />
      <Separator />
      {/* Price */}
      <div className="space-y-2">
        <label className="font-semibold">Price</label>
        <div className="flex flex-col gap-2">
          <Input
            type="text"
            placeholder="Min"
            value={filters.minPrice || ""}
            onChange={(e) => setFilter("minPrice", e.target.value)}
          />
          <Input
            type="text"
            placeholder="Max"
            value={filters.maxPrice || ""}
            onChange={(e) => setFilter("maxPrice", e.target.value)}
          />
        </div>
      </div>
      <Separator />
      {/* Stock */}
      <div className="flex items-center gap-2">
        <Checkbox
          checked={filters.inStock}
          onCheckedChange={(checked) => setFilter("inStock", checked)}
        />
        <span>In Stock Only</span>
      </div>
    </div>
  );
}
