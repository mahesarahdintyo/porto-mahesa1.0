'use client'

import { useWorld } from '@/components/theme/theme-provider'

export function GrainOverlay() {
  const { world } = useWorld()

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[3] world-transition"
      style={{
        opacity: world === 'kuro' ? 0.12 : 0.08,
        mixBlendMode: 'overlay',
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        backgroundSize: '120px 120px',
      }}
    />
  )
}
