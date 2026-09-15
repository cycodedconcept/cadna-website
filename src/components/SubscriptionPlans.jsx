import { Link } from 'react-router-dom';
import { subscriptionPlans } from '../data/subscriptions';
import { requestLink } from '../data/requests';
import styles from './SubscriptionPlans.module.css';

export function SubscriptionPlans() {
  return <div className={`${styles.plans} ${styles.grid}`}>
    {subscriptionPlans.map(plan => <article key={plan.id} className={`${styles.card} ${styles[plan.id]} ${plan.popular ? styles.isActive : ''}`} style={{ '--plan-accent': plan.accent }}>
      {plan.popular && <span className={styles.popular}>Most Popular</span>}
      <h3 className={plan.popular ? styles.hasPopularBadge : ''}>{plan.name}</h3>
      <div className={styles.planTitle}>{plan.title}</div>
      <p>{plan.tagline}</p>
      <div className={styles.price}><b>{plan.price}</b><span>{plan.billing}</span></div>
      <ul>{plan.features.slice(0, 5).map(feature => <li key={feature}><i aria-hidden="true">✓</i>{feature}</li>)}</ul>
      <details className={styles.offerings}><summary>All {plan.features.length} offerings<span className="srOnly"> for {plan.name}</span></summary><ul>{plan.features.slice(5).map(feature => <li key={feature}><i aria-hidden="true">✓</i>{feature}</li>)}</ul></details>
      <Link to={requestLink({ mode: 'subscription', plan: plan.id })} aria-label={`${plan.button} — ${plan.name}`}>{plan.button}</Link>
    </article>)}
  </div>;
}
