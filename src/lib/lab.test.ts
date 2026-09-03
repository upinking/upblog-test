import { describe, expect, it } from 'vitest'
import { elapsedTimer, hexToRgb, parseStored, rgbToHsl } from './lab'

describe('lab state', () => {
  it('survives malformed storage', () => {
    expect(parseStored('{broken', [])).toEqual([])
    expect(parseStored(null, 'empty')).toBe('empty')
  })

  it('derives elapsed time from timestamps', () => {
    expect(elapsedTimer({ elapsedMs: 5000, startedAt: 1000 }, 6000)).toBe(10000)
    expect(elapsedTimer({ elapsedMs: 5000, startedAt: null }, 9999)).toBe(5000)
  })

  it('converts color values', () => {
    expect(hexToRgb('#ff8a1f')).toEqual({ r: 255, g: 138, b: 31 })
    expect(rgbToHsl(255, 0, 0)).toEqual({ h: 0, s: 100, l: 50 })
  })
})
