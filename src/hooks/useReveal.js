import { useEffect, useRef } from 'react';

export function useReveal(enabled = true) {
  const ref = useRef(null);
  useEffect(() => {
    const root = ref.current;
    if (!root) return undefined;
    const items = root.querySelectorAll('[data-animate]');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!enabled || reduced || !('IntersectionObserver' in window)) { items.forEach((item) => item.classList.add('is-revealed')); return undefined; }
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.remove('is-pending'); entry.target.classList.add('is-revealed'); observer.unobserve(entry.target); } }), { threshold: 0.12 });
    items.forEach((item) => { item.classList.add('is-pending'); observer.observe(item); });
    return () => observer.disconnect();
  }, [enabled]);
  return ref;
}
