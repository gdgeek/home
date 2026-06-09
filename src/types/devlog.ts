export interface DevlogEntry {
  slug: string
  title: string
  date: string
  tags: string[]
  excerpt: string
  html: string
  source: string
  order?: number
  generatedAt?: string
}
