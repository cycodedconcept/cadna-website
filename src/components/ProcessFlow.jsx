import styles from "./ProcessFlow.module.css";

const steps = [
  [
    "01",
    "Submit your request",
    "Tell us what you need via the web form or WhatsApp — a few minutes is all it takes.",
    "#1877F2",
    "M4 4h16v13H7l-3 3z",
  ],
  [
    "02",
    "Smart routing",
    "Your request is analyzed by category, budget, urgency, and complexity, then routed to the right team.",
    "#2f8ff5",
    "M12 3v18M4 8l8-5 8 5M4 16l8 5 8-5",
  ],
  [
    "03",
    "Concierge assigned",
    "A dedicated concierge reaches out within 2–6 hours to clarify your requirements.",
    "#00a8e8",
    "M16 20v-2a4 4 0 0 0-8 0v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
  ],
  [
    "04",
    "Solution plan delivered",
    "Within 24–48 hours you receive the problem analysis, recommended solution, timeline, and pricing.",
    "#00c2c7",
    "M4 4h12l4 4v12H4zM8 11h8M8 15h5",
  ],
  [
    "05",
    "Approve & pay",
    "Proceed with full payment or milestones — securely via Paystack or bank transfer.",
    "#19c9a3",
    "M2 9h20M4 5h16v14H4zM8 15h4",
  ],
  [
    "06",
    "Execution",
    "Delivered by our internal teams, approved partners, or a hybrid of both.",
    "#3fd18f",
    "M12 3l2.6 5.6 6.1.7-4.5 4.2 1.2 6-5.4-3-5.4 3 1.2-6L3.3 9.3l6.1-.7z",
  ],
  [
    "07",
    "Track to delivery",
    "Follow status, communication logs, documents, and payments in your dashboard until completion.",
    "#5bd3a8",
    "M20 6L9 17l-5-5",
  ],
];

function Step({ step, last = false }) {
  const [number, title, description, color, icon] = step;
  return (
    <article className={styles.step} style={{ "--step-color": color }}>
      <span className={last ? styles.noConnector : styles.connector} />
      <div className={styles.icon}>
        <svg viewBox="0 0 24 24">
          <path d={icon} />
        </svg>
      </div>
      <div className={styles.copy}>
        <div className={styles.label}>
          <b>{number}</b>
          <small>STEP</small>
        </div>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </article>
  );
}

export function ProcessFlow() {
  return (
    <div className={styles.flow} data-animate>
      <div className={styles.row}>
        {steps.slice(0, 4).map((step, index) => (
          <Step key={step[0]} step={step} last={index === 3} />
        ))}
      </div>
      <div className={styles.row}>
        {steps.slice(4).map((step, index) => (
          <Step key={step[0]} step={step} last={index === 2} />
        ))}
      </div>
    </div>
  );
}
