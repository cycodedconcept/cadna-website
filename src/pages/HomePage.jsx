import { Link } from 'react-router-dom';
import { SiteNav } from '../components/SiteNav';
import { SiteFooter } from '../components/SiteFooter';
import { MotionScope } from '../components/animations/MotionProvider';
import { StaggerContainer } from '../components/animations/Reveal';
import { Hero } from '../components/Hero';
import { StatsStrip } from '../components/StatsStrip';
import { SectionHeading } from '../components/SectionHeading';
import { EcosystemDiagram } from '../components/EcosystemDiagram';
import { ServiceCards } from '../components/ServiceCards';
import { ConciergeComparison } from '../components/ConciergeComparison';
import { ProcessFlow } from '../components/ProcessFlow';
import { GrowthShowcase } from '../components/GrowthShowcase';
import { ProductCard } from '../components/ProductCard';
import { AudienceCard, InsightCard } from '../components/GrowthCards';
import { LeadershipSection } from '../components/LeadershipSection';
import { IndustryExplorer } from '../components/IndustryExplorer';
import { TrustedBy } from '../components/TrustedBy';
import { WhyCadna } from '../components/WhyCadna';
import { CaseStudiesSection } from '../components/CaseStudiesSection';
import { ResponsiveImage } from '../components/ResponsiveImage';
import { images } from '../data/images';
import { CTASection } from '../components/CTASection';
import { products, audiences, insights } from '../data/growth';
import styles from '../components/Growth.module.css';

export function HomePage({ revealAnimations = true }) {
  return <MotionScope enabled={revealAnimations}>
    <SiteNav active="home" />
    <main id="main-content" tabIndex={-1}>
      <Hero />
      <StatsStrip />
      <TrustedBy />
      <section className={`${styles.section} ${styles.surface}`} id="ecosystem" aria-labelledby="ecosystem-heading">
        <SectionHeading eyebrow="THE CHALLENGE WE HELP SOLVE" title="Growth gets harder when the support is disconnected." id="ecosystem-heading">A strategy without execution. A funding need without preparation. Technology without the right skills. CADNA brings these priorities together so each part of your business can move in the same direction.</SectionHeading>
        <EcosystemDiagram />
      </section>
      <section className={styles.section} id="solutions" aria-labelledby="solutions-heading">
        <SectionHeading eyebrow="OUR SERVICES" title="The support your next stage needs." id="solutions-heading">Choose a starting point. Our four concierge teams connect business strategy, funding readiness, people and digital operations around your goals.</SectionHeading>
        <ServiceCards />
      </section>
      <WhyCadna />
      <section className={`${styles.section} ${styles.surface}`} id="concierge" aria-labelledby="concierge-heading">
        <SectionHeading eyebrow="THE BUSINESS CONCIERGE DIFFERENCE" title="One Trusted Partner Instead Of Multiple Disconnected Providers" id="concierge-heading">CADNA connects strategy, capital, talent, technology, partnerships and execution around your business.</SectionHeading>
        <ConciergeComparison />
      </section>
      <section className={styles.section} id="how" aria-labelledby="process-heading">
        <SectionHeading eyebrow="HOW CADNA WORKS" title="A clear path from the first conversation." id="process-heading">Start with your business challenge. We agree on priorities, scope and a delivery roadmap before the work begins, then coordinate support through each stage.</SectionHeading>
        <ProcessFlow />
      </section>
      <GrowthShowcase />
      <section className={`${styles.section} ${styles.surface}`} id="technology" aria-labelledby="technology-heading">
        <SectionHeading eyebrow="TECHNOLOGY PORTFOLIO" title="Digital solutions for business growth." id="technology-heading" aside={<Link className={styles.textLink} to="/concierge/technology">Technology Concierge <span aria-hidden="true">↗</span></Link>}>Explore CADNA’s technology solutions across assessment, funding, logistics and commerce.</SectionHeading>
        <StaggerContainer className={styles.cardGrid}>{products.map(product => <ProductCard product={product} key={product.slug} />)}</StaggerContainer>
      </section>
      <section className={styles.section} id="who-we-help" aria-labelledby="audience-heading">
        <div className={styles.featureHeading}><SectionHeading eyebrow="WHO WE WORK WITH" title="Different ambitions. One growth partner." id="audience-heading">From a founder’s first step to an institution’s next initiative, our starting point is your ambition. Explore the priorities that matter to you.</SectionHeading><ResponsiveImage image={images.founderStory} sizes="(max-width: 850px) 100vw, 33vw" /></div>
        <StaggerContainer className={styles.cardGrid}>{audiences.map((audience, index) => <AudienceCard audience={audience} index={index} key={audience.title} />)}</StaggerContainer>
      </section>
      <section className={`${styles.section} ${styles.surface}`} id="industries" aria-labelledby="industries-heading">
        <SectionHeading eyebrow="CROSS-SECTOR PERSPECTIVE" title="Connected expertise for a diverse economy." id="industries-heading">Every sector has its own realities. Find your industry and explore how connected support can move your business forward.</SectionHeading>
        <IndustryExplorer />
      </section>
      <CaseStudiesSection />
      <section className={`${styles.section} ${styles.surface}`} id="leadership" aria-labelledby="leadership-heading">
        <SectionHeading eyebrow="THE PEOPLE BEHIND THE PARTNERSHIP" title="Leadership with execution at its core." id="leadership-heading" aside={<Link className={styles.textLink} to="/about">Our story <span aria-hidden="true">↗</span></Link>}>Business transformation, operational depth and international perspective, connected around your goals.</SectionHeading>
        <LeadershipSection />
      </section>
      <section className={styles.section} id="insights" aria-labelledby="insights-heading">
        <SectionHeading eyebrow="INSIGHTS · EDITORIAL PREVIEWS" title="Ideas for building what comes next." id="insights-heading">Explore perspectives on business structure, technology and team capability. These are editorial previews awaiting publication.</SectionHeading>
        <StaggerContainer className={styles.cardGrid}>{insights.map(article => <InsightCard article={article} key={article.slug} />)}</StaggerContainer>
      </section>
      <section className={`${styles.section} ${styles.surface}`} aria-labelledby="subscription-heading">
        <SectionHeading eyebrow="CADNA BUSINESS GROWTH SUBSCRIPTIONS" title="A plan for your next stage." id="subscription-heading" aside={<Link className={styles.textLink} to="/packages#subscriptions">Compare annual plans <span aria-hidden="true">↗</span></Link>}>LITE to understand. BASIC to structure. PRO to accelerate. ENTERPRISE to transform. Explore the full offerings and find the right level of ongoing support.</SectionHeading>
      </section>
      <CTASection />
    </main>
    <SiteFooter />
  </MotionScope>;
}
