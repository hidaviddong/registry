"use client"

import * as React from "react"
import { Radio as RadioPrimitive } from "@base-ui/react/radio"
import { RadioGroup as RadioGroupPrimitive } from "@base-ui/react/radio-group"
import { motion } from "motion/react"
import { cn } from "cn"

function RadioGroup({ className, ...props }: RadioGroupPrimitive.Props) {
  return (
    <RadioGroupPrimitive
      data-slot="radio-group"
      className={cn("grid gap-2.5", className)}
      {...props}
    />
  )
}

function RadioGroupItem({
  className,
  ...props
}: RadioPrimitive.Root.Props) {
  return (
    <RadioPrimitive.Root
      data-slot="radio-group-item"
      className={cn(
        "peer relative flex size-4 shrink-0 rounded-full border outline-none select-none cursor-pointer",
        "transition-[color,background-color,border-color,box-shadow,transform] duration-150 ease-out",
        "active:not-disabled:scale-[0.95]",

        "border-border bg-gradient-to-b from-card to-muted/40",
        "shadow-[0_1px_2px_0_color-mix(in_oklch,var(--foreground)_5%,transparent),inset_0_1px_0_0_color-mix(in_oklch,var(--background)_80%,transparent)]",

        "focus-visible:border-ring focus-visible:ring-[2.5px] focus-visible:ring-ring/40",

        "data-checked:border-[color-mix(in_oklch,var(--primary),black_24%)]",
        "data-checked:bg-gradient-to-b data-checked:from-[color-mix(in_oklch,var(--primary),white_10%)] data-checked:to-[color-mix(in_oklch,var(--primary),black_8%)]",
        "data-checked:text-primary-foreground",
        "data-checked:shadow-[0_1px_2px_0_color-mix(in_oklch,var(--primary)_25%,transparent),0_2px_4px_0_color-mix(in_oklch,var(--primary)_18%,transparent),inset_0_1px_0_0_oklch(1_0_0_/_0.35),inset_0_-1.5px_2px_0_oklch(0_0_0_/_0.15)]",

        "disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none disabled:active:scale-100",

        "aria-invalid:border-destructive aria-invalid:ring-destructive/20",

        "after:absolute after:-inset-2 after:content-['']",

        className
      )}
      {...props}
    >
      <RadioPrimitive.Indicator
        keepMounted
        data-slot="radio-group-indicator"
        className="grid size-full place-content-center text-current"
        render={(indicatorProps, state) => {
          const isChecked = Boolean(state.checked)
          return (
            <span {...indicatorProps}>
              <motion.span
                className="block size-1.5 rounded-full bg-primary-foreground shadow-[0_0.5px_1px_rgba(0,0,0,0.35)]"
                initial={false}
                animate={{
                  scale: isChecked ? 1 : 0,
                  opacity: isChecked ? 1 : 0,
                }}
                transition={{
                  type: "spring",
                  stiffness: 550,
                  damping: 30,
                }}
              />
            </span>
          )
        }}
      />
    </RadioPrimitive.Root>
  )
}

export { RadioGroup, RadioGroupItem }
