'use client'

import { useEffect, useRef, useState } from 'react'

interface Trail {
  x: number
  y: number
  life: number
}

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const [enabled, setEnabled] = useState(false)
  const [magnetic, setMagnetic] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches
    const isSmall = window.innerWidth < 768
    if (isTouch || isSmall) return
    setEnabled(true)
  }, [])

  useEffect(() => {
    if (!enabled) return

    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    let width = window.innerWidth
    let height = window.innerHeight
    if (canvas) {
      canvas.width = width
      canvas.height = height
    }

    const trails: Trail[] = []
    let pointerX = width / 2
    let pointerY = height / 2

    function handleMove(e: PointerEvent) {
      pointerX = e.clientX
      pointerY = e.clientY
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${pointerX - 9}px, ${pointerY - 9}px, 0)`
      }
      trails.push({ x: pointerX, y: pointerY, life: 1 })
      if (trails.length > 12) trails.shift()

      const el = document.elementFromPoint(pointerX, pointerY)
      const isMagnetic = !!el?.closest('[data-magnetic]')
      setMagnetic(isMagnetic)
    }

    function handleResize() {
      width = window.innerWidth
      height = window.innerHeight
      if (canvas) {
        canvas.width = width
        canvas.height = height
      }
    }

    window.addEventListener('pointermove', handleMove, { passive: true })
    window.addEventListener('resize', handleResize)

    let rafId: number
    function draw() {
      rafId = requestAnimationFrame(draw)
      if (!ctx) return
      ctx.clearRect(0, 0, width, height)
      for (let i = trails.length - 1; i >= 0; i--) {
        const t = trails[i]
        t.life -= 0.06
        if (t.life <= 0) {
          trails.splice(i, 1)
          continue
        }
        ctx.beginPath()
        ctx.arc(t.x, t.y, 2.5 * t.life, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(184, 59, 75, ${t.life * 0.35})`
        ctx.fill()
      }
    }
    rafId = requestAnimationFrame(draw)

    return () => {
      window.removeEventListener('pointermove', handleMove)
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(rafId)
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[70] mix-blend-difference"
      />
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[70] h-[18px] w-[18px] rounded-full bg-foreground mix-blend-difference transition-[width,height] duration-200 ease-out"
        style={{
          width: magnetic ? 32 : 18,
          height: magnetic ? 32 : 18,
          marginLeft: magnetic ? -7 : 0,
          marginTop: magnetic ? -7 : 0,
        }}
      />
    </>
  )
}
