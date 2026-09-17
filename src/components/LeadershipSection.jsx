import { useEffect, useId, useRef, useState } from 'react';
import { AnimatePresence, useInView } from 'framer-motion';
import { useMotionPreferences } from './animations/MotionProvider';
import { ResponsiveImage } from './ResponsiveImage';
import { LeadershipProfileDialog } from './LeadershipProfileDialog';
import { LeadershipSpotlight } from './LeadershipSpotlight';
import { leadership, advisors } from '../data/growth';
import styles from './Growth.module.css';
import flowerStyles from './LeadershipSection.module.css';

const PREVIEW_INTERVAL = 10000;
const PREVIEW_DURATION = 5000;

function petalPosition(index, count) {
  const angle = (index / count) * Math.PI * 2 - Math.PI / 2;
  return { x: 50 + Math.cos(angle) * 34, y: 50 + Math.sin(angle) * 34 };
}

export function LeadershipSection() {
  const [group, setGroup] = useState('management');
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [preview, setPreview] = useState(null);
  const [paused, setPaused] = useState(false);
  const [held, setHeld] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const sectionRef = useRef(null);
  const nextPerson = useRef(0);
  const inView = useInView(sectionRef, { amount: 0.35 });
  const { enabled } = useMotionPreferences();
  const hintId = useId();
  const people = group === 'management' ? leadership : advisors;
  const canPreview = enabled && inView && pageVisible && !paused && !selectedPerson;

  useEffect(() => {
    const updateVisibility = () => setPageVisible(!document.hidden);
    updateVisibility();
    document.addEventListener('visibilitychange', updateVisibility);
    return () => document.removeEventListener('visibilitychange', updateVisibility);
  }, []);

  useEffect(() => {
    if (!canPreview) {
      setPreview(null);
      setHeld(false);
      return;
    }
    if (held) return;
    const timer = window.setInterval(() => {
      // Let visitors finish interacting with other menus or dialogs first.
      if (document.querySelector('dialog[open], header [aria-expanded="true"]')) return;
      setPreview(people[nextPerson.current % people.length]);
      nextPerson.current += 1;
    }, PREVIEW_INTERVAL);
    return () => window.clearInterval(timer);
  }, [canPreview, held, people]);

  useEffect(() => {
    if (!preview || held) return;
    const timer = window.setTimeout(() => setPreview(null), PREVIEW_DURATION);
    return () => window.clearTimeout(timer);
  }, [preview, held]);

  function openProfile(person) {
    setPreview(null);
    setHeld(false);
    setSelectedPerson(person);
  }

  function closePreview() {
    setPreview(null);
    setHeld(false);
  }

  function changeGroup(key) {
    nextPerson.current = 0;
    closePreview();
    setGroup(key);
  }

  return <>
    <div className={styles.filters} role="group" aria-label="Choose a leadership group">
      {[['management', 'Management Team'], ['advisors', 'Board of Advisors']].map(([key, label]) => <button key={key} type="button" aria-pressed={group === key} aria-controls="leadership-profiles" onClick={() => changeGroup(key)}>{label}<span>{key === 'management' ? leadership.length : advisors.length}</span></button>)}
    </div>
    <div className={flowerStyles.previewControls}>
      <p className={flowerStyles.hint} id={hintId}>Select a portrait to meet the people behind CADNA.</p>
      {enabled && <button type="button" className={flowerStyles.previewToggle} aria-pressed={paused} onClick={() => setPaused(value => !value)}>{paused ? 'Resume team previews' : 'Pause team previews'}</button>}
    </div>
    <div id="leadership-profiles" ref={sectionRef} className={flowerStyles.flower}>
      <svg className={flowerStyles.connections} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <circle cx="50" cy="50" r="34" className={flowerStyles.orbit} />
        {people.map((person, index) => {
          const point = petalPosition(index, people.length);
          return <line key={person.name} x1="50" y1="50" x2={point.x} y2={point.y} />;
        })}
      </svg>
      <div className={flowerStyles.center} aria-hidden="true"><strong>CADNA</strong><span>{group === 'management' ? 'Management' : 'Advisors'}</span><small>Connected leadership</small></div>
      <ul className={flowerStyles.petals} aria-label={group === 'management' ? 'Management team profiles' : 'Board of advisors profiles'}>
        {people.map((person, index) => {
          const point = petalPosition(index, people.length);
          return <li key={person.name} className={flowerStyles.petal} style={{ left: `${point.x}%`, top: `${point.y}%` }}>
            <button type="button" className={flowerStyles.portraitButton} aria-label={`View profile: ${person.name}, ${person.title}`} aria-describedby={hintId} aria-haspopup="dialog" onClick={() => openProfile(person)}>
              <span className={flowerStyles.portrait}>
                {person.image ? <ResponsiveImage image={person.image} sizes="(max-width: 600px) 28vw, 240px" alt="" style={person.image.objectPosition ? { objectPosition: person.image.objectPosition } : undefined} /> : <span className={flowerStyles.initials} aria-hidden="true">{person.initials}</span>}
              </span>
              <span className={flowerStyles.openIcon} aria-hidden="true">+</span>
              <span className={flowerStyles.name}>{person.name}</span>
            </button>
          </li>;
        })}
      </ul>
    </div>
    <AnimatePresence>
      {preview && canPreview && <LeadershipSpotlight key={preview.name} person={preview} onClose={closePreview} onOpen={() => openProfile(preview)} onHold={setHeld} />}
    </AnimatePresence>
    {selectedPerson && <LeadershipProfileDialog person={selectedPerson} onClose={() => setSelectedPerson(null)} />}
  </>;
}
