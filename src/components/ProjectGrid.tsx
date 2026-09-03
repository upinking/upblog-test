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

  return (
    <div>
      <div className="project-source">
        <span className="status">{source === 'github' ? 'GitHub 实时数据' : '本地快照'}</span>
        <a href="https://github.com/upinking" target="_blank" rel="noreferrer"><GithubLogoIcon size={18} weight="fill" /> GitHub</a>
      </div>
      <div className="project-grid">
        {projects.map((project, index) => (
          <article className="project-card" key={project.name}>
            <div className="project-number">{String(index + 1).padStart(2, '0')}</div>
            <div className="project-language">{project.language}</div>
            <h2>{project.name}</h2>
            <p>{project.description}</p>
            <div className="project-foot">
              <span><StarIcon size={15} /> {project.stars}</span>
              <time>{new Intl.DateTimeFormat('zh-CN', { year: 'numeric', month: '2-digit' }).format(new Date(project.updatedAt))}</time>
              <a href={project.url} target="_blank" rel="noreferrer" aria-label={`在 GitHub 查看 ${project.name}`}><ArrowUpRightIcon size={20} /></a>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
