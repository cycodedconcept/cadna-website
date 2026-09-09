import { FadeIn } from './animations/Reveal';
import styles from './Growth.module.css';

export function SectionHeading({ eyebrow, title, children, id, aside }) {
  return <FadeIn className={styles.sectionHeading}>
    <div><span className={styles.eyebrow}>{eyebrow}</span><h2 id={id}>{title}</h2>{children && <p>{children}</p>}</div>
    {aside}
  </FadeIn>;
}
