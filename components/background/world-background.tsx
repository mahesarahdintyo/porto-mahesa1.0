'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useWorld } from '@/components/theme/theme-provider'
import { easeInOutCubic } from '@/lib/particle-physics'
import { useReducedMotion } from '@/lib/use-reduced-motion'
import { ParticleField } from '@/components/background/particle-field'
import { FogLayer } from '@/components/background/fog-layer'
import { MoonLayer } from '@/components/background/moon-layer'
import { GrainOverlay } from '@/components/background/grain-overlay'
import { VignetteOverlay } from '@/components/background/vignette-overlay'
import { FilmFlicker } from '@/components/background/film-flicker'

export function WorldBackground() {
  const { world } = useWorld()
  const reducedMotion = useReducedMotion()
  const blendRef = useRef(world === 'kuro' ? 1 : 0)
  const animRef = useRef<number | null>(null)

  useEffect(() => {
    const target = world === 'kuro' ? 1 : 0
    if (reducedMotion) {
      blendRef.current = target
      return
    }
    const start = blendRef.current
    if (start === target) return
    const duration = 1600
    const startTime = performance.now()

    if (animRef.current) cancelAnimationFrame(animRef.current)
    function step(now: number) {
      const elapsed = now - startTime
      const t = Math.min(elapsed / duration, 1)
      blendRef.current = start + (target - start) * easeInOutCubic(t)
      if (t < 1) {
        animRef.current = requestAnimationFrame(step)
      }
    }
    animRef.current = requestAnimationFrame(step)
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current)
    }
  }, [world, reducedMotion])

  return (
    <div aria-hidden="true" className="fixed inset-0 -z-10 overflow-hidden">
      <motion.div
        animate={{
          background:
            world === 'kuro'
              ? 'linear-gradient(160deg, #050506 0%, #0a0709 55%, #050506 100%)'
              : 'linear-gradient(160deg, #f4eee4 0%, #ece2d4 55%, #f4eee4 100%)',
        }}
        transition={{ duration: 1.6, ease: [0.65, 0, 0.35, 1] }}
        className="absolute inset-0"
      />
      <div
        className="absolute inset-0 opacity-[0.4] world-transition"
        style={{
          backgroundImage:
            world === 'kuro'
              ? 'radial-gradient(circle at 20% 20%, rgba(255,255,255,0.02) 0%, rgba(0,0,0,0) 40%)'
              : "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='p'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.02' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23p)' opacity='0.5'/%3E%3C/svg%3E\")",
        }}
      />
      <MoonLayer />
      <FogLayer />
      <ParticleField blendRef={blendRef} />
      <VignetteOverlay />
      <GrainOverlay />
      <FilmFlicker />
    </div>
  )
}
