"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

const kbdVariants = cva(
  [
    "inline-flex w-fit items-center justify-center gap-1 font-sans font-medium select-none pointer-events-none",
    "transition-colors duration-100",

    "rounded-md border border-border/80 border-b-[1.5px] border-b-border",
    "bg-background text-muted-foreground",
    "shadow-[0_1px_1.5px_0_color-mix(in_oklch,var(--foreground)_6%,transparent),inset_0_1px_0_0_color-mix(in_oklch,var(--background)_80%,transparent)]",

    "group-data-[highlighted]:border-border group-data-[highlighted]:text-foreground",
    "group-data-[selected=true]:border-border group-data-[selected=true]:text-foreground",

    "group-data-[variant=destructive]:group-data-[highlighted]:bg-background",
    "group-data-[variant=destructive]:group-data-[highlighted]:border-destructive/30",
    "group-data-[variant=destructive]:group-data-[highlighted]:border-b-destructive/50",
    "group-data-[variant=destructive]:group-data-[highlighted]:text-destructive",
    "group-data-[variant=destructive]:group-data-[highlighted]:shadow-[0_1px_2px_0_color-mix(in_oklch,var(--destructive)_15%,transparent)]",

    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
  ].join(" "),
  {
    variants: {
      size: {
        default: "h-6 min-w-6 px-2 text-xs font-semibold [&_svg]:size-3.5",
        sm: "h-5 min-w-5 px-1.5 text-xs font-medium [&_svg]:size-3",
        lg: "h-7 min-w-7 px-2.5 text-sm font-semibold [&_svg]:size-4",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

interface KbdProps
  extends React.ComponentProps<"kbd">,
    VariantProps<typeof kbdVariants> {}

function Kbd({ className, size = "default", ...props }: KbdProps) {
  return (
    <kbd
      data-slot="kbd"
      className={cn(kbdVariants({ size }), className)}
      {...props}
    />
  )
}

function KbdGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="kbd-group"
      className={cn("inline-flex items-center gap-1 select-none", className)}
      {...props}
    />
  )
}

export { Kbd, KbdGroup, kbdVariants, type KbdProps }
