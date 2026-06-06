import type { DevlogEntry } from '@/types/devlog'

type RawDevlogEntry = Partial<DevlogEntry>

const modules = import.meta.glob('../content/devlog/*.json', {
  eager: true,
  import: 'default'
})

function isString(value: unknown): value is string {
  return typeof value === 'string'
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every(isString)
}

function normalizeEntry(value: unknown): DevlogEntry | null {
  const entry = value as RawDevlogEntry

  if (
    !isString(entry.slug) ||
    !isString(entry.title) ||
    !isString(entry.date) ||
    !isString(entry.excerpt) ||
    !isString(entry.html) ||
    !isString(entry.source)
  ) {
    return null
  }

  return {
    slug: entry.slug,
    title: entry.title,
    date: entry.date,
    tags: isStringArray(entry.tags) ? entry.tags : [],
    excerpt: entry.excerpt,
    html: entry.html,
    source: entry.source,
    order: typeof entry.order === 'number' ? entry.order : undefined,
    generatedAt: isString(entry.generatedAt) ? entry.generatedAt : undefined
  }
}

export const devlogEntries: DevlogEntry[] = Object.values(modules)
  .map(normalizeEntry)
  .filter((entry): entry is DevlogEntry => entry !== null)
  .sort((a, b) => {
    const byDate = b.date.localeCompare(a.date)
    if (byDate !== 0) return byDate
    return a.title.localeCompare(b.title)
  })

export function getDevlogEntry(slug: string): DevlogEntry | undefined {
  return devlogEntries.find((entry) => entry.slug === slug)
}
