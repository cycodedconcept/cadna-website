import { useEffect, useId, useRef, useState } from 'react';
import { useMotionPreferences } from './animations/MotionProvider';
import { LeadershipCard } from './GrowthCards';
import styles from './LeadershipSection.module.css';

function outsideDialog(event) {
  const bounds = event.currentTarget.getBoundingClientRect();
  return event.target === event.currentTarget && (
    event.clientX < bounds.left || event.clientX > bounds.right ||
    event.clientY < bounds.top || event.clientY > bounds.bottom
  );
}

export function LeadershipProfileDialog({ person, onClose }) {
  const dialogRef = useRef(null);
  const backdropPress = useRef(false);
  const headingId = useId();
  const [closing, setClosing] = useState(false);
  const { enabled } = useMotionPreferences();

  useEffect(() => {
    if (!closing) return;
    const timer = window.setTimeout(() => dialogRef.current?.close(), enabled ? 250 : 0);
    return () => window.clearTimeout(timer);
  }, [closing, enabled]);

  useEffect(() => {
    const dialog = dialogRef.current;
    const trigger = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    const previousPadding = document.body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    const bodyPadding = Number.parseFloat(getComputedStyle(document.body).paddingRight) || 0;

    dialog.showModal();
    document.body.style.overflow = 'hidden';
    if (scrollbarWidth) document.body.style.paddingRight = `${bodyPadding + scrollbarWidth}px`;

    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPadding;
      if (trigger instanceof HTMLElement && trigger.isConnected) trigger.focus({ preventScroll: true });
    };
  }, []);

  return <dialog ref={dialogRef} className={`${styles.dialog} ${closing ? styles.closing : ''}`} aria-labelledby={headingId}
    onClose={event => {
      // Strict Mode reopens the dialog after effect cleanup; ignore that queued close event.
      if (!event.currentTarget.open) onClose();
    }}
    onCancel={event => { event.preventDefault(); setClosing(true); }}
    onKeyDown={event => {
      if (event.key !== 'Tab') return;
      const controls = event.currentTarget.querySelectorAll('button:not([disabled]), a[href], [tabindex="0"]');
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    }}
    onPointerDown={event => { backdropPress.current = outsideDialog(event); }}
    onClick={event => { if (backdropPress.current && outsideDialog(event)) setClosing(true); }}>
    <button className={styles.close} type="button" aria-label="Close profile" onClick={() => setClosing(true)}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" /></svg>
    </button>
    <LeadershipCard person={person} headingId={headingId} className={styles.profileCard} />
  </dialog>;
}
