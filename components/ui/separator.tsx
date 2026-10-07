"use client"

import * as React from "react"
import { Separator as SeparatorPrimitive } from "@base-ui/react/separator"
import { cn } from "cn"

interface SeparatorProps
  extends React.ComponentProps<typeof SeparatorPrimitive> {
  variant?: "default" | "gradient"
  children?: React.ReactNode
}

function Separator({
  className,
  orientation = "horizontal",
  variant = "gradient",
  children,
  ...props
}: SeparatorProps) {
  if (children && orientation === "horizontal") {
    return (
      <div
        className={cn(
          "flex w-full items-center gap-3 select-none text-xs text-muted-foreground",
          className
        )}
      >
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-border" />
        <span className="shrink-0 font-medium">{children}</span>
        <div className="h-px flex-1 bg-gradient-to-l from-transparent via-border to-border" />
      </div>
    )
  }

  return (
    <SeparatorPrimitive
      data-slot="separator"
      orientation={orientation}
      className={cn(
        "shrink-0 select-none",
        "data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full",
        "data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-4 data-[orientation=vertical]:w-px",
        variant === "gradient" && [
          "data-[orientation=horizontal]:bg-gradient-to-r data-[orientation=horizontal]:from-transparent data-[orientation=horizontal]:via-foreground/15 data-[orientation=horizontal]:to-transparent",
          "data-[orientation=vertical]:bg-gradient-to-b data-[orientation=vertical]:from-transparent data-[orientation=vertical]:via-foreground/15 data-[orientation=vertical]:to-transparent",
        ],
        variant === "default" && "bg-border",
        className
      )}
      {...props}
    />
  )
}

export { Separator }
