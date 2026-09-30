"use client"

import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"
import { AnimatePresence, motion } from "motion/react"
import type { CSSProperties } from "react"
import { cn } from "cn"

import { Spinner } from "./spinner.tsx"

const emphasisVariant =
  "overflow-hidden border-0 bg-(--button-emphasis-bg) !text-white shadow-xs ring ring-(--button-emphasis-ring) focus:ring-(--button-emphasis-ring) focus-visible:ring-(--button-emphasis-ring) active:ring-(--button-emphasis-ring) disabled:opacity-50"

const buttonVariants = cva(
  "group/button relative inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: emphasisVariant,
        outline:
          "border-border bg-background hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_5%)] aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
        ghost:
          "hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50",
        destructive: emphasisVariant,
        link: "text-foreground underline-offset-4 hover:underline",
      },
      size: {
        default:
          "h-8 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        xs: "h-6 gap-1 rounded-[min(var(--radius-md),10px)] px-2 text-xs in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-7 gap-1 rounded-[min(var(--radius-md),12px)] px-2.5 text-[0.8rem] in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-9 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        icon: "size-8",
        "icon-xs":
          "size-6 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3",
        "icon-sm":
          "size-7 rounded-[min(var(--radius-md),12px)] in-data-[slot=button-group]:rounded-lg",
        "icon-lg": "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

type ButtonProps = ButtonPrimitive.Props &
  VariantProps<typeof buttonVariants> & {
    loading?: boolean
  }

type EmphasisStyle = CSSProperties & Record<`--${string}`, string>

function getEmphasisStyle(
  variant: ButtonProps["variant"],
): EmphasisStyle | undefined {
  const color =
    variant === "default"
      ? "var(--primary)"
      : variant === "destructive"
        ? "var(--destructive)"
        : undefined

  if (!color) return undefined

  return {
    "--button-emphasis-ring": `color-mix(in oklch, ${color}, black 10%)`,
    "--button-emphasis-bg": `color-mix(in oklch, ${color}, white 30%)`,
    "--button-emphasis-gradient-start": `color-mix(in oklch, ${color}, white 15%)`,
    "--button-emphasis-gradient-end": color,
  }
}

function Button({
  className,
  variant = "default",
  size = "default",
  loading = false,
  disabled,
  children,
  style,
  ...props
}: ButtonProps) {
  const emphasisStyle = getEmphasisStyle(variant)

  return (
    <ButtonPrimitive
      data-slot="button"
      data-loading={loading || undefined}
      aria-busy={loading || undefined}
      disabled={disabled || loading}
      className={cn(buttonVariants({ variant, size, className }))}
      style={emphasisStyle ? { ...emphasisStyle, ...style } : style}
      {...props}
    >
      {emphasisStyle && (
        <span
          aria-hidden="true"
          className="absolute inset-0 rounded-[inherit] bg-linear-to-b from-(--button-emphasis-gradient-start) to-(--button-emphasis-gradient-end) shadow-[inset_0_1px_0_0_var(--button-emphasis-bg)] transition-colors group-hover/button:from-(--button-emphasis-bg)"
        />
      )}
      <span className="relative grid place-items-center">
        <motion.span
          aria-hidden={loading || undefined}
          className="col-start-1 row-start-1 inline-flex items-center justify-center gap-1.5"
          animate={{ opacity: loading ? 0 : 1, y: loading ? 12 : 0 }}
          transition={{ type: "spring", duration: 0.3, bounce: 0 }}
        >
          {children}
        </motion.span>
        <AnimatePresence initial={false}>
          {loading && (
            <motion.span
              className="col-start-1 row-start-1 inline-flex items-center justify-center"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ type: "spring", duration: 0.3, bounce: 0 }}
            >
              <Spinner />
            </motion.span>
          )}
        </AnimatePresence>
      </span>
    </ButtonPrimitive>
  )
}

export { Button, buttonVariants, type ButtonProps }
