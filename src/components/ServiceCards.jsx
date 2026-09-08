import { Link } from 'react-router-dom';
import { divisions } from '../data/divisions';
import { ResponsiveImage } from './ResponsiveImage';
import styles from './ServiceCards.module.css';

export function ServiceCards() {
  return (
    <div className={styles.grid}>
      {Object.entries(divisions).map(([key, division]) => (
        <Link
          className={`${styles.card} ${styles[key]}`}
          data-animate
          key={key}
          to={`/concierge/${key}`}
        >
          <div className={styles.visual}>
            <ResponsiveImage image={division.image} sizes="(max-width: 640px) 100vw, 50vw" />
            <span className={styles.number}>{division.number} / CONCIERGE</span>
          </div>
          <div className={styles.copy}>
            <div className={styles.heading}>
              <span className={styles.icon}>
                <img src={division.icon} alt="" width="48" height="48" loading="lazy" decoding="async" />
              </span>
              <h3>{division.name}</h3>
            </div>
            <p>{division.description}</p>
            <span className={styles.explore}>Explore {key} concierge <span aria-hidden="true">↗</span></span>
          </div>
        </Link>
      ))}
    </div>
  );
}
