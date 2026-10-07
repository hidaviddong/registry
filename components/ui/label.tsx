"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

const labelVariants = cva(
  [
    "inline-flex items-center gap-1.5 font-medium select-none",
    "transition-colors duration-150 ease-out motion-reduce:transition-none",
    // 禁用穿透与联动
    "group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50",
    "peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
    "data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 data-[disabled=true]:cursor-not-allowed",
    // 校验警示联动
    "peer-aria-invalid:text-destructive",
    "group-data-[invalid=true]:text-destructive",
  ].join(" "),
  {
    variants: {
      variant: {
        default: "text-foreground",
        muted: "text-muted-foreground",
        destructive: "text-destructive",
      },
      size: {
        sm: "text-xs leading-none",
        default: "text-sm leading-none",
        lg: "text-base leading-none",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

interface LabelProps
  extends React.ComponentProps<"label">,
    VariantProps<typeof labelVariants> {
  // 必填标记（视觉强调但对辅助技术隐藏，保证无障碍体验）
  required?: boolean
  // 选填提示标记
  optional?: boolean | React.ReactNode
  // 禁用状态
  disabled?: boolean
  // 紧凑辅助说明文字
  description?: React.ReactNode
}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(function Label(
  {
    className,
    variant = "default",
    size = "default",
    required = false,
    optional = false,
    disabled = false,
    description,
    children,
    ...props
  },
  ref
) {
  const labelElement = (
    <label
      ref={ref}
      data-slot="label"
      data-disabled={disabled || undefined}
      className={cn(labelVariants({ variant, size }), className)}
      {...props}
    >
      {children}
      {required && (
        <span
          aria-hidden="true"
          data-slot="label-required"
          className="text-destructive font-normal select-none"
        >
          *
        </span>
      )}
      {optional && (
        <span
          data-slot="label-optional"
          className="text-[11px] font-normal text-muted-foreground/70 select-none"
        >
          {typeof optional === "boolean" ? "(optional)" : optional}
        </span>
      )}
    </label>
  )

  if (description) {
    return (
      <div className="flex flex-col gap-1">
        {labelElement}
        <span
          data-slot="label-description"
          className="text-xs font-normal text-muted-foreground leading-normal"
        >
          {description}
        </span>
      </div>
    )
  }

  return labelElement
})

function LabelDescription({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="label-description"
      className={cn(
        "text-xs font-normal text-muted-foreground leading-normal",
        className
      )}
      {...props}
    />
  )
}

export { Label, LabelDescription, labelVariants, type LabelProps }
