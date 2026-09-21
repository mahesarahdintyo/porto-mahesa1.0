'use client'

import { motion } from 'framer-motion'
import { useWorld } from '@/components/theme/theme-provider'

export function MoonLayer() {
  const { world } = useWorld()
  const isKuro = world === 'kuro'

  return (
    <motion.div
      aria-hidden="true"
      animate={{ opacity: isKuro ? 0.22 : 0, y: isKuro ? 0 : -30 }}
      transition={{ duration: 1.8, ease: [0.65, 0, 0.35, 1] }}
      className="pointer-events-none fixed -right-24 -top-24 z-[1] h-[38vw] w-[38vw] max-w-[520px] max-h-[520px] rounded-full"
      style={{
        background:
          'radial-gradient(circle at 35% 35%, #e7e0d8 0%, #a39a95 45%, rgba(163,154,149,0) 75%)',
        animation: isKuro ? 'moon-float 18s ease-in-out infinite' : undefined,
      }}
    >
      <style>{`
        @keyframes moon-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(14px); }
        }
      `}</style>
    </motion.div>
  )
}
