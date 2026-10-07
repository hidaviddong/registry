"use client"

import * as React from "react"
import { Slider as SliderPrimitive } from "@base-ui/react/slider"
import { AnimatePresence, motion } from "motion/react"
import { cn } from "cn"

type SliderSize = "sm" | "default" | "lg"
type SliderVariant = "default" | "secondary" | "warning" | "destructive"

interface SliderContextValue {
  size: SliderSize
  variant: SliderVariant
  showTooltip?: boolean
}

const SliderContext = React.createContext<SliderContextValue>({
  size: "default",
  variant: "default",
  showTooltip: true,
})

const sizeConfig: Record<
  SliderSize,
  {
    trackH: string
    trackV: string
    thumb: string
    tooltipOffset: number
  }
> = {
  sm: {
    trackH: "h-1",
    trackV: "w-1",
    thumb: "size-3.5",
    tooltipOffset: -24,
  },
  default: {
    trackH: "h-1.5",
    trackV: "w-1.5",
    thumb: "size-4.5",
    tooltipOffset: -26,
  },
  lg: {
    trackH: "h-2",
    trackV: "w-2",
    thumb: "size-5.5",
    tooltipOffset: -28,
  },
}

const indicatorVariantClasses: Record<SliderVariant, string> = {
  default: cn(
    "bg-gradient-to-b from-[color-mix(in_oklch,var(--primary),white_10%)] to-[color-mix(in_oklch,var(--primary),black_6%)]",
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
}

interface SliderProps
  extends React.ComponentProps<typeof SliderPrimitive.Root> {
  size?: SliderSize
  variant?: SliderVariant
  showTooltip?: boolean
}

function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  size = "default",
  variant = "default",
  showTooltip = true,
  children,
  thumbAlignment = "edge",
  ...props
}: SliderProps) {
  const _values = React.useMemo(() => {
    if (Array.isArray(value)) return value
    if (typeof value === "number") return [value]
    if (Array.isArray(defaultValue)) return defaultValue
    if (typeof defaultValue === "number") return [defaultValue]
    return [min]
  }, [value, defaultValue, min])

  const contextValue = React.useMemo(
    () => ({ size, variant, showTooltip }),
    [size, variant, showTooltip]
  )

  return (
    <SliderContext.Provider value={contextValue}>
      <SliderPrimitive.Root
        className={cn(
          "data-horizontal:w-full data-vertical:h-full select-none",
          className
        )}
        data-slot="slider"
        data-size={size}
        defaultValue={defaultValue}
        value={value}
        min={min}
        max={max}
        thumbAlignment={thumbAlignment}
        {...props}
      >
        {children ?? (
          <SliderControl>
            <SliderTrack>
              <SliderIndicator />
            </SliderTrack>
            {Array.from({ length: _values.length }, (_, index) => (
              <SliderThumb key={index} index={index} />
            ))}
          </SliderControl>
        )}
      </SliderPrimitive.Root>
    </SliderContext.Provider>
  )
}

function SliderControl({
  className,
  ...props
}: React.ComponentProps<typeof SliderPrimitive.Control>) {
  return (
    <SliderPrimitive.Control
      data-slot="slider-control"
      className={cn(
        "relative flex touch-none items-center select-none cursor-pointer",
        "data-horizontal:h-6 data-horizontal:w-full",
        "data-vertical:h-full data-vertical:min-h-40 data-vertical:w-6 data-vertical:flex-col",
        "data-disabled:cursor-not-allowed data-disabled:opacity-40",
        className
      )}
      {...props}
    />
  )
}

interface SliderTrackProps
  extends React.ComponentProps<typeof SliderPrimitive.Track> {
  size?: SliderSize
}

function SliderTrack({
  className,
  size: sizeProp,
  children,
  ...props
}: SliderTrackProps) {
  const context = React.useContext(SliderContext)
  const size = sizeProp ?? context.size
  const config = sizeConfig[size] || sizeConfig.default

  return (
    <SliderPrimitive.Track
      data-slot="slider-track"
      className={cn(
        "relative grow overflow-hidden rounded-full select-none",
        "bg-muted ring-1 ring-border/80",
        "shadow-[inset_0_1px_1.5px_0_color-mix(in_oklch,var(--foreground)_8%,transparent)]",
        "transition-colors duration-150 ease-out",
        "hover:bg-[color-mix(in_oklch,var(--muted)_92%,var(--foreground))]",
        `data-horizontal:${config.trackH} data-horizontal:w-full`,
        `data-vertical:${config.trackV} data-vertical:h-full`,
        className
      )}
      {...props}
    >
      {children ?? <SliderIndicator />}
    </SliderPrimitive.Track>
  )
}

interface SliderIndicatorProps
  extends React.ComponentProps<typeof SliderPrimitive.Indicator> {
  variant?: SliderVariant
}

function SliderIndicator({
  className,
  variant: variantProp,
  ...props
}: SliderIndicatorProps) {
  const context = React.useContext(SliderContext)
  const variant = variantProp ?? context.variant

  return (
    <SliderPrimitive.Indicator
      data-slot="slider-indicator"
      className={cn(
        "rounded-full select-none",
        "data-horizontal:h-full data-vertical:w-full",
        indicatorVariantClasses[variant],
        className
      )}
      {...props}
    />
  )
}

