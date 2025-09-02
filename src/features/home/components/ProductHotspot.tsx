import { cn } from "@/lib/utils";
import { glassmorphism } from "../styles/glassmorphism";
import { ActiveHotspotPopover } from "./ActiveHotspotPopover";


// interface ProductHotspotProps {
//     x: number;  // % position
//     y: number;  // % position
//     active: boolean;
//     onClick : () => void
// }

// export function ProductHotspot({ x, y, active, onClick }: ProductHotspotProps) {
//      return (
//     <div
//       className="absolute"
//       style={{ left: `${x}%`, top: `${y}%`, transform: "translate(-50%, -50%)" }}
//     >
      // <button
      //   onClick={onClick}
      //   className={cn(
      //     "w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300",
      //     glassmorphism.base,
      //     active && "ring-2 ring-white scale-95"
      //   )}
      // >
      //   <div className="w-3 h-3 bg-white rounded-full" />
      // </button>
//     </div>
//   );
// }

interface ProductDetailsProps {
  id: number;
  name:string;
  price:string;
  x: number;
  y: number;
}

interface ProductHotspotProps {
  productDetails:ProductDetailsProps
}

          // <button className="w-5 h-5 rounded-full bg-red-500 border-2 border-white shadow-md hover:scale-110 transition-transform" />


export const ProductHotspot: React.FC<ProductHotspotProps> = ({ productDetails }) => {
  return (
    <div
      className="absolute"
      style={{
        left: `${productDetails.x}%`,
        top: `${productDetails.y}%`,
        transform: "translate(-50%, -50%)",
      }}
    >
      <ActiveHotspotPopover
        trigger={
        <button
        className={cn(
          "w-7 h-7 rounded-full flex items-center justify-center cursor-pointer duration-300 hover:scale-90 transition-transform",
          glassmorphism.base,
        )}
      >
        <div className="w-3 h-3 bg-white rounded-full" />
      </button>
        }
        position="top"
      >
        <div className="flex flex-col items-start gap-1">
          <p className="font-semibold">{productDetails.name}</p>
          <p className="text-sm text-gray-500">{productDetails.price}</p>
        </div>
      </ActiveHotspotPopover>
    </div>
  );
};
