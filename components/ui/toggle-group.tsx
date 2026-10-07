"use client"

import * as React from "react"
import { Toggle as TogglePrimitive } from "@base-ui/react/toggle"
import { ToggleGroup as ToggleGroupPrimitive } from "@base-ui/react/toggle-group"
import { cva, type VariantProps } from "class-variance-authority"
import { motion } from "motion/react"
import { cn } from "cn"

const toggleGroupVariants = cva(
  "group/toggle-group inline-flex w-fit items-center select-none data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-stretch",
  {
    variants: {
      variant: {
        default: [
          "rounded-lg border border-border/80 bg-muted p-[3px]",
          "shadow-[inset_0_1px_1.5px_0_color-mix(in_oklch,var(--foreground)_8%,transparent)]",
        ].join(" "),
        outline: "rounded-lg",
      },
      size: {
        sm: "data-[variant=default]:rounded-[min(var(--radius-md),10px)]",
        default: "",
        lg: "",
      },
      spacing: {
        0: "gap-0",
        1: "gap-1",
        2: "gap-2",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      spacing: 0,
    },
  }
)

const toggleGroupItemVariants = cva(
  [
    "relative isolate inline-flex shrink-0 items-center justify-center gap-1.5 whitespace-nowrap font-medium outline-none select-none",
    "transition-[color,background-color,border-color,box-shadow,opacity] duration-150 ease-out motion-reduce:transition-none",
    "focus-visible:z-20 focus-visible:ring-2 focus-visible:ring-ring/50",
    "disabled:pointer-events-none disabled:opacity-45",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  ].join(" "),
  {
    variants: {
      variant: {
        default: [
          "rounded-[5px] text-muted-foreground hover:text-foreground",
          "data-pressed:bg-gradient-to-b data-pressed:from-white data-pressed:to-neutral-50/95 data-pressed:text-foreground",
          "data-pressed:ring-1 data-pressed:ring-black/10",
          "data-pressed:shadow-[0_1.5px_3px_0_rgba(0,0,0,0.1),0_1px_1px_0_rgba(0,0,0,0.06),inset_0_1px_0_0_rgba(255,255,255,0.95)]",
        ].join(" "),
        outline: [
          "rounded-lg border border-input bg-transparent text-muted-foreground",
          "shadow-[0_1px_1px_#00000008,0_2px_4px_#0000000a,inset_0_1px_0_0_rgba(255,255,255,0.8)]",
          "hover:bg-muted/60 hover:text-foreground",
          "data-pressed:border-[color-mix(in_oklch,var(--primary),black_20%)] data-pressed:bg-gradient-to-b data-pressed:from-[color-mix(in_oklch,var(--primary),white_10%)] data-pressed:to-[color-mix(in_oklch,var(--primary),black_8%)] data-pressed:text-primary-foreground",
          "data-pressed:shadow-[0_1px_2px_0_color-mix(in_oklch,var(--primary)_25%,transparent),0_2px_4px_0_color-mix(in_oklch,var(--primary)_18%,transparent),inset_0_1px_0_0_oklch(1_0_0/0.3),inset_0_-1.5px_2px_0_oklch(0_0_0/0.14)]",
        ].join(" "),
      },
      size: {
        sm: "h-7 px-2.5 text-xs [&_svg:not([class*='size-'])]:size-3.5",
        default: "h-8 px-3 text-sm",
        lg: "h-10 px-3.5 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

type ToggleGroupVariant = NonNullable<
  VariantProps<typeof toggleGroupVariants>["variant"]
>
type ToggleGroupSize = NonNullable<
  VariantProps<typeof toggleGroupVariants>["size"]
>
type ToggleGroupSpacing = NonNullable<
  VariantProps<typeof toggleGroupVariants>["spacing"]
>

interface ToggleGroupContextValue {
  variant: ToggleGroupVariant
  size: ToggleGroupSize
  spacing: ToggleGroupSpacing
  orientation: "horizontal" | "vertical"
}

const ToggleGroupContext = React.createContext<ToggleGroupContextValue>({
  variant: "default",
  size: "default",
  spacing: 0,
  orientation: "horizontal",
})

interface ToggleGroupProps
  extends ToggleGroupPrimitive.Props,
    VariantProps<typeof toggleGroupVariants> {}

function ToggleGroup({
  className,
  variant = "default",
  size = "default",
  spacing = 0,
  orientation = "horizontal",
  children,
  ...props
}: ToggleGroupProps) {
  const resolvedVariant = variant ?? "default"
  const resolvedSize = size ?? "default"
  const resolvedSpacing = spacing ?? 0
  const resolvedOrientation = orientation ?? "horizontal"
  const contextValue = React.useMemo<ToggleGroupContextValue>(
    () => ({
      variant: resolvedVariant,
      size: resolvedSize,
      spacing: resolvedSpacing,
      orientation: resolvedOrientation,
    }),
    [resolvedVariant, resolvedSize, resolvedSpacing, resolvedOrientation]
  )

  return (
    <ToggleGroupPrimitive
      data-slot="toggle-group"
      data-variant={resolvedVariant}
      data-size={resolvedSize}
      data-spacing={resolvedSpacing}
      data-orientation={resolvedOrientation}
      orientation={resolvedOrientation}
      className={cn(
        toggleGroupVariants({
          variant: resolvedVariant,
          size: resolvedSize,
          spacing: resolvedSpacing,
        }),
        resolvedSpacing === 0 && resolvedVariant === "outline" && [
          resolvedOrientation === "horizontal" &&
            "[&>[data-slot=toggle-group-item]:not(:first-child)]:-ml-px [&>[data-slot=toggle-group-item]:not(:first-child)]:rounded-l-none [&>[data-slot=toggle-group-item]:not(:last-child)]:rounded-r-none",
          resolvedOrientation === "vertical" &&
            "[&>[data-slot=toggle-group-item]:not(:first-child)]:-mt-px [&>[data-slot=toggle-group-item]:not(:first-child)]:rounded-t-none [&>[data-slot=toggle-group-item]:not(:last-child)]:rounded-b-none",
        ],
        className
      )}
      {...props}
    >
      <ToggleGroupContext.Provider value={contextValue}>
        {children}
      </ToggleGroupContext.Provider>
    </ToggleGroupPrimitive>
  )
}

interface ToggleGroupItemProps
  extends TogglePrimitive.Props,
    VariantProps<typeof toggleGroupItemVariants> {}

function ToggleGroupItem({
  className,
  variant: variantProp,
  size: sizeProp,
  disabled,
  children,
  ...props
}: ToggleGroupItemProps) {
  const context = React.useContext(ToggleGroupContext)
  const variant = variantProp ?? context.variant
  const size = sizeProp ?? context.size

  return (
    <TogglePrimitive
      data-slot="toggle-group-item"
      data-variant={variant}
      data-size={size}
      disabled={disabled}
      className={cn(toggleGroupItemVariants({ variant, size }), className)}
      render={(toggleProps, state) => (
        <motion.button
          {...(toggleProps as React.ComponentProps<typeof motion.button>)}
          whileTap={disabled ? undefined : { scale: 0.97, y: 0.5 }}
          transition={{
            type: "spring",
            stiffness: 600,
            damping: 30,
            mass: 0.5,
          }}
        >
          <motion.span
            className="inline-flex items-center justify-center gap-1.5"
            animate={{ scale: state.pressed ? 0.985 : 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          >
            {children}
          </motion.span>
        </motion.button>
      )}
      {...props}
    />
  )
}

export {
  ToggleGroup,
  ToggleGroupItem,
  toggleGroupVariants,
  toggleGroupItemVariants,
}
