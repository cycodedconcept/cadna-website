import { motion } from 'framer-motion';
import { StaggerContainer, StaggerItem } from './animations/Reveal';
import { useMotionPreferences, ease } from './animations/MotionProvider';
import { processSteps } from '../data/growth';
import { Icon } from './Icon';
import styles from './ProcessFlow.module.css';

export function ProcessFlow({ steps = processSteps }) {
  const { enabled, compact } = useMotionPreferences();
  return <StaggerContainer as="ol" className={styles.timeline} stagger={0.14} aria-label="The five stages of your growth journey">
    {steps.map((step, index) => <StaggerItem as="li" className={styles.step} key={step.title}>
      {index < steps.length - 1 && <motion.span className={styles.connector} aria-hidden="true" style={{ originX: 0 }} variants={{ hidden: { scaleX: compact ? 1 : 0 }, visible: { scaleX: 1, transition: { duration: enabled ? 0.55 : 0, ease } } }} />}
      <span className={styles.number}>{String(index + 1).padStart(2, '0')}</span>
      <div className={styles.icon}><Icon name={step.icon} size={28} /></div><h3>{step.title}</h3><p>{step.description}</p>
    </StaggerItem>)}
  </StaggerContainer>;
}
