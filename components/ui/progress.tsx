"use client"

import * as React from "react"
import { Progress as ProgressPrimitive } from "@base-ui/react/progress"
import { cn } from "cn"

type ProgressSize = "sm" | "default" | "lg"
type ProgressVariant = "default" | "secondary" | "warning" | "destructive" | "success"

interface ProgressContextValue {
  size: ProgressSize
  variant: ProgressVariant
}

const ProgressContext = React.createContext<ProgressContextValue>({
  size: "default",
  variant: "default",
})

const sizeTrackClasses: Record<ProgressSize, string> = {
  sm: "h-1.5",
  default: "h-2",
  lg: "h-3",
}

const indicatorVariantClasses: Record<ProgressVariant, string> = {
  default: cn(
    "bg-gradient-to-b from-[color-mix(in_oklch,var(--primary),white_12%)] to-[color-mix(in_oklch,var(--primary),black_4%)]",
    "shadow-[inset_0_1px_0_0_rgba(255,255,255,0.35),0_1px_2px_0_color-mix(in_oklch,var(--primary)_25%,transparent)]"
  ),
  secondary: cn(
    "bg-gradient-to-b from-[color-mix(in_oklch,var(--foreground),white_35%)] to-[color-mix(in_oklch,var(--foreground),white_15%)]",
    "shadow-[inset_0_1px_0_0_rgba(255,255,255,0.25),0_1px_2px_0_rgba(0,0,0,0.1)]"
  ),
  warning: cn(
    "bg-gradient-to-b from-[color-mix(in_oklch,var(--warning),white_14%)] to-[color-mix(in_oklch,var(--warning),black_6%)]",
    "shadow-[inset_0_1px_0_0_rgba(255,255,255,0.4),0_1px_2px_0_color-mix(in_oklch,var(--warning)_30%,transparent)]"
  ),
  destructive: cn(
    "bg-gradient-to-b from-[color-mix(in_oklch,var(--destructive),white_12%)] to-[color-mix(in_oklch,var(--destructive),black_8%)]",
    "shadow-[inset_0_1px_0_0_rgba(255,255,255,0.35),0_1px_2px_0_color-mix(in_oklch,var(--destructive)_30%,transparent)]"
  ),
  success: cn(
    "bg-gradient-to-b from-emerald-400 to-emerald-600",
    "shadow-[inset_0_1px_0_0_rgba(255,255,255,0.35),0_1px_2px_0_rgba(16,185,129,0.3)]"
  ),
}

interface ProgressProps extends React.ComponentProps<typeof ProgressPrimitive.Root> {
  size?: ProgressSize
  variant?: ProgressVariant
}

function hasProgressTrackChild(children: React.ReactNode): boolean {
  let found = false
  React.Children.forEach(children, (child) => {
    if (
      React.isValidElement(child) &&
      (child.type === ProgressTrack ||
        (child.props as Record<string, unknown>)?.["data-slot"] === "progress-track")
    ) {
      found = true
    }
  })
  return found
}

function Progress({
  className,
  children,
  value,
  size = "default",
  variant = "default",
  ...props
}: ProgressProps) {
  const contextValue = React.useMemo(() => ({ size, variant }), [size, variant])
  const hasTrack = hasProgressTrackChild(children)

  return (
    <ProgressContext.Provider value={contextValue}>
      <ProgressPrimitive.Root
        value={value}
        data-slot="progress"
        data-size={size}
        className={cn("flex w-full flex-wrap items-center gap-2", className)}
        {...props}
      >
        {children}
        {!hasTrack && (
          <ProgressTrack>
            <ProgressIndicator />
          </ProgressTrack>
        )}
      </ProgressPrimitive.Root>
    </ProgressContext.Provider>
  )
}

interface ProgressTrackProps extends React.ComponentProps<typeof ProgressPrimitive.Track> {
  size?: ProgressSize
}

function ProgressTrack({
  className,
  size: sizeProp,
  children,
  ...props
}: ProgressTrackProps) {
  const context = React.useContext(ProgressContext)
  const size = sizeProp ?? context.size

  return (
    <ProgressPrimitive.Track
      data-slot="progress-track"
      className={cn(
        "relative flex w-full items-center overflow-hidden rounded-full select-none",
        "bg-muted ring-1 ring-border/80",
        "shadow-[inset_0_1px_1.5px_0_color-mix(in_oklch,var(--foreground)_8%,transparent)]",
        sizeTrackClasses[size],
        className
      )}
      {...props}
    >
      {children ?? <ProgressIndicator />}
    </ProgressPrimitive.Track>
  )
}

interface ProgressIndicatorProps extends React.ComponentProps<typeof ProgressPrimitive.Indicator> {
  variant?: ProgressVariant
}

function ProgressIndicator({
  className,
  variant: variantProp,
  ...props
}: ProgressIndicatorProps) {
  const context = React.useContext(ProgressContext)
  const variant = variantProp ?? context.variant

  return (
    <ProgressPrimitive.Indicator
      data-slot="progress-indicator"
      className={cn(
        "h-full rounded-full transition-[width] duration-300 ease-out",
        indicatorVariantClasses[variant],
        "data-indeterminate:w-1/3 data-indeterminate:animate-[progress-indeterminate_1.5s_infinite_ease-in-out] data-indeterminate:will-change-transform",
        className
      )}
      {...props}
    />
  )
}

function ProgressLabel({
  className,
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Label>) {
  return (
    <ProgressPrimitive.Label
      data-slot="progress-label"
      className={cn("text-xs font-medium text-foreground select-none", className)}
      {...props}
    />
  )
}

function ProgressValue({
  className,
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Value>) {
  return (
    <ProgressPrimitive.Value
      data-slot="progress-value"
      className={cn(
        "ml-auto text-xs font-mono font-medium text-muted-foreground select-none tabular-nums",
        className
      )}
      {...props}
    />
  )
}

export {
  Progress,
  ProgressTrack,
  ProgressIndicator,
  ProgressLabel,
  ProgressValue,
}
