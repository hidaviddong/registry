"use client"

import * as React from "react"
import { cn } from "cn"

interface TableProps extends React.ComponentProps<"table"> {
  containerClassName?: string
}

function Table({ className, containerClassName, ...props }: TableProps) {
  return (
    <div
      data-slot="table-container"
      className={cn(
        "relative w-full overflow-x-auto rounded-xl bg-muted/35 p-1 pt-0",
        containerClassName
      )}
    >
      <table
        data-slot="table"
        className={cn(
          "w-full min-w-max border-separate border-spacing-0 caption-bottom text-sm",
          className
        )}
        {...props}
      />
    </div>
  )
}

function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
  return (
    <thead
      data-slot="table-header"
      className={cn("text-muted-foreground", className)}
      {...props}
    />
  )
}

function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
  return (
    <tbody
      data-slot="table-body"
      className={cn(
        "before:table-row before:h-1 before:content-['']",
        "[&_tr:first-child_td]:border-t [&_tr:first-child_td]:border-border/60",
        "[&_tr:first-child_td:first-child]:rounded-tl-lg [&_tr:first-child_td:last-child]:rounded-tr-lg",
        "[&_tr:last-child_td:first-child]:rounded-bl-lg [&_tr:last-child_td:last-child]:rounded-br-lg",
        className
      )}
      {...props}
    />
  )
}

function TableFooter({ className, ...props }: React.ComponentProps<"tfoot">) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn(
        "font-medium before:table-row before:h-1 before:content-['']",
        "[&_td]:border-y [&_td]:border-border/60 [&_td]:bg-background",
        "[&_td:first-child]:rounded-l-lg [&_td:first-child]:border-l",
        "[&_td:last-child]:rounded-r-lg [&_td:last-child]:border-r",
        className
      )}
      {...props}
    />
  )
}

function TableRow({ className, ...props }: React.ComponentProps<"tr">) {
  return (
    <tr
      data-slot="table-row"
      className={cn(
        "group/table-row",
        "[&_td]:transition-colors [&_td]:duration-100 [&_td]:ease-out",
        "hover:[&_td]:bg-muted/25 has-aria-expanded:[&_td]:bg-muted/30 data-[state=selected]:[&_td]:bg-primary/[0.04]",
        className
      )}
      {...props}
    />
  )
}

function TableHead({ className, ...props }: React.ComponentProps<"th">) {
  return (
    <th
      data-slot="table-head"
      className={cn(
        "h-10 px-3 text-left align-middle text-xs font-medium whitespace-nowrap text-muted-foreground/80",
        "first:pl-4 last:pr-4 [&:has([role=checkbox])]:w-10 [&:has([role=checkbox])]:pr-0",
        className
      )}
      {...props}
    />
  )
}

function TableCell({ className, ...props }: React.ComponentProps<"td">) {
  return (
    <td
      data-slot="table-cell"
      className={cn(
        "border-b border-border/40 bg-background px-3 py-2.5 align-middle whitespace-nowrap text-foreground/90",
        "first:border-l first:border-border/60 first:pl-4 last:border-r last:border-border/60 last:pr-4",
        "[&:has([role=checkbox])]:w-10 [&:has([role=checkbox])]:pr-0",
        className
      )}
      {...props}
    />
  )
}

function TableCaption({
  className,
  ...props
}: React.ComponentProps<"caption">) {
  return (
    <caption
      data-slot="table-caption"
      className={cn(
        "pt-3 text-left text-xs text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
}
