import { describe, expect, it } from 'vitest'
import { mergeProjects, normalizeGitHubProject, projectSnapshot } from './projects'

describe('project data', () => {
  it('normalizes the GitHub contract and keeps local editorial metadata', () => {
    const project = normalizeGitHubProject({
      name: 'MarkNote',
      html_url: 'https://github.com/upinking/MarkNote',
      description: null,
      language: 'TypeScript',
      stargazers_count: 12,
      updated_at: '2026-09-01T00:00:00Z',
    })
    expect(project).toMatchObject({ name: 'MarkNote', language: 'TypeScript', stars: 12, featured: true })
    expect(project?.description).toBe(projectSnapshot[0].description)
  })

  it('rejects malformed remote data and falls back per project', () => {
    expect(normalizeGitHubProject({ name: 42 })).toBeNull()
    const merged = mergeProjects([{ ...projectSnapshot[0], stars: 99 }])
    expect(merged).toHaveLength(3)
    expect(merged[0].stars).toBe(99)
    expect(merged[1]).toEqual(projectSnapshot[1])
  })
})
