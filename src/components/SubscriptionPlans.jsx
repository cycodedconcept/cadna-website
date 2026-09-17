import { useState } from 'react';
import { Link } from 'react-router-dom';
import { subscriptionPlans } from '../data/subscriptions';
import { requestLink } from '../data/requests';
import styles from './SubscriptionPlans.module.css';

export function SubscriptionPlans() {
  const [activePlan, setActivePlan] = useState(subscriptionPlans.find(plan => plan.popular)?.id || subscriptionPlans[0].id);

  return <div className={`${styles.plans} ${styles.grid}`}>
    {subscriptionPlans.map(plan => <article key={plan.id} className={`${styles.card} ${styles[plan.id]} ${activePlan === plan.id ? styles.isActive : ''}`} data-selected={activePlan === plan.id} style={{ '--plan-accent': plan.accent }} onClick={event => {
      if (!event.target.closest('a, button, details')) setActivePlan(plan.id);
    }}>
      {plan.popular && <span className={styles.popular}>Most Popular</span>}
      <div className={styles.cardHeader}>
        <h3>{plan.name}</h3>
        <button type="button" className={styles.selectPlan} aria-label={`Select ${plan.name} plan`} aria-pressed={activePlan === plan.id} onClick={() => setActivePlan(plan.id)}>
          <span className={styles.selectionMark} aria-hidden="true">{activePlan === plan.id ? '✓' : ''}</span>
          <span>{activePlan === plan.id ? 'Selected' : 'Select plan'}</span>
        </button>
      </div>
      <div className={styles.planTitle}>{plan.title}</div>
      <p>{plan.tagline}</p>
      <div className={styles.price}><b>{plan.price}</b><span>{plan.billing}</span></div>
      <ul>{plan.features.slice(0, 5).map(feature => <li key={feature}><i aria-hidden="true">✓</i>{feature}</li>)}</ul>
      <details className={styles.offerings}><summary>All {plan.features.length} offerings<span className="srOnly"> for {plan.name}</span></summary><ul>{plan.features.slice(5).map(feature => <li key={feature}><i aria-hidden="true">✓</i>{feature}</li>)}</ul></details>
      <Link to={requestLink({ mode: 'subscription', plan: plan.id })} aria-label={`${plan.button} — ${plan.name}`}>{plan.button}</Link>
    </article>)}
  </div>;
}
