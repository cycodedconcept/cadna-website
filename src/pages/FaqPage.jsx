import { FadeIn, MotionLink } from '../components/animations/Reveal';
import { CtaReveal } from '../components/animations/CtaReveal';
import { useState } from 'react';
import { SiteNav } from '../components/SiteNav';
import { SiteFooter } from '../components/SiteFooter';
import styles from './ContentPage.module.css';
const items = [
  ['What is CADNA Concierge OS?', 'A concierge-driven business operating system that connects strategy, capital, talent and technology through one accountable growth partner.'],
  ['How does pricing work?', 'Tell us your business stage, goals and the support you need. CADNA assesses your requirements and prepares a tailored quotation with a clear scope, timeline and fees before you commit.'],
  ['Are subscriptions monthly or annual?', 'Paid BASIC, PRO and ENTERPRISE plans are annual commitments. LITE is free. The full offerings are available on the Pricing & Packages page.'],
  ['Does a subscription cover every project?', 'Subscriptions provide access, intelligence, advisory and selected concierge support. Major projects, software development, third-party costs and capital transactions are separately scoped and quoted.'],
  ['Can I request a one-time service?', 'Yes. Choose One-Time Service Request for a specific business, financial, education or technology need.'],
  ['What does a diagnostic include?', 'A CADNA Growth Diagnostic reviews business health, your growth score, capital readiness, technology needs and priority recommendations. The team confirms the scope and quote before the engagement.'],
  ['Can you help with more than one need?', 'Yes. CADNA coordinates the relevant teams around your business while keeping one accountable owner.'],
];
export function FaqPage(){const [open,setOpen]=useState(0);return <div><SiteNav active="faq"/><main id="main-content" tabIndex={-1}><FadeIn as="section" appear className={styles.hero}><span>FAQ</span><h1>Questions before you make a request.</h1><p>Everything starts with an honest conversation about what will move your outcome forward.</p></FadeIn><section className={styles.faq}>{items.map(([q,a],i)=><article key={q}><button onClick={()=>setOpen(open===i?-1:i)} aria-expanded={open===i}><b>{q}</b><span>{open===i?'−':'+'}</span></button>{open===i&&<p>{a}</p>}</article>)}</section><CtaReveal className={styles.cta}><h2>Still have a question?</h2><div><MotionLink className={styles.primary} to="/contact">Book a diagnostic <span aria-hidden="true">→</span></MotionLink></div></CtaReveal></main><SiteFooter/></div>}
