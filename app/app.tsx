import { useState } from "react"

import { Badge } from "~/components/ui/badge.tsx"
import { Button } from "~/components/ui/button.tsx"
import { Checkbox } from "~/components/ui/checkbox.tsx"
import { Input } from "~/components/ui/input.tsx"
import { Separator } from "~/components/ui/separator.tsx"
import { Switch } from "~/components/ui/switch.tsx"

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

      {/* 4. Input */}
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

      {/* 5. Separator */}
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

      {/* 6. Switch */}
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
    </main>
  )
}
