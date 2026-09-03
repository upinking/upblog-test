export interface Project {
  name: string
  description: string
  language: string
  url: string
  stars: number
  updatedAt: string
  featured: boolean
}

export const projectSnapshot: Project[] = [
  {
    name: 'MarkNote',
    description: '轻量的 macOS / Windows Markdown 笔记软件，支持所见即所得、实时预览、AI Agent 与多种阅读视图。',
    language: 'JavaScript',
    url: 'https://github.com/upinking/MarkNote',
    stars: 1,
    updatedAt: '2026-08-25T11:06:12Z',
    featured: true,
  },
  {
    name: 'STranslate-lite',
    description: '专注单一划词翻译流程的 Windows 托盘应用，支持流式翻译、多屏定位与可配置模型。',
    language: 'C#',
    url: 'https://github.com/upinking/STranslate-lite',
    stars: 0,
    updatedAt: '2026-08-18T10:25:54Z',
    featured: true,
  },
  {
    name: 'upblog-test',
    description: 'UPINKING 个人博客的早期实验版本，也是这次重构的起点。',
    language: 'JavaScript',
    url: 'https://github.com/upinking/upblog-test',
    stars: 1,
    updatedAt: '2026-05-28T03:44:22Z',
    featured: false,
  },
]

export function normalizeGitHubProject(repo: Record<string, unknown>): Project | null {
  if (typeof repo.name !== 'string' || typeof repo.html_url !== 'string') return null
  const fallback = projectSnapshot.find((project) => project.name === repo.name)
  return {
    name: repo.name,
    description: typeof repo.description === 'string' && repo.description ? repo.description : fallback?.description || '正在构建中的公开项目。',
    language: typeof repo.language === 'string' && repo.language ? repo.language : fallback?.language || 'Other',
    url: repo.html_url,
    stars: typeof repo.stargazers_count === 'number' ? repo.stargazers_count : fallback?.stars || 0,
    updatedAt: typeof repo.updated_at === 'string' ? repo.updated_at : fallback?.updatedAt || new Date(0).toISOString(),
    featured: fallback?.featured || false,
  }
}

export function mergeProjects(remote: Project[]) {
  const byName = new Map(remote.map((project) => [project.name, project]))
  return projectSnapshot.map((fallback) => byName.get(fallback.name) || fallback)
}
