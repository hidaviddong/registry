"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

const textareaVariants = cva(
  [
    // 基础排版与弹性尺寸
    "flex w-full min-w-0 rounded-md border border-input bg-background/50",
    "transition-[color,background-color,border-color,box-shadow] duration-150 ease-out motion-reduce:transition-none",
    "selection:bg-primary selection:text-primary-foreground",
    "placeholder:text-muted-foreground/50",
    "outline-none focus:outline-none focus-visible:outline-none ring-0 focus:ring-0 focus-visible:ring-0",
    "[scrollbar-width:thin] [scrollbar-color:color-mix(in_oklch,var(--foreground)_15%,transparent)_transparent]",

    // 默认状态与聚焦内凹（Quietly Tactile 触觉深度）
    "shadow-[inset_0_1px_1.5px_0_color-mix(in_oklch,var(--foreground)_5%,transparent)]",
    "hover:border-border",
    "focus:border-input focus:shadow-[inset_0_1.5px_3px_0_color-mix(in_oklch,var(--foreground)_12%,transparent),inset_0_0_0_1px_color-mix(in_oklch,var(--foreground)_6%,transparent)]",

    // 禁用状态：完全对齐 Input 规范与紧凑克制哲学
    "disabled:cursor-not-allowed disabled:border-input/60 disabled:bg-muted/60 disabled:text-muted-foreground/60 disabled:shadow-none disabled:select-none disabled:resize-none",

    // 只读状态
    "read-only:bg-muted/30 read-only:cursor-default",

    // Invalid 错误态：文本变红、光标变红、内阴影警示一体化
    "aria-invalid:text-destructive aria-invalid:caret-destructive aria-invalid:placeholder:text-destructive/50",
    "aria-invalid:border-destructive/60 aria-invalid:bg-destructive/[0.04]",
    "aria-invalid:selection:bg-destructive/15 aria-invalid:selection:text-destructive",
    "aria-invalid:shadow-[inset_0_2px_4px_0_color-mix(in_oklch,var(--destructive)_25%,transparent),inset_0_0_0_1px_color-mix(in_oklch,var(--destructive)_15%,transparent)]",
    "aria-invalid:focus:border-destructive/80",
    "aria-invalid:focus:shadow-[inset_0_2px_5px_0_color-mix(in_oklch,var(--destructive)_35%,transparent),inset_0_0_0_1px_color-mix(in_oklch,var(--destructive)_25%,transparent)]",
  ].join(" "),
  {
    variants: {
      size: {
        sm: "min-h-16 px-2.5 py-1.5 text-xs leading-normal",
        default: "min-h-20 px-3 py-2 text-sm leading-relaxed",
        lg: "min-h-28 px-3.5 py-2.5 text-base leading-relaxed md:text-base",
      },
      resize: {
        none: "resize-none",
        vertical: "resize-y",
        horizontal: "resize-x",
        both: "resize",
      },
    },
    defaultVariants: {
      size: "default",
      resize: "vertical",
    },
  }
)

interface TextareaProps
  extends React.ComponentProps<"textarea">,
    VariantProps<typeof textareaVariants> {
  // 是否开启内容自适应高度（基于现代 CSS field-sizing: content）
  autoResize?: boolean
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea(
    {
      className,
      size = "default",
      resize = "vertical",
      autoResize = false,
      style,
      ...props
    },
    ref
  ) {
    return (
      <textarea
        ref={ref}
        data-slot="textarea"
        style={{ outline: "none", ...style }}
        className={cn(
          textareaVariants({
            size,
            resize: autoResize ? "none" : resize,
          }),
          autoResize && "field-sizing-content min-h-14",
          className
        )}
        {...props}
      />
    )
  }
)

export { Textarea, textareaVariants, type TextareaProps }
