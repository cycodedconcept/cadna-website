import { FadeIn, MotionLink } from '../components/animations/Reveal';
import { ImageReveal } from '../components/animations/ImageReveal';
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
            <FadeIn as="span" appear direction="fade">CONTACT & DIAGNOSTIC</FadeIn>
            <FadeIn as="h1" appear delay={0.12}>Book your complimentary 90-minute diagnostic.</FadeIn>
            <FadeIn as="p" appear delay={0.24}>We'll assess your business model, capital structure, technology gaps and capability needs — and tell you honestly what to fix first. No cost, no obligation.</FadeIn>
            <MotionLink className={styles.primary} to="/request">Talk to our team <span aria-hidden="true">→</span></MotionLink>
          </div>
          <ImageReveal appear delay={0.18} className={`${styles.aboutHeroVisual} ${photoStyles.visibleImage} ${photoStyles.listeningImage}`}>
            <ResponsiveImage image={images.listening} priority sizes="(max-width: 800px) 100vw, 50vw" />
            <figcaption>We listen first. Then we build your way forward.</figcaption>
          </ImageReveal>
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
            <MotionLink className={styles.primary} to="/request">Make a Request <span aria-hidden="true">→</span></MotionLink>
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
