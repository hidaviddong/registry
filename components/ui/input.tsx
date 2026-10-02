import * as React from "react"
import { cn } from "cn"

function Input({ className, type, style, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      style={{ outline: "none", ...style }}
      className={cn(
        "h-9 w-full min-w-0 rounded-md border border-input bg-background/50 px-3 py-1 text-base transition-[color,background-color,border-color,box-shadow] duration-150 ease-out selection:bg-primary selection:text-primary-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground md:text-sm",
        "placeholder:text-muted-foreground/50",
        "outline-none focus:outline-none focus-visible:outline-none ring-0 focus:ring-0 focus-visible:ring-0",
        // 默认状态与聚焦内凹
        "shadow-[inset_0_1px_1.5px_0_color-mix(in_oklch,var(--foreground)_5%,transparent)]",
        "focus:border-input focus:shadow-[inset_0_1.5px_3px_0_color-mix(in_oklch,var(--foreground)_12%,transparent),inset_0_0_0_1px_color-mix(in_oklch,var(--foreground)_6%,transparent)]",
        // 禁用状态
        "disabled:cursor-not-allowed disabled:border-input/60 disabled:bg-muted/60 disabled:text-muted-foreground/60 disabled:shadow-none disabled:select-none",
        // Invalid 错误态：文本变红、光标变红、内阴影警示一体化
        "aria-invalid:text-destructive aria-invalid:caret-destructive aria-invalid:placeholder:text-destructive/50",
        "aria-invalid:border-destructive/60 aria-invalid:bg-destructive/[0.04]",
        "aria-invalid:selection:bg-destructive/15 aria-invalid:selection:text-destructive",
        "aria-invalid:shadow-[inset_0_2px_4px_0_color-mix(in_oklch,var(--destructive)_25%,transparent),inset_0_0_0_1px_color-mix(in_oklch,var(--destructive)_15%,transparent)]",
        "aria-invalid:focus:border-destructive/80",
        "aria-invalid:focus:shadow-[inset_0_2px_5px_0_color-mix(in_oklch,var(--destructive)_35%,transparent),inset_0_0_0_1px_color-mix(in_oklch,var(--destructive)_25%,transparent)]",
        className
      )}
      {...props}
    />
  )
}

export { Input }
