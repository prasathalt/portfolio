"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { usePathname } from "next/navigation";

export default function Template({ children }: { children: React.ReactNode }) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    // When the template mounts (which happens on route change), animate the overlay away
    const tl = gsap.timeline();
    
    // Start with overlay covering the screen
    gsap.set(overlayRef.current, { y: "0%" });
    
    // Swipe it down away to reveal the page
    tl.to(overlayRef.current, { y: "100%", duration: 0.6, ease: "power3.inOut", delay: 0.1 });
    
    // Reset it back to top so it's ready for the next exit transition
    tl.set(overlayRef.current, { y: "-100%" });

  }, [pathname]);

  return (
    <>
      <div 
        ref={overlayRef} 
        style={{
          position: "fixed",
          inset: 0,
          background: "var(--red)",
          zIndex: 99999,
          transform: "translateY(0%)",
          pointerEvents: "none"
        }} 
      />
      {children}
    </>
  );
}
