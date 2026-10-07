"use client"

import * as React from "react"
import { ContextMenu as ContextMenuPrimitive } from "@base-ui/react/context-menu"
import { CaretRightIcon, CheckIcon } from "@phosphor-icons/react"
import { cn } from "cn"

function ContextMenu(
  props: React.ComponentProps<typeof ContextMenuPrimitive.Root>
) {
  return <ContextMenuPrimitive.Root data-slot="context-menu" {...props} />
}

interface ContextMenuTriggerProps
  extends React.ComponentProps<typeof ContextMenuPrimitive.Trigger> {}

function ContextMenuTrigger({
  className,
  ...props
}: ContextMenuTriggerProps) {
  return (
    <ContextMenuPrimitive.Trigger
      data-slot="context-menu-trigger"
      className={cn("outline-none select-none", className)}
      {...props}
    />
  )
}

function ContextMenuGroup(
  props: React.ComponentProps<typeof ContextMenuPrimitive.Group>
) {
  return <ContextMenuPrimitive.Group data-slot="context-menu-group" {...props} />
}

interface ContextMenuContentProps
  extends React.ComponentProps<typeof ContextMenuPrimitive.Popup> {
  sideOffset?: number
  alignOffset?: number
}

function ContextMenuContent({
  className,
  sideOffset = 4,
  alignOffset = 0,
  children,
  ...props
}: ContextMenuContentProps) {
  return (
    <ContextMenuPrimitive.Portal>
      <ContextMenuPrimitive.Positioner
        sideOffset={sideOffset}
        alignOffset={alignOffset}
      >
        <ContextMenuPrimitive.Popup
          data-slot="context-menu-content"
          className={cn(
            // 基础面板尺寸与排版
            "z-50 min-w-44 overflow-hidden rounded-xl p-1 text-sm select-none outline-none",

            // 现代高级微浮雕面板：通透磨砂底色 + 多层空气漫反射深邃阴影 + 顶部极细微反光倒角 + 双层微轮廓
            "border border-border/80 bg-background/90 backdrop-blur-md supports-[backdrop-filter]:bg-background/85 text-foreground",
            "ring-1 ring-black/[0.04] dark:ring-white/[0.08]",
            "shadow-[0_16px_36px_-6px_rgba(0,0,0,0.12),0_4px_14px_-2px_rgba(0,0,0,0.05),0_0_0_1px_rgba(0,0,0,0.04),inset_0_1px_0_0_rgba(255,255,255,0.95)]",
            "dark:shadow-[0_20px_48px_-8px_rgba(0,0,0,0.7),0_4px_16px_-2px_rgba(0,0,0,0.4),0_0_0_1px_rgba(255,255,255,0.1),inset_0_1px_0_0_rgba(255,255,255,0.15)]",

            // 动效：基于 transform-origin 的极速弹性质感展开
            "origin-[var(--transform-origin)] transition-[opacity,transform] duration-140 ease-[cubic-bezier(0.16,1,0.3,1)]",
            "data-[starting-style]:opacity-0 data-[starting-style]:scale-95",
            "data-[ending-style]:opacity-0 data-[ending-style]:scale-95",

            className
          )}
          {...props}
        >
          {children}
        </ContextMenuPrimitive.Popup>
      </ContextMenuPrimitive.Positioner>
    </ContextMenuPrimitive.Portal>
  )
}

interface ContextMenuItemProps
  extends React.ComponentProps<typeof ContextMenuPrimitive.Item> {
  variant?: "default" | "destructive"
  inset?: boolean
}

function ContextMenuItem({
  className,
  variant = "default",
  inset,
  ...props
}: ContextMenuItemProps) {
  return (
    <ContextMenuPrimitive.Item
      data-slot="context-menu-item"
      data-variant={variant}
      className={cn(
        // 紧凑利落的菜单项排版与微触感回弹
        "group relative flex h-8 items-center gap-2.5 rounded-lg px-2.5 text-sm font-normal outline-none select-none cursor-pointer",
        "transition-all duration-75 active:scale-[0.985]",
        inset && "pl-8",

        // 默认项：干净纯正且带微通透的 Muted 交互反馈
        variant === "default" && [
          "text-foreground/90",
          "data-[highlighted]:bg-muted/80 data-[highlighted]:text-foreground",
          "[&_svg]:text-muted-foreground [&_svg]:transition-colors group-data-[highlighted]:[&_svg]:text-foreground",
        ],

        // 危险项（严格对齐设计系统 var(--destructive) 色值，与 Button / Badge 完全一致）
        variant === "destructive" && [
          "text-destructive",
          "data-[highlighted]:bg-destructive/10 data-[highlighted]:text-destructive",
          "[&_svg]:text-destructive [&_svg]:transition-colors group-data-[highlighted]:[&_svg]:text-destructive",
        ],

        // 禁用状态
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-40",
        "[&_svg]:size-4 [&_svg]:shrink-0",
        className
      )}
      {...props}
    />
  )
}

