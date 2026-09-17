import { useEffect, useLayoutEffect } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useMotionPreferences } from './animations/MotionProvider';

const useBrowserLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

export function PageTransition({ children }) {
  const { enabled } = useMotionPreferences();
  const { pathname, hash, key } = useLocation();
  const navigationType = useNavigationType();

  useBrowserLayoutEffect(() => {
    if (hash) {
      let target = hash.slice(1);
      try { target = decodeURIComponent(target); } catch { /* Malformed fragments have no matching section. */ }
      document.getElementById(target)?.scrollIntoView({ behavior: 'instant' });
    } else if (navigationType !== 'POP') {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      document.getElementById('main-content')?.focus({ preventScroll: true });
    }
  }, [pathname, hash, key, navigationType]);

  // Keep the navbar's sticky positioning intact; each section owns its reveal.
  return (
    <motion.div initial={enabled ? { opacity: 0.96 } : false}
      animate={{ opacity: 1 }} transition={{ duration: enabled ? 0.2 : 0 }}>
      {children}
    </motion.div>
  );
}
