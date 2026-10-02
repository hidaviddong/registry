import { useState } from "react"

import { Button } from "~/components/ui/button.tsx"
import { Input } from "~/components/ui/input.tsx"

export function App() {
  const [loading, setLoading] = useState(false)

  async function handleLoading() {
    setLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setLoading(false)
  }

  return (
    <main className="mx-auto w-full max-w-3xl space-y-14 px-6 py-16">
      {/* Input */}
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

          <div>
            <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
              Inline
            </label>
            <div className="flex items-center gap-2">
              <Input type="email" placeholder="Subscribe with email..." />
              <Button>Subscribe</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Button */}
      <section className="space-y-6 border-t border-border pt-10">
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
    </main>
  )
}
