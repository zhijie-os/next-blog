import { useState } from 'react'
import type { CSSProperties } from 'react'
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import bash from 'react-syntax-highlighter/dist/esm/languages/prism/bash'
import c from 'react-syntax-highlighter/dist/esm/languages/prism/c'
import cpp from 'react-syntax-highlighter/dist/esm/languages/prism/cpp'
import java from 'react-syntax-highlighter/dist/esm/languages/prism/java'
import javascript from 'react-syntax-highlighter/dist/esm/languages/prism/javascript'
import json from 'react-syntax-highlighter/dist/esm/languages/prism/json'
import python from 'react-syntax-highlighter/dist/esm/languages/prism/python'
import rust from 'react-syntax-highlighter/dist/esm/languages/prism/rust'
import typescript from 'react-syntax-highlighter/dist/esm/languages/prism/typescript'
import yaml from 'react-syntax-highlighter/dist/esm/languages/prism/yaml'
import { FiCheck, FiCopy } from 'react-icons/fi'

// Only the languages the blog uses are bundled; an unknown language still
// renders, just without highlighting.
const LANGUAGES: [string[], any, string][] = [
  [['bash', 'sh', 'shell', 'zsh'], bash, 'Shell'],
  [['c'], c, 'C'],
  [['cpp', 'c++', 'cc', 'cuda', 'cu'], cpp, 'C++'],
  [['java'], java, 'Java'],
  [['javascript', 'js', 'jsx'], javascript, 'JavaScript'],
  [['json'], json, 'JSON'],
  [['python', 'py'], python, 'Python'],
  [['rust', 'rs'], rust, 'Rust'],
  [['typescript', 'ts', 'tsx'], typescript, 'TypeScript'],
  [['yaml', 'yml'], yaml, 'YAML'],
]
const LABELS: Record<string, string> = {}
LANGUAGES.forEach(([names, grammar, label]) =>
  names.forEach((name) => {
    SyntaxHighlighter.registerLanguage(name, grammar)
    LABELS[name] = label
  })
)

// Token colors are CSS variables (set on .code-block in globals.css), so the
// theme follows the site's `dark` class with no flash after hydration.
const MONO = 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace'
const token = (name: string): CSSProperties => ({ color: `var(--code-${name})` })
const theme: { [key: string]: CSSProperties } = {
  'pre[class*="language-"]': {
    margin: 0,
    padding: '1rem 1.25rem',
    overflow: 'auto',
    background: 'transparent',
    color: 'var(--code-fg)',
    fontFamily: MONO,
    fontSize: '13px',
    lineHeight: 1.7,
    tabSize: 4,
  },
  'code[class*="language-"]': {
    color: 'var(--code-fg)',
    fontFamily: MONO,
    fontSize: '13px',
    lineHeight: 1.7,
    whiteSpace: 'pre',
    tabSize: 4,
  },
  comment: { ...token('comment'), fontStyle: 'italic' },
  prolog: token('comment'),
  doctype: token('comment'),
  cdata: token('comment'),
  punctuation: token('punct'),
  keyword: token('keyword'),
  operator: token('keyword'),
  atrule: token('keyword'),
  important: token('keyword'),
  tag: token('keyword'),
  deleted: token('keyword'),
  string: token('string'),
  char: token('string'),
  'attr-value': token('string'),
  regex: token('string'),
  url: token('string'),
  inserted: token('string'),
  selector: token('string'),
  number: token('number'),
  boolean: token('number'),
  constant: token('number'),
  symbol: token('number'),
  property: token('number'),
  function: token('function'),
  'function-definition': token('function'),
  macro: token('function'),
  'attr-name': token('function'),
  'class-name': token('type'),
  builtin: token('type'),
  namespace: token('type'),
  lifetime: token('type'),
  variable: token('type'),
  entity: token('type'),
}

function CopyButton({ code, floating }: { code: string; floating?: boolean }) {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      // Clipboard can be unavailable (insecure context); nothing to do.
    }
  }
  return (
    <button
      type="button"
      onClick={copy}
      aria-label={copied ? 'Copied' : 'Copy code'}
      className={`inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-200/70 dark:hover:bg-neutral-700/60 transition ${
        floating ? 'absolute right-2 top-2 bg-neutral-50 dark:bg-neutral-800 text-neutral-400 dark:text-neutral-500' : ''
      }`}
    >
      {copied ? <FiCheck /> : <FiCopy />}
      {!floating && <span>{copied ? 'Copied' : 'Copy'}</span>}
    </button>
  )
}

export default function CodeBlock({ code, language }: { code: string; language?: string }) {
  const lang = language?.toLowerCase()
  const label = lang ? LABELS[lang] ?? lang : null
  return (
    <div className="code-block my-6 overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/30">
      {label && (
        <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 py-1.5 pl-4 pr-1.5">
          <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">{label}</span>
          <CopyButton code={code} />
        </div>
      )}
      <div className="relative">
        <SyntaxHighlighter language={lang} style={theme}>
          {code}
        </SyntaxHighlighter>
        {!label && <CopyButton code={code} floating />}
      </div>
    </div>
  )
}
