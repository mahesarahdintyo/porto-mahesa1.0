'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useWorld } from '@/components/theme/theme-provider'
import { useReducedMotion } from '@/lib/use-reduced-motion'

export function EasterEggManager() {
  const { flashWorld } = useWorld()
  const reducedMotion = useReducedMotion()
  const [inkBloom, setInkBloom] = useState(false)
  const [petalBurst, setPetalBurst] = useState(false)
  const keyBuffer = useRef('')
  const clickTimes = useRef<number[]>([])

  useEffect(() => {
    function handleKeydown(e: KeyboardEvent) {
      if (e.key.length !== 1) return
      keyBuffer.current = (keyBuffer.current + e.key.toLowerCase()).slice(-8)
      if (keyBuffer.current.includes('kuro')) {
        keyBuffer.current = ''
        if (!reducedMotion) flashWorld('kuro', 2200)
      } else if (keyBuffer.current.includes('hana')) {
        keyBuffer.current = ''
        if (!reducedMotion) {
          flashWorld('sakura', 2200)
          setPetalBurst(true)
          setTimeout(() => setPetalBurst(false), 1200)
        }
      }
    }

    function handleClick(e: MouseEvent) {
      const target = e.target as HTMLElement
      if (!target.closest('[data-logo]')) return
      const now = Date.now()
      clickTimes.current = [...clickTimes.current, now].filter((t) => now - t < 1500)
      if (clickTimes.current.length >= 5) {
        clickTimes.current = []
        if (!reducedMotion) {
          setInkBloom(true)
          setTimeout(() => setInkBloom(false), 900)
        }
      }
    }

    window.addEventListener('keydown', handleKeydown)
    window.addEventListener('click', handleClick)
    return () => {
      window.removeEventListener('keydown', handleKeydown)
      window.removeEventListener('click', handleClick)
    }
  }, [flashWorld, reducedMotion])

  return (
    <AnimatePresence>
      {inkBloom && (
        <motion.div
          aria-hidden="true"
          initial={{ scale: 0, opacity: 0.9 }}
          animate={{ scale: 4, opacity: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: [0.65, 0, 0.35, 1] }}
          className="pointer-events-none fixed left-1/2 top-1/2 z-[80] h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground"
        />
      )}
      {petalBurst && (
        <motion.div
          aria-hidden="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="pointer-events-none fixed inset-0 z-[80] flex items-center justify-center"
        >
          <span className="font-display text-[20vw] text-primary/30">花</span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
