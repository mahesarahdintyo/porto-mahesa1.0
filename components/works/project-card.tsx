'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

export interface Project {
  id: string
  title: string
  category: string
  year: string
  description: string
  image: string
}

interface ProjectCardProps {
  project: Project
  index: number
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  function handleMouseMove(e: React.MouseEvent) {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    setTilt({ x: py * -6, y: px * 6 })
  }

  function handleMouseLeave() {
    setTilt({ x: 0, y: 0 })
  }

  const offset = index % 2 === 1 ? 'md:mt-16' : ''

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative ${offset}`}
    >
      <div
        ref={ref}
        data-magnetic
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative aspect-[4/3] w-full overflow-hidden border border-border/50"
        style={{
          transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: 'transform 0.3s ease-out',
        }}
      >
        <Image
          src={project.image || '/placeholder.svg'}
          alt={`${project.title} — ${project.category}`}
          fill
          sizes="(min-width: 768px) 45vw, 90vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />
      </div>

      <div className="mt-5 flex items-start justify-between gap-4">
        <div className="transition-transform duration-500 group-hover:translate-x-2">
          <h3 className="font-display text-xl md:text-2xl">{project.title}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{project.description}</p>
        </div>
        <div className="shrink-0 text-right font-accent text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
          <p>{project.category}</p>
          <p className="mt-1">{project.year}</p>
        </div>
      </div>
    </motion.article>
  )
}
