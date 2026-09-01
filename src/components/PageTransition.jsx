import { useEffect } from 'react';
import { motion, useAnimationControls, useReducedMotion } from 'framer-motion';

export function PageTransition({ children }) {
  const shouldReduceMotion = useReducedMotion();
  const controls = useAnimationControls();

  useEffect(() => {
    if (shouldReduceMotion) {
      controls.set({ opacity: 1, y: 0 });
      return undefined;
    }

    const timer = window.setTimeout(() => {
      controls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
      });
    }, 220);

    return () => window.clearTimeout(timer);
  }, [controls, shouldReduceMotion]);

  return (
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0, y: 42 }}
      animate={shouldReduceMotion ? { opacity: 1, y: 0 } : controls}
      exit={shouldReduceMotion ? undefined : { opacity: 0, y: -20 }}
    >
      {children}
    </motion.div>
  );
}
