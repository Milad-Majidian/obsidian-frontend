import { Input } from "@/components/ui/input";
import { ArrowUpDown, Search } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

function useDebouncedValue<T>(value: T, delay = 300) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

export default function SortBar({
  sort,
  onChange,
  onSearch,
}: {
  sort: string;
  onChange: (s: string) => void;
  onSearch: (q: string) => void;
}) {
  const [q, setQ] = useState("");
  const debounced = useDebouncedValue(q, 350);
  useEffect(() => onSearch(debounced), [debounced, onSearch]);

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <Button variant="outline" className="rounded-full">
            <ArrowUpDown size={16} />
          </Button>
          <div className="inline-flex items-center gap-2 bg-white/60 rounded-full p-1">
            <button
              onClick={() => onChange("date_desc")}
              className={`px-3 py-1 rounded-full ${
                sort === "date_desc" ? "bg-slate-900 text-white" : ""
              }`}
            >
              Date
            </button>
            <button
              onClick={() => onChange("price_asc")}
              className={`px-3 py-1 rounded-full ${
                sort === "price_asc" ? "bg-slate-900 text-white" : ""
              }`}
            >
              Price
            </button>
            <button
              onClick={() => onChange("relevance")}
              className={`px-3 py-1 rounded-full ${
                sort === "relevance" ? "bg-slate-900 text-white" : ""
              }`}
            >
              Relevance
            </button>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative">
          <Input
            placeholder="Search products..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="pr-10"
            aria-label="Search products"
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
            <Search size={16} />
          </div>
        </div>
        <Select>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="in_stock">In stock</SelectItem>
            <SelectItem value="on_sale">On sale</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