function ContextMenuCheckboxItem({
  className,
  children,
  checked,
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.CheckboxItem>) {
  return (
    <ContextMenuPrimitive.CheckboxItem
      data-slot="context-menu-checkbox-item"
      checked={checked}
      className={cn(
        "group relative flex h-8 items-center gap-2.5 rounded-lg pr-2.5 pl-8 text-sm font-normal outline-none select-none cursor-pointer",
        "transition-all duration-75 active:scale-[0.985]",
        "text-foreground/90 data-[highlighted]:bg-muted/80 data-[highlighted]:text-foreground",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-40",
        className
      )}
      {...props}
    >
      <span className="absolute left-2.5 flex size-4 items-center justify-center pointer-events-none">
        <ContextMenuPrimitive.CheckboxItemIndicator>
          <CheckIcon className="size-3.5 text-primary" weight="bold" />
        </ContextMenuPrimitive.CheckboxItemIndicator>
      </span>
      {children}
    </ContextMenuPrimitive.CheckboxItem>
  )
}

function ContextMenuSub(
  props: React.ComponentProps<typeof ContextMenuPrimitive.SubmenuRoot>
) {
  return <ContextMenuPrimitive.SubmenuRoot data-slot="context-menu-sub" {...props} />
}

interface ContextMenuSubTriggerProps
  extends React.ComponentProps<typeof ContextMenuPrimitive.SubmenuTrigger> {
  inset?: boolean
}

function ContextMenuSubTrigger({
  className,
  inset,
  children,
  ...props
}: ContextMenuSubTriggerProps) {
  return (
    <ContextMenuPrimitive.SubmenuTrigger
      data-slot="context-menu-sub-trigger"
      className={cn(
        "group relative flex h-8 items-center gap-2.5 rounded-lg px-2.5 text-sm font-normal outline-none select-none cursor-pointer",
        "transition-all duration-75 active:scale-[0.985]",
        "text-foreground/90 data-[highlighted]:bg-muted/80 data-[highlighted]:text-foreground",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-40",
        inset && "pl-8",
        "[&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:text-muted-foreground [&_svg]:transition-colors group-data-[highlighted]:[&_svg]:text-foreground",
        className
      )}
      {...props}
    >
      {children}
      <CaretRightIcon className="ml-auto size-3.5 text-muted-foreground/70 transition-transform group-data-[highlighted]:text-foreground" />
    </ContextMenuPrimitive.SubmenuTrigger>
  )
}

interface ContextMenuSubContentProps
  extends React.ComponentProps<typeof ContextMenuPrimitive.Popup> {
  sideOffset?: number
  alignOffset?: number
}

function ContextMenuSubContent({
  className,
  sideOffset = 4,
  alignOffset = -4,
  children,
  ...props
}: ContextMenuSubContentProps) {
  return (
    <ContextMenuPrimitive.Portal>
      <ContextMenuPrimitive.Positioner
        sideOffset={sideOffset}
        alignOffset={alignOffset}
      >
        <ContextMenuPrimitive.Popup
          data-slot="context-menu-sub-content"
          className={cn(
            // 基础面板尺寸与排版
            "z-50 min-w-40 overflow-hidden rounded-xl p-1 text-sm select-none outline-none",

            // 现代高级微浮雕面板
            "border border-border/80 bg-background/90 backdrop-blur-md supports-[backdrop-filter]:bg-background/85 text-foreground",
            "ring-1 ring-black/[0.04] dark:ring-white/[0.08]",
            "shadow-[0_16px_36px_-6px_rgba(0,0,0,0.12),0_4px_14px_-2px_rgba(0,0,0,0.05),0_0_0_1px_rgba(0,0,0,0.04),inset_0_1px_0_0_rgba(255,255,255,0.95)]",
            "dark:shadow-[0_20px_48px_-8px_rgba(0,0,0,0.7),0_4px_16px_-2px_rgba(0,0,0,0.4),0_0_0_1px_rgba(255,255,255,0.1),inset_0_1px_0_0_rgba(255,255,255,0.15)]",

            // 动效：基于 transform-origin 的极速弹性质感展开
            "origin-[var(--transform-origin)] transition-[opacity,transform] duration-140 ease-[cubic-bezier(0.16,1,0.3,1)]",
            "data-[starting-style]:opacity-0 data-[starting-style]:scale-95",
            "data-[ending-style]:opacity-0 data-[ending-style]:scale-95",

            className
          )}
          {...props}
        >
          {children}
        </ContextMenuPrimitive.Popup>
      </ContextMenuPrimitive.Positioner>
    </ContextMenuPrimitive.Portal>
  )
}

function ContextMenuLabel({
  className,
  inset,
  ...props
}: React.ComponentProps<"div"> & {
  inset?: boolean
}) {
  return (
    <div
      data-slot="context-menu-label"
      className={cn(
        "px-2.5 py-1 text-xs font-medium text-muted-foreground select-none",
        inset && "pl-8",
        className
      )}
      {...props}
    />
  )
}

function ContextMenuSeparator({
  className,
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Separator>) {
  return (
    <ContextMenuPrimitive.Separator
      data-slot="context-menu-separator"
      className={cn(
        // 两端羽化渐隐微分割线
        "-mx-1 my-1 h-px bg-gradient-to-r from-transparent via-foreground/15 to-transparent",
        className
      )}
      {...props}
    />
  )
}

function ContextMenuShortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="context-menu-shortcut"
      className={cn(
        "ml-auto pl-4 text-xs font-normal tracking-wide text-muted-foreground/60 transition-colors group-data-[highlighted]:text-foreground/80 select-none",
        className
      )}
      {...props}
    />
  )
}

export {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuSub,
  ContextMenuSubTrigger,
  ContextMenuSubContent,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuGroup,
}
