import { Link } from 'react-router-dom';
import { StaggerItem } from './animations/Reveal';
import { ResponsiveImage } from './ResponsiveImage';
import { Icon } from './Icon';
import { growthRequest } from '../data/growth';
import styles from './Growth.module.css';

export function AudienceCard({ audience }) {
  return <StaggerItem as="article" className={styles.audienceCard}><Icon name={audience.icon} size={28} /><small>{audience.stage}</small><h3>{audience.title}</h3><p>{audience.description}</p><details className={styles.cardDetails}><summary>Explore your growth priorities<span className="srOnly"> — {audience.title}</span></summary><ul>{audience.priorities.map(priority => <li key={priority}>{priority}</li>)}</ul></details><Link className={styles.textLink} to={growthRequest(audience.title)}>Let's talk <span aria-hidden="true">↗</span><span className="srOnly"> about support for {audience.title}</span></Link></StaggerItem>;
}

export function IndustryCard({ industry }) {
  return <StaggerItem as="article" className={styles.industryCard}><Icon name={industry.icon} size={28} /><h3>{industry.title}</h3><p>{industry.description}</p><details className={styles.cardDetails}><summary>Explore support<span className="srOnly"> for {industry.title}</span></summary><ul>{industry.priorities.map(priority => <li key={priority}>{priority}</li>)}</ul><Link className={styles.textLink} to={growthRequest(industry.title)}>Discuss your business <span aria-hidden="true">↗</span></Link></details></StaggerItem>;
}

export function CaseStudyCard({ study }) {
  return <StaggerItem as="article" className={`${styles.caseCard} ${study.placeholder ? styles.placeholderCard : ''}`}>
    <div className={styles.caseImage}>{study.image ? <><ResponsiveImage image={study.image} sizes="(max-width: 600px) 100vw, (max-width: 850px) 50vw, 33vw" /><small className={styles.imageNote}>Illustrative image</small></> : <div className={styles.casePlaceholder}><Icon name="growth" size={46} /><b>{study.number}</b></div>}<span>{study.placeholder ? 'CASE STUDY FORTHCOMING' : study.category}</span></div>
    <div className={styles.cardBody}><small className={styles.eyebrow}>{study.client}</small><h3>{study.headline}</h3>
      <dl className={styles.caseFacts}>{[['Challenge', study.challenge], ['CADNA intervention', study.role], ['Solution', study.solution], ['Outcome', study.outcome]].map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
      {study.placeholder ? <Link className={styles.textLink} to="/contact">Discuss your business <span aria-hidden="true">↗</span></Link> : <Link className={styles.textLink} to={`/case-studies/${study.slug}`}>Explore the case study <span aria-hidden="true">↗</span></Link>}
    </div>
  </StaggerItem>;
}

export function LeadershipCard({ person }) {
  return <StaggerItem as="article" className={styles.leadershipCard}>
    {person.image ? <div className={styles.portraitFrame}><ResponsiveImage className={styles.portrait} image={person.image} sizes="(max-width: 600px) 100vw, (max-width: 850px) 50vw, 33vw" style={person.image.objectPosition ? { objectPosition: person.image.objectPosition } : undefined} /></div> : <div className={styles.portraitPlaceholder} role="img" aria-label={`Portrait of ${person.name} forthcoming`}><Icon name="person" size={72} /><b>{person.initials}</b><small>PORTRAIT FORTHCOMING</small></div>}
    <div className={styles.leadershipBody}>
    <h3>{person.name}</h3><span className={styles.role}>{person.title}</span>
    <div className={styles.expertise}><small>EXPERTISE</small><ul>{person.expertise.map(area => <li key={area}>{area}</li>)}</ul></div>
    <p>{person.biography}</p>
    {person.linkedin ? <a className={styles.profileLink} href={person.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`${person.name} on LinkedIn`}>LinkedIn <span aria-hidden="true">↗</span></a> : <span className={`${styles.profileLink} ${styles.profilePending}`}>LinkedIn profile forthcoming</span>}
    </div>
  </StaggerItem>;
}

export function InsightCard({ article }) {
  return <StaggerItem as="article" className={styles.insightCard}><Link to={`/insights/${article.slug}`} className={styles.insightImage} aria-label={`Read preview: ${article.title}`}><ResponsiveImage image={article.image} sizes="(max-width: 760px) 100vw, 33vw" /></Link><div className={styles.cardBody}><div className={styles.meta}><span>{article.category}</span><span className={styles.status}>Editorial preview</span></div><h3><Link to={`/insights/${article.slug}`}>{article.title}</Link></h3><p>{article.summary}</p><div className={styles.readingMeta}>{article.date ? <time dateTime={article.date}>{new Date(`${article.date}T00:00:00`).toLocaleDateString('en-GB', {day:'numeric',month:'short',year:'numeric'})}</time> : <span>Publication date pending</span>}<span>{article.readingTime} min read</span></div><Link className={styles.textLink} to={`/insights/${article.slug}`} aria-label={`Read more: ${article.title} (editorial preview)`}>Read More <span aria-hidden="true">↗</span></Link></div></StaggerItem>;
}
