"use client"

import * as React from "react"
import { createPortal } from "react-dom"
import { Command as CommandPrimitive } from "cmdk"
import { AnimatePresence, motion } from "motion/react"
import { MagnifyingGlassIcon } from "@phosphor-icons/react"
import { cn } from "cn"

function Command({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive>) {
  return (
    <CommandPrimitive
      data-slot="command"
      className={cn(
        "flex h-full w-full flex-col overflow-hidden rounded-2xl bg-background text-foreground",
        "border border-border/70",
        "shadow-[0_24px_54px_-12px_rgba(0,0,0,0.18),0_8px_24px_-4px_rgba(0,0,0,0.06),0_0_0_1px_rgba(0,0,0,0.03)] dark:shadow-[0_24px_64px_-12px_rgba(0,0,0,0.7),0_0_0_1px_rgba(255,255,255,0.08)]",
        className
      )}
      {...props}
    />
  )
}

interface CommandDialogProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  title?: string
  description?: string
  children: React.ReactNode
  className?: string
}

function CommandDialog({
  open = false,
  onOpenChange,
  title = "Command Palette",
  description = "Search for actions or navigate components",
  children,
  className,
}: CommandDialogProps) {
  // ESC 键监听
  React.useEffect(() => {
    if (!open) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onOpenChange?.(false)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [open, onOpenChange])

  // 锁定背景滚动
  React.useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  if (typeof document === "undefined") return null

  return createPortal(
    <AnimatePresence>
      {open && (
        <>
          {/* 背景磨砂透气压暗遮罩 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.12, ease: "easeOut" }}
            onClick={() => onOpenChange?.(false)}
            className="fixed inset-0 z-50 bg-black/35 backdrop-blur-[2px]"
          />

          {/* Linear 风格：顶部略微下沉悬浮 (Spotlight 物理位置) */}
          <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-[12vh] sm:pt-[14vh] pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: -8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: -6 }}
              transition={{
                duration: 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={cn(
                "pointer-events-auto relative w-full max-w-[620px] overflow-hidden rounded-2xl bg-background",
                "border border-border/80 ring-1 ring-black/5 dark:ring-white/10",
                "shadow-[0_24px_56px_-12px_rgba(0,0,0,0.2),0_8px_24px_-4px_rgba(0,0,0,0.08)]",
                className
              )}
            >
              <h2 className="sr-only">{title}</h2>
              <p className="sr-only">{description}</p>
              <Command className="border-0 shadow-none">
                {children}
              </Command>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>,
    document.body
  )
}

interface CommandInputProps
  extends React.ComponentProps<typeof CommandPrimitive.Input> {
  showIcon?: boolean
}

const CommandInput = React.forwardRef<
  HTMLInputElement,
  CommandInputProps
>(function CommandInput(
  { className, showIcon = false, autoFocus = true, ...props },
  forwardedRef
) {
  const innerRef = React.useRef<HTMLInputElement>(null)

  React.useImperativeHandle(forwardedRef, () => innerRef.current!)

  // 弹窗开启时即刻聚焦搜索框，彻底消除需要按 Tab 或鼠标点击的问题
  React.useEffect(() => {
    if (autoFocus) {
      const raf = requestAnimationFrame(() => {
        innerRef.current?.focus()
      })
      const timer = setTimeout(() => {
        innerRef.current?.focus()
      }, 30)
      return () => {
        cancelAnimationFrame(raf)
        clearTimeout(timer)
      }
    }
  }, [autoFocus])

  return (
    <div
      data-slot="command-input-wrapper"
      className="flex items-center gap-3 border-b border-border/50 px-5 py-3.5"
    >
      {showIcon && (
        <MagnifyingGlassIcon className="size-4 shrink-0 text-muted-foreground/70" />
      )}
      <CommandPrimitive.Input
        ref={innerRef}
        autoFocus={autoFocus}
        data-slot="command-input"
        className={cn(
          "flex h-8 w-full bg-transparent text-[15px] text-foreground placeholder:text-muted-foreground/60 outline-none disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...props}
      />
    </div>
  )
})

function CommandList({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.List>) {
  return (
    <CommandPrimitive.List
      data-slot="command-list"
      className={cn(
        "max-h-[380px] overflow-y-auto overflow-x-hidden p-2 text-sm outline-none",
        "[scrollbar-width:thin] [scrollbar-color:color-mix(in_oklch,var(--foreground)_18%,transparent)_transparent]",
        className
      )}
      {...props}
    />
  )
}

function CommandEmpty({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Empty>) {
  return (
    <CommandPrimitive.Empty
      data-slot="command-empty"
      className={cn("py-12 text-center text-sm text-muted-foreground select-none", className)}
      {...props}
    />
  )
}

function CommandGroup({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Group>) {
  return (
    <CommandPrimitive.Group
      data-slot="command-group"
      className={cn(
        "overflow-hidden px-1 py-1.5 text-foreground [&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-[11px] [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:tracking-wide [&_[cmdk-group-heading]]:text-muted-foreground/80 [&_[cmdk-group-heading]]:select-none",
        className
      )}
      {...props}
    />
  )
}

interface CommandItemProps
  extends React.ComponentProps<typeof CommandPrimitive.Item> {
  variant?: "default" | "destructive"
}

function CommandItem({
  className,
  variant = "default",
  ...props
}: CommandItemProps) {
  return (
    <CommandPrimitive.Item
      data-slot="command-item"
      data-variant={variant}
      className={cn(
        "group relative flex h-10 items-center gap-3 rounded-xl px-3 text-[13.5px] font-normal outline-none select-none cursor-pointer",
        "transition-colors duration-75",

        variant === "default" && [
          "text-foreground/90",
          "data-[selected=true]:bg-muted/75 data-[selected=true]:text-foreground",
          "aria-selected:bg-muted/75 aria-selected:text-foreground",
          "[&_svg]:text-muted-foreground/70 [&_svg]:transition-colors group-data-[selected=true]:[&_svg]:text-foreground",
        ],

        variant === "destructive" && [
          "text-[color-mix(in_oklch,var(--destructive),black_12%)]",
          "data-[selected=true]:bg-[color-mix(in_oklch,var(--destructive)_10%,transparent)]",
          "data-[selected=true]:text-[color-mix(in_oklch,var(--destructive),black_18%)]",
          "aria-selected:bg-[color-mix(in_oklch,var(--destructive)_10%,transparent)]",
          "aria-selected:text-[color-mix(in_oklch,var(--destructive),black_18%)]",
          "[&_svg]:text-[color-mix(in_oklch,var(--destructive),black_12%)]",
        ],

        "data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-40",
        className
      )}
      {...props}
    />
  )
}

function CommandSeparator({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Separator>) {
  return (
    <CommandPrimitive.Separator
      data-slot="command-separator"
      className={cn(
        "my-1.5 h-px bg-gradient-to-r from-transparent via-border to-transparent",
        className
      )}
      {...props}
    />
  )
}

function CommandShortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="command-shortcut"
      className={cn(
        "ml-auto pl-4 text-xs font-normal tracking-wide text-muted-foreground/50 transition-colors group-data-[selected=true]:text-muted-foreground/80 select-none",
        className
      )}
      {...props}
    />
  )
}

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
}
