const CATEGORIES = ["All", "Sofas", "Rugs", "Dressers", "Tables", "Outdoors"];

export default function FilterSidebar({
  selected,
  onSelect,
  onReset,
  isRtl,
}: {
  selected: string;
  onSelect: (c: string) => void;
  onReset: () => void;
  isRtl?: boolean;
}) {
  return (
    <aside className="w-full md:w-64 lg:w-72">
      <div className="sticky top-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium">Filters</h3>
          <button
            className="text-sm underline"
            onClick={onReset}
            aria-label="Reset filters"
          >
            Reset
          </button>
        </div>

        <div className="bg-white/60 backdrop-blur rounded-2xl p-3 shadow-sm">
          <div className="space-y-2">
            {CATEGORIES.map((c) => {
              const active = c === selected;
              return (
                <button
                  key={c}
                  onClick={() => onSelect(c)}
                  className={`w-full text-left px-3 py-2 rounded-xl flex items-center gap-3 transition-colors ${
                    active
                      ? "bg-slate-900 text-white"
                      : "bg-gray-100 text-slate-700"
                  }`}
                  aria-pressed={active}
                >
                  <span className="w-7 h-7 rounded-md bg-white/30 flex items-center justify-center">
                    🏷️
                  </span>
                  <span className="flex-1">{c}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </aside>
  );
}
