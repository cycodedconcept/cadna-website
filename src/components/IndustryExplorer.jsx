import { useState } from 'react';
import { StaggerContainer } from './animations/Reveal';
import { IndustryCard } from './GrowthCards';
import { industries } from '../data/growth';
import styles from './Growth.module.css';

const groups = {
  'All industries': null,
  'Services & technology': ['Financial Services', 'Logistics', 'Technology'],
  'Production & infrastructure': ['Real Estate', 'Energy', 'Agriculture', 'Infrastructure'],
  'Learning & consumer': ['Education', 'Consumer Businesses'],
};

export function IndustryExplorer() {
  const [active, setActive] = useState('All industries');
  const visible = industries.filter(industry => !groups[active] || groups[active].includes(industry.title));
  return <>
    <div className={styles.filters} role="group" aria-label="Filter industries">{Object.keys(groups).map(group => <button type="button" key={group} aria-pressed={active === group} aria-controls="industry-results" onClick={() => setActive(group)}>{group}</button>)}</div>
    <p className={styles.filterStatus} role="status">{visible.length} {visible.length === 1 ? 'industry' : 'industries'} · Select a card to explore relevant support.</p>
    <StaggerContainer key={active} id="industry-results" className={styles.grid3}>{visible.map(industry => <IndustryCard key={industry.title} industry={industry} />)}</StaggerContainer>
  </>;
}
