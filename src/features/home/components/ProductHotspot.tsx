import { cn } from "@/lib/utils";
import { glassmorphism } from "../styles/glassmorphism";

interface ProductHotspotProps {
    x: number;  // % position
    y: number;  // % position
    active: boolean;
    onClick : () => void
}

export function ProductHotspot({ x, y, active, onClick }: ProductHotspotProps) {
     return (
    <div
      className="absolute"
      style={{ left: `${x}%`, top: `${y}%`, transform: "translate(-50%, -50%)" }}
    >
      <button
        onClick={onClick}
        className={cn(
          "w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300",
          glassmorphism.base,
          active && "ring-2 ring-white scale-95"
        )}
      >
        <div className="w-3 h-3 bg-white rounded-full" />
      </button>
    </div>
  );
}