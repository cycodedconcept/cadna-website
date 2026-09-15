import { useState } from 'react';
import { StaggerContainer, StaggerItem } from './animations/Reveal';
import { useMotionPreferences } from './animations/MotionProvider';
import { SectionHeading } from './SectionHeading';
import { clients, widerNetwork } from '../data/correctionImages';
import styles from './TrustedBy.module.css';
import growth from './Growth.module.css';

function Brand({ client, duplicate = false }) {
  return client.src ? <img src={client.src} alt={duplicate ? '' : client.name} title={client.name} width={client.width} height={client.height} decoding="async" style={{ width: Math.min(160, client.width), maxHeight: Math.min(66, client.height) }} /> : <span className={styles.brandName}>{client.name}</span>;
}

export function TrustedBy() {
  const [expanded, setExpanded] = useState(false);
  const { enabled } = useMotionPreferences();
  const network = [...clients, ...widerNetwork];
  return <section className={`${growth.section} ${styles.section}`} id="trusted-by" aria-labelledby="trusted-heading">
    <SectionHeading eyebrow="TRUSTED BY" title="Connections built through real work." id="trusted-heading">A selection of the clients and organizations in CADNA’s network.</SectionHeading>
    <div id="client-logos">
      {expanded ? <StaggerContainer className={styles.logos} role="list" aria-label="Our wider network">
        {network.map(client => <StaggerItem role="listitem" className={`${styles.logo} ${client.dark ? styles.dark : ''}`} key={client.name}><Brand client={client} /></StaggerItem>)}
      </StaggerContainer> : enabled ? <div className={styles.carousel} aria-label="Client brands">
        <div className={styles.track}>
          {[false, true].map(duplicate => <div key={String(duplicate)} className={styles.logoGroup} role={duplicate ? undefined : 'list'} aria-hidden={duplicate || undefined}>
            {clients.map(client => <div role={duplicate ? undefined : 'listitem'} className={`${styles.logo} ${client.dark ? styles.dark : ''}`} key={client.name}><Brand client={client} duplicate={duplicate} /></div>)}
          </div>)}
        </div>
      </div> : <div className={styles.logos} role="list" aria-label="Client brands">
        {clients.slice(0, 7).map(client => <div role="listitem" className={`${styles.logo} ${client.dark ? styles.dark : ''}`} key={client.name}><Brand client={client} /></div>)}
      </div>}
    </div>
    <div className={styles.controls}>
      <button className={styles.toggle} type="button" aria-expanded={expanded} aria-controls="client-logos" onClick={() => setExpanded(value => !value)}>{expanded ? 'Show fewer organizations −' : 'Explore our wider network +'}</button>
    </div>
  </section>;
}
