import { CheckIcon, ClipboardIcon, ClockCounterClockwiseIcon, NotePencilIcon, PlusIcon, SwatchesIcon, TrashIcon, XIcon } from '@phosphor-icons/react'
import { useEffect, useMemo, useState } from 'react'
import { elapsedTimer, hexToRgb, LAB_KEYS, parseStored, rgbToHsl, type TimerState, type Todo } from '../lib/lab'
import '../styles/lab.css'

type Tool = 'todo' | 'timer' | 'color' | 'notes'

const tools = [
  { id: 'todo' as const, label: '待办', code: 'TASK', icon: CheckIcon },
  { id: 'timer' as const, label: '计时', code: 'TIME', icon: ClockCounterClockwiseIcon },
  { id: 'color' as const, label: '颜色', code: 'CHRM', icon: SwatchesIcon },
  { id: 'notes' as const, label: '笔记', code: 'NOTE', icon: NotePencilIcon },
]

function formatElapsed(ms: number) {
  const total = Math.floor(ms / 1000)
  const hours = Math.floor(total / 3600)
  const minutes = Math.floor((total % 3600) / 60)
  const seconds = total % 60
  return [hours, minutes, seconds].map((part) => String(part).padStart(2, '0')).join(':')
}

function TodoPanel() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [input, setInput] = useState('')
  const [ready, setReady] = useState(false)
  useEffect(() => {
    const saved = parseStored<Todo[]>(localStorage.getItem(LAB_KEYS.todos), [])
    setTodos(Array.isArray(saved) ? saved.filter((item) => item && typeof item.text === 'string') : [])
    setReady(true)
  }, [])
  useEffect(() => { if (ready) localStorage.setItem(LAB_KEYS.todos, JSON.stringify(todos)) }, [todos, ready])
  const add = () => {
    const text = input.trim()
    if (!text) return
    setTodos((items) => [...items, { id: crypto.randomUUID(), text, completed: false }])
    setInput('')
  }
  return <section className="lab-panel" aria-labelledby="todo-title">
    <div className="instrument-head"><div><span>MODULE 01</span><h2 id="todo-title">任务队列</h2></div><span>{todos.filter((item) => !item.completed).length} ACTIVE</span></div>
    <div className="lab-entry"><input value={input} onChange={(event) => setInput(event.target.value)} onKeyDown={(event) => event.key === 'Enter' && add()} placeholder="输入下一项行动…" aria-label="新任务"/><button onClick={add}><PlusIcon size={18}/> 添加</button></div>
    <div className="todo-list" aria-live="polite">
      {todos.length === 0 && <p className="empty-state">队列为空。把一件具体的小事放进来。</p>}
      {todos.map((todo) => <div className={`todo-row ${todo.completed ? 'is-done' : ''}`} key={todo.id}>
        <button className="check-button" aria-label={todo.completed ? '标记为未完成' : '标记为已完成'} onClick={() => setTodos((items) => items.map((item) => item.id === todo.id ? { ...item, completed: !item.completed } : item))}>{todo.completed && <CheckIcon weight="bold"/>}</button>
        <span>{todo.text}</span>
        <button className="icon-button" aria-label="删除任务" onClick={() => setTodos((items) => items.filter((item) => item.id !== todo.id))}><TrashIcon/></button>
      </div>)}
    </div>
  </section>
}

