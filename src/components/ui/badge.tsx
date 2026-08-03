import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase transition-colors border",
  {
    variants: {
      variant: {
        default: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30",
        secondary: "bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/30",
        amber: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30",
        destructive: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30",
        outline: "text-on-surface border-outline-variant/40 bg-surface-container-high",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
