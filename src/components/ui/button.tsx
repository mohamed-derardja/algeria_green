import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-xs font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 disabled:pointer-events-none disabled:opacity-50 active:scale-95 cursor-pointer shadow-xs",
  {
    variants: {
      variant: {
        default: "bg-emerald-700 text-white hover:bg-emerald-800 shadow-sm",
        emerald: "bg-emerald-600 text-white hover:bg-emerald-700 shadow-md",
        destructive: "bg-rose-600 text-white hover:bg-rose-700 shadow-sm",
        outline: "border border-slate-300 dark:border-zinc-800 bg-white dark:bg-black text-slate-800 dark:text-zinc-200 hover:border-emerald-600 hover:text-emerald-700 dark:hover:text-emerald-400",
        secondary: "bg-slate-100 dark:bg-zinc-800 text-slate-900 dark:text-zinc-100 hover:bg-slate-200 dark:hover:bg-zinc-700",
        ghost: "hover:bg-slate-100 dark:hover:bg-zinc-800 text-slate-700 dark:text-zinc-300",
        link: "text-emerald-700 dark:text-emerald-400 underline-offset-4 hover:underline",
        glass: "glass-card hover:bg-surface-container-high text-on-surface border border-outline-variant/60",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 px-3 py-1.5 text-[11px]",
        lg: "h-12 px-6 py-3 text-sm",
        icon: "h-9 w-9 p-2 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
