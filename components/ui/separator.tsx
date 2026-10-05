"use client"

import * as React from "react"
import { Separator as SeparatorPrimitive } from "@base-ui/react/separator"
import { cn } from "cn"

interface SeparatorProps
  extends React.ComponentProps<typeof SeparatorPrimitive> {
  // 变体：default (基础) | gradient (两端自然羽化渐隐，Linear/Vercel高级光感)
  variant?: "default" | "gradient"
  // 是否带中心文本（如 OR / Continue）
  children?: React.ReactNode
}

function Separator({
  className,
  orientation = "horizontal",
  variant = "gradient",
  children,
  ...props
}: SeparatorProps) {
  // 带文字内容的居中分割线形态
  if (children && orientation === "horizontal") {
    return (
      <div
        className={cn(
          "flex w-full items-center gap-3 select-none text-xs text-muted-foreground",
          className
        )}
      >
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-border" />
        <span className="shrink-0 font-medium">{children}</span>
        <div className="h-px flex-1 bg-gradient-to-l from-transparent via-border to-border" />
      </div>
    )
  }

  return (
    <SeparatorPrimitive
      data-slot="separator"
      orientation={orientation}
      className={cn(
        "shrink-0 select-none",
        // 水平方向
        "data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full",
        // 垂直方向
        "data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-4 data-[orientation=vertical]:w-px",
        // 渐变羽化款（两端柔和融入背景，告别生硬死灰线）
        variant === "gradient" && [
          "data-[orientation=horizontal]:bg-gradient-to-r data-[orientation=horizontal]:from-transparent data-[orientation=horizontal]:via-foreground/15 data-[orientation=horizontal]:to-transparent",
          "data-[orientation=vertical]:bg-gradient-to-b data-[orientation=vertical]:from-transparent data-[orientation=vertical]:via-foreground/15 data-[orientation=vertical]:to-transparent",
        ],
        // 基础款
        variant === "default" && "bg-border",
        className
      )}
      {...props}
    />
  )
}

export { Separator }
