'use client'

import Image from 'next/image'
import { useWorld } from '@/components/theme/theme-provider'
import { SectionReveal } from '@/components/ui/section-reveal'

export function About() {
  const { world } = useWorld()
  const isKuro = world === 'kuro'

  return (
    <section id="about" className="relative w-full px-6 py-28 md:px-12 md:py-40">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-7 md:pr-8">
          <SectionReveal as="clip">
            <p className="font-accent mb-4 text-xs uppercase tracking-[0.3em] text-muted-foreground">
              01 / ABOUT
            </p>
            <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-medium leading-[1.15] text-balance">
              WHO IS BEHIND
              <br />
              THE NOISE?
            </h2>
          </SectionReveal>

          <SectionReveal delay={0.15}>
            <p className="mt-8 max-w-lg text-base leading-relaxed text-muted-foreground md:text-lg">
              A developer who enjoys combining technology, design, motion and atmosphere to create
              experiences that do not feel ordinary. Every project is treated as a small world of its
              own — one with rules, mood and a reason to exist beyond function.
            </p>
          </SectionReveal>

          <SectionReveal delay={0.3}>
            <div className="mt-12 border-t border-border pt-6">
              <p className="font-display text-lg italic text-foreground/80">
                &ldquo;静けさの中に、ノイズがある。&rdquo;
              </p>
              <p className="mt-2 font-accent text-xs uppercase tracking-[0.2em] text-muted-foreground">
                There is noise inside silence.
              </p>
            </div>
          </SectionReveal>
        </div>

        <div className="md:col-span-5">
          <SectionReveal delay={0.2} className="relative aspect-[4/5] w-full overflow-hidden">
            <Image
              src="/images/about-portrait.png"
              alt="Portrait of Mahesa Rahdintyo, backlit in a minimal interior"
              fill
              sizes="(min-width: 768px) 40vw, 90vw"
              className="object-cover transition-[filter] duration-1000"
              style={{
                filter: isKuro
                  ? 'grayscale(1) contrast(1.3) brightness(0.75) sepia(0.15) hue-rotate(-10deg)'
                  : 'sepia(0.18) contrast(1.05) saturate(1.05)',
              }}
            />
            <div
              aria-hidden="true"
              className="absolute inset-0"
              style={{
                background: isKuro
                  ? 'linear-gradient(180deg, rgba(126,16,36,0.18) 0%, rgba(0,0,0,0.35) 100%)'
                  : 'linear-gradient(180deg, rgba(244,238,228,0.05) 0%, rgba(41,36,32,0.12) 100%)',
                mixBlendMode: isKuro ? 'multiply' : 'normal',
              }}
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 border border-border/40"
            />
          </SectionReveal>
        </div>
      </div>
    </section>
  )
}
