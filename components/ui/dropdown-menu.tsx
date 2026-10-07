"use client"

import * as React from "react"
import { Menu as MenuPrimitive } from "@base-ui/react/menu"
import { CaretRightIcon, CheckIcon } from "@phosphor-icons/react"
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
            "z-50 min-w-44 overflow-hidden rounded-xl p-1 text-sm select-none outline-none",

            "border border-border/80 bg-background/90 backdrop-blur-md supports-[backdrop-filter]:bg-background/85 text-foreground",
            "ring-1 ring-black/[0.04] dark:ring-white/[0.08]",
            "shadow-[0_16px_36px_-6px_rgba(0,0,0,0.12),0_4px_14px_-2px_rgba(0,0,0,0.05),0_0_0_1px_rgba(0,0,0,0.04),inset_0_1px_0_0_rgba(255,255,255,0.95)]",
            "dark:shadow-[0_20px_48px_-8px_rgba(0,0,0,0.7),0_4px_16px_-2px_rgba(0,0,0,0.4),0_0_0_1px_rgba(255,255,255,0.1),inset_0_1px_0_0_rgba(255,255,255,0.15)]",

            "origin-[var(--transform-origin)] transition-[opacity,transform] duration-140 ease-[cubic-bezier(0.16,1,0.3,1)]",
            "data-[starting-style]:opacity-0 data-[starting-style]:scale-95",
            "data-[ending-style]:opacity-0 data-[ending-style]:scale-95",

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
        "group relative flex h-8 items-center gap-2.5 rounded-lg px-2.5 text-sm font-normal outline-none select-none cursor-pointer",
        "transition-all duration-75 active:scale-[0.985]",
        inset && "pl-8",

        variant === "default" && [
          "text-foreground/90",
          "data-[highlighted]:bg-muted/80 data-[highlighted]:text-foreground",
          "[&_svg]:text-muted-foreground [&_svg]:transition-colors group-data-[highlighted]:[&_svg]:text-foreground",
        ],

        variant === "destructive" && [
          "text-destructive",
          "data-[highlighted]:bg-destructive/10 data-[highlighted]:text-destructive",
          "[&_svg]:text-destructive [&_svg]:transition-colors group-data-[highlighted]:[&_svg]:text-destructive",
        ],

        "data-[disabled]:pointer-events-none data-[disabled]:opacity-40",
        "[&_svg]:size-4 [&_svg]:shrink-0",
        className
      )}
      {...props}
    />
  )
}

function DropdownMenuCheckboxItem({
  className,
  children,
  checked,
  ...props
}: React.ComponentProps<typeof MenuPrimitive.CheckboxItem>) {
  return (
    <MenuPrimitive.CheckboxItem
      data-slot="dropdown-menu-checkbox-item"
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
        <MenuPrimitive.CheckboxItemIndicator>
          <CheckIcon className="size-3.5 text-primary" weight="bold" />
        </MenuPrimitive.CheckboxItemIndicator>
      </span>
      {children}
    </MenuPrimitive.CheckboxItem>
  )
}

function DropdownMenuSub(
  props: React.ComponentProps<typeof MenuPrimitive.SubmenuRoot>
) {
  return <MenuPrimitive.SubmenuRoot data-slot="dropdown-menu-sub" {...props} />
}

interface DropdownMenuSubTriggerProps
  extends React.ComponentProps<typeof MenuPrimitive.SubmenuTrigger> {
  inset?: boolean
}

function DropdownMenuSubTrigger({
  className,
  inset,
  children,
  ...props
}: DropdownMenuSubTriggerProps) {
  return (
    <MenuPrimitive.SubmenuTrigger
      data-slot="dropdown-menu-sub-trigger"
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
    </MenuPrimitive.SubmenuTrigger>
  )
}

interface DropdownMenuSubContentProps
  extends React.ComponentProps<typeof MenuPrimitive.Popup> {
  sideOffset?: number
  alignOffset?: number
}

function DropdownMenuSubContent({
  className,
  sideOffset = 4,
  alignOffset = -4,
  children,
  ...props
}: DropdownMenuSubContentProps) {
  return (
    <MenuPrimitive.Portal>
      <MenuPrimitive.Positioner
        sideOffset={sideOffset}
        alignOffset={alignOffset}
      >
        <MenuPrimitive.Popup
          data-slot="dropdown-menu-sub-content"
          className={cn(
            "z-50 min-w-40 overflow-hidden rounded-xl p-1 text-sm select-none outline-none",

            "border border-border/80 bg-background/90 backdrop-blur-md supports-[backdrop-filter]:bg-background/85 text-foreground",
            "ring-1 ring-black/[0.04] dark:ring-white/[0.08]",
            "shadow-[0_16px_36px_-6px_rgba(0,0,0,0.12),0_4px_14px_-2px_rgba(0,0,0,0.05),0_0_0_1px_rgba(0,0,0,0.04),inset_0_1px_0_0_rgba(255,255,255,0.95)]",
            "dark:shadow-[0_20px_48px_-8px_rgba(0,0,0,0.7),0_4px_16px_-2px_rgba(0,0,0,0.4),0_0_0_1px_rgba(255,255,255,0.1),inset_0_1px_0_0_rgba(255,255,255,0.15)]",

            "origin-[var(--transform-origin)] transition-[opacity,transform] duration-140 ease-[cubic-bezier(0.16,1,0.3,1)]",
            "data-[starting-style]:opacity-0 data-[starting-style]:scale-95",
            "data-[ending-style]:opacity-0 data-[ending-style]:scale-95",

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
        "px-2.5 py-1 text-xs font-medium text-muted-foreground select-none",
        inset && "pl-8",
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
        "-mx-1 my-1 h-px bg-gradient-to-r from-transparent via-foreground/15 to-transparent",
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
        "ml-auto pl-4 text-xs font-normal tracking-wide text-muted-foreground/60 transition-colors group-data-[highlighted]:text-foreground/80 select-none",
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
  DropdownMenuCheckboxItem,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
}
