import { FadeIn, StaggerContainer, StaggerItem, MotionLink } from './animations/Reveal';
import { ImageReveal } from './animations/ImageReveal';
import { ParallaxImage } from './animations/ParallaxImage';
import { CtaReveal } from './animations/CtaReveal';
import { useMotionPreferences } from './animations/MotionProvider';
import { divisions } from '../data/divisions';
import { SiteNav } from './SiteNav';
import { SiteFooter } from './SiteFooter';
import { ResponsiveImage } from './ResponsiveImage';
import { ProductCard } from './ProductCard';
import { SectionHeading } from './SectionHeading';
import { products, growthRequest } from '../data/growth';
import growthStyles from './Growth.module.css';
import styles from './DivisionPage.module.css';

export function DivisionPage({ which = 'business' }) {
  const division = divisions[which] || divisions.business;
  const { enabled, compact } = useMotionPreferences();
  const start = which === 'business' ? 0.25 : 0.1;
  const direction = which === 'financial' ? 'fade' : 'up';
  return (
    <div>
      <SiteNav active={which === 'financial' ? 'capital' : which === 'technology' ? 'technology' : 'services'} />
      <main id="main-content" className={`${styles[which]} ${enabled && !compact ? styles.motionEnabled : ''}`}>
        <section className={styles.hero}>
          <div className={styles.copy}>
            <FadeIn as="span" appear direction="fade" delay={start}>{division.eyebrow}</FadeIn>
            <FadeIn as="h1" appear delay={start + 0.08} direction={direction}>{division.intro}</FadeIn>
            <FadeIn as="p" appear delay={start + 0.2} direction={direction}>{division.description}</FadeIn>
            <FadeIn appear delay={start + 0.32} className={styles.actions}>
              <MotionLink className={styles.primary} to={growthRequest(division.name, { business: 'Business', financial: 'Financial', education: 'Education', technology: 'Technology' }[which])}>Start a Growth Conversation <span aria-hidden="true">→</span></MotionLink>
              <MotionLink className={styles.secondary} to="/contact">Book a diagnostic</MotionLink>
            </FadeIn>
          </div>
          <ImageReveal appear delay={which === 'business' ? 0 : 0.18} direction={which === 'business' ? 'side' : 'up'} duration={which === 'financial' ? 1 : 0.8} className={styles.visual}>
            {which === 'business'
              ? <ParallaxImage image={division.image} priority sizes="(max-width: 850px) 100vw, 50vw" />
              : <ResponsiveImage image={division.heroImage || division.image} priority sizes="(max-width: 850px) 100vw, 50vw" />}
            <figcaption>
              <img src={division.icon} alt="" width="44" height="44" decoding="async" />
              <span>{division.focus}</span>
            </figcaption>
          </ImageReveal>
        </section>
        <FadeIn as="section" className={styles.band}>
          <p>ONE REQUEST. ONE ACCOUNTABLE OWNER.</p>
          <h2>Services built around your outcome.</h2>
        </FadeIn>
        <StaggerContainer as="section" className={styles.grid} stagger={which === 'education' ? 0.14 : 0.09}>
          {division.modules.map((module, index) => (
            <StaggerItem as="article" key={module} direction={direction} duration={which === 'financial' ? 0.85 : 0.65}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h3>{module}</h3>
              <p>{division.moduleDescriptions[index]}</p>
              <MotionLink to="/request">Start with a request →</MotionLink>
            </StaggerItem>
          ))}
        </StaggerContainer>
        {which === 'technology' && <section className={`${growthStyles.section} ${growthStyles.surface}`} id="portfolio">
          <SectionHeading eyebrow="TECHNOLOGY PORTFOLIO" title="Digital solutions for business growth.">Explore CADNA’s technology solutions across assessment, funding, logistics and commerce.</SectionHeading>
          <StaggerContainer className={growthStyles.grid2}>{products.map(product => <ProductCard key={product.slug} product={product} />)}</StaggerContainer>
        </section>}
        <CtaReveal className={styles.cta}>
          <FadeIn as="h2">Tell us what needs to move.</FadeIn>
          <FadeIn as="p" delay={0.1}>A concierge will reach out within 2–6 hours and provide your solution plan within 24–48 hours.</FadeIn>
          <MotionLink className={styles.primary} to="/request">Make a Request <span aria-hidden="true">→</span></MotionLink>
        </CtaReveal>
      </main>
      <SiteFooter />
    </div>
  );
}
