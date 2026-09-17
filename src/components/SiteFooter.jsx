import { Link } from 'react-router-dom';
import logo from '../assets/cadna-logo-white.webp';
import { navigation, site } from '../data/site';
import styles from './SiteFooter.module.css';

export function SiteFooter() {
  return <footer className={styles.footer}>
    <div><Link to="/" aria-label="CADNA home"><img src={logo} alt="CADNA GSL" width="218" height="60" /></Link><p>The operating system for African business growth.</p><span className={styles.pillars}>Strategy × Capital × Talent × Technology</span><div className={styles.social}>{site.social.map(link => <a key={link.label} href={link.href}>{link.label} <span aria-hidden="true">↗</span></a>)}</div></div>
    <div><b>SERVICES</b><Link to="/concierge/business">Business Concierge</Link><Link to="/concierge/education">Education Concierge</Link><Link to="/concierge/financial">Financial Concierge</Link><Link to="/concierge/technology">Technology Concierge</Link><Link to="/packages">Packages & Pricing</Link><Link to="/request">Detailed service request</Link></div>
    <div><b>EXPLORE CADNA</b>{navigation.map(item => <Link key={item.key} to={item.to}>{item.label}</Link>)}<Link to="/#industries">Industries</Link><Link to="/faq">FAQ</Link></div>
    <div><b>LET’S CONNECT</b><Link to="/contact">Talk to CADNA ↗</Link><a href={`mailto:${site.email}`}>{site.email}</a><a href={site.whatsapp}>{site.phone}</a><p>{site.address}</p></div>
    <small>© {new Date().getFullYear()} CADNA Global Synergy Limited. <Link to="/terms">Terms & Conditions</Link> · <Link to="/privacy">Privacy Policy</Link></small>
  </footer>;
}
