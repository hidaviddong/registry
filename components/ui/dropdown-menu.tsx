"use client"

import * as React from "react"
import { Menu as MenuPrimitive } from "@base-ui/react/menu"
import { cn } from "cn"

function DropdownMenu(
  props: React.ComponentProps<typeof MenuPrimitive.Root>
) {
  return <MenuPrimitive.Root data-slot="dropdown-menu" {...props} />
}

interface DropdownMenuTriggerProps
  extends React.ComponentProps<typeof MenuPrimitive.Trigger> {}

function DropdownMenuTrigger({
  className,
  ...props
}: DropdownMenuTriggerProps) {
  return (
    <MenuPrimitive.Trigger
      data-slot="dropdown-menu-trigger"
      className={cn("outline-none", className)}
      {...props}
    />
  )
}

function DropdownMenuGroup(
  props: React.ComponentProps<typeof MenuPrimitive.Group>
) {
  return <MenuPrimitive.Group data-slot="dropdown-menu-group" {...props} />
}

interface DropdownMenuContentProps
  extends React.ComponentProps<typeof MenuPrimitive.Popup> {
  sideOffset?: number
  side?: "top" | "bottom" | "left" | "right"
  align?: "start" | "center" | "end"
}

function DropdownMenuContent({
  className,
  sideOffset = 5,
  side = "bottom",
  align = "start",
  children,
  ...props
}: DropdownMenuContentProps) {
  return (
    <MenuPrimitive.Portal>
      <MenuPrimitive.Positioner
        side={side}
        sideOffset={sideOffset}
        align={align}
      >
        <MenuPrimitive.Popup
          data-slot="dropdown-menu-content"
          className={cn(
            // 基础面板尺寸与紧凑排版
            "z-50 min-w-44 overflow-hidden rounded-xl p-1 text-xs select-none outline-none",

            // 现代高级微浮雕面板（纯正通透白底/暗色深灰 + 多层柔和空气漫反射阴影 + 顶部极细微反光）
            "border border-border/80 bg-background text-foreground",
            "shadow-[0_12px_32px_-4px_color-mix(in_oklch,var(--foreground)_8%,transparent),0_4px_12px_-2px_color-mix(in_oklch,var(--foreground)_5%,transparent),0_0_0_1px_color-mix(in_oklch,var(--foreground)_4%,transparent),inset_0_1px_0_0_color-mix(in_oklch,var(--background)_80%,transparent)]",

            // 动效：极速 Custom Ease-Out（前段瞬发，后段微沉浮，绝不慢吞吞）
            "transition-[opacity,transform] duration-120 ease-[cubic-bezier(0.16,1,0.3,1)]",
            "data-[starting-style]:opacity-0 data-[starting-style]:scale-[0.96] data-[starting-style]:-translate-y-1",
            "data-[ending-style]:opacity-0 data-[ending-style]:scale-[0.96] data-[ending-style]:-translate-y-1",

            className
          )}
          {...props}
        >
          {children}
        </MenuPrimitive.Popup>
      </MenuPrimitive.Positioner>
    </MenuPrimitive.Portal>
  )
}

interface DropdownMenuItemProps
  extends React.ComponentProps<typeof MenuPrimitive.Item> {
  variant?: "default" | "destructive"
  inset?: boolean
}

function DropdownMenuItem({
  className,
  variant = "default",
  inset,
  ...props
}: DropdownMenuItemProps) {
  return (
    <MenuPrimitive.Item
      data-slot="dropdown-menu-item"
      data-variant={variant}
      className={cn(
        // 紧凑利落的菜单项排版（对齐 Linear / Raycast）
        "group relative flex h-7.5 items-center gap-2 rounded-[6px] px-2 text-xs font-normal outline-none select-none cursor-pointer",
        "transition-colors duration-75",
        inset && "pl-7",

        // 默认项：轻柔透气的半透高亮底
        variant === "default" && [
          "text-foreground/90",
          "data-[highlighted]:bg-muted/80 data-[highlighted]:text-foreground",
          "[&_svg]:text-muted-foreground [&_svg]:transition-colors group-data-[highlighted]:[&_svg]:text-foreground",
        ],

        // 危险/破坏性项（严格基于设计系统 var(--destructive) 调校，深邃扎实，白底对比度极高）
        variant === "destructive" && [
          "text-[color-mix(in_oklch,var(--destructive),black_12%)]",
          "data-[highlighted]:bg-[color-mix(in_oklch,var(--destructive)_10%,transparent)]",
          "data-[highlighted]:text-[color-mix(in_oklch,var(--destructive),black_18%)]",
          "[&_svg]:text-[color-mix(in_oklch,var(--destructive),black_12%)]",
          "[&_[data-slot=dropdown-menu-shortcut]]:text-[color-mix(in_oklch,var(--destructive),black_12%)]/70",
          "group-data-[highlighted]:[&_[data-slot=dropdown-menu-shortcut]]:text-[color-mix(in_oklch,var(--destructive),black_18%)]",
        ],

        // 禁用状态
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-40",
        "[&_svg]:size-3.5 [&_svg]:shrink-0",
        className
      )}
      {...props}
    />
  )
}

function DropdownMenuLabel({
  className,
  inset,
  ...props
}: React.ComponentProps<"div"> & {
  inset?: boolean
}) {
  return (
    <div
      data-slot="dropdown-menu-label"
      className={cn(
        "px-2 py-1 text-[11px] font-medium text-muted-foreground/75 select-none",
        inset && "pl-7",
        className
      )}
      {...props}
    />
  )
}

function DropdownMenuSeparator({
  className,
  ...props
}: React.ComponentProps<typeof MenuPrimitive.Separator>) {
  return (
    <MenuPrimitive.Separator
      data-slot="dropdown-menu-separator"
      className={cn(
        // 复用我们标志性的两端羽化渐隐微分割线，彻底消除突兀截断的黑硬杠
        "-mx-1 my-1 h-px bg-gradient-to-r from-transparent via-border to-transparent",
        className
      )}
      {...props}
    />
  )
}

function DropdownMenuShortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="dropdown-menu-shortcut"
      className={cn(
        // 统一使用与左侧菜单协调的标准 text-xs (12px)，基线完全平齐
        "ml-auto inline-flex items-center gap-0.5 text-xs tracking-normal text-muted-foreground transition-colors group-data-[highlighted]:text-foreground/80 select-none",
        className
      )}
      {...props}
    />
  )
}

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
}
