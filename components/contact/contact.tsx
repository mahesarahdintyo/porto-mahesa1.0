'use client'

import { useWorld } from '@/components/theme/theme-provider'
import { MagneticButton } from '@/components/ui/magnetic-button'
import { SectionReveal } from '@/components/ui/section-reveal'

const SOCIAL_LINKS = [
  { label: 'GITHUB', url: '#' },
  { label: 'LINKEDIN', url: '#' },
  { label: 'INSTAGRAM', url: '#' },
]

export function Contact() {
  const { world } = useWorld()
  const isKuro = world === 'kuro'

  return (
    <section
      id="contact"
      className="relative flex min-h-[100svh] w-full flex-col items-start justify-center px-6 py-28 md:px-12"
    >
      <div className="mx-auto w-full max-w-6xl">
        <SectionReveal as="clip">
          <p className="font-accent mb-4 text-xs uppercase tracking-[0.3em] text-muted-foreground">
            04 / CONTACT
          </p>
          <h2 className="font-display max-w-3xl text-[clamp(2.25rem,7vw,5.5rem)] font-medium leading-[1.02] text-balance">
            {isKuro ? "LET'S CREATE SOMETHING UNFORGETTABLE." : "LET'S CREATE SOMETHING BEAUTIFUL."}
          </h2>
        </SectionReveal>

        <SectionReveal delay={0.2}>
          <p className="mt-6 text-base text-muted-foreground md:text-lg">
            Have an idea? Send a signal.
          </p>
        </SectionReveal>

        <SectionReveal delay={0.3} className="mt-10 flex flex-wrap items-center gap-6">
          <MagneticButton
            as="a"
            href="mailto:hello@kurohana.dev"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-4 font-accent text-xs uppercase tracking-[0.2em] text-primary-foreground"
          >
            SEND SIGNAL
          </MagneticButton>

          <ul className="flex items-center gap-6">
            {SOCIAL_LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.url}
                  className="font-accent text-xs uppercase tracking-[0.2em] text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </SectionReveal>

        <SectionReveal delay={0.45}>
          <p className="font-display mt-24 text-sm uppercase tracking-[0.3em] text-muted-foreground/70">
            SEE YOU ON THE OTHER SIDE.
          </p>
        </SectionReveal>
      </div>
    </section>
  )
}
