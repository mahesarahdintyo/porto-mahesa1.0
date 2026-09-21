import { SectionReveal } from '@/components/ui/section-reveal'

const ENTRIES = [
  {
    year: '2026',
    title: 'CURRENT CHAPTER',
    description: 'Building digital products and experimental interactive experiences.',
  },
  {
    year: '2025',
    title: 'NEW DIRECTION',
    description: 'Exploring the combination of development, design and motion.',
  },
  {
    year: '2024',
    title: 'THE BEGINNING',
    description: 'Started creating digital experiences and experimenting with web technologies.',
  },
]

export function Experience() {
  return (
    <section id="experience" className="relative w-full px-6 py-28 md:px-12 md:py-40">
      <div className="mx-auto max-w-6xl">
        <SectionReveal as="clip">
          <p className="font-accent mb-4 text-xs uppercase tracking-[0.3em] text-muted-foreground">
            03 / EXPERIENCE
          </p>
          <h2 className="font-display mb-16 text-[clamp(2rem,5vw,3.5rem)] font-medium leading-tight">
            THE JOURNEY
          </h2>
        </SectionReveal>

        <ol className="relative border-l border-border/60 pl-8 md:pl-12">
          {ENTRIES.map((entry, i) => (
            <SectionReveal key={entry.year} delay={i * 0.12} className="relative mb-14 last:mb-0">
              <span
                aria-hidden="true"
                className="absolute -left-[41px] top-1.5 h-2.5 w-2.5 rounded-full bg-primary md:-left-[57px]"
              />
              <div className="flex flex-col gap-2 md:flex-row md:items-baseline md:gap-8">
                <span className="font-accent text-sm tracking-[0.2em] text-primary">{entry.year}</span>
                <div>
                  <h3 className="font-display text-xl md:text-2xl">{entry.title}</h3>
                  <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
                    {entry.description}
                  </p>
                </div>
              </div>
            </SectionReveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
