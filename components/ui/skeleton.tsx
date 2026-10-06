import * as React from "react"
import { cn } from "cn"

interface SkeletonProps extends React.ComponentProps<"div"> {
  variant?: "shimmer" | "pulse" | "none"
}

function Skeleton({
  className,
  variant = "shimmer",
  ...props
}: SkeletonProps) {
  return (
    <div
      data-slot="skeleton"
      aria-hidden="true"
      className={cn(
        // 拟物微沉降骨架底座：微内凹阴影 + 柔和边框
        "relative overflow-hidden rounded-md bg-muted/80 ring-1 ring-border/50 select-none",
        "shadow-[inset_0_1px_1px_0_color-mix(in_oklch,var(--foreground)_5%,transparent)]",
        // 流光微扫掠变体 (Shimmer)
        variant === "shimmer" && [
          "after:pointer-events-none after:absolute after:inset-0 after:-translate-x-full",
          "after:animate-[skeleton-shimmer_1.8s_infinite] after:will-change-transform",
          "after:bg-gradient-to-r after:from-transparent after:via-white/50 dark:after:via-white/10 after:to-transparent",
        ],
        // 呼吸脉冲变体 (Pulse)
        variant === "pulse" && "animate-pulse",
        className
      )}
      {...props}
    />
  )
}

export { Skeleton }