function TimerPanel() {
  const [timer, setTimer] = useState<TimerState>({ elapsedMs: 0, startedAt: null })
  const [now, setNow] = useState(Date.now())
  const [ready, setReady] = useState(false)
  useEffect(() => {
    const saved = parseStored<TimerState>(localStorage.getItem(LAB_KEYS.timer), { elapsedMs: 0, startedAt: null })
    if (typeof saved.elapsedMs === 'number' && (saved.startedAt === null || typeof saved.startedAt === 'number')) setTimer(saved)
    setReady(true)
  }, [])
  useEffect(() => { if (ready) localStorage.setItem(LAB_KEYS.timer, JSON.stringify(timer)) }, [timer, ready])
  useEffect(() => {
    if (!timer.startedAt) return
    const tick = window.setInterval(() => setNow(Date.now()), 250)
    return () => window.clearInterval(tick)
  }, [timer.startedAt])
  const running = timer.startedAt !== null
  const value = elapsedTimer(timer, now)
  const toggle = () => setTimer((state) => state.startedAt
    ? { elapsedMs: elapsedTimer(state), startedAt: null }
    : { ...state, startedAt: Date.now() })
  return <section className="lab-panel timer-panel" aria-labelledby="timer-title">
    <div className="instrument-head"><div><span>MODULE 02</span><h2 id="timer-title">专注计时</h2></div><span>{running ? 'RUNNING' : 'STANDBY'}</span></div>
    <div className="timer-dial"><span>ELAPSED TIME</span><strong>{formatElapsed(value)}</strong><div className={`pulse-line ${running ? 'is-running' : ''}`}/></div>
    <div className="lab-actions"><button className="primary-button" onClick={toggle}>{running ? '暂停' : '开始计时'}</button><button onClick={() => setTimer({ elapsedMs: 0, startedAt: null })}><ClockCounterClockwiseIcon/> 重置</button></div>
    <p className="instrument-note">计时状态以时间戳保存，离开页面后依然准确。</p>
  </section>
}

function ColorPanel() {
  const [color, setColor] = useState('#3f8cff')
  const [copied, setCopied] = useState('')
  const rgb = useMemo(() => hexToRgb(color), [color])
  const hsl = useMemo(() => rgbToHsl(rgb.r, rgb.g, rgb.b), [rgb])
  const values = [color.toUpperCase(), `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`, `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`]
  const copy = async (value: string) => {
    await navigator.clipboard.writeText(value)
    setCopied(value)
    window.setTimeout(() => setCopied(''), 1400)
  }
  return <section className="lab-panel" aria-labelledby="color-title">
    <div className="instrument-head"><div><span>MODULE 03</span><h2 id="color-title">色彩换算</h2></div><span>SRGB</span></div>
    <div className="color-workbench">
      <label className="color-well" style={{ backgroundColor: color }}><input type="color" value={color} onChange={(event) => setColor(event.target.value)} aria-label="选择颜色"/><span>点击取色</span></label>
      <div className="color-values">{values.map((value, index) => <button key={value} onClick={() => copy(value)}><small>{['HEX', 'RGB', 'HSL'][index]}</small><code>{value}</code>{copied === value ? <CheckIcon/> : <ClipboardIcon/>}</button>)}</div>
    </div>
  </section>
}

function NotesPanel() {
  const [notes, setNotes] = useState('')
  const [saved, setSaved] = useState(false)
  useEffect(() => { setNotes(parseStored<string>(localStorage.getItem(LAB_KEYS.notes), '')) }, [])
  useEffect(() => {
    const handle = window.setTimeout(() => {
      localStorage.setItem(LAB_KEYS.notes, JSON.stringify(notes))
      setSaved(true)
      window.setTimeout(() => setSaved(false), 900)
    }, 250)
    return () => window.clearTimeout(handle)
  }, [notes])
  return <section className="lab-panel" aria-labelledby="notes-title">
    <div className="instrument-head"><div><span>MODULE 04</span><h2 id="notes-title">快速笔记</h2></div><span>{saved ? 'SAVED' : `${notes.length} CHARS`}</span></div>
    <textarea className="notes-sheet" value={notes} onChange={(event) => setNotes(event.target.value)} placeholder="捕捉想法、实验结果或下一步…" />
    <div className="notes-footer"><span>LOCAL / PRIVATE</span>{notes && <button onClick={() => setNotes('')}><XIcon/> 清空</button>}</div>
  </section>
}

export default function LabTools() {
  const [active, setActive] = useState<Tool>('todo')
  return <div className="lab-console">
    <nav className="module-tabs" aria-label="实验室工具">{tools.map((tool) => {
      const Icon = tool.icon
      return <button key={tool.id} className={active === tool.id ? 'is-active' : ''} onClick={() => setActive(tool.id)} aria-pressed={active === tool.id}><Icon size={23}/><span>{tool.code}</span><strong>{tool.label}</strong></button>
    })}</nav>
    {active === 'todo' && <TodoPanel/>}
    {active === 'timer' && <TimerPanel/>}
    {active === 'color' && <ColorPanel/>}
    {active === 'notes' && <NotesPanel/>}
  </div>
}
