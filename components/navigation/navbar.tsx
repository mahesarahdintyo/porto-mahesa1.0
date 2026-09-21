'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ThemeToggle } from '@/components/theme/theme-toggle'

const NAV_ITEMS = [
  { label: 'HOME', target: '#home' },
  { label: 'ABOUT', target: '#about' },
  { label: 'WORKS', target: '#works' },
  { label: 'EXPERIENCE', target: '#experience' },
  { label: 'CONTACT', target: '#contact' },
]

export function Navbar() {
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const lastY = useRef(0)

  useEffect(() => {
    function handleScroll() {
      const y = window.scrollY
      setScrolled(y > 40)
      if (y > lastY.current && y > 160) {
        setHidden(true)
      } else {
        setHidden(false)
      }
      lastY.current = y
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      {/* Desktop / top nav */}
      <motion.header
        animate={{ y: hidden ? -100 : 0, opacity: hidden ? 0 : 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="fixed inset-x-0 top-4 z-50 hidden justify-center px-4 md:flex"
      >
        <nav
          className={`flex items-center gap-6 rounded-full border border-border/50 px-5 py-2.5 backdrop-blur-md transition-colors duration-500 world-transition ${
            scrolled ? 'bg-background/70' : 'bg-background/20'
          }`}
          aria-label="Primary navigation"
        >
          <a
            href="#home"
            data-logo
            className="font-display text-sm tracking-[0.15em] pr-3 border-r border-border/50"
          >
            KUROHANA
          </a>
          <ul className="flex items-center gap-5">
            {NAV_ITEMS.map((item) => (
              <li key={item.label}>
                <a
                  href={item.target}
                  className="font-accent text-[11px] uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="pl-2 border-l border-border/50">
            <ThemeToggle />
          </div>
        </nav>
      </motion.header>

      {/* Mobile / bottom nav */}
      <AnimatePresence>
        <motion.nav
          animate={{ y: hidden ? 100 : 0, opacity: hidden ? 0 : 1 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="fixed inset-x-0 bottom-4 z-50 flex justify-center px-4 md:hidden"
          aria-label="Primary navigation"
        >
          <div className="flex max-w-[94vw] items-center gap-0.5 overflow-x-auto rounded-full border border-border/50 bg-background/80 px-1.5 py-2 backdrop-blur-md">
            {NAV_ITEMS.filter((item) => item.label !== 'HOME').map((item) => (
              <a
                key={item.label}
                href={item.target}
                className="shrink-0 rounded-full px-2.5 py-1.5 font-accent text-[10px] uppercase tracking-[0.1em] text-muted-foreground transition-colors hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                {item.label}
              </a>
            ))}
            <ThemeToggle compact />
          </div>
        </motion.nav>
      </AnimatePresence>
    </>
  )
}
