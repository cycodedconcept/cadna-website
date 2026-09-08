import { Link } from 'react-router-dom';
import { SiteNav } from '../components/SiteNav';
import { SiteFooter } from '../components/SiteFooter';
import { ResponsiveImage } from '../components/ResponsiveImage';
import { images } from '../data/images';
import styles from './ContentPage.module.css';
import photoStyles from './AboutPage.module.css';

export function ContactPage() {
  return (
    <div>
      <SiteNav active="contact" />
      <main id="main-content">
        <section className={`${styles.hero} ${styles.aboutHero}`}>
          <div className={styles.aboutHeroCopy}>
            <span>CONTACT & DIAGNOSTIC</span>
            <h1>Book your complimentary 90-minute diagnostic.</h1>
            <p>We'll assess your business model, capital structure, technology gaps and capability needs — and tell you honestly what to fix first. No cost, no obligation.</p>
            <Link className={styles.primary} to="/request">Talk to our team →</Link>
          </div>
          <figure className={`${styles.aboutHeroVisual} ${photoStyles.visibleImage} ${photoStyles.listeningImage}`}>
            <ResponsiveImage image={images.listening} priority sizes="(max-width: 800px) 100vw, 50vw" />
            <figcaption>We listen first. Then we build your way forward.</figcaption>
          </figure>
        </section>
        <section className={styles.stats}>
          {[['90 minutes', 'Complimentary diagnostic'], ['2–6 hours', 'First response'], ['24–48 hours', 'Solution plan'], ['One owner', 'Accountable delivery']].map(([value, label]) => (
            <div key={value}><b>{value}</b><span>{label}</span></div>
          ))}
        </section>
        <section className={styles.split}>
          <div>
            <h2>Tell us where to begin.</h2>
            <p>Use the request form to send your brief, budget and timeline. A concierge will confirm the best next step.</p>
            <Link className={styles.primary} to="/request">Make a Request →</Link>
          </div>
          <div>
            <small>EMAIL</small><a href="mailto:concierge@cadnagsl.com">concierge@cadnagsl.com</a>
            <small>WHATSAPP</small><a href="https://wa.me/2348132590295">+234 813 259 0295</a>
            <small>LAGOS HEADQUARTERS</small>
            <p>Tingo House, 6 Ahmed Onibudo Street<br />Victoria Island, Lagos, Nigeria</p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
