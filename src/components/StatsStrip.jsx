import { useEffect, useRef } from 'react';
import { animate, motion, useInView, useMotionValue, useTransform } from 'framer-motion';
import { FadeIn, StaggerContainer, StaggerItem } from './animations/Reveal';
import { useMotionPreferences, ease } from './animations/MotionProvider';
import { stats } from '../data/growth';
import styles from './Growth.module.css';

function Counter({ stat }) {
  const ref = useRef(null);
  const visible = useInView(ref, { once: true, amount: 0.2 });
  const { enabled, compact } = useMotionPreferences();
  const value = useMotionValue(stat.value);
  const display = useTransform(value, current => `${stat.prefix || ''}${Math.round(current)}${stat.suffix || ''}`);
  useEffect(() => {
    if (!enabled) { value.set(stat.value); return; }
    if (!visible) return;
    value.set(0);
    const control = animate(value, stat.value, { duration: compact ? 0.6 : 1.1, ease });
    return () => control.stop();
  }, [visible, enabled, compact, value, stat.value]);
  return <b ref={ref}><span className="srOnly">{stat.prefix}{stat.value}{stat.suffix}</span><motion.span aria-hidden="true" data-counter={stat.value}>{display}</motion.span></b>;
}

export function StatsStrip() {
  return <section aria-labelledby="credibility-heading" className={styles.statsSection}>
    <FadeIn className={styles.statsHeading}><span className={styles.eyebrow}>CADNA IN NUMBERS</span><h2 id="credibility-heading">Building Businesses That Are Ready For Growth</h2></FadeIn>
    <StaggerContainer className={styles.stats}>
      {stats.map(stat => <StaggerItem className={styles.stat} key={stat.label}><Counter stat={stat} /><h3>{stat.label}</h3><p>{stat.note}</p></StaggerItem>)}
    </StaggerContainer>
  </section>;
}
