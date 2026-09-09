import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { images } from '../data/images';
import { ecosystem } from '../data/growth';
import { ResponsiveImage } from './ResponsiveImage';
import { Icon } from './Icon';
import { ease, useMotionPreferences } from './animations/MotionProvider';
import styles from './GrowthShowcase.module.css';

const stories = [
  { title: 'Start with a clear direction.', label: 'Clarity', image: images.listening, description: 'Bring your ambition. Together, we shape the next step.', link: 'Start a growth conversation', to: '/request' },
  { title: 'Bring the right support together.', label: 'Connection', image: images.boardroom, description: 'Strategy, capital, talent and technology. Connected around you.', link: 'Explore our solutions', to: '/#solutions' },
  { title: 'Turn your plans into progress.', label: 'Growth', image: images.education, description: 'Move forward with a partner for execution and sustainable growth.', link: 'Meet your business concierge', to: '/concierge/business' },
];

function JourneyScreen({ active }) {
  return <>
    <div className={styles.phoneHeader}><b>CADNA<span>GLOBAL SYNERGY</span></b><Icon name="spark" size={19} /></div>
    <div className={styles.phoneContent} key={active}>
      <span className={styles.screenEyebrow}>YOUR GROWTH JOURNEY</span>
      {active === 0 && <>
        <h3>Big ambitions.<br />A clear next step.</h3>
        <p>What does moving forward look like for your business?</p>
        <div className={styles.goalList}>
          {[['building', 'Build a stronger business'], ['capital', 'Prepare for funding'], ['technology', 'Transform with technology']].map(([icon, text], index) => <div className={styles.screenItem} style={{ '--order': index }} key={text}><Icon name={icon} size={18} /><span>{text}</span><Icon name="arrow" size={14} /></div>)}
        </div>
        <div className={styles.screenNote}><Icon name="compass" size={21} /><div><b>Clarity comes first.</b><span>A roadmap shaped around you.</span></div></div>
      </>}
      {active === 1 && <>
        <h3>One partner.<br />Connected expertise.</h3>
        <p>The right support, working towards the same ambition.</p>
        <div className={styles.pillarGrid}>{ecosystem.map((pillar, index) => <div className={styles.screenItem} style={{ '--order': index }} key={pillar.id}><Icon name={pillar.icon} size={23} /><b>{pillar.title}</b></div>)}</div>
        <div className={styles.screenNote}><Icon name="network" size={21} /><div><b>Your business at the centre.</b><span>Four growth pillars. One direction.</span></div></div>
      </>}
      {active === 2 && <>
        <h3>Move forward.<br />Build to scale.</h3>
        <p>Connect your strategy to the work that makes it happen.</p>
        <div className={styles.roadmap}>
          {[['compass', 'A practical roadmap', 'Align the priorities.'], ['layers', 'Coordinated execution', 'Put the plan into action.'], ['growth', 'Sustainable growth', 'Build for the next chapter.']].map(([icon, title, copy], index) => <div className={styles.screenItem} style={{ '--order': index }} key={title}><span><Icon name={icon} size={18} /></span><div><b>{title}</b><small>{copy}</small></div></div>)}
        </div>
        <div className={styles.screenNote}><Icon name="growth" size={21} /><div><b>From ambition to action.</b><span>With CADNA alongside you.</span></div></div>
      </>}
    </div>
    <div className={styles.phoneFooter}><span>Journey illustration</span><div aria-hidden="true">{stories.map((story, index) => <i key={story.label} className={index === active ? styles.currentStep : ''} />)}</div></div>
  </>;
}

export function GrowthShowcase() {
  const { enabled, compact } = useMotionPreferences();
  const stageRef = useRef(null);
  const controls = useRef([]);
  const inView = useInView(stageRef, { amount: 0.35 });
  const [active, setActive] = useState(0);
  const [pageVisible, setPageVisible] = useState(() => !document.hidden);
  const animated = enabled && !compact;
  const playing = enabled && inView && pageVisible;
  const story = stories[active];

  useEffect(() => {
    const update = () => setPageVisible(!document.hidden);
    document.addEventListener('visibilitychange', update);
    return () => document.removeEventListener('visibilitychange', update);
  }, []);

  function navigate(event, index) {
    let next;
    if (event.key === 'ArrowRight') next = (index + 1) % stories.length;
    else if (event.key === 'ArrowLeft') next = (index + stories.length - 1) % stories.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = stories.length - 1;
    else return;
    event.preventDefault();
    setActive(next);
    controls.current[next]?.focus();
  }

  return <section className={styles.showcase} id="growth-in-motion" aria-labelledby="growth-showcase-heading" aria-roledescription="carousel">
    <div className={styles.stage} ref={stageRef} data-animated={animated} data-playing={playing} style={{ '--story-play-state': playing ? 'running' : 'paused' }}>
      <div className={styles.backgrounds} aria-hidden="true">{stories.map((item, index) => <div className={`${styles.background} ${active === index ? styles.activeBackground : ''}`} key={item.label}><ResponsiveImage image={item.image} alt="" sizes="(max-width: 600px) 100vw, 92vw" /></div>)}</div>
      <div className={styles.shade} aria-hidden="true" />
      <header className={styles.heading}><span>THE CADNA EXPERIENCE</span><h2 id="growth-showcase-heading">Your next chapter, connected.</h2></header>
      <div className={styles.story} id="growth-story" role="group" aria-roledescription="slide" aria-label={`${active + 1} of ${stories.length}: ${story.label}`} aria-live={playing ? 'off' : 'polite'} aria-atomic="true">
        <motion.div key={active} className={styles.caption} initial={enabled ? { opacity: 0, y: compact ? 0 : 8 } : false} animate={{ opacity: 1, y: 0 }} transition={{ duration: enabled ? 0.4 : 0, ease }}><p>{story.title}</p><span>{story.description}</span></motion.div>
        <div className={styles.device}><div className={styles.screen}><JourneyScreen active={active} /></div></div>
        <Link className={styles.storyLink} to={story.to}>{story.link}<Icon name="arrow" size={17} /></Link>
      </div>
      <div className={styles.controls} role="group" aria-label="Choose a growth story">
        {stories.map((item, index) => <button type="button" key={item.label} ref={element => { controls.current[index] = element; }} className={`${styles.storyButton} ${index === active ? styles.selected : ''}`}
          aria-label={`${index + 1}. ${item.label}`} aria-pressed={index === active} aria-controls="growth-story" onClick={() => setActive(index)} onKeyDown={event => navigate(event, index)}>
          <span className={styles.number}>{index + 1}{index === active && enabled && <svg viewBox="0 0 48 48" aria-hidden="true"><circle key={active} className={styles.progress} cx="24" cy="24" r="21" pathLength="1" onAnimationEnd={event => { if (event.target === event.currentTarget && playing) setActive(value => (value + 1) % stories.length); }} /></svg>}</span><span className={styles.controlLabel}>{item.label}</span>
        </button>)}
      </div>
    </div>
  </section>;
}
