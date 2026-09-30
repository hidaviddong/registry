import { useState } from "react"

import { Button } from "~/components/ui/button.tsx"

export function App() {
  const [loading, setLoading] = useState(false)

  async function handleLoading() {
    setLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setLoading(false)
  }

  return (
    <main className="w-full max-w-5xl px-6 py-16">
      <h1 className="mb-8 text-3xl font-semibold tracking-tight">Button</h1>

      <div className="flex flex-wrap items-center gap-3">
        <Button>Default</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="link">Link</Button>
        <Button disabled>Disabled</Button>
        <Button
          loading={loading}
          aria-label={loading ? "Loading" : undefined}
          onClick={handleLoading}
        >
          Click to load
        </Button>
      </div>
    </main>
  )
}
