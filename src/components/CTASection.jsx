import { CtaReveal } from './animations/CtaReveal';
import { FadeIn, MotionLink } from './animations/Reveal';
import styles from './Growth.module.css';

export function CTASection() {
  return <CtaReveal className={styles.finalCta}>
    <FadeIn><span className={styles.eyebrow}>YOUR NEXT CHAPTER STARTS HERE</span><h2>Ready to move your business forward?</h2><p>Whether you are building, scaling or transforming, CADNA provides the strategy, connections and execution support required for growth.</p></FadeIn>
    <FadeIn delay={0.1} className={styles.ctaActions}><MotionLink className={styles.primaryButton} to="/request">Start a Growth Conversation <span aria-hidden="true">↗</span></MotionLink><MotionLink className={styles.secondaryButton} to="/#solutions">Explore Solutions <span aria-hidden="true">→</span></MotionLink></FadeIn>
  </CtaReveal>;
}
