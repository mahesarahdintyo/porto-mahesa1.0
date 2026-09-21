'use client'

import { useEffect, useRef } from 'react'
import { Petal, AshParticle, type PointerState } from '@/lib/particle-physics'
import { useReducedMotion } from '@/lib/use-reduced-motion'

interface ParticleFieldProps {
  blendRef: React.RefObject<number>
}

export function ParticleField({ blendRef }: ParticleFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = window.innerWidth
    let height = window.innerHeight
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    function resize() {
      if (!canvas) return
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx?.scale(dpr, dpr)
    }
    resize()

    const isMobile = width < 768
    const isTablet = width >= 768 && width < 1280
    const countMultiplier = isMobile ? 0.55 : isTablet ? 0.75 : 1

    const petals = Array.from(
      { length: Math.round(75 * countMultiplier) },
      () => new Petal(width, height),
    )
    const ash = Array.from(
      { length: Math.round(55 * countMultiplier) },
      () => new AshParticle(width, height, false),
    )
    const embers = Array.from(
      { length: Math.round(18 * countMultiplier) },
      () => new AshParticle(width, height, true),
    )

    const pointer: PointerState = { x: -9999, y: -9999, active: false }

    function handlePointerMove(e: PointerEvent) {
      pointer.x = e.clientX
      pointer.y = e.clientY
      pointer.active = true
    }
    function handlePointerLeave() {
      pointer.active = false
    }

    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    window.addEventListener('pointerleave', handlePointerLeave)
    window.addEventListener('resize', resize)

    let visible = !document.hidden
    function handleVisibility() {
      visible = !document.hidden
    }
    document.addEventListener('visibilitychange', handleVisibility)

    let rafId: number
    let lastTime = performance.now()

    function frame(now: number) {
      rafId = requestAnimationFrame(frame)
      if (!visible || !ctx) return

      const delta = now - lastTime
      lastTime = now
      // Clamp delta safely between 1ms and 64ms (prevents physics explosion on tab-switch/lag)
      const safeDelta = Math.min(Math.max(delta, 1), 64)
      const dt = safeDelta / 16.67

      const blend = blendRef.current ?? 0
      const sakuraOpacity = 1 - blend
      const kuroOpacity = blend
      // Under reduced motion, drift very subtly instead of being frozen off-screen
      const speedMultiplier = reducedMotion ? 0.2 : 1

      ctx.clearRect(0, 0, width, height)

      if (sakuraOpacity > 0.01) {
        for (const petal of petals) {
          petal.update(width, height, now, pointer, speedMultiplier, dt)
          petal.draw(ctx, '#c84358', '#e88998', sakuraOpacity)
        }
      }

      if (kuroOpacity > 0.01) {
        for (const particle of ash) {
          particle.update(width, height, now, dt * speedMultiplier)
          particle.draw(ctx, now, kuroOpacity)
        }
        for (const particle of embers) {
          particle.update(width, height, now, dt * speedMultiplier)
          particle.draw(ctx, now, kuroOpacity)
        }
      }
    }

    rafId = requestAnimationFrame(frame)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerleave', handlePointerLeave)
      window.removeEventListener('resize', resize)
      document.removeEventListener('visibilitychange', handleVisibility)
    }
  }, [blendRef, reducedMotion])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 h-full w-full"
    />
  )
}
