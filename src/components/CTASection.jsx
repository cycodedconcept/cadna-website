import { CtaReveal } from './animations/CtaReveal';
import { FadeIn, MotionLink } from './animations/Reveal';
import styles from './Growth.module.css';

export function CTASection() {
  return <CtaReveal className={styles.finalCta}>
    <FadeIn><span className={styles.eyebrow}>YOUR NEXT STAGE STARTS WITH A CONVERSATION</span><h2>Ready to build your next stage of growth?</h2><p>Tell us where your business is today and where you want to go. We’ll help connect the strategy, people and execution support to move it forward.</p></FadeIn>
    <FadeIn delay={0.1} className={styles.ctaActions}><MotionLink className={styles.primaryButton} to="/contact">Start a Conversation <span aria-hidden="true">↗</span></MotionLink></FadeIn>
  </CtaReveal>;
}
