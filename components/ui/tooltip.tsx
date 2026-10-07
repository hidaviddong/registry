"use client"

import * as React from "react"
import { Tooltip as TooltipPrimitive } from "@base-ui/react/tooltip"
import { cn } from "cn"

interface TooltipProviderProps
  extends React.ComponentProps<typeof TooltipPrimitive.Provider> {
  delay?: number
  closeDelay?: number
}

function TooltipProvider({
  delay = 150,
  closeDelay = 50,
  ...props
}: TooltipProviderProps) {
  return (
    <TooltipPrimitive.Provider
      delay={delay}
      closeDelay={closeDelay}
      {...props}
    />
  )
}

function Tooltip(
  props: React.ComponentProps<typeof TooltipPrimitive.Root>
) {
  return <TooltipPrimitive.Root data-slot="tooltip" {...props} />
}

function TooltipTrigger(
  props: React.ComponentProps<typeof TooltipPrimitive.Trigger>
) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />
}

interface TooltipContentProps
  extends React.ComponentProps<typeof TooltipPrimitive.Popup> {
  sideOffset?: number
  side?: "top" | "bottom" | "left" | "right"
}

function TooltipContent({
  className,
  sideOffset = 5,
  side = "top",
  children,
  ...props
}: TooltipContentProps) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Positioner side={side} sideOffset={sideOffset}>
        <TooltipPrimitive.Popup
          data-slot="tooltip-content"
          className={cn(
            "z-50 w-fit origin-[var(--transform-origin)] rounded-md px-2.5 py-1 text-xs font-medium text-background select-none",

            "bg-[color-mix(in_oklch,var(--foreground)_94%,transparent)] backdrop-blur-sm",
            "border border-[color-mix(in_oklch,var(--background)_14%,transparent)]",
            "shadow-[0_4px_12px_-2px_color-mix(in_oklch,var(--foreground)_28%,transparent),0_1px_2px_0_color-mix(in_oklch,var(--foreground)_16%,transparent),inset_0_1px_0_0_color-mix(in_oklch,var(--background)_22%,transparent)]",

            "transition-[opacity,transform] duration-100 ease-out",
            "data-[starting-style]:opacity-0 data-[starting-style]:scale-95",
            "data-[ending-style]:opacity-0 data-[ending-style]:scale-95",

            className
          )}
          {...props}
        >
          {children}
        </TooltipPrimitive.Popup>
      </TooltipPrimitive.Positioner>
    </TooltipPrimitive.Portal>
  )
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }
