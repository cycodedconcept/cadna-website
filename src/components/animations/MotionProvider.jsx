import { createContext, useContext, useMemo, useSyncExternalStore } from 'react';
import { MotionConfig } from 'framer-motion';

const compactQuery = '(max-width: 850px), (pointer: coarse)';
const subscribe = (onChange) => {
  const query = window.matchMedia(compactQuery);
  query.addEventListener('change', onChange);
  return () => query.removeEventListener('change', onChange);
};
const getCompact = () => window.matchMedia(compactQuery).matches;
const reducedQuery = '(prefers-reduced-motion: reduce)';
const subscribeReduced = (onChange) => {
  const query = window.matchMedia(reducedQuery);
  query.addEventListener('change', onChange);
  return () => query.removeEventListener('change', onChange);
};
const getReduced = () => window.matchMedia(reducedQuery).matches;
const MotionPreferences = createContext({ enabled: true, compact: false });
export const ease = [0.22, 1, 0.36, 1];
export const viewport = { once: true, amount: 0.2 };

export function MotionProvider({ children }) {
  const reduced = useSyncExternalStore(subscribeReduced, getReduced, () => true);
  const compact = useSyncExternalStore(subscribe, getCompact, () => true);
  const preferences = useMemo(() => ({ enabled: !reduced, compact }), [reduced, compact]);
  return (
    <MotionConfig reducedMotion={reduced ? 'always' : 'never'} transition={{ duration: compact ? 0.4 : 0.7, ease }}>
      <MotionPreferences.Provider value={preferences}>{children}</MotionPreferences.Provider>
    </MotionConfig>
  );
}

export function MotionScope({ enabled = true, children }) {
  const parent = useContext(MotionPreferences);
  const value = useMemo(() => ({ ...parent, enabled: parent.enabled && enabled }), [parent, enabled]);
  return <MotionPreferences.Provider value={value}>{children}</MotionPreferences.Provider>;
}

export const useMotionPreferences = () => useContext(MotionPreferences);
