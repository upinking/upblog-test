import { useEffect, useState } from 'react'
import { ArrowUpRightIcon, GithubLogoIcon, StarIcon } from '@phosphor-icons/react'
import { mergeProjects, normalizeGitHubProject, type Project } from '../data/projects'

const CACHE_KEY = 'upinking:github:v1:projects'
const MAX_AGE = 6 * 60 * 60 * 1000

function safeCache(): { savedAt: number; projects: Project[] } | null {
  try {
    const parsed = JSON.parse(localStorage.getItem(CACHE_KEY) || 'null')
    if (!parsed || typeof parsed.savedAt !== 'number' || !Array.isArray(parsed.projects)) return null
    return parsed
  } catch { return null }
}

export default function ProjectGrid({ fallback }: { fallback: Project[] }) {
  const [projects, setProjects] = useState(fallback)
  const [source, setSource] = useState<'snapshot' | 'github'>('snapshot')

  useEffect(() => {
    const cached = safeCache()
    if (cached && Date.now() - cached.savedAt < MAX_AGE) {
      setProjects(mergeProjects(cached.projects))
      setSource('github')
      return
    }
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 5000)
    fetch('https://api.github.com/users/upinking/repos?sort=updated&per_page=30', {
      headers: { Accept: 'application/vnd.github+json' }, signal: controller.signal,
    })
      .then((response) => {
        if (!response.ok) throw new Error('GitHub unavailable')
        return response.json()
      })
      .then((data: unknown) => {
        if (!Array.isArray(data)) return
        const remote = data.map((repo) => normalizeGitHubProject(repo)).filter((item): item is Project => Boolean(item))
        const merged = mergeProjects(remote)
        setProjects(merged)
        setSource('github')
        try { localStorage.setItem(CACHE_KEY, JSON.stringify({ savedAt: Date.now(), projects: remote })) } catch { /* storage is optional */ }
      })
      .catch(() => setSource('snapshot'))
      .finally(() => clearTimeout(timeout))
    return () => { clearTimeout(timeout); controller.abort() }
  }, [])

  const stories: Record<string, { title: string; description: string; platform: string; steps: string[]; features: string[] }> = {
    MarkNote: {
      title: '从笔记到成稿，留在一个窗口里。',
      description: '一个面向 Markdown 写作的桌面笔记工具。把目录、编辑与预览放在一起，也能让 AI 先生成草案，再由你决定是否应用。',
      platform: 'macOS / Windows',
      steps: ['打开本地笔记', '写作与实时预览', '保存或导出 PDF'],
      features: ['四种阅读与编辑视图', '自动保存与草稿恢复', 'AI 修改先预览后应用'],
    },
    'STranslate-lite': {
      title: '读到不懂的文字，就地翻译。',
      description: '基于 STranslate 的轻量改写，专注划词翻译：选中文字，按下快捷键，在鼠标附近查看结果，读完继续手头的事。',
      platform: 'Windows · 需配置模型 API',
      steps: ['选中文字', '按 Alt + D', '查看流式翻译'],
      features: ['快捷键可自定义', '适配多显示器与屏幕边缘', '点击结果即可复制'],
    },
    codemap: {
      title: '把代码库展开成一张地图。',
      description: '一个 Rust 桌面代码浏览实验。将目录和文件放进可缩放的地图中，用不同颜色区分语言，从整体结构逐步放大到代码细节。',
      platform: '桌面工具 · Rust / wgpu',
      steps: ['指定本地代码目录', '拖拽与缩放地图', '放大查看文件代码'],
      features: ['按目录组织文件布局', '按编程语言区分颜色', '支持导出 PNG 地图'],
    },
    'upblog-test': {
      title: '把学习和动手做的过程留下来。',
      description: '你正在浏览的个人网站。用 Markdown 整理文章，展示公开项目，也把小工具放进实验室，持续完善自己的学习空间。',
      platform: 'Web · Astro',
      steps: ['记录学习笔记', '整理公开项目', '持续改进体验'],
      features: ['文章搜索与分类', '公式与代码排版', '桌面与手机自适应'],
    },
  }

  return (
    <div>
      <div className="project-source">
        <span className="status">{source === 'github' ? '仓库信息来自 GitHub' : '精选公开项目'}</span>
        <a href="https://github.com/upinking" target="_blank" rel="noreferrer"><GithubLogoIcon size={18} weight="fill" /> 全部仓库</a>
      </div>
      <div className="project-grid">
        {projects.map((project, index) => {
          const story = stories[project.name]
          return (
            <article className="project-card" key={project.name}>
              <div className="project-card-top">
                <span className="project-number">{String(index + 1).padStart(2, '0')}</span>
                <span className="project-language">{story?.platform || project.language}</span>
              </div>
              <h2><a href={project.url} target="_blank" rel="noreferrer">{project.name}</a></h2>
              {story && <h3>{story.title}</h3>}
              <p>{story?.description || project.description}</p>
              {story && <>
                <ol className="project-workflow" aria-label={`${project.name} 使用流程`}>
                  {story.steps.map((step) => <li key={step}>{step}</li>)}
                </ol>
                <ul className="project-features">{story.features.map((feature) => <li key={feature}>{feature}</li>)}</ul>
              </>}
              <div className="project-foot">
                <span aria-label={`${project.stars} 个 GitHub 星标`}><StarIcon size={16} /> {project.stars}</span>
                <time dateTime={project.updatedAt}>更新于 {new Intl.DateTimeFormat('zh-CN', { year: 'numeric', month: '2-digit' }).format(new Date(project.updatedAt))}</time>
                <a href={project.url} target="_blank" rel="noreferrer">查看项目 <ArrowUpRightIcon size={18} /></a>
              </div>
            </article>
          )
        })}
      </div>
    </div>
  )
}
