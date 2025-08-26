import { cn } from "@/lib/utils";
import { glassmorphism } from "../styles/glassmorphism";


interface ActiveHotspotPopoverProps {
    children: React.ReactNode;
}

// -translate-y-full mt-2 z-20 bg-white rounded-2xl shadow-xl p-4 w-64

export function ActiveHotspotPopover({children}: ActiveHotspotPopoverProps) {
    return (
        <div className={cn("absolute left-1/2 -top-18 -translate-x-1/2 px-4 py-2 rounded-2xl text-sm flex items-center gap-2",
            glassmorphism.base
         )}>
            {/* Arrow pointing to hotspot */}
            <div className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 bg-white/20 border-l border-t border-white/30 backdrop-blur-md" />
            {children}
        </div>
    )
}