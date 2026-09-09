import { FadeIn, StaggerContainer, StaggerItem } from './animations/Reveal';
import { Icon } from './Icon';
import styles from './ConciergeComparison.module.css';

const traditional = ['Consultant', 'Bank', 'Recruiter', 'Technology Provider', 'Marketing Partner', 'Multiple Advisors'];
const integrated = ['Strategy', 'Capital', 'Talent', 'Technology', 'Partnerships', 'Execution'];

export function ConciergeComparison() {
  return <div className={styles.comparison}>
    <FadeIn className={styles.traditional}><span className={styles.label}>TRADITIONAL APPROACH</span><h3>More relationships.<br />More to coordinate.</h3><ul>{traditional.map((item, index) => <li key={item}><span>{String(index + 1).padStart(2, '0')}</span>{item}<span aria-hidden="true">↗</span></li>)}</ul><p>You connect the dots between separate advisers.</p></FadeIn>
    <span className={styles.versus} aria-hidden="true">VS</span>
    <FadeIn delay={0.12} className={styles.integrated}><span className={styles.label}>CADNA APPROACH</span><h3>CADNA.<br />One trusted partner.</h3><StaggerContainer as="ul" className={styles.pillars}>{integrated.map(item => <StaggerItem as="li" key={item}><Icon name="check" size={17} />{item}</StaggerItem>)}</StaggerContainer><div className={styles.owner}><Icon name="network" size={28} /><span><b>One coordinated growth ecosystem</b><small>Coordinating your journey from strategy to execution.</small></span></div></FadeIn>
  </div>;
}
