import { useEffect, useRef } from 'react'

export default function ProjectHeroMotion() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const hero = canvas?.closest<HTMLElement>('.projects-hero')
    if (!canvas || !hero || matchMedia('(prefers-reduced-motion: reduce)').matches || matchMedia('(pointer: coarse)').matches) return
    const context = canvas.getContext('2d')
    if (!context) return

    let frame = 0
    let width = 0
    let height = 0
    let targetX = 0
    let targetY = 0
    let currentX = 0
    let currentY = 0
    let targetScroll = 0
    let currentScroll = 0
    let visible = true

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      const density = Math.min(devicePixelRatio || 1, 2)
      width = rect.width
      height = rect.height
      canvas.width = Math.round(width * density)
      canvas.height = Math.round(height * density)
      context.setTransform(density, 0, 0, density, 0, 0)
    }

    const draw = (time: number) => {
      context.clearRect(0, 0, width, height)
      const cx = width * .72 + currentX * .55
      const cy = height * .43 + currentY * .5
      const unit = Math.min(width, height)
      context.save()
      context.globalCompositeOperation = 'screen'

      for (let index = 0; index < 5; index += 1) {
        const radius = unit * (.11 + index * .065)
        const phase = time * (.00008 + index * .000008)
        context.beginPath()
        context.setLineDash([3 + index, 10 + index * 2])
        context.lineDashOffset = -time * (.01 + index * .001)
        context.ellipse(cx, cy, radius * 1.5, radius * .56, -.08, phase, phase + Math.PI * 1.72)
        context.strokeStyle = `rgba(94, 170, 245, ${.17 - index * .018})`
        context.lineWidth = index === 0 ? 1.15 : .72
        context.stroke()
      }

      context.setLineDash([])
      for (let index = 0; index < 8; index += 1) {
        const progress = (time * (.000045 + index * .000002) + index / 8) % 1
        const startX = width * (.49 + index * .018)
        const startY = height * (.74 - index * .046)
        const endX = width * (1.02 + index * .01)
        const endY = height * (.09 + index * .035)
        const bend = Math.sin(progress * Math.PI) * unit * (.1 + index * .006)
        const x = startX + (endX - startX) * progress
        const y = startY + (endY - startY) * progress - bend
        const warm = index % 4 === 0
        const glow = context.createRadialGradient(x, y, 0, x, y, warm ? 13 : 9)
        glow.addColorStop(0, warm ? 'rgba(255,155,62,.95)' : 'rgba(151,210,255,.88)')
        glow.addColorStop(.22, warm ? 'rgba(255,119,25,.38)' : 'rgba(63,140,255,.35)')
        glow.addColorStop(1, 'rgba(0,0,0,0)')
        context.fillStyle = glow
        context.fillRect(x - 14, y - 14, 28, 28)
      }

      const pulseX = width * (.56 + ((time * .000075) % 1) * .4)
      context.beginPath()
      context.moveTo(width * .5, cy)
      for (let x = width * .5; x < width; x += 5) {
        const energy = Math.exp(-Math.pow((x - pulseX) / 76, 2))
        context.lineTo(x, cy + Math.sin(x * .09 - time * .003) * energy * 6)
      }
      context.strokeStyle = 'rgba(255,137,42,.5)'
      context.lineWidth = .85
      context.shadowColor = 'rgba(255,120,25,.55)'
      context.shadowBlur = 8
      context.stroke()
      context.restore()
    }

    const animate = (time: number) => {
      currentX += (targetX - currentX) * .07
      currentY += (targetY - currentY) * .07
      currentScroll += (targetScroll - currentScroll) * .08
      hero.style.setProperty('--project-x', `${currentX.toFixed(2)}px`)
      hero.style.setProperty('--project-y', `${currentY.toFixed(2)}px`)
      hero.style.setProperty('--project-scroll', currentScroll.toFixed(3))
      if (visible) draw(time)
      frame = requestAnimationFrame(animate)
    }
    const move = (event: PointerEvent) => {
      const rect = hero.getBoundingClientRect()
      targetX = ((event.clientX - rect.left) / rect.width - .5) * 22
      targetY = ((event.clientY - rect.top) / rect.height - .5) * 14
    }
    const leave = () => { targetX = 0; targetY = 0 }
    const scroll = () => { targetScroll = Math.min(1, Math.max(0, -hero.getBoundingClientRect().top / hero.offsetHeight)) }
    const resizeObserver = new ResizeObserver(resize)
    const visibilityObserver = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting })
    resizeObserver.observe(canvas)
    visibilityObserver.observe(hero)
    hero.addEventListener('pointermove', move)
    hero.addEventListener('pointerleave', leave)
    addEventListener('scroll', scroll, { passive: true })
    resize()
    scroll()
    frame = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(frame)
      resizeObserver.disconnect()
      visibilityObserver.disconnect()
      hero.removeEventListener('pointermove', move)
      hero.removeEventListener('pointerleave', leave)
      removeEventListener('scroll', scroll)
    }
  }, [])

  return <canvas ref={canvasRef} className="project-field-canvas" aria-hidden="true" />
}
