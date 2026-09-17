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
import { Icon } from './Icon';
import { products } from '../data/growth';
import { debtOptions, requestLink } from '../data/requests';
import growthStyles from './Growth.module.css';
import styles from './DivisionPage.module.css';
import cardStyles from './ConciergeCard.module.css';

const moduleIcons = {
  business: ['layers', 'compass', 'institution', 'growth'],
  education: ['book', 'people', 'spark', 'network'],
  financial: ['capital', 'growth', 'building', 'layers'],
  technology: ['network', 'technology', 'spark', 'layers'],
};

export function DivisionPage({ which = 'business' }) {
  const division = divisions[which] || divisions.business;
  const { enabled, compact } = useMotionPreferences();
  const start = which === 'business' ? 0.25 : 0.1;
  const direction = which === 'financial' ? 'fade' : 'up';
  const category = { business: 'Business', financial: 'Financial', education: 'Education', technology: 'Technology' }[which];
  return (
    <div>
      <SiteNav active={which === 'financial' ? 'capital' : which === 'technology' ? 'technology' : 'services'} />
      <main id="main-content" tabIndex={-1} className={`${styles[which]} ${enabled && !compact ? styles.motionEnabled : ''}`}>
        <section className={styles.hero}>
          <div className={styles.copy}>
            <FadeIn as="span" appear direction="fade" delay={start}>{division.eyebrow}</FadeIn>
            <FadeIn as="h1" appear delay={start + 0.08} direction={direction}>{division.intro}</FadeIn>
            <FadeIn as="p" appear delay={start + 0.2} direction={direction}>{division.description}</FadeIn>
            <FadeIn appear delay={start + 0.32} className={styles.actions}>
              <MotionLink className={styles.primary} to={requestLink({ mode: which === 'financial' ? 'diagnostic' : 'quote', category })}>{which === 'financial' ? 'Book a Diagnostic' : 'Get Quote'} <span aria-hidden="true">→</span></MotionLink>
              <MotionLink className={styles.secondary} to={requestLink({ mode: 'request', category })}>Make a Request</MotionLink>
              <MotionLink className={styles.serviceRequest} to={requestLink({ mode: 'one-time', category })}>One-Time Service Request <span aria-hidden="true">↗</span></MotionLink>
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
        <StaggerContainer as="section" className={styles.grid} aria-label={`${category} concierge services`} stagger={which === 'education' ? 0.14 : 0.09}>
          {division.modules.map((module, index) => (
            <StaggerItem as="article" className={cardStyles.card} key={module} direction={direction} duration={which === 'financial' ? 0.85 : 0.65}>
              <div className={cardStyles.header} aria-hidden="true">
                <span className={cardStyles.icon}><Icon name={(moduleIcons[which] || moduleIcons.business)[index]} size={30} /></span>
                <span className={cardStyles.number}>{String(index + 1).padStart(2, '0')}</span>
              </div>
              <h3>{module}</h3>
              <p>{division.moduleDescriptions[index]}</p>
              {which === 'financial' && module === 'Debt Financing' && <details className={styles.debtOptions}><summary>Explore debt financing options</summary><ul>{debtOptions.map(service => <li key={service}><MotionLink to={requestLink({ mode: 'quote', category, service })}>{service} <span aria-hidden="true">↗</span></MotionLink></li>)}</ul></details>}
              <MotionLink className={cardStyles.link} to={requestLink({ mode: 'quote', category, service: module })}><span>Get Quote <span className="srOnly">for {module}</span></span><span className={cardStyles.arrow} aria-hidden="true"><Icon name="arrow" size={20} /></span></MotionLink>
            </StaggerItem>
          ))}
        </StaggerContainer>
        {which === 'technology' && <section className={`${growthStyles.section} ${growthStyles.surface}`} id="portfolio">
          <SectionHeading eyebrow="TECHNOLOGY PORTFOLIO" title="Digital solutions for business growth.">Explore CADNA’s technology solutions across assessment, funding, logistics and commerce.</SectionHeading>
          <StaggerContainer className={growthStyles.cardGrid}>{products.map(product => <ProductCard key={product.slug} product={product} />)}</StaggerContainer>
        </section>}
        <CtaReveal className={styles.cta}>
          <FadeIn as="h2">Tell us what needs to move.</FadeIn>
          <FadeIn as="p" delay={0.1}>Share your priorities. We’ll assess your requirements and prepare a tailored scope, timeline and quotation.</FadeIn>
          <MotionLink className={styles.primary} to={requestLink({ mode: 'quote', category })}>Get Quote <span aria-hidden="true">→</span></MotionLink>
        </CtaReveal>
      </main>
      <SiteFooter />
    </div>
  );
}
