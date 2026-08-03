"use client";

import { useRef, useEffect, useState, useCallback } from "react";

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  className?: string;
  formatFn?: (n: number) => string;
}

function defaultFormat(n: number, decimals: number): string {
  if (decimals > 0) {
    return n.toFixed(decimals);
  }
  // Add commas for thousands if the number is large enough
  if (n >= 1000) {
    // Use abbreviation for very large numbers
    if (n >= 1_000_000) {
      return (n / 1_000_000).toFixed(1) + "M";
    }
    if (n >= 1_000) {
      return (n / 1_000).toFixed(n >= 10_000 ? 0 : 1) + "k";
    }
  }
  return Math.round(n).toLocaleString();
}

export default function AnimatedCounter({
  value,
  duration = 2000,
  suffix = "",
  prefix = "",
  decimals = 0,
  className = "",
  formatFn,
}: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const rafRef = useRef<number>(0);

  const animate = useCallback(() => {
    const startTime = performance.now();

    const step = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease-out cubic for natural deceleration
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(eased * value);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(step);
      }
    };

    rafRef.current = requestAnimationFrame(step);
  }, [value, duration]);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
          animate();
          observer.unobserve(element);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [animate, hasStarted]);

  const formatted = formatFn
    ? formatFn(displayValue)
    : defaultFormat(displayValue, decimals);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}
