"use client"

import * as React from "react"
import { Switch as SwitchPrimitive } from "@base-ui/react/switch"
import { motion } from "motion/react"
import { cn } from "cn"

interface SwitchProps
  extends React.ComponentProps<typeof SwitchPrimitive.Root> {
  size?: "sm" | "default" | "lg"
}

const sizeConfig = {
  sm: {
    track: "h-4 w-6.5",
    thumb: "size-3",
    travel: 10,
  },
  default: {
    track: "h-5 w-8.5",
    thumb: "size-4",
    travel: 14,
  },
  lg: {
    track: "h-6 w-10.5",
    thumb: "size-5",
    travel: 18,
  },
} as const

function Switch({
  className,
  size = "default",
  ...props
}: SwitchProps) {
  const config = sizeConfig[size] || sizeConfig.default

  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      data-size={size}
      className={cn(
        "peer group/switch relative inline-flex shrink-0 items-center justify-start rounded-full p-0.5 outline-none select-none cursor-pointer",
        "transition-[color,background-color,border-color,box-shadow] duration-150 ease-[cubic-bezier(0.25,1,0.5,1)]",
        "focus-visible:ring-3 focus-visible:ring-ring/50",
        "disabled:cursor-not-allowed disabled:opacity-40",

        config.track,

        "bg-muted ring-1 ring-border/80",
        "shadow-[inset_0_1px_1.5px_0_color-mix(in_oklch,var(--foreground)_8%,transparent)]",
        "hover:bg-[color-mix(in_oklch,var(--muted)_92%,var(--foreground))] hover:ring-[color-mix(in_oklch,var(--border)_88%,var(--foreground))]",

        "data-checked:bg-primary data-checked:ring-primary/80",
        "data-checked:hover:bg-[color-mix(in_oklch,var(--primary)_92%,black)] data-checked:hover:ring-primary/90",
        "data-checked:shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.25),0_1px_2px_0_color-mix(in_oklch,var(--primary)_25%,transparent)]",

        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        render={(thumbProps, state) => {
          const isChecked = state.checked

          return (
            <motion.span
              {...thumbProps}
              tabIndex={-1}
              aria-hidden="true"
              className={cn(
                "pointer-events-none block rounded-full ring-1 ring-black/8",
                "bg-gradient-to-b from-white to-neutral-50/90",
                config.thumb,
                "shadow-[0_2px_2px_-1px_rgba(0,0,0,0.12),0_4px_4px_-2px_rgba(0,0,0,0.08)]",
                isChecked && "shadow-[0_1px_2px_rgba(0,0,0,0.18)]"
              )}
              initial={false}
              animate={{
                x: isChecked ? config.travel : 0,
              }}
              transition={{
                type: "spring",
                stiffness: 580,
                damping: 32,
                mass: 0.8,
              }}
            />
          )
        }}
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }
