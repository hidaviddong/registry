"use client"

import * as React from "react"
import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox"
import { motion } from "motion/react"
import { cn } from "cn"

function Checkbox({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        // 基础尺寸与排版
        "peer size-4 shrink-0 rounded-[4px] border outline-none select-none",
        "transition-[color,background-color,border-color,box-shadow,transform] duration-150 ease-out",
        "active:not-disabled:scale-[0.95]",

        // 未选中态：白净拟物小键槽（顶部内高光 + 接地微柔和阴影）
        "border-border bg-gradient-to-b from-card to-muted/40",
        "shadow-[0_1px_2px_0_color-mix(in_oklch,var(--foreground)_5%,transparent),inset_0_1px_0_0_color-mix(in_oklch,var(--background)_80%,transparent)]",

        // 聚焦状态
        "focus-visible:border-ring focus-visible:ring-[2.5px] focus-visible:ring-ring/40",

        // 选中态：Button 同款拟物高光与深蓝微投影
        "data-checked:border-[color-mix(in_oklch,var(--primary),black_24%)]",
        "data-checked:bg-gradient-to-b data-checked:from-[color-mix(in_oklch,var(--primary),white_10%)] data-checked:to-[color-mix(in_oklch,var(--primary),black_8%)]",
        "data-checked:text-primary-foreground",
        "data-checked:shadow-[0_1px_2px_0_color-mix(in_oklch,var(--primary)_25%,transparent),0_2px_4px_0_color-mix(in_oklch,var(--primary)_18%,transparent),inset_0_1px_0_0_oklch(1_0_0_/_0.35),inset_0_-1.5px_2px_0_oklch(0_0_0_/_0.15)]",

        // 禁用状态
        "disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none disabled:active:scale-100",

        // 错误状态
        "aria-invalid:border-destructive aria-invalid:ring-destructive/20",

        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        keepMounted
        data-slot="checkbox-indicator"
        className="grid size-full place-content-center text-current"
        render={(indicatorProps, state) => {
          const isChecked = state.checked || state.indeterminate
          return (
            <span {...indicatorProps}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-3"
              >
                {state.indeterminate ? (
                  <motion.line
                    x1="5"
                    y1="12"
                    x2="19"
                    y2="12"
                    initial={false}
                    animate={{
                      pathLength: isChecked ? 1 : 0,
                      opacity: isChecked ? 1 : 0,
                    }}
                    transition={{
                      duration: 0.18,
                      ease: "easeOut",
                    }}
                  />
                ) : (
                  <motion.path
                    d="M5.5 12L9.8 17L19 6.8"
                    initial={false}
                    animate={{
                      pathLength: isChecked ? 1 : 0,
                      opacity: isChecked ? 1 : 0,
                    }}
                    transition={{
                      duration: 0.2,
                      ease: "easeOut",
                    }}
                  />
                )}
              </svg>
            </span>
          )
        }}
      />
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }
