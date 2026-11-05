"use client"

import * as React from "react"
import {
  Streamdown,
  useIsCodeFenceIncomplete,
  type Components,
  type ExtraProps,
  type StreamdownProps,
} from "streamdown"

import { useHighlightedCode } from "../../hooks/use-highlighted-code"
import {
  CodeBlock,
  CodeBlockActions,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockHeader,
  CodeBlockLine,
  CodeBlockTitle,
} from "./code-block"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table"

function MarkdownCode({
  node: _node,
  className,
  children,
  ...props
}: React.ComponentProps<"code"> & ExtraProps) {
  const incomplete = useIsCodeFenceIncomplete()
  const isBlock = "data-block" in props
  const code = typeof children === "string" ? children.replace(/\n$/, "") : ""
  const language = /language-(\S+)/.exec(className ?? "")?.[1] ?? ""
  const lines = useHighlightedCode(isBlock ? code : "", language)

  if (!isBlock) {
    return (
      <code className="rounded-md border border-border/70 bg-muted/75 px-1.5 py-0.5 font-mono text-[0.85em]">
        {children}
      </code>
    )
  }

  return (
    <CodeBlock className="my-3">
      <CodeBlockHeader>
        <CodeBlockTitle>{language || "text"}</CodeBlockTitle>
        <CodeBlockActions>
          <CodeBlockCopyButton value={code} disabled={incomplete} />
        </CodeBlockActions>
      </CodeBlockHeader>
      <CodeBlockContent lineNumbers>
        {lines.map((line, index) => (
          <CodeBlockLine key={index}>{line}</CodeBlockLine>
        ))}
      </CodeBlockContent>
    </CodeBlock>
  )
}

const markdownComponents: Components = {
  code: MarkdownCode,
  table: ({ node: _node, ...props }) => <Table containerClassName="my-3" {...props} />,
  thead: ({ node: _node, ...props }) => <TableHeader {...props} />,
  tbody: ({ node: _node, ...props }) => <TableBody {...props} />,
  tr: ({ node: _node, ...props }) => <TableRow {...props} />,
  th: ({ node: _node, ...props }) => <TableHead {...props} />,
  td: ({ node: _node, ...props }) => <TableCell {...props} />,
}

function Markdown({
  components,
  controls = false,
  ...props
}: StreamdownProps) {
  return (
    <Streamdown
      data-slot="markdown"
      controls={controls}
      components={components ? { ...markdownComponents, ...components } : markdownComponents}
      {...props}
    />
  )
}

export { Markdown, markdownComponents }
