"use client"

import { Collapsible as CollapsiblePrimitive } from "@base-ui/react/collapsible"
import { cn } from "cn"

function Collapsible({
  className,
  ...props
}: CollapsiblePrimitive.Root.Props) {
  return (
    <CollapsiblePrimitive.Root
      data-slot="collapsible"
      className={cn("group/collapsible flex flex-col", className)}
      {...props}
    />
  )
}

function CollapsibleTrigger({
  className,
  ...props
}: CollapsiblePrimitive.Trigger.Props) {
  return (
    <CollapsiblePrimitive.Trigger
      data-slot="collapsible-trigger"
      className={cn(
        "group/collapsible-trigger inline-flex items-center gap-2 outline-none select-none cursor-pointer",
        "transition-colors duration-150 ease-out",
        "focus-visible:ring-2 focus-visible:ring-ring/50",
        "disabled:pointer-events-none disabled:opacity-50",
        "[&_svg]:shrink-0 [&_svg]:transition-transform [&_svg]:duration-200 [&_svg]:ease-out",
        className
      )}
      {...props}
    />
  )
}

function CollapsibleContent({
  className,
  ...props
}: CollapsiblePrimitive.Panel.Props) {
  return (
    <CollapsiblePrimitive.Panel
      data-slot="collapsible-content"
      className={cn(
        "h-(--collapsible-panel-height) overflow-hidden text-sm",
        "transition-[height,opacity] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]",
        "data-starting-style:h-0 data-starting-style:opacity-0",
        "data-ending-style:h-0 data-ending-style:opacity-0",
        "[&[hidden]:not([hidden='until-found'])]:hidden",
        className
      )}
      {...props}
    />
  )
}

export { Collapsible, CollapsibleTrigger, CollapsibleContent }
