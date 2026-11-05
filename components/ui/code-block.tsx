"use client"

import * as React from "react"
import { CheckIcon, CopyIcon } from "@phosphor-icons/react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

import { Button } from "./button"

const codeBlockVariants = cva(
  [
    "group/code-block relative flex w-full min-w-0 flex-col overflow-hidden rounded-xl text-sm data-[size=sm]:text-xs",
    "transition-[border-color,box-shadow] duration-150 ease-out",
    "has-[>[data-slot=code-block-content]:focus-visible]:ring-2 has-[>[data-slot=code-block-content]:focus-visible]:ring-ring/50",
  ].join(" "),
  {
    variants: {
      variant: {
        default: [
          "border border-border/80 bg-linear-to-b from-muted/35 to-muted/60 text-foreground",
          "shadow-[0_1px_2px_0_color-mix(in_oklab,var(--foreground)_5%,transparent),inset_0_1px_0_0_color-mix(in_oklab,var(--background)_85%,transparent)]",
          "dark:from-muted/25 dark:to-muted/45",
        ].join(" "),
        destructive: [
          "border border-destructive/35 bg-linear-to-b from-destructive/[0.04] to-destructive/[0.08] text-destructive",
          "shadow-[0_1px_2px_0_color-mix(in_oklab,var(--destructive)_8%,transparent),inset_0_1px_0_0_color-mix(in_oklab,var(--background)_80%,transparent)]",
          "dark:border-destructive/45 dark:from-destructive/10 dark:to-destructive/18",
        ].join(" "),
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function CodeBlock({
  className,
  variant = "default",
  size = "default",
  ...props
}: React.ComponentProps<"div"> &
  VariantProps<typeof codeBlockVariants> & { size?: "default" | "sm" }) {
  return (
    <div
      data-slot="code-block"
      data-variant={variant}
      data-size={size}
      className={cn(codeBlockVariants({ variant }), className)}
      {...props}
    />
  )
}

function CodeBlockHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="code-block-header"
      className={cn(
        "flex min-w-0 shrink-0 items-center gap-2 border-b border-border/60 bg-background/60 px-3.5 py-2 text-muted-foreground select-none",
        "shadow-[inset_0_1px_0_0_color-mix(in_oklab,var(--background)_90%,transparent)]",
        "group-data-[size=sm]/code-block:px-3 group-data-[size=sm]/code-block:py-1.5",
        "group-data-[variant=destructive]/code-block:border-destructive/20 group-data-[variant=destructive]/code-block:bg-destructive/[0.03] group-data-[variant=destructive]/code-block:text-destructive",
        "*:has-[>[data-slot=code-block-title]]:min-w-0",
        className
      )}
      {...props}
    />
  )
}

function CodeBlockTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="code-block-title"
      className={cn(
        "flex min-w-0 items-center gap-1.5 truncate font-mono text-xs font-medium text-foreground/85",
        "group-data-[size=sm]/code-block:text-[0.7rem]",
        "group-data-[variant=destructive]/code-block:text-destructive",
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-3.5 [&_svg]:text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}

function CodeBlockActions({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="code-block-actions"
      className={cn(
        "-my-0.5 ms-auto -me-1 flex shrink-0 items-center gap-1",
        "[[data-slot=code-block]>&]:absolute [[data-slot=code-block]>&]:end-2.5 [[data-slot=code-block]>&]:top-2.5 [[data-slot=code-block]>&]:z-10 [[data-slot=code-block]>&]:m-0",
        "[[data-slot=code-block]>&]:opacity-0 [[data-slot=code-block]>&]:transition-opacity [[data-slot=code-block]>&]:duration-150",
        "[[data-slot=code-block]>&]:group-focus-within/code-block:opacity-100 [[data-slot=code-block]>&]:group-hover/code-block:opacity-100",
        "group-data-[size=sm]/code-block:[[data-slot=code-block]>&]:end-2 group-data-[size=sm]/code-block:[[data-slot=code-block]>&]:top-2",
        "[[data-slot=code-block]>&]:pointer-coarse:opacity-100",
        className
      )}
      {...props}
    />
  )
}

function CodeBlockCopyButton({
  value,
  variant = "outline",
  size = "icon-xs",
  className,
  onClick,
  ...props
}: React.ComponentProps<typeof Button> & { value: string }) {
  const [copied, setCopied] = React.useState(false)

  React.useEffect(() => {
    if (!copied) {
      return
    }

    const timeout = setTimeout(() => setCopied(false), 2000)
    return () => clearTimeout(timeout)
  }, [copied])

  return (
    <>
      <Button
        data-slot="code-block-copy-button"
        data-copied={copied || undefined}
        variant={variant}
        size={size}
        aria-label={copied ? "Copied" : "Copy"}
        className={cn("rounded-md", className)}
        onClick={(event) => {
          onClick?.(event)
          navigator.clipboard
            .writeText(value)
            .then(() => setCopied(true))
            .catch(() => {})
        }}
        {...props}
      >
        {copied ? (
          <CheckIcon weight="bold" className="text-emerald-600 dark:text-emerald-400" />
        ) : (
          <CopyIcon />
        )}
      </Button>
      <span aria-live="polite" className="sr-only">
        {copied ? "Copied" : ""}
      </span>
    </>
  )
}

function CodeBlockContent({
  className,
  children,
  style,
  wrap = false,
  lineNumbers = false,
  startLine = 1,
  ...props
}: React.ComponentProps<"pre"> & {
  wrap?: boolean
  lineNumbers?: boolean
  startLine?: number
}) {
  return (
    <pre
      data-slot="code-block-content"
      data-wrap={wrap || undefined}
      data-numbered={lineNumbers || undefined}
      dir="ltr"
      tabIndex={0}
      style={{ counterReset: `line ${startLine - 1}`, ...style }}
      className={cn(
        "m-0 min-h-0 min-w-0 overflow-auto bg-background/85 px-3.5 py-3 text-start font-mono text-[0.8125rem] leading-relaxed outline-none",
        "scroll-fade-x [scrollbar-width:thin] [scrollbar-color:color-mix(in_oklab,var(--foreground)_15%,transparent)_transparent]",
        "group-data-[size=sm]/code-block:px-3 group-data-[size=sm]/code-block:py-2.5 group-data-[size=sm]/code-block:text-xs",
        "data-[wrap]:scroll-fade-y data-[wrap]:wrap-break-word data-[wrap]:whitespace-pre-wrap",
        className
      )}
      {...props}
    >
      <code
        data-slot="code-block-code"
        className="grid min-h-lh min-w-max content-start in-data-[numbered]:grid-cols-[auto_1fr] in-data-[wrap]:min-w-0"
      >
        {lineNumbers && typeof children === "string"
          ? children
              .replace(/\n$/, "")
              .split("\n")
              .map((line, index) => (
                <CodeBlockLine key={index}>{line}</CodeBlockLine>
              ))
          : children}
      </code>
    </pre>
  )
}

const codeBlockLineVariants = cva(
  [
    "relative -mx-3.5 block min-h-lh px-3.5",
    "group-data-[size=sm]/code-block:-mx-3 group-data-[size=sm]/code-block:px-3",
    "before:min-w-6 before:text-end before:text-muted-foreground/55 before:tabular-nums",
    "after:absolute after:start-1.5 after:top-0 after:text-muted-foreground after:select-none",
    "in-data-[numbered]:col-span-2 in-data-[numbered]:grid in-data-[numbered]:grid-cols-subgrid in-data-[numbered]:gap-x-3.5",
    "in-data-[numbered]:[counter-increment:line] in-data-[numbered]:before:content-[counter(line)] in-data-[numbered]:before:select-none",
    "in-data-[numbered]:supports-[content:counter(line)_/_'']:before:content-[counter(line)_/_'']",
  ].join(" "),
  {
    variants: {
      variant: {
        default: "",
        added:
          "bg-emerald-500/[0.10] before:text-emerald-600/70 after:font-medium after:text-emerald-600 after:content-['+'] dark:bg-emerald-500/15 dark:before:text-emerald-400/70 dark:after:text-emerald-400",
        removed:
          "bg-destructive/[0.10] before:text-destructive/70 after:font-medium after:text-destructive after:content-['−'] dark:bg-destructive/15",
        highlighted:
          "bg-[#2867f2]/[0.08] shadow-[inset_2px_0_0_0_#2867f2] dark:bg-[#3f80ff]/15 dark:shadow-[inset_2px_0_0_0_#4a7deb]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function CodeBlockLine({
  className,
  variant = "default",
  children,
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof codeBlockLineVariants>) {
  const empty =
    children === undefined ||
    children === null ||
    children === "" ||
    (Array.isArray(children) && children.length === 0)

  return (
    <span
      data-slot="code-block-line"
      data-variant={variant}
      className={cn(codeBlockLineVariants({ variant }), className)}
      {...props}
    >
      <span data-slot="code-block-line-content" className="min-w-0">
        {empty ? "\n" : children}
      </span>
    </span>
  )
}

function CodeBlockFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="code-block-footer"
      className={cn(
        "flex min-w-0 shrink-0 items-center gap-2 border-t border-border/60 bg-background/60 px-3.5 py-2 text-xs text-muted-foreground select-none",
        "group-data-[size=sm]/code-block:px-3 group-data-[size=sm]/code-block:py-1.5",
        className
      )}
      {...props}
    />
  )
}

export {
  CodeBlock,
  CodeBlockHeader,
  CodeBlockTitle,
  CodeBlockActions,
  CodeBlockCopyButton,
  CodeBlockContent,
  CodeBlockLine,
  CodeBlockFooter,
  codeBlockVariants,
  codeBlockLineVariants,
}
