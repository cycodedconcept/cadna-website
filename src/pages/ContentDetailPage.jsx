import { Link, useParams } from 'react-router-dom';
import { SiteNav } from '../components/SiteNav';
import { SiteFooter } from '../components/SiteFooter';
import { CTASection } from '../components/CTASection';
import { ProductArtwork } from '../components/ProductCard';
import { ResponsiveImage } from '../components/ResponsiveImage';
import { FadeIn, MotionLink } from '../components/animations/Reveal';
import { ImageReveal } from '../components/animations/ImageReveal';
import { products, caseStudies, insights, growthRequest } from '../data/growth';
import growth from '../components/Growth.module.css';
import styles from './ContentDetailPage.module.css';

export function NotFoundPage() {
  return <><SiteNav /><main id="main-content" className={styles.notFound}><span className={growth.eyebrow}>PAGE NOT FOUND</span><h1>Let’s get you back on course.</h1><p>This page isn’t available. Explore our solutions or start a conversation with the CADNA team.</p><Link className={growth.primaryButton} to="/">Back to home →</Link></main><SiteFooter /></>;
}

export function ContentDetailPage({ kind }) {
  const { slug } = useParams();
  const list = kind === 'product' ? products : kind === 'case' ? caseStudies : insights;
  const item = list.find(entry => entry.slug === slug && !entry.placeholder);
  if (!item) return <NotFoundPage />;
  const back = kind === 'product' ? ['Technology portfolio', '/#technology'] : kind === 'case' ? ['Case studies', '/#case-studies'] : ['Insights', '/#insights'];
  const title = kind === 'product' ? item.name : kind === 'case' ? item.client : item.title;
  const description = kind === 'product' ? item.description : kind === 'case' ? item.headline : item.summary;

  return <><SiteNav active={kind === 'product' ? 'technology' : kind === 'case' ? 'case-studies' : 'insights'} />
    <main id="main-content">
      <section className={styles.hero}>
        <div><Link className={styles.back} to={back[1]}>← {back[0]}</Link><FadeIn as="span" appear className={growth.eyebrow}>{item.category}</FadeIn><FadeIn as="h1" appear delay={0.12}>{title}</FadeIn><FadeIn as="p" appear delay={0.24}>{description}</FadeIn>
          {kind === 'product' && <div className={styles.heroMeta}><span className={growth.status}>{item.status}</span><MotionLink className={growth.primaryButton} to={growthRequest(item.name, 'Technology')}>Discuss {item.name} <span aria-hidden="true">↗</span></MotionLink></div>}
          {kind === 'insight' && <div className={styles.articleMeta}><span>Editorial preview · Unpublished</span><span>Publication date pending</span><span>{item.readingTime} min read</span></div>}
        </div>
        <ImageReveal appear delay={0.2} className={kind === 'product' ? styles.productVisual : styles.visual}>
          {kind === 'product' ? <ProductArtwork image={item.image} /> : <ResponsiveImage image={item.image} priority sizes="(max-width: 850px) 100vw, 50vw" />}
        </ImageReveal>
      </section>
      {kind === 'product' && <section className={styles.productDetails}><div><span className={growth.eyebrow}>BUILT AROUND A BUSINESS NEED</span><h2>Start with your use case.</h2><p>Explore the solution with our team and discuss how it supports your organization’s business goals.</p><ul>{item.focus.map(focus => <li key={focus}>{focus}</li>)}</ul></div><aside><h2>Talk through the possibilities.</h2><p>The visuals show a product preview. Current availability, access and scope are confirmed by the CADNA team.</p><Link className={growth.textLink} to={growthRequest(item.name, 'Technology')}>Start a conversation <span aria-hidden="true">↗</span></Link><Link className={growth.textLink} to="/concierge/technology">Explore Technology Concierge <span aria-hidden="true">↗</span></Link></aside></section>}
      {kind === 'case' && <><section className={styles.outcomes} aria-label="Case study outcomes">{item.metrics.map(([value, label]) => <div key={label}><b>{value}</b><span>{label}</span></div>)}</section><article className={styles.article}>{[['The challenge', item.challenge], ['CADNA intervention', item.role], ['The connected solution', item.solution], ['The outcome', item.outcome]].map(([heading, text], index) => <FadeIn as="section" key={heading}><span className={growth.eyebrow}>0{index + 1}</span><h2>{heading}</h2><p>{text}</p></FadeIn>)}</article></>}
      {kind === 'insight' && <article className={styles.article}>{item.sections.map(([heading, text]) => <section key={heading}><h2>{heading}</h2><p>{text}</p></section>)}<aside className={styles.draftNote}>This article is an editorial preview. Publication details will be added when the article is finalized.</aside><Link className={growth.textLink} to={growthRequest(item.title)}>Discuss this topic with CADNA <span aria-hidden="true">↗</span></Link></article>}
      <CTASection />
    </main><SiteFooter />
  </>;
}
