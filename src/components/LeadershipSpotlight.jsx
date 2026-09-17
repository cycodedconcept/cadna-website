import { useEffect, useId, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, useIsPresent } from 'framer-motion';
import { LeadershipCard } from './GrowthCards';
import styles from './LeadershipSection.module.css';

// Automatic previews never take focus or block the rest of the page.
// Clicking a portrait or "Keep profile open" opens the accessible modal instead.
export function LeadershipSpotlight({ person, onClose, onOpen, onHold }) {
  const headingId = useId();
  const previewRef = useRef(null);
  const isPresent = useIsPresent();

  useEffect(() => {
    function dismiss(event) {
      if (event.key === 'Escape' && !document.querySelector('dialog[open]')) returnToPortrait();
    }
    document.addEventListener('keydown', dismiss);
    return () => document.removeEventListener('keydown', dismiss);
  }, [onClose, person]);

  function focusPortrait() {
    const buttons = document.querySelectorAll('#leadership-profiles button');
    Array.from(buttons).find(button => button.getAttribute('aria-label') === `View profile: ${person.name}, ${person.title}`)?.focus({ preventScroll: true });
  }

  function returnToPortrait() {
    if (previewRef.current?.contains(document.activeElement)) focusPortrait();
    onClose();
  }

  function openFullProfile() {
    // Give the modal a persistent return target when this preview fades away.
    focusPortrait();
    onOpen();
  }

  return createPortal(<div className={styles.spotlightPosition}>
    <motion.aside ref={previewRef} className={styles.spotlight} aria-labelledby={headingId}
      inert={!isPresent ? '' : undefined}
      initial={{ opacity: 0, scale: 0.9, y: 16 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96, y: 8 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => onHold(true)} onMouseLeave={event => { if (!event.currentTarget.contains(document.activeElement)) onHold(false); }}
      onFocusCapture={() => onHold(true)} onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget) && !event.currentTarget.matches(':hover')) onHold(false); }}>
      <div className={styles.spotlightToolbar}>
        <span>MEET THE TEAM</span>
        <button type="button" className={styles.keepOpen} onClick={openFullProfile}>Keep profile open <span aria-hidden="true">↗</span></button>
        <button type="button" className={styles.dismissPreview} aria-label="Close team preview" onClick={returnToPortrait}>×</button>
      </div>
      <LeadershipCard person={person} headingId={headingId} className={styles.profileCard} />
    </motion.aside>
  </div>, document.body);
}
