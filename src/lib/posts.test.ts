import { describe, expect, it } from 'vitest'
import { categoryList, filterPosts, readingTime, sortPosts, type Post } from './posts'

const makePost = (id: string, title: string, category: string, publishedAt: string, tags: string[] = []) => ({
  id,
  body: title.repeat(30),
  data: {
    title,
    description: `${title} 的摘要`,
    publishedAt: new Date(publishedAt),
    updatedAt: new Date(publishedAt),
    category,
    tags,
    cover: '/cover.webp',
    featured: false,
    draft: false,
  },
}) as Post

const posts = [
  makePost('old', '类型系统', 'TypeScript', '2025-01-01', ['类型']),
  makePost('new', '并发渲染', 'React', '2026-01-01', ['性能']),
]

describe('post helpers', () => {
  it('sorts newest first without mutating input', () => {
    expect(sortPosts(posts).map((post) => post.id)).toEqual(['new', 'old'])
    expect(posts[0].id).toBe('old')
  })

  it('filters by category and normalized query', () => {
    expect(filterPosts(posts, ' 性能 ', 'React').map((post) => post.id)).toEqual(['new'])
    expect(filterPosts(posts, 'type', '全部').map((post) => post.id)).toEqual(['old'])
  })

  it('builds unique categories and estimates reading time', () => {
    expect(categoryList(posts)).toEqual(['全部', 'TypeScript', 'React'])
    expect(readingTime('中文内容'.repeat(500))).toBeGreaterThan(1)
    expect(readingTime('')).toBe(1)
  })
})
