import { Link } from 'react-router-dom';
import hero from '../assets/hero-circle.png';
import { SiteNav } from '../components/SiteNav';
import { SiteFooter } from '../components/SiteFooter';
import { useReveal } from '../hooks/useReveal';
import { divisions } from '../data/divisions';
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
      <main>
        <section className={styles.hero}>
          <div>
            <span>CADNA CONCIERGE OS</span>
            <h1>
              One request.
              <br />
              Complete
              <br />
              <em>solutions.</em>
            </h1>
            <p>
              Tell us what you need — business, finance, education, or technology. We handle
              everything from strategy to execution.
            </p>
            <div className={styles.actions}>
              <Link to="/request">Make a Request →</Link>
              <small>Response within 2–6 hours</small>
            </div>
          </div>
          <div className={styles.art}>
            <i />
            <b />
            <strong />
            <img src={hero} alt="CADNA Concierge OS" />
          </div>
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
          <div className={styles.divisions}>
            {Object.entries(divisions).map(([key, division]) => (
              <Link data-animate key={key} to={`/concierge/${key}`}>
                <small>{division.number}</small>
                <h3>{division.name}</h3>
                <p>{division.description}</p>
                <b>Explore division →</b>
              </Link>
            ))}
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
