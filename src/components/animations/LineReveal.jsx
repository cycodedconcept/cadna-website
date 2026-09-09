import { useLayoutEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { FadeIn } from './Reveal';
import { ease, useMotionPreferences } from './MotionProvider';
import styles from './animations.module.css';

function DesktopLines({ text, delay = 0, className, ...props }) {
  const ref = useRef(null);
  const [lines, setLines] = useState([]);
  const visible = useInView(ref, { once: true, amount: 0.2 });
  const words = text.trim().split(/\s+/);

  useLayoutEffect(() => {
    const element = ref.current;
    let frame;
    let active = true;
    const measure = () => {
      if (!active) return;
      const tops = [];
      const next = [...element.querySelectorAll('[data-word]')].map(word => {
        const top = word.offsetTop;
        let index = tops.findIndex(value => Math.abs(value - top) < 2);
        if (index === -1) { tops.push(top); index = tops.length - 1; }
        return index;
      });
      setLines(previous => previous.join(',') === next.join(',') ? previous : next);
    };
    const observer = new ResizeObserver(() => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    });
    measure();
    observer.observe(element);
    document.fonts?.ready.then(measure);
    return () => { active = false; cancelAnimationFrame(frame); observer.disconnect(); };
  }, [text]);

  return (
    <p ref={ref} className={`${className || ''} ${styles.lineText}`} data-line-reveal {...props}>
      <span className="srOnly">{text}</span>
      <span aria-hidden="true">
        {words.map((word, index) => (
          <span key={`${index}-${word}`}>
            <motion.span className={styles.line} data-word initial={{ opacity: 0, y: 10 }}
              animate={visible ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.55, delay: delay + (lines[index] || 0) * 0.065, ease }}>
              {word}
            </motion.span>{index < words.length - 1 ? ' ' : ''}
          </span>
        ))}
      </span>
    </p>
  );
}

export function LineReveal({ children, ...props }) {
  const { enabled, compact } = useMotionPreferences();
  const text = String(children).replace(/\s+/g, ' ').trim();
  if (!enabled || compact) return <FadeIn as="p" {...props}>{text}</FadeIn>;
  return <DesktopLines text={text} {...props} />;
}
