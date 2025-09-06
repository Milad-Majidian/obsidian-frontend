import React, { useRef, useState } from "react";
import {
  useFloating,
  offset,
  flip,
  shift,
  arrow as arrowMw,
  autoUpdate,
  FloatingPortal,
  useDismiss,
  useInteractions,
} from "@floating-ui/react";
import { cn } from "@/lib/utils";

type Theme = "glass-dark" | "glass-light" | "solid-dark";

export type HotspotPopoverProps = {
  xPct: number; // 0..100
  yPct: number; // 0..100
  popoverContent: React.ReactNode;
  theme?: Theme;
  ariaLabel?: string;
};

const THEME_VARS: Record< Theme, { bg: string; border: string; text: string; markerInner: string } > = {
  "glass-dark": {
    bg: "rgba(17,24,39,0.85)", // neutral-900/85
    border: "rgba(255,255,255,0.12)",
    text: "#fff",
    markerInner: "#ffffff",
  },
  "glass-light": {
    bg: "rgba(255,255,255,0.95)",
    border: "rgba(0,0,0,0.08)",
    text: "#111827",
    markerInner: "#111827",
  },
  "solid-dark": {
    bg: "#0f172a",
    border: "rgba(255,255,255,0.06)",
    text: "#fff",
    markerInner: "#fff",
  },
};

export function HotspotPopover({
  xPct,
  yPct,
  popoverContent,
  theme = "glass-dark",
  ariaLabel = "Show details",
}: HotspotPopoverProps) {
  const [open, setOpen] = useState(false);
  const arrowRef = useRef<HTMLDivElement | null>(null);

  // change this to control width and Height
  const ARROW_WIDTH = 24; 
  const ARROW_HEIGHT = 12;

  // Floating UI positioning/middleware setup
  const { refs, floatingStyles, middlewareData, placement, context } =
    useFloating({
      placement: "top",
      open,
      onOpenChange: setOpen,
      whileElementsMounted: autoUpdate,
      middleware: [
        offset(10),
        flip({ padding: 8 }),
        shift({ padding: 8 }),
        arrowMw({ element: arrowRef }),
      ],
    });

  // Arrow geometry
  const ARROW_SIZE = 12; // px (diamond width/height)
  const staticSide: Record<string, "top" | "right" | "bottom" | "left"> = {
    top: "bottom",
    right: "left",
    bottom: "top",
    left: "right",
  };

  // Setup arrow positioning style for the popover arrow element
  const arrowStyle: React.CSSProperties = {
    left: middlewareData.arrow?.x != null ? `${middlewareData.arrow.x}px` : "",
    top: middlewareData.arrow?.y != null ? `${middlewareData.arrow.y}px` : "",
  };

  // place half of the diamond outside the popover
  (arrowStyle as any)[staticSide[placement]] = `${ARROW_SIZE / 3}px`;

  const vars = THEME_VARS[theme];

  // dismiss on outside click / escape
  const dismiss = useDismiss(context);
  const { getReferenceProps, getFloatingProps } = useInteractions([dismiss]);

  return (
    <>
      {/* Marker (hotspot) positioned with percent; keep as lightweight component */}
      <button
        ref={refs.setReference}
        {...getReferenceProps()}
        aria-label={ariaLabel}
        aria-expanded={open}
        onClick={(e) => {
          e.stopPropagation(); // avoid slider handling the click
          setOpen((o) => !o);
        }}
        onPointerDown={(e) => e.stopPropagation()}
        style={{ left: `${xPct}%`, top: `${yPct}%` }}
        className={cn(
          "absolute -translate-x-1/2 -translate-y-1/2 w-7 h-7 rounded-full grid place-items-center cursor-pointer",
          // marker visuals (glass base + ring + shadow so it reads on any background)
          "backdrop-blur-md bg-white/10 border border-white/15 shadow-[0_8px_20px_rgba(2,6,23,0.5)]",
          "ring-2 ring-white/60 transition-transform duration-150 active:scale-95"
        )}
      >
        {/* inner dot — keeps visible on bright/dark images */}
        <span
          className="w-3 h-3 rounded-full"
          style={{
            background: vars.markerInner,
            boxShadow: "0 0 0 1px rgba(0,0,0,0.25)",
          }}
        />
      </button>

      {/* Popover rendered in a portal to avoid clipping by slider containers */}
      <FloatingPortal>
        {open && (
          <div
            ref={refs.setFloating}
            {...getFloatingProps()}
            style={floatingStyles}
            className="relative z-[60] rounded-2xl p-3"
            // inline theme styles (so arrow can share same vars)
            // (we use inline style for pixel-perfect color matching with arrow)
            // eslint-disable-next-line react/style-prop-object
            // note: floatingStyles contains position/top/left so we merge them
            // by using style={Object.assign({}, floatingStyles, themeStyle)}
          >
            <div
              style={{
                background: vars.bg,
                color: vars.text,
                border: `1px solid ${vars.border}`,
                maxWidth: "min(320px, calc(100vw - 32px))",
                borderRadius: 16,
                padding: 12,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {popoverContent}
            </div>

            {/* Diamond arrow element (rotated square) */}
            <div ref={arrowRef} style={arrowStyle} className="absolute w-0 h-0">
              {placement.startsWith("top") && (
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: 0,
                    height: 0,
                    borderLeft: `${ARROW_WIDTH / 2}px solid transparent`,
                    borderRight: `${ARROW_WIDTH / 2}px solid transparent`,
                    borderTop: `${ARROW_HEIGHT}px solid ${vars.bg}`,
                  }}
                />
              )}
              {placement.startsWith("bottom") && (
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: 0,
                    height: 0,
                    borderLeft: `${ARROW_WIDTH / 2}px solid transparent`,
                    borderRight: `${ARROW_WIDTH / 2}px solid transparent`,
                    borderBottom: `${ARROW_HEIGHT}px solid ${vars.bg}`,
                  }}
                />
              )}
            </div>
          </div>
        )}
      </FloatingPortal>
    </>
  );
}
