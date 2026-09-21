'use client'

import { useEffect, useRef } from 'react'
import { useWorld } from '@/components/theme/theme-provider'
import { useReducedMotion } from '@/lib/use-reduced-motion'

export function FilmFlicker() {
  const { world } = useWorld()
  const reducedMotion = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (world !== 'kuro' || reducedMotion) {
      if (ref.current) ref.current.style.opacity = '0'
      return
    }
    let rafId: number
    function loop() {
      rafId = requestAnimationFrame(loop)
      if (Math.random() < 0.02 && ref.current) {
        ref.current.style.opacity = String(0.01 + Math.random() * 0.025)
        setTimeout(() => {
          if (ref.current) ref.current.style.opacity = '0'
        }, 60 + Math.random() * 80)
      }
    }
    rafId = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(rafId)
  }, [world, reducedMotion])

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[4] bg-white opacity-0 transition-opacity duration-75"
    />
  )
}
