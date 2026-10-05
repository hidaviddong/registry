"use client"

import * as React from "react"
import { Tooltip as TooltipPrimitive } from "@base-ui/react/tooltip"
import { cn } from "cn"

interface TooltipProviderProps
  extends React.ComponentProps<typeof TooltipPrimitive.Provider> {
  // 默认等待时间优化至 150ms（消除慢吞吞的迟钝感，既防误触又极其跟手）
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
            // 尺寸与排版：紧凑小巧，字型清晰
            "z-50 w-fit origin-[var(--transform-origin)] rounded-md px-2.5 py-1 text-xs font-medium text-background select-none",

            // 现代拟物深色微气泡（微透底色 + 顶部微高光反光 + 悬浮深邃投影，全走设计系统变量）
            "bg-[color-mix(in_oklch,var(--foreground)_94%,transparent)] backdrop-blur-sm",
            "border border-[color-mix(in_oklch,var(--background)_14%,transparent)]",
            "shadow-[0_4px_12px_-2px_color-mix(in_oklch,var(--foreground)_28%,transparent),0_1px_2px_0_color-mix(in_oklch,var(--foreground)_16%,transparent),inset_0_1px_0_0_color-mix(in_oklch,var(--background)_22%,transparent)]",

            // 进出场动效：100ms 快速轻盈响应，彻底告别拖泥带水
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
