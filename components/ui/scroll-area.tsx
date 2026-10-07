"use client"

import * as React from "react"
import { ScrollArea as ScrollAreaPrimitive } from "@base-ui/react/scroll-area"
import { cn } from "cn"

export type ScrollAreaSize = "sm" | "default" | "lg"
export type ScrollAreaVisibility = "auto" | "hover" | "always"

interface ScrollAreaContextValue {
  size: ScrollAreaSize
  visibility: ScrollAreaVisibility
}

const ScrollAreaContext = React.createContext<ScrollAreaContextValue>({
  size: "default",
  visibility: "auto",
})

const sizeConfig = {
  sm: {
    vertical: "w-1.5 p-px",
    horizontal: "h-1.5 p-px",
  },
  default: {
    // 默认精致 8px 宽轨道，两侧各 1px 边距，滑块宽 6px，宽度恒定不形变
    vertical: "w-2 p-[1px]",
    horizontal: "h-2 p-[1px]",
  },
  lg: {
    vertical: "w-2.5 p-[1.5px]",
    horizontal: "h-2.5 p-[1.5px]",
  },
} as const

const visibilityClasses: Record<ScrollAreaVisibility, string> = {
  // auto: 默认清晰微显（opacity-70），触碰或滚动时完全点亮（opacity-100）
  auto: "opacity-70 transition-opacity duration-150 ease-out hover:opacity-100 group-hover/scroll-area:opacity-100 data-[hovering]:opacity-100 data-[scrolling]:opacity-100",
  // hover: 平时隐藏，鼠标悬停或滚动时优雅淡入
  hover: "opacity-0 transition-opacity duration-150 ease-out group-hover/scroll-area:opacity-100 data-[hovering]:opacity-100 data-[scrolling]:opacity-100",
  // always: 始终 100% 显示
  always: "opacity-100",
}

interface ScrollAreaProps
  extends React.ComponentProps<typeof ScrollAreaPrimitive.Root> {
  size?: ScrollAreaSize
  visibility?: ScrollAreaVisibility
  mask?: boolean
  maskClassName?: string
  viewportClassName?: string
}

function ScrollArea({
  className,
  size = "default",
  visibility = "auto",
  mask = true,
  maskClassName,
  viewportClassName,
  children,
  ...props
}: ScrollAreaProps) {
  const contextValue = React.useMemo(
    () => ({ size, visibility }),
    [size, visibility]
  )

  return (
    <ScrollAreaContext.Provider value={contextValue}>
      <ScrollAreaPrimitive.Root
        data-slot="scroll-area"
        data-size={size}
        className={cn("group/scroll-area relative overflow-hidden", className)}
        {...props}
      >
        <ScrollAreaPrimitive.Viewport
          data-slot="scroll-area-viewport"
          className={cn(
            "size-full rounded-[inherit] outline-none focus-visible:ring-2 focus-visible:ring-ring/50",
            viewportClassName
          )}
        >
          {children}
        </ScrollAreaPrimitive.Viewport>

        {mask && <ScrollAreaMask className={maskClassName} />}

        <ScrollBar size={size} visibility={visibility} />
        <ScrollAreaPrimitive.Corner />
      </ScrollAreaPrimitive.Root>
    </ScrollAreaContext.Provider>
  )
}

function ScrollAreaMask({ className }: { className?: string }) {
  return (
    <>
      {/* 顶部溢出边缘渐隐遮罩 */}
      <div
        aria-hidden="true"
        data-slot="scroll-area-mask-top"
        className={cn(
          "pointer-events-none absolute inset-x-0 top-0 h-8 z-10",
          "bg-gradient-to-b from-background via-background/60 to-transparent",
          "opacity-0 transition-opacity duration-200 ease-out",
          "group-data-[overflow-y-start]/scroll-area:opacity-100",
          className
        )}
      />
      {/* 底部溢出边缘渐隐遮罩 */}
      <div
        aria-hidden="true"
        data-slot="scroll-area-mask-bottom"
        className={cn(
          "pointer-events-none absolute inset-x-0 bottom-0 h-8 z-10",
          "bg-gradient-to-t from-background via-background/60 to-transparent",
          "opacity-0 transition-opacity duration-200 ease-out",
          "group-data-[overflow-y-end]/scroll-area:opacity-100",
          className
        )}
      />
    </>
  )
}

interface ScrollBarProps
  extends React.ComponentProps<typeof ScrollAreaPrimitive.Scrollbar> {
  size?: ScrollAreaSize
  visibility?: ScrollAreaVisibility
}

function ScrollBar({
  className,
  orientation = "vertical",
  size: sizeProp,
  visibility: visibilityProp,
  ...props
}: ScrollBarProps) {
  const context = React.useContext(ScrollAreaContext)
  const size = sizeProp ?? context.size
  const visibility = visibilityProp ?? context.visibility
  const isVertical = orientation === "vertical"

  return (
    <ScrollAreaPrimitive.Scrollbar
      data-slot="scroll-area-scrollbar"
      data-orientation={orientation}
      orientation={orientation}
      keepMounted
      className={cn(
        "flex touch-none select-none z-20 transition-opacity duration-150 ease-out",
        visibilityClasses[visibility],
        isVertical ? "h-full flex-col" : "w-full flex-row",
        // 宽度严格固定，绝无 hover 膨胀变形
        isVertical ? sizeConfig[size].vertical : sizeConfig[size].horizontal,
        // 微底槽背景
        "rounded-full bg-black/[0.03] hover:bg-black/[0.06] dark:bg-white/[0.04] dark:hover:bg-white/[0.08]",
        className
      )}
      {...props}
    >
      <ScrollAreaPrimitive.Thumb
        data-slot="scroll-area-thumb"
        className={cn(
          "relative flex items-center justify-center cursor-grab active:cursor-grabbing",
          isVertical ? "w-full" : "h-full"
        )}
      >
        <span
          tabIndex={-1}
          aria-hidden="true"
          className={cn(
            "pointer-events-none block size-full rounded-full transition-colors duration-150",
            // 现代拟物微浮雕药丸滑块：纯净克制 + 顶部微高光 + 细柔投影
            "bg-foreground/45 hover:bg-foreground/70 active:bg-foreground/85",
            "ring-1 ring-black/10 dark:ring-white/20",
            "shadow-[0_1px_2px_rgba(0,0,0,0.1),inset_0_1px_0_0_rgba(255,255,255,0.6)] dark:shadow-[0_1px_2px_rgba(0,0,0,0.35),inset_0_1px_0_0_rgba(255,255,255,0.2)]"
          )}
        />
      </ScrollAreaPrimitive.Thumb>
    </ScrollAreaPrimitive.Scrollbar>
  )
}

const ScrollAreaViewport = ScrollAreaPrimitive.Viewport
const ScrollAreaThumb = ScrollAreaPrimitive.Thumb
const ScrollAreaCorner = ScrollAreaPrimitive.Corner

export {
  ScrollArea,
  ScrollBar,
  ScrollAreaMask,
  ScrollAreaViewport,
  ScrollAreaThumb,
  ScrollAreaCorner,
}
