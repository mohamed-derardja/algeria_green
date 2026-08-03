"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";
import { CheckCircle2, AlertTriangle, Info, X } from "lucide-react";

type ToastType = "success" | "error" | "info";

interface Toast {
  id: number;
  type: ToastType;
  title: string;
  message?: string;
  duration: number;
}

interface ToastContextValue {
  success: (title: string, message?: string) => void;
  error: (title: string, message?: string) => void;
  info: (title: string, message?: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    // Return a fallback that uses console, so components work even outside provider
    return {
      success: (title) => console.log("[Toast Success]", title),
      error: (title) => console.error("[Toast Error]", title),
      info: (title) => console.info("[Toast Info]", title),
    };
  }
  return ctx;
}

let toastIdCounter = 0;

export default function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback(
    (type: ToastType, title: string, message?: string) => {
      const id = ++toastIdCounter;
      const duration = type === "error" ? 6000 : 4000;
      const toast: Toast = { id, type, title, message, duration };

      setToasts((prev) => [...prev.slice(-4), toast]); // max 5

      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, duration);
    },
    []
  );

  const removeToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const contextValue: ToastContextValue = {
    success: (title, message) => addToast("success", title, message),
    error: (title, message) => addToast("error", title, message),
    info: (title, message) => addToast("info", title, message),
  };

  const iconMap: Record<ToastType, ReactNode> = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />,
    error: <AlertTriangle className="w-5 h-5 text-red-500 shrink-0" />,
    info: <Info className="w-5 h-5 text-blue-500 shrink-0" />,
  };

  const borderColorMap: Record<ToastType, string> = {
    success: "border-l-emerald-500",
    error: "border-l-red-500",
    info: "border-l-blue-500",
  };

  const progressColorMap: Record<ToastType, string> = {
    success: "bg-emerald-500",
    error: "bg-red-500",
    info: "bg-blue-500",
  };

  return (
    <ToastContext.Provider value={contextValue}>
      {children}

      {/* Toast Container */}
      <div className="fixed top-20 right-4 z-[9999] flex flex-col gap-2.5 pointer-events-none max-w-sm w-full">
        {toasts.map((toast, index) => (
          <div
            key={toast.id}
            className={`pointer-events-auto bg-surface-container-lowest dark:bg-surface-container-high rounded-xl shadow-2xl border border-outline-variant/30 border-l-4 ${borderColorMap[toast.type]} overflow-hidden`}
            style={{
              animation: `toastSlideIn 400ms cubic-bezier(0.16, 1, 0.3, 1) forwards`,
              animationDelay: `${index * 50}ms`,
            }}
          >
            <div className="flex items-start gap-3 p-3.5">
              {iconMap[toast.type]}
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-on-surface leading-tight">
                  {toast.title}
                </p>
                {toast.message && (
                  <p className="text-[11px] text-on-surface-variant mt-0.5 leading-relaxed">
                    {toast.message}
                  </p>
                )}
              </div>
              <button
                onClick={() => removeToast(toast.id)}
                className="text-on-surface-variant hover:text-on-surface p-0.5 cursor-pointer shrink-0"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Auto-dismiss progress bar */}
            <div className="h-[2px] w-full bg-outline-variant/20">
              <div
                className={`h-full ${progressColorMap[toast.type]} rounded-full`}
                style={{
                  animation: `toastProgress ${toast.duration}ms linear forwards`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
