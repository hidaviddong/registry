"use client"

import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"
import { AnimatePresence, motion } from "motion/react"
import { cn } from "cn"

import { Spinner } from "./spinner.tsx"

const surface =
  "border-0 bg-transparent before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:rounded-[inherit] before:border before:border-transparent before:transition-[box-shadow,opacity] before:duration-100 before:ease-out before:content-[''] after:pointer-events-none after:absolute after:inset-0 after:-z-10 after:rounded-[inherit] after:border after:border-transparent after:opacity-0 after:transition-opacity after:duration-150 after:ease-out after:content-[''] hover:after:opacity-100 motion-reduce:before:transition-none motion-reduce:after:transition-none"

const blueSurface = cn(
  // 静态：悬浮立体深蓝 + 顶部高光
  "before:[background:linear-gradient(#ffffff1f,#fff0_50%)_padding-box,linear-gradient(#3f80ff,#2867f2)_padding-box,linear-gradient(#77a5ff,#4a7deb,#1c54d6)_border-box]",
  "before:shadow-[0_0_0_1px_#1a4bc2,inset_0_-3px_6px_-3px_#08206e2e,0_1px_1px_#1036a01f,0_2px_4px_#1036a029]",
  "after:[background:linear-gradient(#ffffff1f,#fff0_50%)_padding-box,linear-gradient(#4b88ff,#3570f3)_padding-box,linear-gradient(#77a5ff,#4a7deb,#1c54d6)_border-box]",
  // 按压：外层悬浮投影坍塌沉入，内部深蓝沉陷挤压凹陷，顶面高光轻微压暗
  "active:before:opacity-90 active:before:shadow-[0_0_0_1px_#123899,inset_0_2.5px_4.5px_0_rgba(8,25,80,0.6),inset_0_0_0_1px_rgba(8,25,80,0.35)]"
)

const whiteSurface = cn(
  // 静态：白净微浮雕
  "before:[background:linear-gradient(#fff,#f7f7f8)_padding-box,linear-gradient(#fff0,#fff0,#0000000f)_border-box]",
  "before:shadow-[0_0_0_1px_#00000017,0_1px_1px_#00000008,0_2px_4px_#0000000a]",
  "after:[background:linear-gradient(#f5f5f5,#ededee)_padding-box,linear-gradient(#fff0,#fff0,#0000000f)_border-box]",
  // 按压：外投影沉入消除，内部生成真实微下凹凹槽阴影
  "active:before:opacity-95 active:before:shadow-[0_0_0_1px_#00000022,inset_0_2px_4px_0_rgba(0,0,0,0.15),inset_0_0_0_1px_rgba(0,0,0,0.06)]"
)

const mutedSurface = cn(
  // 静态：浅灰中性微浮雕
  "before:[background:linear-gradient(#f5f5f5,#e9e9ea)_padding-box,linear-gradient(#ffffff80,#00000012)_border-box]",
  "before:shadow-[0_0_0_1px_#00000012,0_1px_1px_#00000008,0_2px_4px_#00000008]",
  "after:[background:linear-gradient(#ededee,#e2e2e3)_padding-box,linear-gradient(#ffffff80,#00000012)_border-box]",
  // 按压：内部微沉陷阴影
  "active:before:shadow-[0_0_0_1px_#00000018,inset_0_2px_3.5px_0_rgba(0,0,0,0.14),inset_0_0_0_1px_rgba(0,0,0,0.05)]"
)

const destructiveSurface = cn(
  // 静态：危险红微浮雕
  "before:[background:linear-gradient(#ffffff1f,#fff0_50%)_padding-box,linear-gradient(color-mix(in_oklch,var(--destructive),white_8%),color-mix(in_oklch,var(--destructive),black_8%))_padding-box,linear-gradient(color-mix(in_oklch,var(--destructive),white_28%),var(--destructive),color-mix(in_oklch,var(--destructive),black_20%))_border-box]",
  "before:shadow-[0_0_0_1px_color-mix(in_oklch,var(--destructive),black_28%),inset_0_-3px_6px_-3px_color-mix(in_oklch,var(--destructive),transparent_72%),0_1px_1px_color-mix(in_oklch,var(--destructive),transparent_82%),0_2px_4px_color-mix(in_oklch,var(--destructive),transparent_78%)]",
  "after:[background:linear-gradient(#ffffff1f,#fff0_50%)_padding-box,linear-gradient(color-mix(in_oklch,var(--destructive),white_14%),color-mix(in_oklch,var(--destructive),white_2%))_padding-box,linear-gradient(color-mix(in_oklch,var(--destructive),white_28%),var(--destructive),color-mix(in_oklch,var(--destructive),black_20%))_border-box]",
  // 按压：内部深红挤压沉降阴影
  "active:before:opacity-90 active:before:shadow-[0_0_0_1px_color-mix(in_oklch,var(--destructive),black_45%),inset_0_2.5px_4.5px_0_color-mix(in_oklch,var(--destructive),black_50%),inset_0_0_0_1px_color-mix(in_oklch,var(--destructive),black_30%)]"
)

const buttonVariants = cva(
  `group/button relative isolate inline-flex shrink-0 items-center justify-center rounded-full bg-clip-padding text-sm font-medium whitespace-nowrap outline-none select-none will-change-transform focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 ${surface}`,
  {
    variants: {
      variant: {
        default: cn(blueSurface, "text-white"),
        outline: cn(whiteSurface, "text-black dark:text-black"),
        secondary: cn(mutedSurface, "text-secondary-foreground"),
        destructive: cn(destructiveSurface, "text-white"),
      },
      size: {
        default:
          "h-8 gap-1.5 px-3 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        xs: "h-6 gap-1 px-2 text-xs in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-7 gap-1 px-2.5 text-[0.8rem] in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-10 gap-1.5 px-3.5 text-base has-data-[icon=inline-end]:pr-2.5 has-data-[icon=inline-start]:pl-2.5",
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
  return (
    <ButtonPrimitive
      data-slot="button"
      data-loading={loading || undefined}
      aria-busy={loading || undefined}
      disabled={disabled || loading}
      className={cn(buttonVariants({ variant, size, className }))}
      style={style}
      render={(buttonProps) => (
        <motion.button
          {...buttonProps}
          whileTap={
            disabled || loading
              ? undefined
              : {
                  scale: 0.975,
                  y: 1,
                }
          }
          transition={{
            type: "spring",
            stiffness: 600,
            damping: 28,
            mass: 0.5,
          }}
        />
      )}
      {...props}
    >
      <span className="relative grid w-full place-items-center">
        <motion.span
          aria-hidden={loading || undefined}
          className="col-start-1 row-start-1 inline-flex w-full items-center justify-center gap-1.5"
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

export { Button, buttonVariants }
