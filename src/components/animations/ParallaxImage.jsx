import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ResponsiveImage } from '../ResponsiveImage';
import { useMotionPreferences } from './MotionProvider';
import styles from './animations.module.css';

// Only mount scroll tracking on desktop, when motion is allowed.
function MovingImage({ image, ...props }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [-12, 12]);
  return (
    <div ref={ref} className={styles.parallaxFrame} data-parallax="active">
      <motion.div className={styles.parallaxLayer} style={{ y }}>
        <ResponsiveImage image={image} {...props} />
      </motion.div>
    </div>
  );
}

export function ParallaxImage(props) {
  const { enabled, compact } = useMotionPreferences();
  if (!enabled || compact) return <ResponsiveImage {...props} />;
  return <MovingImage {...props} />;
}
