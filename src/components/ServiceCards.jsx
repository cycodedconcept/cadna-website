import { StaggerContainer, StaggerItem } from './animations/Reveal';
import { useMotionPreferences } from './animations/MotionProvider';
import { solutions } from '../data/growth';
import { ResponsiveImage } from './ResponsiveImage';
import styles from './ServiceCards.module.css';

export function SolutionCard({ solution }) {
  const { enabled, compact } = useMotionPreferences();
  const { key } = solution;
  return <StaggerItem as="link" direction="side" duration={key === 'financial' ? 0.85 : 0.65}
    whileHover={enabled && !compact ? { y: -5 } : undefined}
    className={`${styles.card} ${styles[key]}`} to={solution.to}>
    <div className={styles.visual}>
      <ResponsiveImage image={solution.image} sizes="(max-width: 640px) 100vw, 50vw" />
      <span className={styles.number}>{solution.number} / GROWTH SOLUTION</span>
    </div>
    <div className={styles.copy}>
      <div className={styles.heading}><span className={styles.icon}><img src={solution.icon} alt="" width="48" height="48" loading="lazy" decoding="async" /></span><h3>{solution.title}</h3></div>
      <p>{solution.description}</p>
      <ul className={styles.features}>{solution.features.map(feature => <li key={feature}>{feature}</li>)}</ul>
      <span className={styles.explore}>Explore solution <span aria-hidden="true">↗</span></span>
    </div>
  </StaggerItem>;
}

export function ServiceCards() {
  return (
    <StaggerContainer className={styles.grid} stagger={0.12}>
      {solutions.map(solution => <SolutionCard solution={solution} key={solution.key} />)}
    </StaggerContainer>
  );
}
