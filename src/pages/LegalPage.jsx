import { SiteNav } from '../components/SiteNav';
import { SiteFooter } from '../components/SiteFooter';
import { legalDocuments } from '../data/legal';
import styles from './LegalPage.module.css';

export function LegalPage({ kind }) {
  const document = legalDocuments[kind];
  return <><SiteNav /><main id="main-content" className={styles.page}>
    <header><span>CADNA GLOBAL SYNERGY LIMITED</span><h1>{document.title}</h1><p>Effective {document.date} · Version {document.version}</p></header>
    <article>{document.content.split('\n').map((line, index) => /^\d+\. [A-Z][A-Z &/–-]+$/.test(line) ? <h2 key={index}>{line}</h2> : <p className={line.startsWith('') ? styles.bullet : undefined} key={index}>{line.replace(/^/, '•')}</p>)}</article>
  </main><SiteFooter /></>;
}
