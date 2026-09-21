'use client'

import { motion } from 'framer-motion'
import { useWorld } from '@/components/theme/theme-provider'
import { MagneticButton } from '@/components/ui/magnetic-button'

export function Hero() {
  const { world, toggleWorld } = useWorld()
  const isKuro = world === 'kuro'

  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] w-full items-center overflow-hidden px-6 md:px-12"
    >
      <span
        aria-hidden="true"
        className="font-display pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 select-none text-[38vw] leading-none text-foreground/10 md:right-10 md:text-[26vw]"
      >
        {isKuro ? '黒' : '花'}
      </span>

      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-accent mb-6 text-xs uppercase tracking-[0.35em] text-muted-foreground"
        >
          {isKuro ? 'ENTER THE VOID' : 'CREATIVE DEVELOPER / DESIGNER'}
        </motion.p>

        <h1 className="font-display text-[clamp(3rem,12vw,8.5rem)] font-medium leading-[0.95] tracking-tight text-balance">
          {['MAHESA', 'RAHDINTYO'].map((word, i) => (
            <span key={word} className="block overflow-hidden">
              <motion.span
                initial={{ y: '100%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 0.8, delay: 0.15 + i * 0.1, ease: [0.65, 0, 0.35, 1] }}
                className="block"
              >
                {word}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground md:text-lg"
        >
          {isKuro
            ? 'Some interfaces are designed to be used. Others are designed to be remembered.'
            : 'I turn ideas into digital experiences with code, motion and a little chaos.'}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-4 flex items-center gap-4 font-accent text-xs uppercase tracking-[0.25em] text-muted-foreground"
        >
          <span>INDONESIA</span>
          <span aria-hidden="true" className="h-px w-8 bg-border" />
          <span>2026</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <MagneticButton
            as="a"
            href="#works"
            className="group relative inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-accent text-xs uppercase tracking-[0.2em] text-primary-foreground transition-colors"
          >
            EXPLORE MY WORK
          </MagneticButton>
          <MagneticButton
            as="button"
            onClick={toggleWorld}
            className="group relative inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 font-accent text-xs uppercase tracking-[0.2em] text-foreground transition-colors hover:border-foreground/60"
          >
            {isKuro ? 'RETURN TO LIGHT' : 'ENTER THE NIGHT'}
          </MagneticButton>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-10 left-6 hidden items-center gap-3 font-accent text-[10px] uppercase tracking-[0.25em] text-muted-foreground md:flex md:left-12"
      >
        <span className="block h-8 w-px animate-pulse bg-muted-foreground" />
        SCROLL
      </motion.div>
    </section>
  )
}
