"use client"

import * as React from "react"
import { Avatar as AvatarPrimitive } from "@base-ui/react/avatar"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

interface AvatarGroupContextValue {
  size?: "xs" | "sm" | "default" | "lg" | "xl"
}

const AvatarGroupContext = React.createContext<AvatarGroupContextValue>({})

const avatarVariants = cva(
  [
    "group/avatar relative flex shrink-0 select-none items-center justify-center font-medium",
    "bg-muted/50 border border-border/80 text-muted-foreground",
    "shadow-[0_1px_2px_0_color-mix(in_oklch,var(--foreground)_5%,transparent)]",
    "transition-[transform,box-shadow] duration-150 ease-out",
    "after:pointer-events-none after:absolute after:inset-0 after:rounded-[inherit] after:ring-1 after:ring-inset after:ring-foreground/[0.08] dark:after:ring-foreground/[0.12]",
  ].join(" "),
  {
    variants: {
      size: {
        xs: "size-6 text-[0.625rem]",
        sm: "size-7 text-xs",
        default: "size-8 text-xs",
        lg: "size-10 text-sm",
        xl: "size-12 text-base",
      },
      shape: {
        circle: "rounded-full",
        square: "rounded-lg data-[size=xs]:rounded-sm data-[size=sm]:rounded-md data-[size=xl]:rounded-xl",
      },
    },
    defaultVariants: {
      size: "default",
      shape: "circle",
    },
  }
)

type AvatarProps = AvatarPrimitive.Root.Props &
  VariantProps<typeof avatarVariants>

function Avatar({
  className,
  size: sizeProp,
  shape = "circle",
  ...props
}: AvatarProps) {
  const group = React.useContext(AvatarGroupContext)
  const size = sizeProp ?? group.size ?? "default"

  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      data-size={size}
      data-shape={shape}
      className={cn(avatarVariants({ size, shape, className }))}
      {...props}
    />
  )
}

function AvatarImage({
  className,
  ...props
}: AvatarPrimitive.Image.Props) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn(
        "aspect-square size-full rounded-[inherit] object-cover transition-opacity duration-200 ease-out",
        "data-[status=loading]:opacity-0 data-[status=loaded]:opacity-100",
        className
      )}
      {...props}
    />
  )
}

function AvatarFallback({
  className,
  ...props
}: AvatarPrimitive.Fallback.Props) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        "flex size-full items-center justify-center rounded-[inherit] select-none font-medium",
        "bg-linear-to-b from-card to-muted/80 text-muted-foreground",
        "shadow-[inset_0_1px_0_0_color-mix(in_oklch,var(--background)_80%,transparent),inset_0_0_0_1px_color-mix(in_oklch,var(--foreground)_5%,transparent)]",
        "group-data-[size=xs]/avatar:text-[0.625rem]",
        "group-data-[size=sm]/avatar:text-xs",
        "group-data-[size=default]/avatar:text-xs",
        "group-data-[size=lg]/avatar:text-sm",
        "group-data-[size=xl]/avatar:text-base",
        "[&>svg]:size-[50%] [&>svg]:shrink-0",
        className
      )}
      {...props}
    />
  )
}

const avatarBadgeVariants = cva(
  [
    "z-10 inline-flex items-center justify-center rounded-full ring-background select-none",
    "shadow-[0_1px_2px_0_rgba(0,0,0,0.12)]",
    "before:absolute before:inset-0 before:rounded-full before:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.4)]",
    "transition-colors duration-150",
  ].join(" "),
  {
    variants: {
      status: {
        online: "bg-emerald-500 text-white",
        busy: "bg-destructive text-white",
        away: "bg-amber-500 text-white",
        offline: "bg-muted-foreground/60 text-white",
        default: "bg-primary text-primary-foreground",
      },
      placement: {
        "bottom-right": "absolute right-0 bottom-0",
        "top-right": "absolute right-0 top-0",
        "bottom-left": "absolute left-0 bottom-0",
        "top-left": "absolute left-0 top-0",
      },
      size: {
        xs: "size-1.5 ring-1",
        sm: "size-2 ring-1.5",
        default: "size-2.5 ring-2",
        lg: "size-3 ring-2",
        xl: "size-3.5 ring-2",
      },
    },
    defaultVariants: {
      status: "default",
      placement: "bottom-right",
      size: "default",
    },
  }
)

