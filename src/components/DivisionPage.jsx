import { Link } from 'react-router-dom';
import { divisions } from '../data/divisions';
import { SiteNav } from './SiteNav';
import { SiteFooter } from './SiteFooter';
import { ResponsiveImage } from './ResponsiveImage';
import styles from './DivisionPage.module.css';

export function DivisionPage({ which = 'business' }) {
  const division = divisions[which] || divisions.business;
  return (
    <div>
      <SiteNav active="services" />
      <main id="main-content" className={styles[which]}>
        <section className={styles.hero}>
          <div className={styles.copy}>
            <span>{division.eyebrow}</span>
            <h1>{division.intro}</h1>
            <p>{division.description}</p>
            <div className={styles.actions}>
              <Link className={styles.primary} to="/request">Make a Request →</Link>
              <Link className={styles.secondary} to="/contact">Book a diagnostic</Link>
            </div>
          </div>
          <figure className={styles.visual}>
            <ResponsiveImage image={division.image} priority sizes="(max-width: 850px) 100vw, 50vw" />
            <figcaption>
              <img src={division.icon} alt="" width="44" height="44" decoding="async" />
              <span>{division.focus}</span>
            </figcaption>
          </figure>
        </section>
        <section className={styles.band}>
          <p>ONE REQUEST. ONE ACCOUNTABLE OWNER.</p>
          <h2>Services built around your outcome.</h2>
        </section>
        <section className={styles.grid}>
          {division.modules.map((module, index) => (
            <article key={module}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h3>{module}</h3>
              <p>{division.prices[index]}</p>
              <Link to="/request">Start with a request →</Link>
            </article>
          ))}
        </section>
        <section className={styles.cta}>
          <h2>Tell us what needs to move.</h2>
          <p>A concierge will reach out within 2–6 hours and provide your solution plan within 24–48 hours.</p>
          <Link className={styles.primary} to="/request">Make a Request →</Link>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
