'use client'

import { motion } from 'framer-motion'
import { useWorld } from '@/components/theme/theme-provider'

export function FogLayer() {
  const { world } = useWorld()
  const isKuro = world === 'kuro'

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[1] overflow-hidden">
      <motion.div
        animate={{ opacity: isKuro ? 0.22 : 0 }}
        transition={{ duration: 1.6, ease: [0.65, 0, 0.35, 1] }}
        className="absolute -bottom-1/4 left-[-20%] h-[60vh] w-[140%]"
        style={{
          background:
            'radial-gradient(ellipse at 50% 100%, rgba(180,180,180,0.5) 0%, rgba(180,180,180,0) 70%)',
          filter: 'blur(20px)',
          animation: isKuro ? 'fog-drift-1 40s ease-in-out infinite' : undefined,
        }}
      />
      <motion.div
        animate={{ opacity: isKuro ? 0.16 : 0 }}
        transition={{ duration: 1.6, ease: [0.65, 0, 0.35, 1] }}
        className="absolute -bottom-1/3 left-[-10%] h-[50vh] w-[130%]"
        style={{
          background:
            'radial-gradient(ellipse at 50% 100%, rgba(120,120,130,0.5) 0%, rgba(120,120,130,0) 65%)',
          filter: 'blur(30px)',
          animation: isKuro ? 'fog-drift-2 55s ease-in-out infinite' : undefined,
        }}
      />
      <motion.div
        animate={{ opacity: isKuro ? 0.4 : 0 }}
        transition={{ duration: 1.8, ease: [0.65, 0, 0.35, 1] }}
        className="absolute top-0 right-[-10%] h-[45vh] w-[60vw] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(126,16,36,0.45) 0%, rgba(126,16,36,0) 70%)',
          filter: 'blur(60px)',
        }}
      />
      <style>{`
        @keyframes fog-drift-1 {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(6%); }
        }
        @keyframes fog-drift-2 {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(-8%); }
        }
      `}</style>
    </div>
  )
}
