import { FadeIn, StaggerContainer, MotionLink } from '../components/animations/Reveal';
import { ImageReveal } from '../components/animations/ImageReveal';
import { LineReveal } from '../components/animations/LineReveal';
import { SiteNav } from '../components/SiteNav';
import { SiteFooter } from '../components/SiteFooter';
import { images } from '../data/images';
import { ResponsiveImage } from '../components/ResponsiveImage';
import { ServiceCards } from '../components/ServiceCards';
import { StatsStrip } from '../components/StatsStrip';
import { SectionHeading } from '../components/SectionHeading';
import { LeadershipCard } from '../components/GrowthCards';
import { CTASection } from '../components/CTASection';
import { leadership } from '../data/growth';
import growthStyles from '../components/Growth.module.css';
import styles from './ContentPage.module.css';
import aboutStyles from './AboutPage.module.css';

export function AboutPage() {
  return (
    <div>
      <SiteNav active="about" />
      <main id="main-content">
        <section className={`${styles.hero} ${styles.aboutHero}`}>
          <div className={styles.aboutHeroCopy}>
            <FadeIn as="span" appear direction="fade">OUR STORY</FadeIn>
            <FadeIn as="h1" appear delay={0.12}>One connected partner for African business growth.</FadeIn>
            <LineReveal>
              CADNA Global Synergy Limited was built around a simple observation: growing
              businesses lose more time coordinating consultants, banks, vendors and trainers
              than they do executing. So we collapsed all of it into one door.
            </LineReveal>
            <MotionLink className={styles.primary} to="/contact">
              Book a diagnostic →
            </MotionLink>
          </div>
          <ImageReveal appear delay={0.18} className={`${styles.aboutHeroVisual} ${aboutStyles.visibleImage}`}>
            <ResponsiveImage image={images.boardroom} priority sizes="(max-width: 800px) 100vw, 50vw" />
            <figcaption>One team, connected around your business.</figcaption>
          </ImageReveal>
        </section>

        <StatsStrip />

        <section className={styles.split}>
          <div>
            <FadeIn as="h2">Why we exist</FadeIn>
            <LineReveal>
              A business owner in Lagos looking to expand needs a lawyer, a strategist, a bank,
              a developer and a trainer. Five relationships, five briefings, five invoices — and
              nobody accountable for the whole outcome.
            </LineReveal>
            <LineReveal>
              CADNA operates as a concierge. You submit one request. We diagnose it, route it to
              the right division, assign an owner, and stay accountable through delivery.
            </LineReveal>
          </div>
          <FadeIn className={styles.panel}>
            One request.
            <br />
            One owner.
            <br />
            <em>Complete delivery.</em>
          </FadeIn>
        </section>

        <section className={styles.section}>
          <span>HOW WE'RE BUILT</span>
          <FadeIn as="h2">Four divisions, one accountable owner per request.</FadeIn>
          <ServiceCards />
        </section>
        <section className={`${growthStyles.section} ${growthStyles.surface}`} id="leadership">
          <SectionHeading eyebrow="LEADERSHIP" title="The people behind your next chapter.">A team connecting business transformation, operations and international opportunity.</SectionHeading>
          <StaggerContainer className={growthStyles.grid3}>{leadership.map(person => <LeadershipCard key={person.name} person={person} />)}</StaggerContainer>
        </section>
        <CTASection />
      </main>
      <SiteFooter />
    </div>
  );
}
