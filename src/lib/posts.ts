import type { CollectionEntry } from 'astro:content'

export type Post = CollectionEntry<'posts'>

export function sortPosts(posts: Post[]) {
  return [...posts].sort((a, b) => b.data.publishedAt.getTime() - a.data.publishedAt.getTime())
}

export function readingTime(body = '') {
  const chinese = (body.match(/[\u3400-\u9fff]/g) || []).length
  const words = body.replace(/[\u3400-\u9fff]/g, ' ').trim().split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.ceil((chinese + words * 2) / 420))
}

export function formatDate(date: Date) {
  return new Intl.DateTimeFormat('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(date)
}

export function categoryList(posts: Post[]) {
  return ['全部', ...new Set(posts.map((post) => post.data.category))]
}

export function filterPosts(posts: Post[], query: string, category: string) {
  const needle = query.trim().toLocaleLowerCase('zh-CN')
  return posts.filter((post) => {
    const matchesCategory = category === '全部' || post.data.category === category
    const haystack = [post.data.title, post.data.description, post.data.category, ...post.data.tags].join(' ').toLocaleLowerCase('zh-CN')
    return matchesCategory && (!needle || haystack.includes(needle))
  })
}
