import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { useCategoryFilters } from "../hooks/useCategoryFilters";
import { Separator } from "@radix-ui/react-select";

export default function CategoryFilter() {
  const {brand,minPrice,maxPrice,inStock, setFilter} = useCategoryFilters();
  return (
      <div className="sticky top-6 space-y-4">
        {/* Brand */}
      <div className="space-y-2">
        <label className="font-semibold">Brand</label>
        <Input
          value={brand || ""}
          placeholder="e.g. Apple"
          onChange={(e) => setFilter("brand", e.target.value)}
        />
      </div>
      <Separator />
      {/* Price */} 
      <div className="space-y-2">
        <label className="font-semibold">Price</label>
        <div className="flex flex-col gap-2">
          <Input
            type="number"
            placeholder="Min"
            value={minPrice || ""}
            onChange={(e) => setFilter("minPrice", e.target.value)}
          />
          <Input
            type="number"
            placeholder="Max"
            value={maxPrice || ""}
            onChange={(e) => setFilter("maxPrice", e.target.value)}
          />
        </div>
      </div>
      <Separator />
      {/* Stock */}
      <div className="flex items-center gap-2">
        <Checkbox
          checked={inStock === "true"}
          onCheckedChange={(checked) =>
            setFilter("inStock", checked ? "true" : null)
          }
        />
        <span>In Stock Only</span>
      </div>
      </div>
    // </aside>
  );
}
