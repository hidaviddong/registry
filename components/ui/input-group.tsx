"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

import { Button } from "~/components/ui/button.tsx"
import { Input } from "~/components/ui/input.tsx"
import { Textarea } from "~/components/ui/textarea.tsx"

const inputGroupVariants = cva(
  [
    "group/input-group relative flex w-full min-w-0 items-center overflow-hidden rounded-md border border-input bg-background/50",
    "transition-[color,background-color,border-color,box-shadow] duration-150 ease-out motion-reduce:transition-none",
    "shadow-[inset_0_1px_1.5px_0_color-mix(in_oklch,var(--foreground)_5%,transparent)]",
    "focus-within:border-input focus-within:shadow-[inset_0_1.5px_3px_0_color-mix(in_oklch,var(--foreground)_12%,transparent),inset_0_0_0_1px_color-mix(in_oklch,var(--foreground)_6%,transparent)]",
    "has-[[data-slot=input-group-control][aria-invalid=true]]:border-destructive/80",
    "has-[[data-slot=input-group-control][aria-invalid=true]]:bg-destructive/[0.04]",
    "has-[[data-slot=input-group-control][aria-invalid=true]]:shadow-[inset_0_2px_5px_0_color-mix(in_oklch,var(--destructive)_30%,transparent),inset_0_0_0_1px_color-mix(in_oklch,var(--destructive)_20%,transparent)]",
    "has-[[data-slot=input-group-control]:disabled]:cursor-not-allowed has-[[data-slot=input-group-control]:disabled]:bg-muted/60 has-[[data-slot=input-group-control]:disabled]:opacity-60 has-[[data-slot=input-group-control]:disabled]:shadow-none",
    "has-[>[data-align=block-start]]:h-auto has-[>[data-align=block-start]]:flex-col",
    "has-[>[data-align=block-end]]:h-auto has-[>[data-align=block-end]]:flex-col",
    "has-[>textarea]:h-auto",
  ].join(" "),
  {
    variants: {
      size: {
        sm: "min-h-8",
        default: "min-h-9",
        lg: "min-h-10",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

interface InputGroupProps
  extends React.ComponentProps<"div">,
    VariantProps<typeof inputGroupVariants> {}

function InputGroup({ className, size = "default", ...props }: InputGroupProps) {
  return (
    <div
      role="group"
      data-slot="input-group"
      data-size={size}
      className={cn(inputGroupVariants({ size }), className)}
      {...props}
    />
  )
}

const inputGroupAddonVariants = cva(
  [
    "flex shrink-0 cursor-text items-center justify-center gap-1.5 text-sm font-medium text-muted-foreground select-none",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
    "group-has-[[data-slot=input-group-control][aria-invalid=true]]/input-group:text-destructive/80",
  ].join(" "),
  {
    variants: {
      align: {
        "inline-start": "order-first self-stretch pl-3 pr-1",
        "inline-end": "order-last self-stretch pl-1 pr-3",
        "block-start":
          "order-first w-full justify-start self-stretch px-3 pt-2 pb-1",
        "block-end":
          "order-last w-full justify-start self-stretch px-3 pt-1 pb-2",
      },
    },
    defaultVariants: {
      align: "inline-start",
    },
  }
)

interface InputGroupAddonProps
  extends React.ComponentProps<"div">,
    VariantProps<typeof inputGroupAddonVariants> {}

function InputGroupAddon({
  className,
  align = "inline-start",
  onClick,
  ...props
}: InputGroupAddonProps) {
  return (
    <div
      role="group"
      data-slot="input-group-addon"
      data-align={align}
      className={cn(inputGroupAddonVariants({ align }), className)}
      onClick={(event) => {
        onClick?.(event)
        if (event.defaultPrevented || (event.target as HTMLElement).closest("button, a")) {
          return
        }

        event.currentTarget.parentElement
          ?.querySelector<HTMLInputElement | HTMLTextAreaElement>(
            "[data-slot=input-group-control]"
          )
          ?.focus()
      }}
      {...props}
    />
  )
}

const inputGroupButtonVariants = cva("shrink-0", {
  variants: {
    size: {
      xs: "h-6 px-2 text-xs",
      sm: "h-7 px-2.5 text-[0.8rem]",
      "icon-xs": "size-6 p-0",
      "icon-sm": "size-7 p-0",
    },
  },
  defaultVariants: {
    size: "xs",
  },
})

type InputGroupButtonProps = Omit<
  React.ComponentProps<typeof Button>,
  "size" | "type"
> &
  VariantProps<typeof inputGroupButtonVariants> & {
    type?: "button" | "submit" | "reset"
  }

function InputGroupButton({
  className,
  type = "button",
  variant = "outline",
  size = "xs",
  ...props
}: InputGroupButtonProps) {
  const buttonSize = size === "icon-xs" ? "icon-xs" : size === "icon-sm" ? "icon-sm" : size

  return (
    <Button
      type={type}
      data-slot="input-group-button"
      data-size={size}
      variant={variant}
      size={buttonSize}
      className={cn(inputGroupButtonVariants({ size }), className)}
      {...props}
    />
  )
}

function InputGroupText({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="input-group-text"
      className={cn(
        "flex items-center gap-1.5 text-sm text-muted-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    />
  )
}

function InputGroupInput({
  className,
  ...props
}: React.ComponentProps<typeof Input>) {
  return (
    <Input
      data-slot="input-group-control"
      className={cn(
        "h-auto min-h-0 flex-1 rounded-none border-0 bg-transparent px-2 shadow-none",
        "focus:border-0 focus:shadow-none",
        "disabled:bg-transparent disabled:shadow-none",
        "aria-invalid:border-0 aria-invalid:bg-transparent aria-invalid:shadow-none aria-invalid:focus:border-0 aria-invalid:focus:shadow-none",
        "group-data-[size=sm]/input-group:py-1 group-data-[size=default]/input-group:py-1.5 group-data-[size=lg]/input-group:py-2",
        className
      )}
      {...props}
    />
  )
}

function InputGroupTextarea({
  className,
  ...props
}: React.ComponentProps<typeof Textarea>) {
  return (
    <Textarea
      data-slot="input-group-control"
      className={cn(
        "min-h-20 flex-1 resize-none rounded-none border-0 bg-transparent px-3 py-2 shadow-none",
        "focus:border-0 focus:shadow-none",
        "disabled:bg-transparent disabled:shadow-none",
        "aria-invalid:border-0 aria-invalid:bg-transparent aria-invalid:shadow-none aria-invalid:focus:border-0 aria-invalid:focus:shadow-none",
        className
      )}
      {...props}
    />
  )
}

export {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupInput,
  InputGroupTextarea,
  inputGroupVariants,
}
