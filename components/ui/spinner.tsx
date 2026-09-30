import type { CSSProperties, ComponentProps } from "react"

import { cn } from "cn"

import "./spinner.css"

const bars = Array.from({ length: 12 })

type SpinnerProps = ComponentProps<"span"> & {
  color?: CSSProperties["color"]
  size?: number
}

function Spinner({ className, color = "currentColor", size = 16, style, ...props }: SpinnerProps) {
  return (
    <span
      data-slot="spinner"
      role="status"
      aria-label="Loading"
      className={cn("spinner-wrapper", className)}
      style={{
        "--spinner-color": color,
        "--spinner-size": `${size}px`,
        ...style,
      } as CSSProperties}
      {...props}
    >
      <span className="spinner" aria-hidden="true">
        {bars.map((_, index) => (
          <span
            className="spinner-bar"
            key={index}
            style={{
              "--spinner-bar-index": index,
            } as CSSProperties}
          />
        ))}
      </span>
    </span>
  )
}

export { Spinner, type SpinnerProps }
