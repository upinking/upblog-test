import { useEffect, useRef } from 'react'

type Note = { title: string; description: string; date: string; href: string }

export default function HeroDepth({ image, notes }: { image: string; notes: Note[] }) {
  const root = useRef<HTMLElement>(null)
  const canvas = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const node = root.current
    const surface = canvas.current
    if (!node || !surface || matchMedia('(prefers-reduced-motion: reduce)').matches || matchMedia('(pointer: coarse)').matches) return
    const context = surface.getContext('2d')
    if (!context) return
    let frame = 0
    let targetX = 0
    let targetY = 0
    let currentX = 0
    let currentY = 0
    let targetScroll = 0
    let currentScroll = 0
    let width = 0
    let height = 0
    let visible = true

    const resize = () => {
      const rect = surface.getBoundingClientRect()
      const density = Math.min(devicePixelRatio || 1, 2)
      width = rect.width
      height = rect.height
      surface.width = Math.round(width * density)
      surface.height = Math.round(height * density)
      context.setTransform(density, 0, 0, density, 0, 0)
    }

    const drawField = (time: number) => {
      context.clearRect(0, 0, width, height)
      const cx = width * .91 + currentX * .72
      const cy = height * .52 + currentY * .55
      const unit = Math.min(width, height)
      context.save()
      context.globalCompositeOperation = 'screen'

      for (let index = 0; index < 7; index += 1) {
        const radius = unit * (.12 + index * .105)
        const phase = time * (.000035 + index * .000002) + index * .28
        context.beginPath()
        context.setLineDash([2 + index * .6, 8 + index * 1.4])
        context.lineDashOffset = -time * (.009 + index * .001)
        context.ellipse(cx, cy, radius, radius * .82, -.035, phase, phase + Math.PI * 1.52)
        context.strokeStyle = `rgba(83, 160, 238, ${.13 - index * .009})`
        context.lineWidth = index === 1 ? 1.2 : .75
        context.stroke()
      }

      context.setLineDash([])
      for (let index = 0; index < 6; index += 1) {
        const radius = unit * (.17 + index * .09)
        const angle = time * (.00011 + index * .000006) + index * 1.12
        const x = cx + Math.cos(angle) * radius
        const y = cy + Math.sin(angle) * radius * .82
        const glow = context.createRadialGradient(x, y, 0, x, y, 13)
        glow.addColorStop(0, index % 3 === 0 ? 'rgba(255,151,61,.92)' : 'rgba(137,202,255,.88)')
        glow.addColorStop(.18, index % 3 === 0 ? 'rgba(255,125,28,.5)' : 'rgba(69,146,255,.42)')
        glow.addColorStop(1, 'rgba(0,0,0,0)')
        context.fillStyle = glow
        context.fillRect(x - 13, y - 13, 26, 26)
      }

      context.beginPath()
      const waveStart = width * .42
      const waveEnd = width * 1.02
      for (let x = waveStart; x <= waveEnd; x += 4) {
        const proximity = Math.max(0, 1 - Math.abs(x - cx) / (width * .46))
        const pulse = Math.sin(x * .035 - time * .0022) * 4.5 * proximity
        const fine = Math.sin(x * .11 + time * .0014) * 1.3
        const y = cy + pulse + fine
        if (x === waveStart) context.moveTo(x, y)
        else context.lineTo(x, y)
      }
      context.strokeStyle = 'rgba(255, 137, 42, .48)'
      context.lineWidth = .8
      context.shadowColor = 'rgba(255, 116, 22, .55)'
      context.shadowBlur = 8
      context.stroke()
      context.restore()
    }

    const paint = (time: number) => {
      currentX += (targetX - currentX) * 0.075
      currentY += (targetY - currentY) * 0.075
      currentScroll += (targetScroll - currentScroll) * .08
      node.style.setProperty('--depth-x', `${currentX.toFixed(2)}px`)
      node.style.setProperty('--depth-y', `${currentY.toFixed(2)}px`)
      node.style.setProperty('--scroll-depth', currentScroll.toFixed(3))
      if (visible) drawField(time)
      frame = requestAnimationFrame(paint)
    }
    const move = (event: PointerEvent) => {
      const rect = node.getBoundingClientRect()
      targetX = ((event.clientX - rect.left) / rect.width - 0.5) * 24
      targetY = ((event.clientY - rect.top) / rect.height - 0.5) * 16
    }
    const leave = () => { targetX = 0; targetY = 0 }
    const scroll = () => { targetScroll = Math.min(1, Math.max(0, -node.getBoundingClientRect().top / node.offsetHeight)) }
    const visibility = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting }, { threshold: 0 })
    const observer = new ResizeObserver(resize)
    observer.observe(surface)
    visibility.observe(node)
    node.addEventListener('pointermove', move)
    node.addEventListener('pointerleave', leave)
    addEventListener('scroll', scroll, { passive: true })
    resize()
    scroll()
    frame = requestAnimationFrame(paint)
    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      visibility.disconnect()
      node.removeEventListener('pointermove', move)
      node.removeEventListener('pointerleave', leave)
      removeEventListener('scroll', scroll)
    }
  }, [])

  return (
    <section className="hero-depth" ref={root} aria-labelledby="hero-title">
      <div className="hero-art" aria-hidden="true">
        <img src={image} alt="" />
        <canvas className="hero-field-canvas" ref={canvas} />
        <div className="hero-art-grid" />
        <div className="hero-scan" />
      </div>
      <div className="hero-copy">
        <p className="hero-date">2026—09—03</p>
        <p className="hero-signal"><span /> SIGNAL FIELD / 03</p>
        <h1 id="hero-title" aria-label="构建、拆解、记录。">
          <span aria-hidden="true">构建、</span><span aria-hidden="true">拆解、</span><br />
          <span aria-hidden="true">记录</span><em aria-hidden="true">。</em>
        </h1>
        <p className="hero-lead">我是 UPINKING，一名嵌入式工程师，<br />也持续研究软件工具、物理与设计。</p>
        <a className="hero-cta" href="/articles">进入文章 <span aria-hidden="true">→</span></a>
        <p className="hero-coordinate">SOUTH CHINA · ONLINE</p>
      </div>
      <aside className="field-notes" aria-label="最新文章">
        <div className="field-title">FIELD NOTES</div>
        {notes.map((note, index) => (
          <a className="field-note" href={note.href} key={note.href}>
            <span className="field-index">{String(index + 1).padStart(2, '0')}</span>
            <strong>{note.title}</strong>
            <small>{note.description}</small>
            <time>{note.date}</time>
          </a>
        ))}
        <a className="field-all" href="/articles">查看全部文章 →</a>
      </aside>
    </section>
  )
}
