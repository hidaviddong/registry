"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

import { Separator } from "~/components/ui/separator.tsx"

const buttonGroupVariants = cva(
  [
    "group/button-group isolate flex w-fit items-stretch",
    "[&>[data-slot=button]]:focus-visible:relative [&>[data-slot=button]]:focus-visible:z-20 [&>[data-slot=button]]:hover:relative [&>[data-slot=button]]:hover:z-10",
    "has-[>[data-slot=button-group]]:gap-2",
  ].join(" "),
  {
    variants: {
      orientation: {
        horizontal: [
          "flex-row",
          "[&>[data-slot=button]:not(:first-child)]:-ml-0.5",
          "[&>[data-slot=button]:not(:first-child)]:rounded-l-none",
          "[&>[data-slot=button]:not(:last-child)]:rounded-r-none",
          "[&>[data-slot=button]:first-child:not(:last-child)::before]:[clip-path:inset(-8px_1px_-8px_-8px)]",
          "[&>[data-slot=button]:first-child:not(:last-child)::after]:[clip-path:inset(-8px_0_-8px_-8px)]",
          "[&>[data-slot=button]:not(:first-child):not(:last-child)::before]:[clip-path:inset(-8px_1px_-8px_1px)]",
          "[&>[data-slot=button]:not(:first-child):not(:last-child)::after]:[clip-path:inset(-8px_0_-8px_0)]",
          "[&>[data-slot=button]:last-child:not(:first-child)::before]:[clip-path:inset(-8px_-8px_-8px_1px)]",
          "[&>[data-slot=button]:last-child:not(:first-child)::after]:[clip-path:inset(-8px_-8px_-8px_0)]",
          "[&>[data-slot=button-group-text]:not(:first-child)]:-ml-0.5",
          "[&>[data-slot=button-group-text]:not(:first-child)]:rounded-l-none",
          "[&>[data-slot=button-group-text]:not(:last-child)]:rounded-r-none",
          "[&>[data-slot=button-group-text]:first-child:not(:last-child)::before]:[clip-path:inset(-8px_1px_-8px_-8px)]",
          "[&>[data-slot=button-group-text]:not(:first-child):not(:last-child)::before]:[clip-path:inset(-8px_1px_-8px_1px)]",
          "[&>[data-slot=button-group-text]:last-child:not(:first-child)::before]:[clip-path:inset(-8px_-8px_-8px_1px)]",
        ].join(" "),
        vertical: [
          "flex-col items-stretch",
          "[&>[data-slot=button]]:w-full [&>[data-slot=button]]:rounded-lg",
          "[&>[data-slot=button]:not(:first-child)]:-mt-0.5",
          "[&>[data-slot=button]:not(:first-child)]:rounded-t-none",
          "[&>[data-slot=button]:not(:last-child)]:rounded-b-none",
          "[&>[data-slot=button]:first-child:not(:last-child)::before]:[clip-path:inset(-8px_-8px_1px_-8px)]",
          "[&>[data-slot=button]:first-child:not(:last-child)::after]:[clip-path:inset(-8px_-8px_0_-8px)]",
          "[&>[data-slot=button]:not(:first-child):not(:last-child)::before]:[clip-path:inset(1px_-8px_1px_-8px)]",
          "[&>[data-slot=button]:not(:first-child):not(:last-child)::after]:[clip-path:inset(0_-8px_0_-8px)]",
          "[&>[data-slot=button]:last-child:not(:first-child)::before]:[clip-path:inset(1px_-8px_-8px_-8px)]",
          "[&>[data-slot=button]:last-child:not(:first-child)::after]:[clip-path:inset(0_-8px_-8px_-8px)]",
          "[&>[data-slot=button-group-text]:not(:first-child)]:-mt-0.5",
          "[&>[data-slot=button-group-text]:not(:first-child)]:rounded-t-none",
          "[&>[data-slot=button-group-text]:not(:last-child)]:rounded-b-none",
          "[&>[data-slot=button-group-text]:first-child:not(:last-child)::before]:[clip-path:inset(-8px_-8px_1px_-8px)]",
          "[&>[data-slot=button-group-text]:not(:first-child):not(:last-child)::before]:[clip-path:inset(1px_-8px_1px_-8px)]",
          "[&>[data-slot=button-group-text]:last-child:not(:first-child)::before]:[clip-path:inset(1px_-8px_-8px_-8px)]",
        ].join(" "),
      },
    },
    defaultVariants: {
      orientation: "horizontal",
    },
  }
)

interface ButtonGroupProps
  extends React.ComponentProps<"div">,
    VariantProps<typeof buttonGroupVariants> {}

function ButtonGroup({
  className,
  orientation = "horizontal",
  ...props
}: ButtonGroupProps) {
  return (
    <div
      role="group"
      data-slot="button-group"
      data-orientation={orientation}
      className={cn(buttonGroupVariants({ orientation }), className)}
      {...props}
    />
  )
}

function ButtonGroupText({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="button-group-text"
      className={cn(
        "relative isolate z-0 flex min-h-8 items-center gap-1.5 rounded-full border-0 bg-transparent px-3 text-sm font-medium text-muted-foreground select-none",
        "before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:rounded-[inherit] before:border before:border-transparent before:content-['']",
        "before:[background:linear-gradient(#fff,#f7f7f8)_padding-box,linear-gradient(#fff0,#fff0,#0000000f)_border-box]",
        "before:shadow-[0_0_0_1px_#00000017,0_1px_1px_#00000008,0_2px_4px_#0000000a]",
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    />
  )
}

function ButtonGroupSeparator({
  className,
  orientation = "vertical",
  ...props
}: React.ComponentProps<typeof Separator>) {
  return (
    <Separator
      data-slot="button-group-separator"
      orientation={orientation}
      variant="default"
      className={cn(
        "relative z-10 self-stretch",
        "data-[orientation=vertical]:my-1.5 data-[orientation=vertical]:h-auto data-[orientation=vertical]:min-h-0",
        "data-[orientation=horizontal]:mx-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-auto",
        className
      )}
      {...props}
    />
  )
}

export {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
  buttonGroupVariants,
}
