// Math delimiter normalization shared by the blog and reading pipelines.
//
// remark-math supports both `$`/`$$` and LaTeX-style `\(`/`\[` delimiters, but
// the LaTeX-style forms only work as single-line constructs. Multi-line
// `\[ ... \]` blocks fall through to paragraph text — and inside MDX the `{`
// braces then break compilation (MDX parses them as expressions). Converting
// to `$$`/`$` first lets notes and posts use either authoring style.
//
// Fenced code blocks and inline code are masked first so LaTeX-looking text
// inside backticks is never rewritten.

const NUL = '\u0000'
const MASK = `${NUL}MATHMASK`

export function normalizeMathDelimiters(content: string): string {
  const masked: string[] = []
  const withCodeMasked = content.replace(/```[\s\S]*?```|`[^`\n]*`/g, (match) => {
    masked.push(match)
    return `${MASK}${masked.length - 1}${NUL}`
  })

  const converted = withCodeMasked
    .replace(/\\\[([\s\S]*?)\\\]/g, (_m, body: string) => `$$\n${body.trim()}\n$$`)
    .replace(/\\\(([\s\S]*?)\\\)/g, (_m, body: string) => `$${body.trim()}$`)

  return converted.replace(new RegExp(`${MASK}(\\d+)${NUL}`, 'g'), (_m, i) => masked[Number(i)])
}