interface AvatarBadgeProps
  extends React.ComponentProps<"span">,
    VariantProps<typeof avatarBadgeVariants> {
  pulse?: boolean
}

function AvatarBadge({
  className,
  status = "default",
  placement = "bottom-right",
  size,
  pulse = false,
  children,
  ...props
}: AvatarBadgeProps) {
  return (
    <span
      data-slot="avatar-badge"
      data-status={status}
      className={cn(
        avatarBadgeVariants({ status, placement, size }),
        !size && [
          "group-data-[size=xs]/avatar:size-1.5 group-data-[size=xs]/avatar:ring-1",
          "group-data-[size=sm]/avatar:size-2 group-data-[size=sm]/avatar:ring-1.5",
          "group-data-[size=default]/avatar:size-2.5 group-data-[size=default]/avatar:ring-2",
          "group-data-[size=lg]/avatar:size-3 group-data-[size=lg]/avatar:ring-2",
          "group-data-[size=xl]/avatar:size-3.5 group-data-[size=xl]/avatar:ring-2",
        ],
        className
      )}
      {...props}
    >
      {pulse && (
        <span className="absolute inline-flex size-full animate-ping rounded-full bg-inherit opacity-75" />
      )}
      {children}
    </span>
  )
}

interface AvatarGroupProps extends React.ComponentProps<"div"> {
  size?: "xs" | "sm" | "default" | "lg" | "xl"
}

function AvatarGroup({
  className,
  size = "default",
  children,
  ...props
}: AvatarGroupProps) {
  return (
    <AvatarGroupContext.Provider value={{ size }}>
      <div
        data-slot="avatar-group"
        data-size={size}
        className={cn(
          "group/avatar-group flex items-center -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:ring-background",
          "data-[size=xs]:-space-x-1.5 data-[size=sm]:-space-x-1.5 data-[size=lg]:-space-x-2.5 data-[size=xl]:-space-x-3",
          "*:transition-transform *:duration-150 *:hover:z-10 *:hover:scale-105",
          className
        )}
        {...props}
      >
        {children}
      </div>
    </AvatarGroupContext.Provider>
  )
}

interface AvatarGroupCountProps extends React.ComponentProps<"div"> {
  size?: "xs" | "sm" | "default" | "lg" | "xl"
}

function AvatarGroupCount({
  className,
  size: sizeProp,
  ...props
}: AvatarGroupCountProps) {
  const group = React.useContext(AvatarGroupContext)
  const size = sizeProp ?? group.size ?? "default"

  return (
    <div
      data-slot="avatar-group-count"
      data-size={size}
      className={cn(
        "relative flex shrink-0 items-center justify-center rounded-full font-medium select-none",
        "bg-linear-to-b from-card to-muted/80 text-muted-foreground ring-2 ring-background",
        "shadow-[0_1px_2px_0_color-mix(in_oklch,var(--foreground)_5%,transparent),inset_0_1px_0_0_color-mix(in_oklch,var(--background)_80%,transparent)]",
        size === "xs" && "size-6 text-[0.625rem]",
        size === "sm" && "size-7 text-xs",
        size === "default" && "size-8 text-xs",
        size === "lg" && "size-10 text-sm",
        size === "xl" && "size-12 text-base",
        className
      )}
      {...props}
    />
  )
}

export {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarBadge,
  AvatarGroup,
  AvatarGroupCount,
  avatarVariants,
  avatarBadgeVariants,
}
export type {
  AvatarProps,
  AvatarBadgeProps,
  AvatarGroupProps,
  AvatarGroupCountProps,
}
