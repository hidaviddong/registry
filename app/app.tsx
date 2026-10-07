import { useEffect, useState } from "react"

import { Badge } from "~/components/ui/badge.tsx"
import { Button } from "~/components/ui/button.tsx"
import {
  Checkbox,
} from "~/components/ui/checkbox.tsx"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog.tsx"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "~/components/ui/drawer.tsx"
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
import { Kbd, KbdGroup } from "~/components/ui/kbd.tsx"
import {
  ArrowRightIcon,
  CaretDownIcon,
  CommandIcon,
  GearIcon,
  MagnifyingGlassIcon,
  TrashIcon,
  UserIcon,
} from "@phosphor-icons/react"
import { Label } from "~/components/ui/label.tsx"
import { Textarea } from "~/components/ui/textarea.tsx"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
} from "~/components/ui/field.tsx"
import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
} from "~/components/ui/context-menu.tsx"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "~/components/ui/command.tsx"
import {
  Progress,
  ProgressLabel,
  ProgressValue,
} from "~/components/ui/progress.tsx"
import {
  RadioGroup,
  RadioGroupItem,
} from "~/components/ui/radio-group.tsx"
import {
  ScrollArea,
} from "~/components/ui/scroll-area.tsx"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "~/components/ui/tabs.tsx"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select.tsx"
import { Separator } from "~/components/ui/separator.tsx"
import { Skeleton } from "~/components/ui/skeleton.tsx"
import { Slider } from "~/components/ui/slider.tsx"
import { Switch } from "~/components/ui/switch.tsx"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table.tsx"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip.tsx"
import { Toaster, toast } from "~/components/ui/toast.tsx"
import { cn } from "cn"