interface SliderThumbProps
  extends React.ComponentProps<typeof SliderPrimitive.Thumb> {
  size?: SliderSize
  showTooltip?: boolean
}

function SliderThumb({
  className,
  size: sizeProp,
  showTooltip: showTooltipProp,
  ...props
}: SliderThumbProps) {
  const context = React.useContext(SliderContext)
  const size = sizeProp ?? context.size
  const config = sizeConfig[size] || sizeConfig.default
  const showTooltip = showTooltipProp ?? context.showTooltip ?? true

  return (
    <SliderPrimitive.Thumb
      data-slot="slider-thumb"
      className={cn(
        "relative block shrink-0 select-none outline-none cursor-grab active:cursor-grabbing",
        config.thumb,
        "focus-visible:ring-3 focus-visible:ring-ring/50",
        "after:absolute after:-inset-2 after:content-['']",
        "disabled:pointer-events-none disabled:opacity-40 disabled:shadow-none",
        className
      )}
      render={(thumbProps, state) => {
        const thumbIndex =
          ((thumbProps as Record<string, unknown>)["data-index"] as number) ??
          0
        const isDragging =
          Boolean(state.dragging) &&
          (state.activeThumbIndex === thumbIndex || state.activeThumbIndex === -1)
        const currentValue = Number(state.values?.[thumbIndex] ?? 0)
        const min = state.min ?? 0
        const max = state.max ?? 100
        const isAtMin = currentValue <= min
        const isAtMax = currentValue >= max
        const isVertical = state.orientation === "vertical"

        const boundaryX = isAtMin ? -1.75 : isAtMax ? 1.75 : 0
        const boundaryY = isAtMin ? 1.75 : isAtMax ? -1.75 : 0
        const squishScaleParallel = isAtMin || isAtMax ? 0.88 : 1
        const squishScaleCross = isAtMin || isAtMax ? 1.08 : 1

        const targetX = !isVertical ? (isDragging ? boundaryX : 0) : 0
        const targetY = isVertical ? (isDragging ? boundaryY : 0) : 0
        const targetScaleX = isDragging
          ? !isVertical
            ? squishScaleParallel
            : squishScaleCross
          : 1
        const targetScaleY = isDragging
          ? !isVertical
            ? squishScaleCross
            : squishScaleParallel
          : 1

        return (
          <div {...thumbProps}>
            <AnimatePresence>
              {showTooltip && isDragging && (
                <motion.div
                  initial={{ opacity: 0, y: 4, scale: 0.75 }}
                  animate={{
                    opacity: 1,
                    y: config.tooltipOffset,
                    scale: 1,
                  }}
                  exit={{ opacity: 0, y: 4, scale: 0.75 }}
                  transition={{
                    type: "spring",
                    stiffness: 580,
                    damping: 32,
                    mass: 0.8,
                  }}
                  className="pointer-events-none absolute -top-1 left-1/2 -translate-x-1/2 z-30 flex items-center justify-center rounded-md bg-foreground px-1.5 py-0.5 text-[10px] font-mono font-medium text-background shadow-md select-none"
                >
                  <span>{currentValue}</span>
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 border-x-[3.5px] border-t-[4px] border-x-transparent border-t-foreground" />
                </motion.div>
              )}
            </AnimatePresence>

            <motion.span
              tabIndex={-1}
              aria-hidden="true"
              className={cn(
                "pointer-events-none block size-full rounded-full",
                "bg-gradient-to-b from-white to-neutral-50/95 ring-1 ring-black/10 dark:ring-white/20",
                "shadow-[0_1.5px_3px_0_rgba(0,0,0,0.12),0_1px_1px_0_rgba(0,0,0,0.08),inset_0_1px_0_0_rgba(255,255,255,0.95)]",
                isAtMax && "shadow-[0_1px_2px_rgba(0,0,0,0.18)]"
              )}
              animate={{
                x: targetX,
                y: targetY,
                scaleX: targetScaleX,
                scaleY: targetScaleY,
              }}
              whileHover={{ scale: 1.12 }}
              whileTap={{ scale: 0.92 }}
              transition={{
                type: "spring",
                stiffness: 580,
                damping: 32,
                mass: 0.8,
              }}
            />
          </div>
        )
      }}
      {...props}
    />
  )
}

function SliderLabel({
  className,
  ...props
}: React.ComponentProps<typeof SliderPrimitive.Label>) {
  return (
    <SliderPrimitive.Label
      data-slot="slider-label"
      className={cn("text-xs font-medium text-foreground select-none", className)}
      {...props}
    />
  )
}

function SliderValue({
  className,
  ...props
}: React.ComponentProps<typeof SliderPrimitive.Value>) {
  return (
    <SliderPrimitive.Value
      data-slot="slider-value"
      className={cn(
        "ml-auto text-xs font-mono font-medium text-muted-foreground select-none tabular-nums",
        className
      )}
      {...props}
    />
  )
}

export {
  Slider,
  SliderControl,
  SliderTrack,
  SliderIndicator,
  SliderThumb,
  SliderLabel,
  SliderValue,
}
