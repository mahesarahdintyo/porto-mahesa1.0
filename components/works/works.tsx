import { ProjectCard, type Project } from '@/components/works/project-card'
import { SectionReveal } from '@/components/ui/section-reveal'

const PROJECTS: Project[] = [
  {
    id: 'project_01',
    title: 'PROJECT ZERO',
    category: 'WEB EXPERIENCE',
    year: '2026',
    description: 'Interactive digital experience with immersive motion.',
    image: '/images/projects/project-01.png',
  },
  {
    id: 'project_02',
    title: 'NIGHT SIGNAL',
    category: 'UI / DEVELOPMENT',
    year: '2026',
    description: 'Dark interface concept built around visual tension.',
    image: '/images/projects/project-02.png',
  },
  {
    id: 'project_03',
    title: 'HANA SYSTEM',
    category: 'FULL STACK',
    year: '2025',
    description: 'A practical digital product with Japanese-inspired visual identity.',
    image: '/images/projects/project-03.png',
  },
  {
    id: 'project_04',
    title: 'AFTER MIDNIGHT',
    category: 'EXPERIMENTAL',
    year: '2025',
    description: 'Experimental motion and interactive particle experiment.',
    image: '/images/projects/project-04.png',
  },
]

export function Works() {
  return (
    <section id="works" className="relative w-full px-6 py-28 md:px-12 md:py-40">
      <div className="mx-auto max-w-6xl">
        <SectionReveal as="clip">
          <div className="mb-16 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="font-accent mb-4 text-xs uppercase tracking-[0.3em] text-muted-foreground">
                02 / WORKS
              </p>
              <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-medium leading-tight">
                SELECTED WORKS
              </h2>
            </div>
            <p className="max-w-xs text-sm text-muted-foreground">
              A handful of experiments and products where craft and atmosphere meet.
            </p>
          </div>
        </SectionReveal>

        <div className="grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-2">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
