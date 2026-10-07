import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

const surface =
  "border-0 bg-transparent before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:rounded-[inherit] before:border before:border-transparent before:content-['']"

const blueSurface =
  "before:[background:linear-gradient(#ffffff1f,#fff0_50%)_padding-box,linear-gradient(#3f80ff,#2867f2)_padding-box,linear-gradient(#77a5ff,#4a7deb,#1c54d6)_border-box] before:shadow-[0_0_0_1px_#1a4bc2,inset_0_-2px_4px_-2px_#08206e2e,0_1px_1px_#1036a01f,0_2px_4px_#1036a029]"

const whiteSurface =
  "before:[background:linear-gradient(#fff,#f7f7f8)_padding-box,linear-gradient(#fff0,#fff0,#0000000f)_border-box] before:shadow-[0_0_0_1px_#00000017,0_1px_1px_#00000008,0_2px_4px_#0000000a]"

const mutedSurface =
  "before:[background:linear-gradient(#f5f5f5,#e9e9ea)_padding-box,linear-gradient(#ffffff80,#00000012)_border-box] before:shadow-[0_0_0_1px_#00000012,0_1px_1px_#00000008,0_2px_4px_#00000008]"

const destructiveSurface =
  "before:[background:linear-gradient(#ffffff1f,#fff0_50%)_padding-box,linear-gradient(color-mix(in_oklch,var(--destructive),white_8%),color-mix(in_oklch,var(--destructive),black_8%))_padding-box,linear-gradient(color-mix(in_oklch,var(--destructive),white_28%),var(--destructive),color-mix(in_oklch,var(--destructive),black_20%))_border-box] before:shadow-[0_0_0_1px_color-mix(in_oklch,var(--destructive),black_28%),inset_0_-2px_4px_-2px_color-mix(in_oklch,var(--destructive),transparent_72%),0_1px_1px_color-mix(in_oklch,var(--destructive),transparent_82%),0_2px_4px_color-mix(in_oklch,var(--destructive),transparent_78%)]"

const warningSurface =
  "before:[background:linear-gradient(#ffffff38,#fff0_50%)_padding-box,linear-gradient(oklch(73%_0.22_54),oklch(64%_0.225_50))_padding-box,linear-gradient(oklch(84%_0.20_55),oklch(68%_0.22_52),oklch(50%_0.21_48))_border-box] before:shadow-[0_0_0_1px_oklch(46%_0.20_48),inset_0_-2px_4px_-2px_oklch(30%_0.15_48_/_0.4),0_1px_1px_oklch(62%_0.2_50_/_0.22),0_2px_4px_oklch(62%_0.2_50_/_0.3)]"

const badgeVariants = cva(
  `relative isolate inline-flex w-fit shrink-0 items-center justify-center rounded-full bg-clip-padding text-xs font-medium whitespace-nowrap outline-none select-none transition-colors [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-3 ${surface}`,
  {
    variants: {
      variant: {
        default: cn(blueSurface, "text-white"),
        secondary: cn(mutedSurface, "text-secondary-foreground"),
        outline: cn(whiteSurface, "text-foreground"),
        warning: cn(warningSurface, "text-white"),
        destructive: cn(destructiveSurface, "text-white"),
      },
      size: {
        default: "h-5.5 gap-1.5 px-2.5 text-[0.75rem]",
        sm: "h-4.5 gap-1 px-2 text-[0.6875rem]",
        lg: "h-6 gap-1.5 px-3 text-[0.8125rem]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

type BadgeProps = React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants>

function Badge({
  className,
  variant = "default",
  size = "default",
  ...props
}: BadgeProps) {
  return (
    <span
      data-slot="badge"
      className={cn(badgeVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
