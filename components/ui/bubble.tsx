"use client"

import * as React from "react"
import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

function BubbleGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="bubble-group"
      className={cn("flex min-w-0 flex-col gap-1.5", className)}
      {...props}
    />
  )
}

const bubbleVariants = cva(
  "group/bubble relative flex w-fit max-w-[80%] min-w-0 flex-col gap-1 group-data-[align=end]/message:self-end data-[align=end]:self-end data-[variant=ghost]:max-w-full",
  {
    variants: {
      variant: {
        default: [
          "*:data-[slot=bubble-content]:border-[color-mix(in_oklab,var(--primary),black_18%)]",
          "*:data-[slot=bubble-content]:bg-linear-to-b *:data-[slot=bubble-content]:from-[color-mix(in_oklab,var(--primary),white_10%)] *:data-[slot=bubble-content]:to-[color-mix(in_oklab,var(--primary),black_6%)]",
          "*:data-[slot=bubble-content]:text-primary-foreground",
          "*:data-[slot=bubble-content]:shadow-[0_1px_2px_0_color-mix(in_oklab,var(--primary)_22%,transparent),0_2px_4px_-1px_color-mix(in_oklab,var(--primary)_14%,transparent),inset_0_1px_0_0_rgba(255,255,255,0.26),inset_0_-1px_2px_0_rgba(0,0,0,0.12)]",
          "[&>[data-slot=bubble-content]:is(button,a):hover]:from-[color-mix(in_oklab,var(--primary),white_15%)] [&>[data-slot=bubble-content]:is(button,a):hover]:to-[color-mix(in_oklab,var(--primary),black_2%)]",
        ].join(" "),
        secondary: [
          "*:data-[slot=bubble-content]:border-border/80",
          "*:data-[slot=bubble-content]:bg-linear-to-b *:data-[slot=bubble-content]:from-[color-mix(in_oklab,var(--secondary),white_45%)] *:data-[slot=bubble-content]:to-secondary",
          "dark:*:data-[slot=bubble-content]:from-[color-mix(in_oklab,var(--secondary),white_6%)] dark:*:data-[slot=bubble-content]:to-secondary",
          "*:data-[slot=bubble-content]:text-secondary-foreground",
          "*:data-[slot=bubble-content]:shadow-[0_1px_2px_0_color-mix(in_oklab,var(--foreground)_5%,transparent),inset_0_1px_0_0_color-mix(in_oklab,var(--background)_85%,transparent)]",
          "[&>[data-slot=bubble-content]:is(button,a):hover]:from-secondary [&>[data-slot=bubble-content]:is(button,a):hover]:to-[color-mix(in_oklab,var(--secondary),var(--foreground)_5%)]",
        ].join(" "),
        muted: [
          "*:data-[slot=bubble-content]:border-border/50",
          "*:data-[slot=bubble-content]:bg-muted/80 *:data-[slot=bubble-content]:text-foreground",
          "*:data-[slot=bubble-content]:shadow-[inset_0_1px_0_0_color-mix(in_oklab,var(--background)_65%,transparent)]",
          "[&>[data-slot=bubble-content]:is(button,a):hover]:bg-[color-mix(in_oklab,var(--muted),var(--foreground)_5%)]",
        ].join(" "),
        tinted: [
          "*:data-[slot=bubble-content]:border-[#2867f2]/20",
          "*:data-[slot=bubble-content]:bg-linear-to-b *:data-[slot=bubble-content]:from-[#3f80ff]/[0.06] *:data-[slot=bubble-content]:to-[#2867f2]/[0.11]",
          "*:data-[slot=bubble-content]:text-[#1643b0] dark:*:data-[slot=bubble-content]:text-[#93b8ff]",
          "*:data-[slot=bubble-content]:shadow-[0_1px_2px_0_rgba(40,103,242,0.06),inset_0_1px_0_0_rgba(255,255,255,0.85)]",
          "dark:*:data-[slot=bubble-content]:border-[#4a7deb]/30 dark:*:data-[slot=bubble-content]:from-[#3f80ff]/14 dark:*:data-[slot=bubble-content]:to-[#2867f2]/22 dark:*:data-[slot=bubble-content]:shadow-[0_1px_2px_0_rgba(0,0,0,0.3),inset_0_1px_0_0_rgba(255,255,255,0.1)]",
          "[&>[data-slot=bubble-content]:is(button,a):hover]:from-[#3f80ff]/[0.10] [&>[data-slot=bubble-content]:is(button,a):hover]:to-[#2867f2]/[0.16]",
          "dark:[&>[data-slot=bubble-content]:is(button,a):hover]:from-[#3f80ff]/20 dark:[&>[data-slot=bubble-content]:is(button,a):hover]:to-[#2867f2]/28",
        ].join(" "),
        outline: [
          "*:data-[slot=bubble-content]:border-border/80",
          "*:data-[slot=bubble-content]:bg-linear-to-b *:data-[slot=bubble-content]:from-background *:data-[slot=bubble-content]:to-[color-mix(in_oklab,var(--background),var(--muted)_45%)]",
          "*:data-[slot=bubble-content]:text-foreground",
          "*:data-[slot=bubble-content]:shadow-[0_1px_2px_0_color-mix(in_oklab,var(--foreground)_5%,transparent),0_2px_4px_-1px_color-mix(in_oklab,var(--foreground)_3%,transparent),inset_0_1px_0_0_color-mix(in_oklab,var(--background)_95%,transparent)]",
          "[&>[data-slot=bubble-content]:is(button,a):hover]:from-muted/40 [&>[data-slot=bubble-content]:is(button,a):hover]:to-muted/80 [&>[data-slot=bubble-content]:is(button,a):hover]:text-foreground",
        ].join(" "),
        ghost: [
          "border-none",
          "*:data-[slot=bubble-content]:rounded-none *:data-[slot=bubble-content]:border-transparent *:data-[slot=bubble-content]:bg-transparent *:data-[slot=bubble-content]:p-0 *:data-[slot=bubble-content]:shadow-none",
          "[&>[data-slot=bubble-content]:is(button,a):hover]:rounded-xl [&>[data-slot=bubble-content]:is(button,a):hover]:bg-muted/70 [&>[data-slot=bubble-content]:is(button,a):hover]:text-foreground dark:[&>[data-slot=bubble-content]:is(button,a):hover]:bg-muted/50",
        ].join(" "),
        destructive: [
          "*:data-[slot=bubble-content]:border-[color-mix(in_oklab,var(--destructive),black_22%)]",
          "*:data-[slot=bubble-content]:bg-linear-to-b *:data-[slot=bubble-content]:from-[color-mix(in_oklab,var(--destructive),white_8%)] *:data-[slot=bubble-content]:to-[color-mix(in_oklab,var(--destructive),black_8%)]",
          "*:data-[slot=bubble-content]:text-white",
          "*:data-[slot=bubble-content]:shadow-[0_1px_2px_0_color-mix(in_oklab,var(--destructive)_24%,transparent),0_2px_4px_-1px_color-mix(in_oklab,var(--destructive)_16%,transparent),inset_0_1px_0_0_rgba(255,255,255,0.26),inset_0_-1px_2px_0_rgba(0,0,0,0.14)]",
          "[&>[data-slot=bubble-content]:is(button,a):hover]:from-[color-mix(in_oklab,var(--destructive),white_14%)] [&>[data-slot=bubble-content]:is(button,a):hover]:to-[color-mix(in_oklab,var(--destructive),black_3%)]",
        ].join(" "),
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Bubble({
  variant = "default",
  align = "start",
  className,
  ...props
}: React.ComponentProps<"div"> &
  VariantProps<typeof bubbleVariants> & {
    align?: "start" | "end"
  }) {
  return (
    <div
      data-slot="bubble"
      data-variant={variant}
      data-align={align}
      className={cn(bubbleVariants({ variant }), className)}
      {...props}
    />
  )
}

function BubbleContent({
  className,
  render,
  ...props
}: useRender.ComponentProps<"div">) {
  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(
      {
        className: cn(
          "w-fit max-w-full min-w-0 overflow-hidden rounded-2xl border border-transparent px-3.5 py-2 text-sm leading-relaxed wrap-break-word",
          "group-data-[align=end]/bubble:self-end",
          "[&:is(button,a)]:cursor-pointer [&:is(button,a)]:text-left [&:is(button,a)]:select-none [&:is(button,a)]:outline-none",
          "[&:is(button,a)]:transition-[color,background-color,border-color,box-shadow,transform] [&:is(button,a)]:duration-150 [&:is(button,a)]:ease-out",
          "[&:is(button,a):active]:scale-[0.985]",
          "[&:is(button,a):focus-visible]:ring-2 [&:is(button,a):focus-visible]:ring-ring/50",
          className
        ),
      },
      props
    ),
    render,
    state: {
      slot: "bubble-content",
    },
  })
}

const bubbleReactionsVariants = cva(
  [
    "absolute z-10 flex w-fit shrink-0 items-center justify-center gap-1 rounded-full px-1.5 py-0.5 text-xs select-none",
    "border border-border/80 bg-linear-to-b from-background to-muted/90 text-foreground ring-2 ring-background",
    "shadow-[0_2px_4px_0_color-mix(in_oklab,var(--foreground)_8%,transparent),inset_0_1px_0_0_color-mix(in_oklab,var(--background)_90%,transparent)]",
    "has-[button]:p-0",
  ].join(" "),
  {
    variants: {
      side: {
        top: "top-0 -translate-y-3/4",
        bottom: "bottom-0 translate-y-3/4",
      },
      align: {
        start: "left-3",
        end: "right-3",
      },
    },
    defaultVariants: {
      side: "bottom",
      align: "end",
    },
  }
)

function BubbleReactions({
  side = "bottom",
  align = "end",
  className,
  ...props
}: React.ComponentProps<"div"> & {
  align?: "start" | "end"
  side?: "top" | "bottom"
}) {
  return (
    <div
      data-slot="bubble-reactions"
      data-align={align}
      data-side={side}
      className={cn(bubbleReactionsVariants({ side, align }), className)}
      {...props}
    />
  )
}

export {
  BubbleGroup,
  Bubble,
  BubbleContent,
  BubbleReactions,
  bubbleVariants,
  bubbleReactionsVariants,
}
