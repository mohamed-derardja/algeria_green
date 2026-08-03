"use client";

import { usePathname } from "next/navigation";
import { ReactNode, useEffect, useState, useRef } from "react";

interface PageTransitionProps {
  children: ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const [displayChildren, setDisplayChildren] = useState(children);
  const [transitionState, setTransitionState] = useState<"enter" | "exit" | "idle">("idle");
  const prevPathname = useRef(pathname);

  useEffect(() => {
    if (pathname !== prevPathname.current) {
      // Route changed — trigger exit, then swap children, then enter
      setTransitionState("exit");

      const exitTimer = setTimeout(() => {
        setDisplayChildren(children);
        setTransitionState("enter");
        prevPathname.current = pathname;

        const enterTimer = setTimeout(() => {
          setTransitionState("idle");
        }, 400);

        return () => clearTimeout(enterTimer);
      }, 250);

      return () => clearTimeout(exitTimer);
    } else {
      // Same route or initial load
      setDisplayChildren(children);
    }
  }, [pathname, children]);

  const transitionStyles: React.CSSProperties = {
    transition: "opacity 350ms cubic-bezier(0.16, 1, 0.3, 1), transform 350ms cubic-bezier(0.16, 1, 0.3, 1)",
    opacity: transitionState === "exit" ? 0 : 1,
    transform:
      transitionState === "exit"
        ? "translateY(8px)"
        : transitionState === "enter"
        ? "translateY(0)"
        : "none",
  };

  return (
    <div style={transitionStyles}>
      {displayChildren}
    </div>
  );
}
