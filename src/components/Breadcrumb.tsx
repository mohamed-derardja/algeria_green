"use client";

import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";

const routeLabels: Record<string, string> = {
  "/gis-console": "GIS Console",
  "/citizen-portal": "Citizen Portal",
  "/login": "Sign In",
};

export default function Breadcrumb() {
  const pathname = usePathname();

  // Don't show on homepage
  if (!pathname || pathname === "/") return null;

  const segments = pathname.split("/").filter(Boolean);
  const label = routeLabels[pathname] || segments[segments.length - 1];

  return (
    <nav
      aria-label="Breadcrumb"
      className="w-full max-w-7xl mx-auto px-container-padding pt-20 pb-2"
    >
      <ol className="flex items-center gap-1.5 text-xs text-on-surface-variant font-medium">
        <li>
          <a
            href="/"
            className="flex items-center gap-1 hover:text-primary transition-colors"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </a>
        </li>
        <li>
          <ChevronRight className="w-3 h-3 text-outline-variant" />
        </li>
        <li>
          <span className="text-on-surface font-bold">{label}</span>
        </li>
      </ol>
    </nav>
  );
}
