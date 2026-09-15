import { useState } from 'react';
import { StaggerContainer } from './animations/Reveal';
import { LeadershipCard } from './GrowthCards';
import { leadership, advisors } from '../data/growth';
import styles from './Growth.module.css';

export function LeadershipSection() {
  const [group, setGroup] = useState('management');
  const people = group === 'management' ? leadership : advisors;
  return <>
    <div className={styles.filters} role="group" aria-label="Choose a leadership group">
      {[['management', 'Management Team'], ['advisors', 'Board of Advisors']].map(([key, label]) => <button key={key} type="button" aria-pressed={group === key} aria-controls="leadership-profiles" onClick={() => setGroup(key)}>{label}<span>{key === 'management' ? leadership.length : advisors.length}</span></button>)}
    </div>
    <StaggerContainer key={group} id="leadership-profiles" className={styles.grid3}>{people.map(person => <LeadershipCard key={person.name} person={person} />)}</StaggerContainer>
  </>;
}
