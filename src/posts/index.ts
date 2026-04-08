export type Post = {
  slug: string
  title: string
  date: string
  tag: string
  excerpt: string
  content: string // markdown
}

export const posts: Post[] = []
