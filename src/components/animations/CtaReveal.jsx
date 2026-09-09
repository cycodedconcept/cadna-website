import { motion } from 'framer-motion';
import { useMotionPreferences, viewport } from './MotionProvider';
import styles from './animations.module.css';

export function CtaReveal({ className = '', children, ...props }) {
  const { enabled, compact } = useMotionPreferences();
  return (
    <section className={`${className} ${styles.cta}`} {...props}>
      <motion.span aria-hidden="true" className={styles.ctaGlow}
        initial={{ opacity: enabled ? 0 : 1 }} animate={!enabled ? { opacity: 1 } : undefined} whileInView={{ opacity: 1 }} viewport={viewport}
        transition={{ duration: enabled ? (compact ? 0.4 : 0.9) : 0 }} />
      {children}
    </section>
  );
}
