import { Trees, Home, Map, ArrowLeft } from "lucide-react";
import GreenAlgeriaLogo from "@/components/GreenAlgeriaLogo";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-on-background">
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="max-w-lg w-full text-center space-y-8">
          {/* Logo */}
          <div className="flex justify-center">
            <GreenAlgeriaLogo className="w-16 h-16 opacity-40" />
          </div>

          {/* 404 Hero */}
          <div className="space-y-3">
            <h1 className="font-mono text-8xl font-black text-primary/20 dark:text-primary/30 leading-none">
              404
            </h1>
            <h2 className="font-headline-lg text-2xl font-bold text-on-surface">
              Lost in the Forest
            </h2>
            <p className="text-sm text-on-surface-variant leading-relaxed max-w-md mx-auto">
              This page doesn&apos;t exist in our satellite registry. It may have been moved, or perhaps the coordinates were entered incorrectly.
            </p>
          </div>

          {/* Decorative Tree Row */}
          <div className="flex justify-center gap-3 py-4">
            {[...Array(5)].map((_, i) => (
              <Trees
                key={i}
                className="text-primary/15 dark:text-primary/25"
                style={{
                  width: `${24 + Math.random() * 20}px`,
                  height: `${24 + Math.random() * 20}px`,
                  animationDelay: `${i * 0.3}s`,
                }}
              />
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-on-primary rounded-xl font-bold text-xs hover:bg-primary-container transition-all shadow-md active:scale-95"
            >
              <Home className="w-4 h-4" />
              Return to Home
            </a>
            <a
              href="/gis-console"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 glass-card text-on-surface rounded-xl font-bold text-xs border border-outline-variant/60 hover:border-primary transition-all active:scale-95"
            >
              <Map className="w-4 h-4 text-primary" />
              Open GIS Console
            </a>
          </div>

          {/* Footer text */}
          <p className="text-[11px] text-on-surface-variant font-mono">
            Error Reference: <span className="text-primary font-bold">HTTP 404</span> — Route not found in Algeria Green GIS Platform v4.2
          </p>
        </div>
      </div>
    </div>
  );
}
