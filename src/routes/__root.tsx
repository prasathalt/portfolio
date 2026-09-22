import {
  Outlet,
  Link,
  createRootRoute,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, useRef, type ReactNode } from "react";
import { useRouterState } from "@tanstack/react-router";
import { gsap } from "gsap";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#080808", color: "#f0f0f0" }}>
      <div style={{ textAlign: "center" }}>
        <h1 style={{ fontSize: "7rem", fontWeight: 700, fontFamily: "Space Grotesk, sans-serif", color: "#e81313" }}>404</h1>
        <p style={{ marginTop: "1rem", color: "#888" }}>Page not found</p>
        <Link to={"/" as any} style={{ display: "inline-block", marginTop: "2rem", padding: "0.75rem 2rem", background: "#e81313", color: "#f0f0f0", fontWeight: 600 }}>
          Go Home
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#080808", color: "#f0f0f0" }}>
      <div style={{ textAlign: "center" }}>
        <h1 style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "1.5rem", marginBottom: "1rem" }}>Something went wrong</h1>
        <button
          onClick={() => { reset(); }}
          style={{ padding: "0.75rem 2rem", background: "#e81313", color: "#f0f0f0", border: "none", cursor: "pointer", fontWeight: 600, marginRight: "1rem" }}
        >
          Try again
        </button>
        <a href="/" style={{ padding: "0.75rem 2rem", border: "1px solid #888", color: "#f0f0f0", fontWeight: 600 }}>
          Go home
        </a>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Prasath S — Brand & Motion Designer" },
      { name: "description", content: "Portfolio of Prasath S — Brand identity, art direction, packaging, campaigns and motion design. Dubai, UAE." },
      { name: "author", content: "Prasath S" },
      { property: "og:title", content: "Prasath S — Brand & Motion Designer" },
      { property: "og:description", content: "Selected identity, packaging, campaign and motion work by Prasath S." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap",
      },
      { rel: "icon", href: "/favicon.png", type: "image/png" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}



function RootComponent() {
  const isLoading = useRouterState({ select: (s) => s.status === 'pending' });
  const overlayRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (isLoading) {
      // Swipe down when leaving
      gsap.to(overlayRef.current, { y: "0%", duration: 0.5, ease: "power3.inOut" });
    } else {
      // Swipe down away when entering new route
      gsap.to(overlayRef.current, { y: "100%", duration: 0.5, ease: "power3.inOut", delay: 0.1 });
      // Reset back to top after it's hidden so it's ready for next transition
      gsap.set(overlayRef.current, { y: "-100%", delay: 0.6 });
    }
  }, [isLoading]);

  return (
    <>
      <div 
        ref={overlayRef} 
        style={{
          position: "fixed",
          inset: 0,
          background: "var(--red)",
          zIndex: 99999,
          transform: "translateY(-100%)",
          pointerEvents: "none"
        }} 
      />
      <Outlet />
    </>
  );
}
