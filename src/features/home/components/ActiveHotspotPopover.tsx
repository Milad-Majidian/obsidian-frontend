"use client";
import React, { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface ActiveHotspotPopoverProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  position?: "top" | "bottom" | "left" | "right";
  className?: string;
}

export const ActiveHotspotPopover: React.FC<ActiveHotspotPopoverProps> = ({
  trigger,
  children,
  position = "top",
  className,
}) => {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  // Close popover when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node) &&
        !triggerRef.current?.contains(event.target as Node)
      ) {
        console.log('outside')
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block" >
      <div ref={triggerRef} className={cn(open && "ring-1 ring-white rounded-full p-0.5")} onClick={() => setOpen(!open)}>
        {trigger}
      </div>

      {open && (
        <div
          ref={popoverRef}
          className={cn(
            "absolute z-50 min-w-[200px] rounded-2xl shadow-lg bg-white dark:bg-neutral-900 p-4",
            "animate-in fade-in-0 zoom-in-95",
            {
              "bottom-full left-1/2 -translate-x-1/2 -translate-y-2": position === "top",
              "top-full left-1/2 -translate-x-1/2 translate-y-2": position === "bottom",
              "right-full top-1/2 -translate-y-1/2 -translate-x-2": position === "left",
              "left-full top-1/2 -translate-y-1/2 translate-x-2": position === "right",
            },
            className
          )}
        >
          {/* Tail */}
          <div
            className={cn(
              "absolute w-3 h-3 bg-white dark:bg-neutral-900 rotate-45",
              {
                "top-full left-1/2 -translate-x-1/2 -translate-y-1": position === "top",
                "bottom-full left-1/2 -translate-x-1/2 translate-y-1": position === "bottom",
                "left-full top-1/2 -translate-y-1/2 translate-x-1": position === "left",
                "right-full top-1/2 -translate-y-1/2 -translate-x-1": position === "right",
              }
            )}
          />
          {children}
        </div>
      )}
    </div>
  );
};
