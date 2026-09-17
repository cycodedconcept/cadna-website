import { Link } from 'react-router-dom';
import { SectionHeading } from './SectionHeading';
import { StaggerContainer, StaggerItem } from './animations/Reveal';
import { Icon } from './Icon';
import { differentiators } from '../data/growth';
import styles from './WhyCadna.module.css';
import growth from './Growth.module.css';

export function WhyCadna() {
  return <section className={`${growth.section} ${styles.section}`} id="why-cadna" aria-labelledby="why-cadna-heading">
    <SectionHeading eyebrow="WHY CADNA" title="A partner for the work that follows the strategy." id="why-cadna-heading" aside={<Link className={growth.textLink} to="/about">Get to know CADNA <span aria-hidden="true">↗</span></Link>}>Your growth plan needs people who can help put it into practice. CADNA coordinates the expertise, connections and delivery around one business goal.</SectionHeading>
    <StaggerContainer className={styles.grid}>{differentiators.map((item, index) => <StaggerItem as="article" className={styles.card} key={item.title}>
      <div className={styles.top}><Icon name={item.icon} size={26} /><span>0{index + 1}</span></div>
      <h3>{item.title}</h3><p>{item.description}</p>
    </StaggerItem>)}</StaggerContainer>
  </section>;
}
