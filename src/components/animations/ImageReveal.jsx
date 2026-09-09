import { motion } from 'framer-motion';
import { ease, viewport, useMotionPreferences } from './MotionProvider';

export function ImageReveal({ as = 'figure', appear = false, delay = 0, direction = 'up', duration = 0.85, children, ...props }) {
  const { enabled, compact } = useMotionPreferences();
  const Component = as === 'div' ? motion.div : motion.figure;
  return (
    <Component data-motion-image initial={enabled ? 'hidden' : false}
      animate={appear || !enabled ? 'visible' : undefined}
      whileInView={enabled && !appear ? 'visible' : undefined} viewport={viewport}
      variants={{
        hidden: { opacity: 0, scale: compact ? 0.985 : 0.95, clipPath: compact ? 'inset(0% 0% 0% 0%)' : direction === 'side' ? 'inset(0% 14% 0% 0%)' : 'inset(0% 0% 14% 0%)' },
        visible: { opacity: 1, scale: 1, clipPath: 'inset(0% 0% 0% 0%)', transition: { duration: enabled ? (compact ? 0.4 : duration) : 0, delay: enabled ? (compact ? delay * 0.5 : delay) : 0, ease } },
      }} {...props}>{children}</Component>
  );
}
