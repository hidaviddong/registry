"use client"

import * as React from "react"
import { Select as SelectPrimitive } from "@base-ui/react/select"
import { cn } from "cn"

function Select<Value = string, Multiple extends boolean | undefined = false>(
  props: React.ComponentProps<typeof SelectPrimitive.Root<Value, Multiple>>
) {
  return <SelectPrimitive.Root data-slot="select" {...props} />
}

function SelectGroup(
  props: React.ComponentProps<typeof SelectPrimitive.Group>
) {
  return <SelectPrimitive.Group data-slot="select-group" {...props} />
}

function SelectValue({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Value>) {
  return (
    <SelectPrimitive.Value
      data-slot="select-value"
      className={cn(
        "truncate data-[placeholder]:text-muted-foreground/50",
        className
      )}
      {...props}
    />
  )
}

interface SelectTriggerProps
  extends React.ComponentProps<typeof SelectPrimitive.Trigger> {
  size?: "sm" | "default" | "lg"
}

function SelectTrigger({
  className,
  size = "default",
  children,
  ...props
}: SelectTriggerProps) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      data-size={size}
      className={cn(
        "group/trigger flex w-full items-center justify-between gap-2 border border-input bg-background/50 font-normal text-foreground select-none cursor-pointer outline-none",
        "transition-[color,background-color,border-color,box-shadow] duration-150 ease-out",

        size === "sm" && "h-7 min-w-32 rounded-md px-2.5 text-xs",
        size === "default" && "h-8 min-w-40 rounded-lg px-3 text-sm",
        size === "lg" && "h-10 min-w-48 rounded-lg px-3.5 text-base",

        "shadow-[inset_0_1px_1.5px_0_color-mix(in_oklch,var(--foreground)_5%,transparent)]",

        "hover:bg-background/80 hover:border-border",

        "focus-visible:border-input focus-visible:shadow-[inset_0_1.5px_3px_0_color-mix(in_oklch,var(--foreground)_12%,transparent),inset_0_0_0_1px_color-mix(in_oklch,var(--foreground)_6%,transparent)]",
        "data-[popup-open]:border-input data-[popup-open]:shadow-[inset_0_1.5px_3px_0_color-mix(in_oklch,var(--foreground)_12%,transparent),inset_0_0_0_1px_color-mix(in_oklch,var(--foreground)_6%,transparent)]",

        "disabled:cursor-not-allowed disabled:border-input/60 disabled:bg-muted/60 disabled:text-muted-foreground/60 disabled:shadow-none disabled:select-none",

        className
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon className="inline-flex size-3.5 shrink-0 items-center justify-center text-muted-foreground transition-transform duration-200 in-data-[popup-open]:rotate-180 group-hover/trigger:text-foreground in-data-[popup-open]:text-foreground">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-3.5"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  )
}

function SelectScrollUpArrow({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollUpArrow>) {
  return (
    <SelectPrimitive.ScrollUpArrow
      data-slot="select-scroll-up-arrow"
      className={cn(
        "top-0 z-10 flex h-4 w-full cursor-default items-center justify-center bg-background/90 py-0.5 text-muted-foreground hover:text-foreground select-none",
        className
      )}
      {...props}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="size-3"
      >
        <path d="m18 15-6-6-6 6" />
      </svg>
    </SelectPrimitive.ScrollUpArrow>
  )
}

function SelectScrollDownArrow({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownArrow>) {
  return (
    <SelectPrimitive.ScrollDownArrow
      data-slot="select-scroll-down-arrow"
      className={cn(
        "bottom-0 z-10 flex h-4 w-full cursor-default items-center justify-center bg-background/90 py-0.5 text-muted-foreground hover:text-foreground select-none",
        className
      )}
      {...props}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="size-3"
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    </SelectPrimitive.ScrollDownArrow>
  )
}

interface SelectContentProps
  extends React.ComponentProps<typeof SelectPrimitive.Popup> {
  sideOffset?: number
  side?: "top" | "bottom" | "left" | "right"
  align?: "start" | "center" | "end"
  alignItemWithTrigger?: boolean
}

function SelectContent({
  className,
  sideOffset = 5,
  side = "bottom",
  align = "start",
  alignItemWithTrigger = false,
  children,
  ...props
}: SelectContentProps) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Positioner
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignItemWithTrigger={alignItemWithTrigger}
        className="z-50"
      >
        <SelectPrimitive.Popup
          data-slot="select-content"
          className={cn(
            "z-50 min-w-[var(--anchor-width)] overflow-hidden rounded-xl p-1 text-sm select-none outline-none",

            "border border-border/80 bg-background text-foreground",
            "shadow-[0_12px_32px_-4px_color-mix(in_oklch,var(--foreground)_8%,transparent),0_4px_12px_-2px_color-mix(in_oklch,var(--foreground)_5%,transparent),0_0_0_1px_color-mix(in_oklch,var(--foreground)_4%,transparent),inset_0_1px_0_0_color-mix(in_oklch,var(--background)_80%,transparent)]",

            "transition-[opacity,transform] duration-120 ease-[cubic-bezier(0.16,1,0.3,1)]",
            "data-[starting-style]:opacity-0 data-[starting-style]:scale-[0.96] data-[starting-style]:-translate-y-1",
            "data-[ending-style]:opacity-0 data-[ending-style]:scale-[0.96] data-[ending-style]:-translate-y-1",

            className
          )}
          {...props}
        >
          <SelectScrollUpArrow />
          <SelectPrimitive.List className="relative max-h-[min(20rem,var(--available-height,320px))] overflow-y-auto overscroll-contain">
            {children}
          </SelectPrimitive.List>
          <SelectScrollDownArrow />
        </SelectPrimitive.Popup>
      </SelectPrimitive.Positioner>
    </SelectPrimitive.Portal>
  )
}

function SelectLabel({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="select-label"
      className={cn(
        "px-2.5 py-1.5 text-xs font-medium text-muted-foreground select-none",
        className
      )}
      {...props}
    />
  )
}

function SelectItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Item>) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        "group relative flex h-8 w-full items-center justify-between gap-2 rounded-[6px] px-2.5 text-sm font-normal text-foreground/90 outline-none select-none cursor-pointer",
        "transition-colors duration-75",

        "data-[highlighted]:bg-muted/80 data-[highlighted]:text-foreground",

        "data-[selected]:font-medium data-[selected]:text-foreground",

        "data-[disabled]:pointer-events-none data-[disabled]:text-muted-foreground/50",

        className
      )}
      {...props}
    >
      <SelectPrimitive.ItemText className="truncate">
        {children}
      </SelectPrimitive.ItemText>
      <SelectPrimitive.ItemIndicator className="inline-flex size-3.5 shrink-0 items-center justify-center text-primary">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-3.5"
        >
          <path d="M5.5 12L9.8 17L19 6.8" />
        </svg>
      </SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
  )
}

function SelectSeparator({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Separator>) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn(
        "-mx-1 my-1 h-px bg-gradient-to-r from-transparent via-foreground/15 to-transparent",
        className
      )}
      {...props}
    />
  )
}

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpArrow,
  SelectScrollDownArrow,
}
