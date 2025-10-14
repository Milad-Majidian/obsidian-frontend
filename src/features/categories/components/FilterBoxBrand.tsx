import * as React from "react";
import { useCategoryFilters } from "@/features/categories/hooks/useCategoryFilters";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useBrands } from "../hooks/useBrands";



export function FilterBoxBrand() {
    const { filters, setFilter } = useCategoryFilters();
    const { data, isLoading: brandsLoading } = useBrands(true);
    const  brandsData = data?.data || [];
    const [search, setSearch] = React.useState("");

    const filteredBrands = React.useMemo(() => {
        if (!search) return brandsData;
        return brandsData.filter((brand)=>
            brand.name.toLowerCase().includes(search.toLowerCase())
        )
    }, [brandsData, search]);

    const handleSelect = (brand: string) => {
        setFilter("brand", brand === filters.brand ? undefined : brand);
    };

    return (
        <div className="space-y-2">
            <Label className="font-semibold">Brand</Label>
            <Input
                placeholder="Search brands..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="mb-2"
            />
            <ScrollArea className="h-60 rounded border p-2">
                {brandsLoading ? (
                    <div className="text-sm text-muted-foreground">Loading...</div>
                ) : filteredBrands.length === 0 ? (
                    <div className="text-sm text-muted-foreground">No brands found</div>
                ) : (
                    <div className="space-y-2">
                        {filteredBrands.map((brand) => (
                            <div
                                key={brand._id}
                                className="flex items-center space-x-2 cursor-pointer"
                                onClick={() => handleSelect(brand.name)}
                            >
                                <Checkbox checked={filters.brand === brand.name}  className="cursor-pointer" />
                                <span>{brand.name}</span>
                            </div>
                        ))}
                    </div>
                )}
            </ScrollArea>
        </div>
    );
}
    
