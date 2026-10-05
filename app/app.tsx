import { useState } from "react"

import { Badge } from "~/components/ui/badge.tsx"
import { Button } from "~/components/ui/button.tsx"
import { Checkbox } from "~/components/ui/checkbox.tsx"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu.tsx"
import { Input } from "~/components/ui/input.tsx"
import { Separator } from "~/components/ui/separator.tsx"
import { Switch } from "~/components/ui/switch.tsx"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip.tsx"
import { cn } from "cn"

function UserIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}

function SettingsIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  )
}

function TrashIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  )
}

function ChevronDownIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}

export function App() {
  const [loading, setLoading] = useState(false)

  async function handleLoading() {
    setLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setLoading(false)
  }

  return (
    <main className="mx-auto w-full max-w-3xl space-y-12 px-6 py-16">
      {/* 1. Badge */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight">Badge</h2>

        <div className="flex flex-wrap items-center gap-3">
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="destructive">Destructive</Badge>
        </div>
      </section>

      <Separator />

      {/* 2. Button */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight">Button</h2>

        <div className="flex flex-wrap items-center gap-3">
          <Button>Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="destructive">Destructive</Button>
          <Button
            loading={loading}
            aria-label={loading ? "Loading" : undefined}
            onClick={handleLoading}
          >
            Click to load
          </Button>
        </div>
      </section>

      <Separator />

      {/* 3. Checkbox */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight">Checkbox</h2>

        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Checkbox id="terms" defaultChecked />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none select-none cursor-pointer"
            >
              Accept terms and conditions
            </label>
          </div>

          <div className="flex items-center gap-2">
            <Checkbox id="unchecked" />
            <label
              htmlFor="unchecked"
              className="text-sm font-medium leading-none select-none cursor-pointer text-muted-foreground"
            >
              Unchecked state
            </label>
          </div>

          <div className="flex items-center gap-2">
            <Checkbox id="disabled" disabled />
            <label
              htmlFor="disabled"
              className="text-sm font-medium leading-none select-none text-muted-foreground/60 cursor-not-allowed"
            >
              Disabled checkbox
            </label>
          </div>
        </div>
      </section>

      <Separator />

      {/* 4. Dropdown Menu */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight">Dropdown Menu</h2>

        <div className="flex flex-wrap items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger
              className={cn(
                "inline-flex h-8 items-center gap-1.5 rounded-full px-3 text-xs font-medium select-none cursor-pointer",
                "border border-border/80 bg-gradient-to-b from-card to-card/90 text-foreground",
                "shadow-[0_1px_2px_0_color-mix(in_oklch,var(--foreground)_5%,transparent),inset_0_1px_0_0_color-mix(in_oklch,var(--background)_80%,transparent)]",
                "hover:bg-muted/50 transition-colors outline-none",
                "data-[popup-open]:bg-muted/70"
              )}
            >
              <span>Options</span>
              <ChevronDownIcon className="size-3 text-muted-foreground transition-transform duration-150 in-data-[popup-open]:rotate-180" />
            </DropdownMenuTrigger>

            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <UserIcon />
                  <span>Profile</span>
                  <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <SettingsIcon />
                  <span>Settings</span>
                  <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive">
                <TrashIcon />
                <span>Delete Account</span>
                <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </section>

      <Separator />

      {/* 5. Input */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight">Input</h2>

        <div className="max-w-sm space-y-4">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
              Default
            </label>
            <Input type="text" placeholder="Enter your name..." />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
              Disabled
            </label>
            <Input disabled type="text" placeholder="Disabled input..." />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
              Invalid
            </label>
            <Input
              aria-invalid="true"
              type="email"
              defaultValue="invalid-email@"
            />
          </div>
        </div>
      </section>

      <Separator />

      {/* 6. Separator */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight">Separator</h2>

        <div className="space-y-6 max-w-sm">
          {/* 1. 两端羽化渐隐线（Linear / Vercel 光学微刻痕） */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Faded Gradient</span>
              <span>Subtle</span>
            </div>
            <Separator />
          </div>

          {/* 2. 业务高频带文字分割线 */}
          <Separator>OR</Separator>

          {/* 3. 垂直羽化分割条 */}
          <div className="flex h-5 items-center justify-center gap-4 text-xs text-muted-foreground">
            <span className="hover:text-foreground cursor-pointer">Preview</span>
            <Separator orientation="vertical" />
            <span className="hover:text-foreground cursor-pointer">Code</span>
            <Separator orientation="vertical" />
            <span className="hover:text-foreground cursor-pointer">Docs</span>
          </div>
        </div>
      </section>

      <Separator />

      {/* 7. Switch */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight">Switch</h2>

        <div className="flex flex-wrap items-center gap-6">
          {/* Small (sm) */}
          <div className="flex items-center gap-3">
            <Switch size="sm" defaultChecked />
            <Switch size="sm" />
          </div>

          {/* Default */}
          <div className="flex items-center gap-3">
            <Switch defaultChecked />
            <Switch />
          </div>

          {/* Large (lg) */}
          <div className="flex items-center gap-3">
            <Switch size="lg" defaultChecked />
            <Switch size="lg" />
          </div>
        </div>
      </section>

      <Separator />

      {/* 8. Tooltip */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight">Tooltip</h2>

        <TooltipProvider>
          <div className="flex flex-wrap items-center gap-4">
            <Tooltip>
              <TooltipTrigger render={(props) => <Button variant="outline" {...props} />}>
                Hover me
              </TooltipTrigger>
              <TooltipContent>
                Add to your library
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger render={(props) => <Button variant="secondary" {...props} />}>
                Bottom side
              </TooltipTrigger>
              <TooltipContent side="bottom">
                Useful tooltip info
              </TooltipContent>
            </Tooltip>
          </div>
        </TooltipProvider>
      </section>
    </main>
  )
}
