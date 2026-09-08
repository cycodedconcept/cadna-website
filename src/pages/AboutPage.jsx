import { Link } from 'react-router-dom';
import { SiteNav } from '../components/SiteNav';
import { SiteFooter } from '../components/SiteFooter';
import { images } from '../data/images';
import { ResponsiveImage } from '../components/ResponsiveImage';
import { ServiceCards } from '../components/ServiceCards';
import styles from './ContentPage.module.css';
import aboutStyles from './AboutPage.module.css';

export function AboutPage() {
  return (
    <div>
      <SiteNav active="about" />
      <main id="main-content">
        <section className={`${styles.hero} ${styles.aboutHero}`}>
          <div className={styles.aboutHeroCopy}>
            <span>OUR STORY</span>
            <h1>Most businesses don't need more advice. They need someone to handle it.</h1>
            <p>
              CADNA Global Synergy Limited was built around a simple observation: growing
              businesses lose more time coordinating consultants, banks, vendors and trainers
              than they do executing. So we collapsed all of it into one door.
            </p>
            <Link className={styles.primary} to="/contact">
              Book a diagnostic →
            </Link>
          </div>
          <figure className={`${styles.aboutHeroVisual} ${aboutStyles.visibleImage}`}>
            <ResponsiveImage image={images.boardroom} priority sizes="(max-width: 800px) 100vw, 50vw" />
            <figcaption>One team, connected around your business.</figcaption>
          </figure>
        </section>

        <section className={styles.stats}>
          {[
            ['₦35B+', 'Funding demand facilitated'],
            ['150+', 'Businesses transformed'],
            ['83%+', 'Client retention rate'],
            ['6 countries', 'Nigeria · Ghana · Kenya · Malaysia · UAE · UK'],
          ].map(([value, label]) => (
            <div key={value}>
              <b>{value}</b>
              <span>{label}</span>
            </div>
          ))}
        </section>

        <section className={styles.split}>
          <div>
            <h2>Why we exist</h2>
            <p>
              A business owner in Lagos looking to expand needs a lawyer, a strategist, a bank,
              a developer and a trainer. Five relationships, five briefings, five invoices — and
              nobody accountable for the whole outcome.
            </p>
            <p>
              CADNA operates as a concierge. You submit one request. We diagnose it, route it to
              the right division, assign an owner, and stay accountable through delivery.
            </p>
          </div>
          <div className={styles.panel}>
            One request.
            <br />
            One owner.
            <br />
            <em>Complete delivery.</em>
          </div>
        </section>

        <section className={styles.section}>
          <span>HOW WE'RE BUILT</span>
          <h2>Four divisions, one accountable owner per request.</h2>
          <ServiceCards />
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
