'use client'

import type { ReactNode } from 'react'
import { motion } from 'framer-motion'

interface SectionRevealProps {
  children: ReactNode
  className?: string
  delay?: number
  as?: 'clip' | 'fade'
}

export function SectionReveal({ children, className, delay = 0, as = 'fade' }: SectionRevealProps) {
  if (as === 'clip') {
    return (
      <motion.div
        initial={{ clipPath: 'inset(0 0 100% 0)', opacity: 0 }}
        whileInView={{ clipPath: 'inset(0 0 0% 0)', opacity: 1 }}
        viewport={{ once: true, margin: '-10%' }}
        transition={{ duration: 0.9, delay, ease: [0.65, 0, 0.35, 1] }}
        className={className}
      >
        {children}
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
