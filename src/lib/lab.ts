export const LAB_KEYS = {
  todos: 'upinking:lab:v1:todos',
  timer: 'upinking:lab:v1:timer',
  notes: 'upinking:lab:v1:notes',
} as const

export type Todo = { id: string; text: string; completed: boolean }
export type TimerState = { elapsedMs: number; startedAt: number | null }

export function parseStored<T>(raw: string | null, fallback: T): T {
  if (!raw) return fallback
  try {
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

export function elapsedTimer(state: TimerState, now = Date.now()) {
  return state.elapsedMs + (state.startedAt ? Math.max(0, now - state.startedAt) : 0)
}

export function hexToRgb(hex: string) {
  const value = hex.replace('#', '')
  if (!/^[0-9a-f]{6}$/i.test(value)) return { r: 0, g: 0, b: 0 }
  return {
    r: Number.parseInt(value.slice(0, 2), 16),
    g: Number.parseInt(value.slice(2, 4), 16),
    b: Number.parseInt(value.slice(4, 6), 16),
  }
}

export function rgbToHsl(r: number, g: number, b: number) {
  const [red, green, blue] = [r, g, b].map((value) => value / 255)
  const max = Math.max(red, green, blue)
  const min = Math.min(red, green, blue)
  const lightness = (max + min) / 2
  if (max === min) return { h: 0, s: 0, l: Math.round(lightness * 100) }
  const delta = max - min
  const saturation = lightness > 0.5 ? delta / (2 - max - min) : delta / (max + min)
  let hue = max === red
    ? (green - blue) / delta + (green < blue ? 6 : 0)
    : max === green
      ? (blue - red) / delta + 2
      : (red - green) / delta + 4
  hue /= 6
  return { h: Math.round(hue * 360), s: Math.round(saturation * 100), l: Math.round(lightness * 100) }
}
