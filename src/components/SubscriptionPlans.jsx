import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './SubscriptionPlans.module.css';

const plans = [
  {
    name: 'Lite (Free Forever)',
    accent: '#16a34a',
    button: 'Start Free',
    tone: 'lite',
    layer: 1,
    offset: 92,
    features: [
      'One request per quarter',
      'Business health checklist',
      'Weekly business tips',
      'Email support',
      'Access to public webinars',
    ],
    tagline: 'For founders testing the waters — get to know how we work.',
  },
  {
    name: 'Basic Concierge',
    accent: '#22384f',
    button: 'Choose Basic',
    tone: 'basic',
    layer: 2,
    offset: 42,
    features: [
      'Up to 3 requests per month',
      'All four service divisions',
      'Advisory & strategy support',
      'Response within 6 hours',
      'Vendor sourcing & vetting',
      'Monthly business review',
    ],
    tagline: 'For small businesses that need steady advisory cover.',
  },
  {
    name: 'Pro Concierge',
    accent: '#1877F2',
    button: 'Upgrade Now',
    tone: 'pro',
    popular: true,
    layer: 4,
    offset: 0,
    features: [
      'Unlimited requests',
      'Priority execution queue',
      'Dedicated concierge lead',
      'Response within 4 hours',
      'Funding readiness support',
      'Automation & tech builds',
      'Quarterly strategy session',
    ],
    tagline: 'Ideal for growing companies with multi-division needs.',
  },
  {
    name: 'Enterprise',
    accent: '#e4aa10',
    button: 'Talk to Sales',
    tone: 'enterprise',
    layer: 3,
    offset: 36,
    features: [
      'Dedicated concierge team',
      'Named account manager',
      'Full four-division coverage',
      'Response within 2 hours',
      'Trade & capital structuring',
      'Board-level reporting',
      'SLA-based support',
      'Custom onboarding',
    ],
    tagline: 'Built for large-scale operations with custom requirements.',
  },
];

const defaultActivePlan = plans.findIndex((plan) => plan.popular);

export function SubscriptionPlans({ overlap = true }) {
  const [activeIndex, setActiveIndex] = useState(defaultActivePlan === -1 ? 0 : defaultActivePlan);

  return (
    <div className={`${styles.plans} ${overlap ? styles.overlap : styles.grid}`}>
      {plans.map((plan, index) => {
        const isActive = index === activeIndex;

        return (
          <article
            key={plan.name}
            className={`${styles.card} ${styles[plan.tone]} ${isActive ? styles.isActive : ''}`}
            role="button"
            tabIndex={0}
            aria-pressed={isActive}
            onClick={() => setActiveIndex(index)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                setActiveIndex(index);
              }
            }}
            style={{
              '--plan-accent': plan.accent,
              '--stack-offset': `${plan.offset}px`,
              zIndex: isActive ? plans.length + 2 : plan.layer,
            }}
          >
            {plan.popular && <span className={styles.popular}>Most Popular</span>}
            <h3 className={plan.popular ? styles.hasPopularBadge : ''}>{plan.name}</h3>
            <p>{plan.tagline}</p>
            <ul>
              {plan.features.map((feature) => (
                <li key={feature}>
                  <i>✓</i>
                  {feature}
                </li>
              ))}
            </ul>
            <Link to="/request">{plan.button}</Link>
          </article>
        );
      })}
    </div>
  );
}
