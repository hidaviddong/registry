"use client"

import * as React from "react"
import { Tabs as TabsPrimitive } from "@base-ui/react/tabs"
import { cva, type VariantProps } from "class-variance-authority"
import { motion } from "motion/react"
import { cn } from "cn"

type TabsVariant = "default" | "line"
type TabsSize = "sm" | "default" | "lg"

interface TabsContextValue {
  variant: TabsVariant
  size: TabsSize
  layoutId: string
  orientation: "horizontal" | "vertical"
}

const TabsContext = React.createContext<TabsContextValue>({
  variant: "default",
  size: "default",
  layoutId: "tabs-indicator",
  orientation: "horizontal",
})

interface TabsProps
  extends React.ComponentProps<typeof TabsPrimitive.Root> {
  variant?: TabsVariant
  size?: TabsSize
}

function Tabs({
  className,
  orientation = "horizontal",
  variant = "default",
  size = "default",
  ...props
}: TabsProps) {
  const instanceId = React.useId()
  const layoutId = `tabs-indicator-${instanceId}`

  const contextValue = React.useMemo(
    () => ({
      variant,
      size,
      layoutId,
      orientation: orientation ?? "horizontal",
    }),
    [variant, size, layoutId, orientation]
  )

  return (
    <TabsContext.Provider value={contextValue}>
      <TabsPrimitive.Root
        data-slot="tabs"
        data-orientation={orientation}
        className={cn(
          "group/tabs flex gap-3",
          orientation === "horizontal" ? "flex-col" : "flex-row",
          className
        )}
        orientation={orientation}
        {...props}
      />
    </TabsContext.Provider>
  )
}

const tabsListVariants = cva(
  "group/tabs-list relative inline-flex w-fit items-center select-none text-muted-foreground",
  {
    variants: {
      variant: {
        default: cn(
          // 拟物微沉降凹槽轨道底座（与 Switch、Slider、Progress 轨道严格对齐）
          "bg-muted ring-1 ring-border/80 rounded-lg p-[3px]",
          "shadow-[inset_0_1px_1.5px_0_color-mix(in_oklch,var(--foreground)_8%,transparent)]"
        ),
        line: "gap-4 bg-transparent border-b border-border/80 rounded-none p-0",
      },
      size: {
        sm: "h-7.5 text-xs",
        default: "h-9 text-sm",
        lg: "h-10.5 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

interface TabsListProps
  extends React.ComponentProps<typeof TabsPrimitive.List>,
    VariantProps<typeof tabsListVariants> {}

function TabsList({
  className,
  variant: variantProp,
  size: sizeProp,
  ...props
}: TabsListProps) {
  const context = React.useContext(TabsContext)
  const variant = variantProp ?? context.variant
  const size = sizeProp ?? context.size

  const updatedContext = React.useMemo(
    () => ({
      ...context,
      variant,
      size,
    }),
    [context, variant, size]
  )

  return (
    <TabsContext.Provider value={updatedContext}>
      <TabsPrimitive.List
        data-slot="tabs-list"
        data-variant={variant}
        className={cn(
          tabsListVariants({ variant, size }),
          context.orientation === "vertical" && "h-fit flex-col items-stretch",
          className
        )}
        {...props}
      />
    </TabsContext.Provider>
  )
}

const tabItemSizeClasses: Record<TabsSize, string> = {
  sm: "h-full px-2.5 text-xs",
  default: "h-full px-3.5 text-sm",
  lg: "h-full px-4 text-sm",
}

interface TabsTriggerProps
  extends React.ComponentProps<typeof TabsPrimitive.Tab> {}

function TabsTrigger({
  className,
  disabled,
  children,
  ...props
}: TabsTriggerProps) {
  const { variant, size, layoutId, orientation } = React.useContext(TabsContext)

  return (
    <TabsPrimitive.Tab
      data-slot="tabs-trigger"
      disabled={disabled}
      className={cn(
        "relative inline-flex items-center justify-center font-medium whitespace-nowrap outline-none select-none cursor-pointer transition-colors z-10",
        tabItemSizeClasses[size],
        variant === "default" && [
          "rounded-[5px]",
          "data-active:text-foreground text-muted-foreground hover:text-foreground",
        ],
        variant === "line" && [
          "rounded-none pb-2 h-auto",
          orientation === "horizontal"
            ? "border-b-2 border-transparent"
            : "border-r-2 border-transparent",
          "data-active:text-foreground text-muted-foreground hover:text-foreground",
        ],
        "focus-visible:ring-2 focus-visible:ring-ring/50",
        "disabled:pointer-events-none disabled:opacity-40",
        className
      )}
      render={(tabProps, state) => {
        const isActive = state.active

        return (
          <motion.button
            {...(tabProps as any)}
            whileTap={
              disabled
                ? undefined
                : {
                    scale: 0.97,
                  }
            }
            transition={{
              type: "spring",
              stiffness: 580,
              damping: 32,
              mass: 0.8,
            }}
          >
            {/* 拟物高光浮雕碟面滑块（与 Slider/Switch 统一的实体质感） */}
            {variant === "default" && isActive && (
              <motion.span
                layoutId={layoutId}
                aria-hidden="true"
                className={cn(
                  "absolute inset-0 -z-10 rounded-[inherit]",
                  "bg-gradient-to-b from-white to-neutral-50/95 dark:from-neutral-700 dark:to-neutral-800",
                  "ring-1 ring-black/10 dark:ring-white/15",
                  "shadow-[0_1.5px_3px_0_rgba(0,0,0,0.1),0_1px_1px_0_rgba(0,0,0,0.06),inset_0_1px_0_0_rgba(255,255,255,0.95)] dark:shadow-[0_1.5px_3px_0_rgba(0,0,0,0.4),inset_0_1px_0_0_rgba(255,255,255,0.15)]"
                )}
                transition={{
                  type: "spring",
                  stiffness: 450,
                  damping: 32,
                }}
              />
            )}

            {/* 下划线激活指示器 */}
            {variant === "line" && isActive && (
              <motion.span
                layoutId={layoutId}
                aria-hidden="true"
                className={cn(
                  "absolute bg-foreground rounded-full -z-10",
                  orientation === "horizontal"
                    ? "inset-x-0 -bottom-[2px] h-0.5"
                    : "inset-y-0 -right-[2px] w-0.5"
                )}
                transition={{
                  type: "spring",
                  stiffness: 450,
                  damping: 32,
                }}
              />
            )}

            <span className="relative z-10 flex items-center gap-1.5">
              {children}
            </span>
          </motion.button>
        )
      }}
      {...props}
    />
  )
}

interface TabsContentProps
  extends React.ComponentProps<typeof TabsPrimitive.Panel> {}

function TabsContent({ className, children, ...props }: TabsContentProps) {
  return (
    <TabsPrimitive.Panel
      data-slot="tabs-content"
      className={cn(
        "flex-1 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring/50",
        className
      )}
      render={(panelProps) => (
        <motion.div
          {...(panelProps as any)}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.15,
            ease: "easeOut",
          }}
        >
          {children}
        </motion.div>
      )}
      {...props}
    />
  )
}

const TabsTab = TabsTrigger
const TabsPanel = TabsContent

export {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  TabsTab,
  TabsPanel,
  tabsListVariants,
}
