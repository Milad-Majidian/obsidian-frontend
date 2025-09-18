import { cn } from "@/lib/utils";
import { glassmorphism } from "../styles/glassmorphism";
import * as Popover from "@radix-ui/react-popover";


interface ProductDetailsProps {
  id: number;
  name:string;
  price:string;
  x: number;
  y: number;
}

interface PopoverGlassmorphismProps {
  productDetails:ProductDetailsProps
}
export const PopoverGlassmorphism: React.FC<PopoverGlassmorphismProps> = ({ productDetails }) => {
   return (
    <div
      className="absolute"
      style={{
        left: `${productDetails.x}%`,
        top: `${productDetails.y}%`,
        transform: 'translate(-50%, -50%)',
      }}
    >
    <Popover.Root>
      <Popover.Trigger asChild>
        <button
          className={cn(
            "w-7 h-7 rounded-full flex items-center justify-center cursor-pointer",
            glassmorphism.base,
          )}
        >
          <div className="w-3 h-3 bg-white rounded-full hover:scale-90 transition-transform duration-300" />
        </button>
      </Popover.Trigger>

      <Popover.Portal>
        {/* border-white/10 */}
        <Popover.Content
           sideOffset={14}
          className="relative rounded-2xl bg-black/40 backdrop-blur-md
           p-4 shadow-lg animate-in fade-in-50 zoom-in-95 z-50 outline-none focus:outline"
        >
           {/* <Popover.Arrow
            className="w-6 h-3 fill-black/40 stroke-white/10 drop-shadow-md rounded-sm"
          /> */}
            <div className="absolute -top-[12px] left-1/2 -translate-x-1/2 ">
            <ArrowSvg />
          </div>
          <ul className="space-y-2 text-white">
            <li>Insights</li>
            <li>Automations</li>
            <li>Reports</li>
            <li>Documentation</li>
          </ul>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
    </div>
  );
};


function ArrowSvg({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="36"
      height="12"
      viewBox="0 0 36 12"
      className={className}
    >
      {/* <path
        d="M0 12C8 12 12 0 18 0C24 0 28 12 36 12Z"
        fill="currentColor"
      /> */}
      <path
        d="M0 12C8 12 12 0 18 0C24 0 28 12 36 12Z"
        fill="rgba(0,0,0,0.4)"          // match Popover background
        // stroke="rgba(255,255,255,0.1)"  // match Popover border
        // strokeWidth="1"
        filter="drop-shadow(0px 2px 6px rgba(0,0,0,0.4))" // arrow shadow
      />
    </svg>
  );
}