export function App() {
  const [loading, setLoading] = useState(false)
  const [commandOpen, setCommandOpen] = useState(false)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setCommandOpen((open) => !open)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  function navigateTo(id: string) {
    setCommandOpen(false)
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  async function handleLoading() {
    setLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setLoading(false)
  }

  return (
    <main className="mx-auto w-full max-w-3xl space-y-12 px-6 py-16">
      {/* 1. Badge */}
      <section id="badge" className="space-y-6">
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
      <section id="button" className="space-y-6">
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
      <section id="checkbox" className="space-y-6">
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
      <section id="dropdown-menu" className="space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight">Dropdown Menu</h2>

        <div className="flex flex-wrap items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger
              render={<Button variant="outline" size="sm" className="gap-2" />}
            >
              <span>Options</span>
              <CaretDownIcon className="size-3.5 text-muted-foreground transition-transform duration-150 in-data-[popup-open]:rotate-180" />
            </DropdownMenuTrigger>

            <DropdownMenuContent>
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Settings</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive">
                <span>Delete Account</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </section>

      <Separator />

      {/* 5. Input */}
      <section id="input" className="space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight">Input</h2>

        <div className="max-w-sm space-y-4">
          <div>
            <Label htmlFor="input-default" size="sm" variant="muted" className="mb-1.5 block">
              Default
            </Label>
            <Input id="input-default" type="text" placeholder="Enter your name..." />
          </div>

          <div>
            <Label htmlFor="input-disabled" size="sm" variant="muted" disabled className="mb-1.5 block">
              Disabled
            </Label>
            <Input id="input-disabled" disabled type="text" placeholder="Disabled input..." />
          </div>

          <div>
            <Label htmlFor="input-invalid" size="sm" variant="destructive" className="mb-1.5 block">
              Invalid
            </Label>
            <Input
              id="input-invalid"
              aria-invalid="true"
              type="email"
              defaultValue="invalid-email@"
            />
          </div>
        </div>
      </section>

      <Separator />

      {/* 6. Separator */}
      <section id="separator" className="space-y-6">
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
      <section id="switch" className="space-y-6">
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
      <section id="tooltip" className="space-y-6">
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
      <Separator />

      {/* 9. Select */}
      <section id="select" className="space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight">Select</h2>

        <div className="max-w-xs space-y-4">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
              Default
            </label>
            <Select defaultValue="Apple">
              <SelectTrigger>
                <SelectValue placeholder="Select a fruit" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Apple">Apple</SelectItem>
                <SelectItem value="Banana">Banana</SelectItem>
                <SelectItem value="Blueberry">Blueberry</SelectItem>
                <SelectItem value="Grapes">Grapes</SelectItem>
                <SelectItem value="Pineapple">Pineapple</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
              Disabled
            </label>
            <Select disabled defaultValue="Apple">
              <SelectTrigger>
                <SelectValue placeholder="Select a fruit" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Apple">Apple</SelectItem>
                <SelectItem value="Banana">Banana</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      <Separator />

      {/* 10. Progress */}
      <section id="progress" className="space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight">Progress</h2>

        <div className="max-w-sm space-y-4">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
              Default
            </label>
            <Progress value={60} />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
              With Label & Value
            </label>
            <Progress value={75}>
              <ProgressLabel>Downloading</ProgressLabel>
              <ProgressValue />
            </Progress>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
              Indeterminate
            </label>
            <Progress value={null} />
          </div>
        </div>
      </section>

      <Separator />

      {/* 11. Skeleton */}
      <section id="skeleton" className="space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight">Skeleton</h2>

        <div className="max-w-sm">
          <div className="flex items-center gap-3">
            <Skeleton className="size-10 rounded-full" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          </div>
        </div>
      </section>

      <Separator />

      {/* 12. Slider */}
      <section id="slider" className="space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight">Slider</h2>

        <div className="max-w-sm space-y-4">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
              Default
            </label>
            <Slider defaultValue={50} />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
              Range
            </label>
            <Slider defaultValue={[25, 75]} />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
              Disabled
            </label>
            <Slider disabled defaultValue={40} />
          </div>
        </div>
      </section>

      <Separator />

      {/* 13. Toast */}
      <section id="toast" className="space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight">Toast</h2>

        <div className="flex flex-wrap items-center gap-3">
          <Button
            variant="outline"
            onClick={() =>
              toast("Event created", {
                description: "Monday, January 3rd at 6:00pm",
              })
            }
          >
            Default
          </Button>

          <Button
            variant="outline"
            onClick={() =>
              toast.info("Update available", {
                description: "A new version of the app is ready to install.",
              })
            }
          >
            Info
          </Button>

          <Button
            variant="outline"
            onClick={() =>
              toast.success("Changes saved", {
                description: "Your settings have been updated.",
              })
            }
          >
            Success
          </Button>

          <Button
            variant="outline"
            onClick={() =>
              toast.warning("Storage warning", {
                description: "You have used 90% of your disk space.",
              })
            }
          >
            Warning
          </Button>

          <Button
            variant="outline"
            onClick={() =>
              toast.error("Deployment failed", {
                description: "Please check your build logs.",
              })
            }
          >
            Error
          </Button>
        </div>
      </section>

      <Separator />

      {/* 14. Radio Group */}
      <section id="radio-group" className="space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight">Radio Group</h2>

        <RadioGroup defaultValue="comfortable" className="max-w-sm space-y-3">
          <div className="flex items-center gap-2">
            <RadioGroupItem value="default" id="r-default" />
            <label
              htmlFor="r-default"
              className="text-sm font-medium leading-none select-none cursor-pointer"
            >
              Default
            </label>
          </div>

          <div className="flex items-center gap-2">
            <RadioGroupItem value="comfortable" id="r-comfortable" />
            <label
              htmlFor="r-comfortable"
              className="text-sm font-medium leading-none select-none cursor-pointer"
            >
              Comfortable
            </label>
          </div>

          <div className="flex items-center gap-2">
            <RadioGroupItem value="compact" id="r-compact" />
            <label
              htmlFor="r-compact"
              className="text-sm font-medium leading-none select-none cursor-pointer"
            >
              Compact
            </label>
          </div>

          <div className="flex items-center gap-2">
            <RadioGroupItem disabled value="disabled" id="r-disabled" />
            <label
              htmlFor="r-disabled"
              className="text-sm font-medium leading-none select-none text-muted-foreground/60 cursor-not-allowed"
            >
              Disabled
            </label>
          </div>
        </RadioGroup>
      </section>

      <Separator />

      {/* 15. Scroll Area */}
      <section id="scroll-area" className="space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight">Scroll Area</h2>

        <div className="w-56">
          <ScrollArea className="h-64 bg-background">
            <div className="divide-y divide-border/40 pr-3 text-xs">
              {Array.from({ length: 25 }).map((_, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between py-2"
                >
                  <span>Item #{i + 1}</span>
                  <span className="font-mono text-muted-foreground">v1.0.{i + 1}</span>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </section>

      <Separator />

      {/* 16. Tabs */}
      <section id="tabs" className="space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight">Tabs</h2>

        <div className="w-full max-w-sm space-y-3">
          <Tabs defaultValue="overview">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <p className="text-xs text-muted-foreground leading-relaxed pt-1">
                Overview panel displaying key application metrics, system health, and active endpoints.
              </p>
            </TabsContent>
            <TabsContent value="analytics">
              <p className="text-xs text-muted-foreground leading-relaxed pt-1">
                Real-time traffic throughput, request latency percentiles, and cache hit distribution.
              </p>
            </TabsContent>
            <TabsContent value="reports">
              <p className="text-xs text-muted-foreground leading-relaxed pt-1">
                Automated weekly compliance audit logs, security diagnostics, and incident telemetry.
              </p>
            </TabsContent>
            <TabsContent value="settings">
              <p className="text-xs text-muted-foreground leading-relaxed pt-1">
                Global rate limiting thresholds, webhook destinations, and TLS certificate renewal policies.
              </p>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <Separator />

      {/* 17. Dialog */}
      <section id="dialog" className="space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight">Dialog</h2>

        <div className="flex flex-wrap items-center gap-4">
          {/* Feedback Dialog */}
          <Dialog>
            <DialogTrigger>Feedback</DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Feedback</DialogTitle>
                <DialogDescription>
                  Tell us about your experience and how we can improve this design system.
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-3 py-1">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-foreground">Thoughts</label>
                  <Input placeholder="What do you think of this component?" />
                </div>
              </div>

              <DialogFooter>
                <DialogClose>Cancel</DialogClose>
                <Button>Submit feedback</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </section>

      <Separator />

      {/* 18. Drawer */}
      <section id="drawer" className="space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight">Drawer</h2>

        <Drawer>
          <DrawerTrigger>Open drawer</DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Edit profile</DrawerTitle>
              <DrawerDescription>
                Update your public profile information. Swipe down or press
                Escape to close.
              </DrawerDescription>
            </DrawerHeader>

            <div className="space-y-4 px-5 py-5">
              <div className="space-y-1.5">
                <label
                  htmlFor="drawer-name"
                  className="text-xs font-medium text-foreground"
                >
                  Display name
                </label>
                <Input id="drawer-name" defaultValue="David Dong" />
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="drawer-handle"
                  className="text-xs font-medium text-foreground"
                >
                  Username
                </label>
                <Input id="drawer-handle" defaultValue="daviddong" />
              </div>
            </div>

            <DrawerFooter>
              <DrawerClose>Cancel</DrawerClose>
              <DrawerClose
                variant="default"
                onClick={() => toast.success("Profile updated")}
              >
                Save changes
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </section>

      <Separator />

      {/* 19. Table */}
      <section id="table" className="space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight">Table</h2>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Deployment</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Environment</TableHead>
              <TableHead className="text-right">Duration</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">registry-web</TableCell>
              <TableCell className="text-muted-foreground">Ready</TableCell>
              <TableCell className="text-muted-foreground">
                Production
              </TableCell>
              <TableCell className="text-right font-mono text-xs text-muted-foreground">
                42s
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">registry-api</TableCell>
              <TableCell className="text-muted-foreground">
                Building
              </TableCell>
              <TableCell className="text-muted-foreground">Preview</TableCell>
              <TableCell className="text-right font-mono text-xs text-muted-foreground">
                1m 08s
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">documentation</TableCell>
              <TableCell className="text-muted-foreground">Queued</TableCell>
              <TableCell className="text-muted-foreground">
                Production
              </TableCell>
              <TableCell className="text-right font-mono text-xs text-muted-foreground">
                —
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </section>

      <Separator />

      {/* 20. Label */}
      <section id="label" className="space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight">Label</h2>

        <div className="max-w-sm space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="username" required>
              Username
            </Label>
            <Input id="username" placeholder="daviddong" />
          </div>

          <div className="flex items-center gap-2">
            <Checkbox id="terms-agree" defaultChecked />
            <Label htmlFor="terms-agree" className="cursor-pointer">
              Accept terms and conditions
            </Label>
          </div>
        </div>
      </section>

      <Separator />

      {/* 21. Textarea */}
      <section id="textarea" className="space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight">Textarea</h2>

        <div className="max-w-sm space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="message">Message</Label>
            <Textarea id="message" placeholder="Type your message here..." />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="auto-notes">Auto-resizing</Label>
            <Textarea
              id="auto-notes"
              autoResize
              placeholder="Expands smoothly as content grows..."
            />
          </div>
        </div>
      </section>

      <Separator />

      {/* 22. Field */}
      <section id="field" className="space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight">Field</h2>

        <div className="max-w-sm space-y-4">
          <Field>
            <FieldLabel htmlFor="api-key" required>
              API Token
            </FieldLabel>
            <Input id="api-key" placeholder="sec_live_..." />
            <FieldDescription>
              Used to authenticate server-to-server requests.
            </FieldDescription>
          </Field>

          <Field orientation="horizontal">
            <FieldContent>
              <FieldLabel htmlFor="auto-deploy">Automatic Deploy</FieldLabel>
              <FieldDescription>
                Deploy every commit pushed to main.
              </FieldDescription>
            </FieldContent>
            <Switch id="auto-deploy" defaultChecked />
          </Field>
        </div>
      </section>

      <Separator />

      {/* 23. Context Menu */}
      <section id="context-menu" className="space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight">Context Menu</h2>

        <div className="max-w-sm">
          <ContextMenu>
            <ContextMenuTrigger className="flex h-20 items-center justify-center rounded-xl border border-border/80 bg-background/50 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-background/80 transition-colors cursor-default select-none shadow-[inset_0_1px_1.5px_0_color-mix(in_oklch,var(--foreground)_5%,transparent)]">
              Right click here
            </ContextMenuTrigger>
            <ContextMenuContent>
              <ContextMenuItem>
                <span>Back</span>
              </ContextMenuItem>
              <ContextMenuItem>
                <span>Forward</span>
              </ContextMenuItem>
              <ContextMenuItem>
                <span>Reload</span>
              </ContextMenuItem>
              <ContextMenuSeparator />
              <ContextMenuItem>
                <span>Settings</span>
              </ContextMenuItem>
              <ContextMenuSeparator />
              <ContextMenuItem variant="destructive">
                <span>Delete</span>
              </ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>
        </div>
      </section>

      <Separator />

      {/* 24. Command */}
      <section id="command" className="space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight">Command</h2>

        <div className="flex items-center">
          <button
            type="button"
            onClick={() => setCommandOpen(true)}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer select-none"
          >
            <span>Press</span>
            <KbdGroup>
              <Kbd>CMD</Kbd>
              <span className="text-xs text-muted-foreground">+</span>
              <Kbd>K</Kbd>
            </KbdGroup>
          </button>
        </div>
      </section>

      <CommandDialog
        open={commandOpen}
        onOpenChange={setCommandOpen}
        title="Component Registry"
        description="Search registered components in the system"
      >
        <CommandInput placeholder="Search now..." />
        <CommandList>
          <CommandEmpty>No components found.</CommandEmpty>

          <CommandGroup heading="Atoms">
            <CommandItem onSelect={() => navigateTo("badge")}>
              <ArrowRightIcon />
              <span>Badge</span>
            </CommandItem>
            <CommandItem onSelect={() => navigateTo("button")}>
              <ArrowRightIcon />
              <span>Button</span>
            </CommandItem>
            <CommandItem onSelect={() => navigateTo("checkbox")}>
              <ArrowRightIcon />
              <span>Checkbox</span>
            </CommandItem>
            <CommandItem onSelect={() => navigateTo("input")}>
              <ArrowRightIcon />
              <span>Input</span>
            </CommandItem>
            <CommandItem onSelect={() => navigateTo("label")}>
              <ArrowRightIcon />
              <span>Label</span>
            </CommandItem>
            <CommandItem onSelect={() => navigateTo("progress")}>
              <ArrowRightIcon />
              <span>Progress</span>
            </CommandItem>
            <CommandItem onSelect={() => navigateTo("skeleton")}>
              <ArrowRightIcon />
              <span>Skeleton</span>
            </CommandItem>
            <CommandItem onSelect={() => navigateTo("slider")}>
              <ArrowRightIcon />
              <span>Slider</span>
            </CommandItem>
            <CommandItem onSelect={() => navigateTo("switch")}>
              <ArrowRightIcon />
              <span>Switch</span>
            </CommandItem>
            <CommandItem onSelect={() => navigateTo("textarea")}>
              <ArrowRightIcon className="size-3.5" />
              <span>Textarea</span>
            </CommandItem>
            <CommandItem onSelect={() => navigateTo("command")}>
              <ArrowRightIcon className="size-3.5" />
              <span>Kbd</span>
            </CommandItem>
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="Molecules">
            <CommandItem onSelect={() => navigateTo("dropdown-menu")}>
              <ArrowRightIcon />
              <span>Dropdown Menu</span>
            </CommandItem>
            <CommandItem onSelect={() => navigateTo("select")}>
              <ArrowRightIcon />
              <span>Select</span>
            </CommandItem>
            <CommandItem onSelect={() => navigateTo("tooltip")}>
              <ArrowRightIcon />
              <span>Tooltip</span>
            </CommandItem>
            <CommandItem onSelect={() => navigateTo("radio-group")}>
              <ArrowRightIcon />
              <span>Radio Group</span>
            </CommandItem>
            <CommandItem onSelect={() => navigateTo("scroll-area")}>
              <ArrowRightIcon />
              <span>Scroll Area</span>
            </CommandItem>
            <CommandItem onSelect={() => navigateTo("tabs")}>
              <ArrowRightIcon />
              <span>Tabs</span>
            </CommandItem>
            <CommandItem onSelect={() => navigateTo("field")}>
              <ArrowRightIcon />
              <span>Field</span>
            </CommandItem>
            <CommandItem onSelect={() => navigateTo("context-menu")}>
              <ArrowRightIcon />
              <span>Context Menu</span>
            </CommandItem>
            <CommandItem onSelect={() => navigateTo("command")}>
              <ArrowRightIcon />
              <span>Command</span>
            </CommandItem>
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="Organisms">
            <CommandItem onSelect={() => navigateTo("dialog")}>
              <ArrowRightIcon />
              <span>Dialog</span>
            </CommandItem>
            <CommandItem onSelect={() => navigateTo("drawer")}>
              <ArrowRightIcon />
              <span>Drawer</span>
            </CommandItem>
            <CommandItem onSelect={() => navigateTo("table")}>
              <ArrowRightIcon />
              <span>Table</span>
            </CommandItem>
            <CommandItem onSelect={() => navigateTo("toast")}>
              <ArrowRightIcon />
              <span>Toast</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>

      <Toaster />
    </main>
  )
}
