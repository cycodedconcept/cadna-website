import { Link } from 'react-router-dom';
import { SiteNav } from '../components/SiteNav';
import { SiteFooter } from '../components/SiteFooter';
import { SubscriptionPlans } from '../components/SubscriptionPlans';
import styles from './ContentPage.module.css';

export function PackagesPage({ planOverlap = true }) {
  return <div><SiteNav active="packages"/><main id="main-content"><section className={styles.hero}><span>PACKAGES & PRICING</span><h1>Structured solutions with pricing before commitment.</h1><p>Every engagement starts with a written plan, timeline and price. No open-ended retainers.</p><div className={styles.pills}><a href="#bundles">Project packages</a><a href="#subscriptions">Monthly plans</a><a href="#custom">Custom scope</a></div></section><section className={styles.section} id="bundles"><span>PROJECT PACKAGES</span><div className={styles.cards}>{[['Start Package','₦3M – ₦7.5M','Idea → Launch'],['Scale Package','₦7.5M – ₦25M','Growth → Expansion'],['Trade & Capital','Custom','Trade → Funding']].map(([name,price,tag])=><article key={name}><small>{tag}</small><h2>{name}</h2><b>{price}</b><p>Built from the right mix of business, financial, education and technology concierge services.</p><Link to="/request">Request this package</Link></article>)}</div></section><section className={styles.section} id="subscriptions"><span>MONTHLY PLANS</span><h2>Ongoing support when one request becomes many.</h2><SubscriptionPlans overlap={planOverlap} /></section><section className={styles.cta} id="custom"><h2>Need a custom scope?</h2><p>Tell us what needs to move and we will return a solution plan within 24–48 hours.</p><Link className={styles.primary} to="/request">Make a request →</Link></section></main><SiteFooter/></div>;
}
