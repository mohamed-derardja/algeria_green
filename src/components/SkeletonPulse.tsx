"use client";

import { ReactNode } from "react";

interface SkeletonPulseProps {
  variant?: "card" | "chart" | "map" | "text" | "circle" | "custom";
  width?: string;
  height?: string;
  className?: string;
  lines?: number;
  children?: ReactNode;
}

export default function SkeletonPulse({
  variant = "card",
  width,
  height,
  className = "",
  lines = 3,
}: SkeletonPulseProps) {
  const baseClass = "skeleton-pulse rounded-2xl";

  if (variant === "text") {
    return (
      <div className={`space-y-2.5 ${className}`}>
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className={`${baseClass} h-3`}
            style={{ width: i === lines - 1 ? "60%" : "100%" }}
          />
        ))}
      </div>
    );
  }

  if (variant === "circle") {
    return (
      <div
        className={`${baseClass} rounded-full ${className}`}
        style={{ width: width || "48px", height: height || "48px" }}
      />
    );
  }

  if (variant === "chart") {
    return (
      <div className={`${baseClass} ${className}`} style={{ width: width || "100%", height: height || "200px" }}>
        <div className="flex items-end justify-around h-full p-4 gap-2">
          {[60, 80, 45, 90, 55, 70, 85].map((h, i) => (
            <div
              key={i}
              className="skeleton-pulse rounded-t-lg flex-1"
              style={{ height: `${h}%`, animationDelay: `${i * 100}ms` }}
            />
          ))}
        </div>
      </div>
    );
  }

  if (variant === "map") {
    return (
      <div
        className={`${baseClass} relative overflow-hidden ${className}`}
        style={{ width: width || "100%", height: height || "300px" }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-outline-variant/40 border-t-primary/60 rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  // Default: card
  return (
    <div
      className={`${baseClass} p-5 space-y-3 ${className}`}
      style={{ width: width || "100%", height: height || "auto" }}
    >
      <div className="skeleton-pulse rounded-xl h-4 w-2/3" />
      <div className="skeleton-pulse rounded-xl h-3 w-full" />
      <div className="skeleton-pulse rounded-xl h-3 w-4/5" />
      <div className="skeleton-pulse rounded-xl h-8 w-1/3 mt-2" />
    </div>
  );
}
