'use client'

import { useState } from 'react'

const SKILLS = [
  'HTML',
  'CSS',
  'JAVASCRIPT',
  'TYPESCRIPT',
  'REACT',
  'NEXT.JS',
  'NODE.JS',
  'GIT',
  'UI/UX',
  'MOTION DESIGN',
  'CREATIVE CODING',
]

export function SkillsMarquee() {
  const [paused, setPaused] = useState(false)

  return (
    <section
      aria-label="Tools of the craft"
      className="relative w-full overflow-hidden border-y border-border/50 py-10"
    >
      <p className="font-accent mb-6 px-6 text-xs uppercase tracking-[0.3em] text-muted-foreground md:px-12">
        TOOLS OF THE CRAFT
      </p>
      <div
        className="flex w-max gap-10"
        style={{
          animation: paused ? undefined : 'marquee 32s linear infinite',
        }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {[...SKILLS, ...SKILLS, ...SKILLS].map((skill, i) => (
          <span
            key={`${skill}-${i}`}
            data-magnetic
            className="font-display shrink-0 cursor-default text-3xl text-foreground/40 transition-all duration-300 hover:scale-110 hover:text-foreground md:text-5xl"
          >
            {skill}
          </span>
        ))}
      </div>
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-33.3333%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track { animation: none !important; }
        }
      `}</style>
    </section>
  )
}
