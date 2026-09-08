import { Link } from 'react-router-dom';
import { SiteNav } from '../components/SiteNav';
import { SiteFooter } from '../components/SiteFooter';
import { useReveal } from '../hooks/useReveal';
import { images } from '../data/images';
import { ResponsiveImage } from '../components/ResponsiveImage';
import { ServiceCards } from '../components/ServiceCards';
import styles from './HomePage.module.css';
import { ProcessFlow } from '../components/ProcessFlow';
import { SubscriptionPlans } from '../components/SubscriptionPlans';

const packages = [
  [
    'IDEA → LAUNCH',
    'Start Package',
    'Business registration & structure plan|Business model & go-to-market strategy|Website or landing page|Startup training & mentorship',
    '4–12 weeks · Entrepreneurs & early-stage founders',
  ],
  [
    'GROWTH → EXPANSION',
    'Scale Package',
    'Market strategy & scaling plan|Process optimization & KPIs|CRM, ERP & automation tools|Funding readiness & financial models',
    '4–8 weeks · MSMEs & growth businesses',
  ],
  [
    'TRADE → FUNDING',
    'Trade & Capital',
    'LC, BG & SBLC arrangements|Market entry & distribution channels|Deal structuring & funding access|Risk mitigation frameworks',
    '6–12 weeks · Importers, exporters & enterprises',
  ],
];

export function HomePage({
  showSubscriptions = true,
  planOverlap = true,
  revealAnimations = true,
}) {
  const revealRef = useReveal(revealAnimations);

  return (
    <div ref={revealRef}>
      <SiteNav active="home" />
      <main id="main-content">
        <section className={styles.hero} aria-labelledby="home-heading">
          <div className={styles.heroVisual}>
            <ResponsiveImage image={images.leadership} priority sizes="(max-width: 900px) 100vw, 66vw" />
          </div>
          <div className={styles.heroCopy}>
            <span>ONE PARTNER. EVERY STEP.</span>
            <h1 id="home-heading">
              Most businesses don't need more advice. <em>They need someone to handle it.</em>
            </h1>
            <p>
              Strategy, finance, training and technology — brought together by one
              accountable partner, from your first request to complete delivery.
            </p>
            <div className={styles.actions}>
              <Link className={styles.primary} to="/request">Partner with CADNA <span aria-hidden="true">↗</span></Link>
              <Link className={styles.secondary} to="/contact">Talk to our team <span aria-hidden="true">→</span></Link>
            </div>
            <small className={styles.response}>Your dedicated concierge responds within 2–6 hours.</small>
          </div>
          <div className={styles.heroCaption}><span>CADNA GLOBAL SYNERGY LIMITED</span><b>One request. Complete solutions.</b></div>
        </section>

        <section className={styles.stats}>
          {[
            ['₦35B+', 'Funding demand facilitated'],
            ['150+', 'Businesses transformed'],
            ['83%+', 'Client retention rate'],
            ['6 countries', 'Nigeria · Ghana · Kenya · Malaysia · UAE · UK'],
          ].map(([value, label]) => (
            <div data-animate key={value}>
              <b>{value}</b>
              <span>{label}</span>
            </div>
          ))}
        </section>

        <section className={styles.section} id="services">
          <div data-animate>
            <span>FOUR CONCIERGE DIVISIONS</span>
            <h2>Whatever you need, one door in.</h2>
            <p>
              Every request is routed to the right concierge team — no navigating departments,
              no chasing vendors.
            </p>
          </div>
          <ServiceCards />
        </section>

        <section className={styles.partnership} aria-labelledby="partnership-heading">
          <figure data-animate>
            <ResponsiveImage image={images.collaboration} sizes="(max-width: 800px) 100vw, 50vw" />
            <figcaption>Connected expertise. Shared ambition.</figcaption>
          </figure>
          <div data-animate>
            <span className={styles.eyebrow}>WHY CADNA</span>
            <h2 id="partnership-heading">Your ambition deserves an accountable partner.</h2>
            <p>Growing a business takes more than a strategy. It takes the right people, the right connections, and someone to see it through.</p>
            <ul>
              <li><b>One point of contact</b><span>A dedicated concierge who understands the whole picture.</span></li>
              <li><b>Expertise that works together</b><span>Business, finance, education and technology, connected around your goals.</span></li>
              <li><b>Support through execution</b><span>A clear plan, a named owner, and accountability through delivery.</span></li>
            </ul>
            <Link to="/about">Get to know CADNA <span aria-hidden="true">↗</span></Link>
          </div>
        </section>

        <section className={styles.section} id="how">
          <div data-animate>
            <span>HOW IT WORKS</span>
            <h2>From request to result, in seven steps.</h2>
          </div>
          <ProcessFlow />
        </section>

        <section className={styles.section} id="packages">
          <div data-animate>
            <span>BUNDLED PACKAGES</span>
            <h2>Built around where you are.</h2>
          </div>
          <div className={styles.packages}>
            {packages.map(([eyebrow, name, features, note]) => (
              <article data-animate key={name}>
                <small>{eyebrow}</small>
                <h3>{name}</h3>
                {features.split('|').map((feature) => (
                  <p key={feature}>{feature}</p>
                ))}
                <span>{note}</span>
              </article>
            ))}
          </div>
          {showSubscriptions && (
            <div className={styles.subscriptions} data-animate>
              <h2>
                Our <em>Subscription Plans</em>
              </h2>
              <p>Choose the plan that works for your business — start light, upgrade as you grow.</p>
              <SubscriptionPlans overlap={planOverlap} />
              <Link to="/packages">View packages & pricing →</Link>
            </div>
          )}
        </section>

        <section className={styles.contact}>
          <div data-animate>
            <h2>
              Begin your
              <br />
              transformation.
            </h2>
            <p>
              Book a complimentary 90-minute diagnostic — we'll assess your business model,
              technology gaps, capital structure, and capability needs.
            </p>
            <Link to="/request">Make a Request →</Link>
          </div>
          <div data-animate>
            <small>LAGOS HEADQUARTERS</small>
            <p>
              Tingo House, 6 Ahmed Onibudo Street
              <br />
              Victoria Island, Lagos, Nigeria
            </p>
            <small>EMAIL</small>
            <a href="mailto:concierge@cadnagsl.com">concierge@cadnagsl.com</a>
            <small>WHATSAPP</small>
            <a href="https://wa.me/2348132590295">+234 813 259 0295</a>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
