# Reading notebook

Research papers I read, written up as book-style notes at `/reading`. Each paper is one `.mdx` file in this directory; the file name is the URL slug (kebab-case, e.g. `dreamer-v3.mdx` → `/reading/dreamer-v3`).

## Frontmatter

```yaml
---
title: Mastering Diverse Domains through World Models
authors: [Danijar Hafner, Jurgis Pasukonis, Jimmy Ba, Timothy Lillicrap]
venue: arXiv preprint          # optional
year: 2023
dateRead: 2023-04-15           # ISO date; drives reading order
topic: World Models            # single value; groups the sidebar and landing page
tags: [world-models, model-based-rl]   # optional
paperUrl: https://arxiv.org/abs/2301.04104
codeUrl: https://github.com/danijar/dreamerv3   # optional
description: One or two lines, shown in the sidebar/list/search.
draft: false                   # optional; hidden everywhere when true
order: 1                       # optional; manual override of reading order
---
```

| Field | Required | Notes |
| --- | --- | --- |
| `title` | yes | |
| `authors` | yes | YAML list or comma-separated string |
| `dateRead` | yes | ISO date; notes sort chronologically by this |
| `topic` | yes | Exact spelling matters — `World Models` and `world models` become two groups |
| `venue`, `year` | no | Shown as `venue, year` in lists and the header |
| `tags`, `description` | no | Shown as chips / used in sidebar search |
| `paperUrl`, `codeUrl` | no | Rendered as Paper / Code buttons in the header |
| `draft` | no | `true` hides the note (like blog drafts) |
| `order` | no | Notes with `order` sort before all date-sorted notes, then by number. Use sparingly, e.g. to force a "Chapter 0" first |

## Reading order

The sidebar, landing page, and Previous/Next navigation share one global order: notes with an explicit `order` first (by number), then everything else by `dateRead` ascending. Topic groups are ordered by each topic's earliest note. Prev/Next flows across topic boundaries, like chapters in a book.

## Section template

Use plain-text headings (no inline code, links, or emphasis) so the "On this page" anchor links stay exact:

```markdown
## Why I read it

## Main idea

## Important observations

## My thoughts / critique

## Connection to my research

## Questions / possible experiments
```

## Conventions

- **Slugs are stable.** The file name is the canonical URL; the site has no redirects, so renaming a published file breaks old links. Use kebab-case, never `index.mdx`.
- **MDX, not Markdown.** HTML comments (`<!-- -->`) are invalid in MDX — use JSX comments `{/* like this */}` instead. Everything else is standard Markdown (GFM tables, links, code).
- **Math (LaTeX) works** in notes and blog posts alike: `$x^2$` for inline math, `$$...$$` on its own lines for centered display math. The LaTeX-style delimiters `\(...\)` and `\[...\]` are accepted too (auto-converted to `$` forms, so `\[` blocks may span lines). Escape literal dollar signs as `\$`.
- The site uses ISR (`revalidate: 3600`), so new or edited notes appear within an hour (or immediately after a rebuild).
- `reading/` is invisible to the Blog and RSS feed — notes are never blog posts.
