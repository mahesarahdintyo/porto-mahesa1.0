import { WorldBackground } from '@/components/background/world-background'
import { Navbar } from '@/components/navigation/navbar'
import { CustomCursor } from '@/components/ui/custom-cursor'
import { Hero } from '@/components/hero/hero'
import { About } from '@/components/about/about'
import { Works } from '@/components/works/works'
import { Experience } from '@/components/experience/experience'
import { SkillsMarquee } from '@/components/skills/skills-marquee'
import { Contact } from '@/components/contact/contact'
import { Footer } from '@/components/footer'
import { EasterEggManager } from '@/components/easter-egg-manager'

export default function Page() {
  return (
    <>
      <WorldBackground />
      <CustomCursor />
      <EasterEggManager />
      <Navbar />
      <main className="relative">
        <Hero />
        <About />
        <Works />
        <SkillsMarquee />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
