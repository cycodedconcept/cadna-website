import { Link } from 'react-router-dom';
import logo from '../assets/cadna-logo-white.png';
import styles from './SiteFooter.module.css';

export function SiteFooter() {
  return <footer className={styles.footer}>
    <div><Link to="/" aria-label="CADNA home"><img src={logo} alt="CADNA GSL" /></Link><p>The operating system for African business growth.</p><span className={styles.pillars}>Strategy × Capital × Talent × Technology</span></div>
    <div><b>SOLUTIONS</b><Link to="/concierge/business">Business Concierge</Link><Link to="/concierge/education">Education Concierge</Link><Link to="/concierge/financial">Financial Concierge</Link><Link to="/concierge/technology">Technology Concierge</Link><Link to="/packages">Packages & Pricing</Link></div>
    <div><b>EXPLORE CADNA</b><Link to="/about">About & Leadership</Link><Link to="/#industries">Industries</Link><Link to="/#case-studies">Case Studies</Link><Link to="/#insights">Insights</Link><Link to="/faq">FAQ</Link></div>
    <div><b>LET’S CONNECT</b><Link to="/request">Start a Growth Conversation ↗</Link><Link to="/contact">Contact & Diagnostic</Link><a href="mailto:concierge@cadnagsl.com">concierge@cadnagsl.com</a><a href="https://wa.me/2348132590295">+234 813 259 0295</a><p>Lagos, Nigeria<br />Connected across markets.</p></div>
    <small>© {new Date().getFullYear()} CADNA Global Synergy Limited.</small>
  </footer>;
}
