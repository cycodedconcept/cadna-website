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
import { AudienceCard, IndustryCard, CaseStudyCard, LeadershipCard, InsightCard } from '../components/GrowthCards';
import { CTASection } from '../components/CTASection';
import { products, audiences, industries, caseStudies, leadership, insights } from '../data/growth';
import styles from '../components/Growth.module.css';

export function HomePage({ revealAnimations = true }) {
  return <MotionScope enabled={revealAnimations}>
    <SiteNav active="home" />
    <main id="main-content">
      <Hero />
      <StatsStrip />
      <section className={`${styles.section} ${styles.surface}`} id="ecosystem" aria-labelledby="ecosystem-heading">
        <SectionHeading eyebrow="THE CADNA GROWTH ECOSYSTEM" title="One Platform. Multiple Growth Engines." id="ecosystem-heading">Businesses rarely fail because they lack ambition. They struggle because strategy, capital, talent and technology are disconnected. CADNA brings these critical growth pillars together into one coordinated ecosystem.</SectionHeading>
        <EcosystemDiagram />
      </section>
      <section className={styles.section} id="solutions" aria-labelledby="solutions-heading">
        <SectionHeading eyebrow="CONCIERGE SOLUTIONS" title="Four concierge teams. One trusted operating partner." id="solutions-heading">Access strategy, capital, talent and technology through one integrated growth ecosystem.</SectionHeading>
        <ServiceCards />
      </section>
      <section className={`${styles.section} ${styles.surface}`} id="concierge" aria-labelledby="concierge-heading">
        <SectionHeading eyebrow="THE BUSINESS CONCIERGE DIFFERENCE" title="One Trusted Partner Instead Of Multiple Disconnected Providers" id="concierge-heading">CADNA connects strategy, capital, talent, technology, partnerships and execution around your business.</SectionHeading>
        <ConciergeComparison />
      </section>
      <section className={styles.section} id="how" aria-labelledby="process-heading">
        <SectionHeading eyebrow="HOW CADNA WORKS" title="From Challenge To Growth" id="process-heading">Five connected stages, from understanding your business to building systems for sustainable growth.</SectionHeading>
        <ProcessFlow />
      </section>
      <GrowthShowcase />
      <section className={`${styles.section} ${styles.surface}`} id="technology" aria-labelledby="technology-heading">
        <SectionHeading eyebrow="TECHNOLOGY PORTFOLIO" title="Digital solutions for business growth." id="technology-heading" aside={<Link className={styles.textLink} to="/concierge/technology">Technology Concierge <span aria-hidden="true">↗</span></Link>}>Explore CADNA’s technology solutions across assessment, funding, logistics and commerce.</SectionHeading>
        <StaggerContainer className={styles.grid2}>{products.map(product => <ProductCard product={product} key={product.slug} />)}</StaggerContainer>
      </section>
      <section className={styles.section} id="who-we-help" aria-labelledby="audience-heading">
        <SectionHeading eyebrow="WHO WE WORK WITH" title="Different ambitions. One growth partner." id="audience-heading">From a founder’s first step to an institution’s next initiative, our starting point is your ambition.</SectionHeading>
        <StaggerContainer className={styles.grid3}>{audiences.map(audience => <AudienceCard audience={audience} key={audience.title} />)}</StaggerContainer>
      </section>
      <section className={`${styles.section} ${styles.surface}`} id="industries" aria-labelledby="industries-heading">
        <SectionHeading eyebrow="CROSS-SECTOR PERSPECTIVE" title="Connected expertise for a diverse economy." id="industries-heading">Every sector has its own realities. Start a conversation about the context your business operates in.</SectionHeading>
        <StaggerContainer className={styles.grid3}>{industries.map(industry => <IndustryCard industry={industry} key={industry.title} />)}</StaggerContainer>
      </section>
      <section className={styles.section} id="case-studies" aria-labelledby="cases-heading">
        <SectionHeading eyebrow="GROWTH IN PRACTICE" title="From a business challenge to a connected solution." id="cases-heading">A closer look at the work, the role CADNA plays, and the outcomes.</SectionHeading>
        <StaggerContainer className={styles.grid2}>{caseStudies.map(study => <CaseStudyCard study={study} key={study.slug} />)}</StaggerContainer>
      </section>
      <section className={`${styles.section} ${styles.surface}`} id="leadership" aria-labelledby="leadership-heading">
        <SectionHeading eyebrow="THE PEOPLE BEHIND THE PARTNERSHIP" title="Leadership with execution at its core." id="leadership-heading" aside={<Link className={styles.textLink} to="/about">Our story <span aria-hidden="true">↗</span></Link>}>Business transformation, operational depth and international perspective, connected around your goals.</SectionHeading>
        <StaggerContainer className={styles.grid3}>{leadership.map(person => <LeadershipCard person={person} key={person.name} />)}</StaggerContainer>
      </section>
      <section className={styles.section} id="insights" aria-labelledby="insights-heading">
        <SectionHeading eyebrow="PERSPECTIVES FOR YOUR NEXT MOVE" title="Ideas for building what comes next." id="insights-heading">Explore draft perspectives on business structure, practical technology and team capability.</SectionHeading>
        <StaggerContainer className={styles.grid3}>{insights.map(article => <InsightCard article={article} key={article.slug} />)}</StaggerContainer>
      </section>
      <CTASection />
    </main>
    <SiteFooter />
  </MotionScope>;
}
