import { FadeIn, MotionLink } from '../components/animations/Reveal';
import { CtaReveal } from '../components/animations/CtaReveal';
import { Link } from 'react-router-dom';
import { SiteNav } from '../components/SiteNav';
import { SiteFooter } from '../components/SiteFooter';
import { SubscriptionPlans } from '../components/SubscriptionPlans';
import { requestLink } from '../data/requests';
import styles from './ContentPage.module.css';

export function PackagesPage() {
  return <div><SiteNav active="packages" /><main id="main-content">
    <FadeIn as="section" appear className={styles.hero}><span>PRICING & PACKAGES</span><h1>The right support. A quote built around you.</h1><p>From business guidance to a strategic growth partnership, choose the level of support your business needs. We assess your requirements and provide a clear scope, timeline and tailored quotation.</p><div className={styles.pills}><a href="#subscriptions">Annual subscriptions</a><a href="#bundles">One-time services</a><a href="#custom">Get a tailored quote</a></div></FadeIn>
    <section className={styles.section} id="subscriptions"><span>CADNA BUSINESS GROWTH SUBSCRIPTIONS</span><h2>Understand. Structure. Accelerate. Transform.</h2><p>Paid subscriptions are annual commitments. Access advisory, intelligence, resources and selected concierge support through one connected partner.</p><SubscriptionPlans /><p>Major projects, technology development, third-party costs and capital transactions are scoped separately. The quotation confirms your plan’s services and any additional fees.</p></section>
    <section className={styles.section} id="bundles"><span>ONE-TIME SERVICES</span><h2>Focused expertise for your next priority.</h2><div className={styles.cards}>{[
      ['CADNA Growth Diagnostic', 'Understand your business', 'Assess business health, financial readiness, technology needs and the priorities for growth.', { mode: 'diagnostic', service: 'CADNA Growth Diagnostic', category: 'Other' }],
      ['Business Launch & Scale', 'Build your next stage', 'Connect business structure, growth strategy, market readiness and an execution roadmap.', { mode: 'one-time', category: 'Business' }],
      ['Capital & Financial Engineering', 'Prepare for capital', 'Explore funding readiness, debt, equity and project finance. Transaction mandates have their own scope and agreed success-fee terms.', { mode: 'one-time', category: 'Financial' }],
      ['Technology Concierge', 'Build working systems', 'Define your website, software, automation or digital transformation project around a clear business need.', { mode: 'one-time', category: 'Technology' }],
      ['Talent & Education', 'Strengthen capability', 'Develop leaders, teams and practical workforce skills through a focused engagement.', { mode: 'one-time', category: 'Education' }],
      ['Market Access & Partnerships', 'Connect to opportunity', 'Discuss market entry, strategic introductions and Africa–Asia business opportunities.', { mode: 'one-time', category: 'Other' }],
    ].map(([name, tag, description, request]) => <article key={name}><small>{tag}</small><h3>{name}</h3><p>{description}</p><Link to={requestLink(request)}>One-Time Service Request<span className="srOnly"> — {name}</span> ↗</Link></article>)}</div></section>
    <CtaReveal className={styles.cta} id="custom"><h2>Tell us what you need.</h2><p>Share your business stage, objectives, service priorities and desired level of support. CADNA will recommend the right plan or bespoke engagement and prepare your quotation.</p><div><MotionLink className={styles.primary} to={requestLink({ mode: 'quote' })}>Get Quote →</MotionLink><MotionLink className={styles.secondary} to={requestLink({ mode: 'request' })}>Make a Request</MotionLink></div></CtaReveal>
  </main><SiteFooter /></div>;
}
