import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ease, viewport, useMotionPreferences } from './MotionProvider';

const tags = {
  div: motion.div, section: motion.section, article: motion.article,
  figure: motion.figure, span: motion.span, p: motion.p, h1: motion.h1,
  h2: motion.h2, h3: motion.h3, ul: motion.ul, ol: motion.ol, li: motion.li,
  small: motion.small, link: motion.create(Link),
};

export function useRevealVariants({ delay = 0, direction = 'up', duration = 0.7 } = {}) {
  const { enabled, compact } = useMotionPreferences();
  const horizontal = direction === 'side' && !compact;
  const distance = direction === 'fade' ? 0 : compact ? 10 : 24;
  return {
    hidden: { opacity: 0, x: horizontal ? distance : 0, y: horizontal ? 0 : distance },
    visible: {
      opacity: 1, x: 0, y: 0,
      transition: { duration: enabled ? (compact ? Math.min(duration, 0.4) : duration) : 0, delay: enabled ? (compact ? delay * 0.5 : delay) : 0, ease },
    },
  };
}

export function FadeIn({ as = 'div', appear = false, delay = 0, direction = 'up', duration = 0.7, children, ...props }) {
  const { enabled } = useMotionPreferences();
  const Component = tags[as];
  const variants = useRevealVariants({ delay, direction, duration });
  return (
    <Component data-motion-reveal initial={enabled ? 'hidden' : false}
      animate={appear || !enabled ? 'visible' : undefined}
      whileInView={enabled && !appear ? 'visible' : undefined}
      viewport={viewport} variants={variants} {...props}>{children}</Component>
  );
}

export function StaggerContainer({ as = 'div', stagger = 0.1, children, ...props }) {
  const { enabled, compact } = useMotionPreferences();
  const Component = tags[as];
  return (
    <Component data-motion-stagger initial={enabled ? 'hidden' : false}
      animate={!enabled ? 'visible' : undefined} whileInView={enabled ? 'visible' : undefined}
      viewport={viewport} variants={{ hidden: {}, visible: { transition: { staggerChildren: enabled ? (compact ? 0.05 : stagger) : 0 } } }}
      {...props}>{children}</Component>
  );
}

export function StaggerItem({ as = 'div', direction = 'up', duration = 0.65, children, ...props }) {
  const { enabled } = useMotionPreferences();
  const Component = tags[as];
  const variants = useRevealVariants({ direction, duration });
  return <Component data-motion-reveal variants={variants} animate={!enabled ? 'visible' : undefined} {...props}>{children}</Component>;
}

export function MotionLink({ children, ...props }) {
  const { enabled, compact } = useMotionPreferences();
  const Component = tags.link;
  return (
    <Component data-motion-button whileHover={enabled && !compact ? { scale: 1.04 } : undefined}
      whileTap={enabled ? { scale: 0.99 } : undefined} transition={{ duration: 0.2, ease }} {...props}>
      {children}
    </Component>
  );
}
