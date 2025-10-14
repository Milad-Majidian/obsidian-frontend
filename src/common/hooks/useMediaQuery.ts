import { useEffect, useState } from "react";

type Breakpoints = {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
};

export function useResponsive() {
  const [breakpoints, setBreakpoints] = useState<Breakpoints>({
    isMobile: false,
    isTablet: false,
    isDesktop: false,
  });

  useEffect(() => {
    // Define breakpoints (customize as needed)
    const mobileQuery = window.matchMedia("(max-width: 767px)");
    const tabletQuery = window.matchMedia(
      "(min-width:768px) and (max-width: 1023px)"
    );
    const desktopQuery = window.matchMedia("(min-width: 1024px)");

    const updateBreakpoints = () => {
      setBreakpoints({
        isMobile: mobileQuery.matches,
        isTablet: tabletQuery.matches,
        isDesktop: desktopQuery.matches,
      });
    };
    updateBreakpoints();

    mobileQuery.addEventListener("change", updateBreakpoints);
    tabletQuery.addEventListener("change", updateBreakpoints);
    desktopQuery.addEventListener("change", updateBreakpoints);

    return () => {
      mobileQuery.removeEventListener("change", updateBreakpoints);
      tabletQuery.removeEventListener("change", updateBreakpoints);
      desktopQuery.removeEventListener("change", updateBreakpoints);
    };
  }, []);

  return breakpoints;
}
