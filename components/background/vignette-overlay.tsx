'use client'

import { motion } from 'framer-motion'
import { useWorld } from '@/components/theme/theme-provider'

export function VignetteOverlay() {
  const { world } = useWorld()
  const isKuro = world === 'kuro'

  return (
    <motion.div
      aria-hidden="true"
      animate={{
        background: isKuro
          ? 'radial-gradient(ellipse at center, rgba(0,0,0,0) 40%, rgba(0,0,0,0.65) 100%)'
          : 'radial-gradient(ellipse at center, rgba(41,36,32,0) 55%, rgba(41,36,32,0.18) 100%)',
      }}
      transition={{ duration: 1.6, ease: [0.65, 0, 0.35, 1] }}
      className="pointer-events-none fixed inset-0 z-[2]"
    />
  )
}
