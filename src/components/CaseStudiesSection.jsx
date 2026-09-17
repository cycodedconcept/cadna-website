import { Link } from 'react-router-dom';
import { StaggerContainer } from './animations/Reveal';
import { SectionHeading } from './SectionHeading';
import { CaseStudyCard } from './GrowthCards';
import { caseStudies } from '../data/growth';
import styles from './Growth.module.css';

export function CaseStudiesSection() {
  const published = caseStudies.filter(study => !study.placeholder);
  // If no approved story is available, the existing template stays visibly marked.
  const visible = published.length ? published : caseStudies.slice(0, 1);
  return <section className={styles.section} id="case-studies" aria-labelledby="cases-heading">
    <SectionHeading eyebrow="GROWTH IN PRACTICE" title="See what connected support can change." id="cases-heading">How CADNA connected technology, capital and training to support Ekodrop Logistics.</SectionHeading>
    <StaggerContainer className={visible.length === 1 ? styles.featuredCase : styles.cardGrid}>{visible.map(study => <CaseStudyCard study={study} key={study.slug} featured={visible.length === 1} />)}</StaggerContainer>
    <p className={styles.caseFollowup}>Working through a similar challenge? <Link to="/contact">Talk through your priorities with CADNA <span aria-hidden="true">↗</span></Link></p>
  </section>;
}
