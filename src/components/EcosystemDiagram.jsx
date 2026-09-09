import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ecosystem } from '../data/growth';
import { useMotionPreferences, viewport, ease } from './animations/MotionProvider';
import { Icon } from './Icon';
import styles from './EcosystemDiagram.module.css';

export function EcosystemDiagram() {
  const [active, setActive] = useState('strategy');
  const { enabled, compact } = useMotionPreferences();
  const controls = useRef([]);
  const selected = ecosystem.find(node => node.id === active);
  function navigate(event, index) {
    const directions = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 };
    let next;
    if (event.key in directions) next = (index + directions[event.key] + ecosystem.length) % ecosystem.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = ecosystem.length - 1;
    else return;
    event.preventDefault(); controls.current[next]?.focus();
  }
  return <div className={styles.ecosystem}>
    <div className={styles.diagram} role="group" aria-label="Explore the four connected growth pillars">
      <svg className={styles.connections} viewBox="0 0 640 420" preserveAspectRatio="none" aria-hidden="true">
        {['M320 80V210', 'M145 210H320', 'M495 210H320', 'M320 340V210'].map((path, index) => <motion.path key={path} d={path} className={ecosystem[index].id === active ? styles.activeLine : ''}
          initial={enabled && !compact ? { pathLength: 0, opacity: 0.3 } : false} animate={!enabled ? { pathLength: 1, opacity: 1 } : undefined}
          whileInView={{ pathLength: 1, opacity: 1 }} viewport={viewport} transition={{ duration: enabled ? 0.85 : 0, ease }} />)}
      </svg>
      <div className={styles.center}><span>CADNA</span><small>ONE CONNECTED PARTNER</small></div>
      {ecosystem.map((node, index) => <button ref={element => { controls.current[index] = element; }} key={node.id} type="button"
        className={`${styles.node} ${styles[node.id]} ${active === node.id ? styles.active : ''}`}
        aria-label={node.title} aria-describedby={`ecosystem-${node.id}-description`} aria-pressed={active === node.id} aria-controls="ecosystem-detail"
        onFocus={() => setActive(node.id)} onClick={() => setActive(node.id)} onKeyDown={event => navigate(event, index)}
        onPointerEnter={event => { if (event.pointerType === 'mouse') setActive(node.id); }}>
        <Icon name={node.icon} /><span><b>{node.title}</b><small id={`ecosystem-${node.id}-description`}>{node.description}</small></span>
      </button>)}
    </div>
    <div className={styles.delivery} aria-label="The ecosystem leads to execution and scale"><span aria-hidden="true">↓</span><b>Execution</b><span aria-hidden="true">↓</span><b>Scale <Icon name="growth" size={18} /></b></div>
    <div className={styles.detail} id="ecosystem-detail" aria-live="polite" aria-atomic="true">
      <div><small>CONNECTED BY CADNA</small><h3>{selected.title}, with a path to execution.</h3></div>
      <p>{selected.description}</p>
      <Link to={selected.to}>Explore {selected.title.toLowerCase()} <span aria-hidden="true">↗</span></Link>
    </div>
  </div>;
}
