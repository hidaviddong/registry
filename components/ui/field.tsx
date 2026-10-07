"use client"

import * as React from "react"
import { useMemo } from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

import { Label } from "~/components/ui/label.tsx"
import { Separator } from "~/components/ui/separator.tsx"

function FieldSet({ className, ...props }: React.ComponentProps<"fieldset">) {
  return (
    <fieldset
      data-slot="field-set"
      className={cn(
        "flex flex-col gap-3 border-0 p-0 m-0",
        className
      )}
      {...props}
    />
  )
}

function FieldLegend({
  className,
  variant = "legend",
  ...props
}: React.ComponentProps<"legend"> & { variant?: "legend" | "label" }) {
  return (
    <legend
      data-slot="field-legend"
      data-variant={variant}
      className={cn(
        "mb-1 font-medium select-none",
        variant === "legend" && "text-xs font-semibold uppercase tracking-wider text-muted-foreground",
        variant === "label" && "text-sm text-foreground",
        className
      )}
      {...props}
    />
  )
}

function FieldGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="field-group"
      className={cn("flex w-full flex-col gap-4", className)}
      {...props}
    />
  )
}

const fieldVariants = cva(
  "group/field flex w-full transition-opacity duration-150 data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50",
  {
    variants: {
      orientation: {
        vertical: "flex-col gap-1.5",
        horizontal: "flex-row items-center justify-between gap-3",
        responsive: "flex-col gap-1.5 sm:flex-row sm:items-center sm:justify-between sm:gap-3",
      },
    },
    defaultVariants: {
      orientation: "vertical",
    },
  }
)

interface FieldProps
  extends React.ComponentProps<"div">,
    VariantProps<typeof fieldVariants> {
  disabled?: boolean
  invalid?: boolean
}

function Field({
  className,
  orientation = "vertical",
  disabled,
  invalid,
  ...props
}: FieldProps) {
  return (
    <div
      role="group"
      data-slot="field"
      data-orientation={orientation}
      data-disabled={disabled || undefined}
      data-invalid={invalid || undefined}
      className={cn(fieldVariants({ orientation }), className)}
      {...props}
    />
  )
}

function FieldContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="field-content"
      className={cn(
        "group/field-content flex flex-1 flex-col gap-0.5 leading-snug",
        className
      )}
      {...props}
    />
  )
}

function FieldLabel({
  className,
  size = "sm",
  ...props
}: React.ComponentProps<typeof Label>) {
  return (
    <Label
      data-slot="field-label"
      size={size}
      className={cn(
        "group-data-[invalid=true]/field:text-destructive group-data-[disabled=true]/field:opacity-50",
        className
      )}
      {...props}
    />
  )
}

function FieldTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="field-title"
      className={cn(
        "flex w-fit items-center gap-1.5 text-sm font-medium text-foreground select-none group-data-[disabled=true]/field:opacity-50",
        className
      )}
      {...props}
    />
  )
}

function FieldDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="field-description"
      className={cn(
        "text-left text-xs leading-normal font-normal text-muted-foreground",
        "[&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-foreground",
        className
      )}
      {...props}
    />
  )
}

function FieldSeparator({
  children,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  children?: React.ReactNode
}) {
  return (
    <div
      data-slot="field-separator"
      data-content={Boolean(children)}
      className={cn(
        "relative -my-1 h-5 text-xs text-muted-foreground",
        className
      )}
      {...props}
    >
      <Separator className="absolute inset-0 top-1/2" />
      {children && (
        <span
          className="relative mx-auto block w-fit bg-background px-2 text-muted-foreground select-none"
          data-slot="field-separator-content"
        >
          {children}
        </span>
      )}
    </div>
  )
}

function FieldError({
  className,
  children,
  errors,
  ...props
}: React.ComponentProps<"div"> & {
  errors?: Array<{ message?: string } | string | undefined>
}) {
  const content = useMemo(() => {
    if (children) {
      return children
    }

    if (!errors?.length) {
      return null
    }

    const messages = errors
      .map((error) => (typeof error === "string" ? error : error?.message))
      .filter(Boolean) as string[]

    if (messages.length === 1) {
      return messages[0]
    }

    if (messages.length > 1) {
      return (
        <ul className="ml-4 flex list-disc flex-col gap-0.5">
          {messages.map((msg, index) => (
            <li key={index}>{msg}</li>
          ))}
        </ul>
      )
    }

    return null
  }, [children, errors])

  if (!content) {
    return null
  }

  return (
    <div
      role="alert"
      aria-live="polite"
      data-slot="field-error"
      className={cn("text-xs font-medium text-destructive leading-normal", className)}
      {...props}
    >
      {content}
    </div>
  )
}

export {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldContent,
  FieldTitle,
}
