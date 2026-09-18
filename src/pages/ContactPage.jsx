import { Link } from 'react-router-dom';
import { SiteNav } from '../components/SiteNav';
import { SiteFooter } from '../components/SiteFooter';
import { ContactForm } from '../components/ContactForm';
import { ResponsiveImage } from '../components/ResponsiveImage';
import { images } from '../data/images';
import { site } from '../data/site';
import styles from './ContactPage.module.css';
import growth from '../components/Growth.module.css';

export function ContactPage() {
  return <><SiteNav /><main id="main-content" tabIndex={-1}>
    <header className={styles.intro}><span className={growth.eyebrow}>LET’S FIND YOUR NEXT STEP</span><h1>Talk to CADNA.</h1><p>Building, scaling or improving the way your business works? Tell us what you want to achieve and where you need support.</p></header>
    <div className={styles.layout}>
      <ContactForm />
      <aside className={styles.details} aria-labelledby="contact-details-heading">
        <h2 id="contact-details-heading">Start a conversation.</h2>
        <address><div><small>EMAIL</small><a href={`mailto:${site.email}`}>{site.email}</a></div></address>
        <ResponsiveImage image={images.listening} sizes="(max-width: 850px) 100vw, 35vw" />
        <div className={styles.diagnostic}><h3>Need a more detailed assessment?</h3><p>A CADNA Growth Diagnostic explores business health, capital readiness, technology needs and growth priorities. The team confirms the scope and quote before you commit.</p><Link to="/request?mode=diagnostic">Book a Growth Diagnostic <span aria-hidden="true">↗</span></Link><Link to="/request?mode=quote">Prepare a detailed service request <span aria-hidden="true">↗</span></Link></div>
      </aside>
    </div>
  </main><SiteFooter /></>;
}
