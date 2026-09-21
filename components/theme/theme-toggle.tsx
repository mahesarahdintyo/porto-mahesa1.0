'use client'

import { Moon, Sun } from 'lucide-react'
import { useWorld } from '@/components/theme/theme-provider'

export function ThemeToggle({ compact = false }: { compact?: boolean }) {
  const { world, toggleWorld } = useWorld()
  const isKuro = world === 'kuro'

  return (
    <button
      type="button"
      onClick={toggleWorld}
      aria-pressed={isKuro}
      aria-label={isKuro ? 'Switch to Sakura (light) world' : 'Switch to Kuro (dark) world'}
      className={`group flex shrink-0 items-center gap-2 rounded-full border border-border/60 bg-background/40 backdrop-blur-md transition-transform duration-300 hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring ${
        compact ? 'p-2' : 'px-3 py-1.5'
      }`}
    >
      <span
        className="flex h-5 w-5 items-center justify-center transition-transform duration-500 group-hover:rotate-45"
        aria-hidden="true"
      >
        {isKuro ? <Moon className="h-3.5 w-3.5" /> : <Sun className="h-3.5 w-3.5" />}
      </span>
      {!compact && (
        <span className="font-accent text-[11px] uppercase tracking-[0.2em]">
          {isKuro ? 'KURO' : 'SAKURA'}
        </span>
      )}
    </button>
  )
}
