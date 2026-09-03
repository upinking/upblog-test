import rss from '@astrojs/rss'
import { getCollection } from 'astro:content'
import { sortPosts } from '../lib/posts'

export async function GET(context: { site?: URL }) {
  const posts = sortPosts(await getCollection('posts', ({ data }) => !data.draft))
  return rss({
    title: 'UPINKING',
    description: '前端工程、软件工具、物理与设计。',
    site: context.site || 'http://localhost:4321',
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.publishedAt,
      link: `/articles/${post.id}/`,
      categories: [post.data.category, ...post.data.tags],
    })),
  })
}
