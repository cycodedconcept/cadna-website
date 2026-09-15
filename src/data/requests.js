// Public service choices from WEBSITE CORRECTIONS and the revised Master PRD.
// Internal pricing anchors are deliberately excluded from the client bundle.
export const debtOptions = ['Non-Collateral Loans', 'Collateral Loans', 'Proof of Fund', 'Discount Invoicing', 'Purchase Order'];

export const serviceOptions = {
  Business: ['Business Structuring', 'Corporate Strategy', 'Governance', 'Growth Planning', 'Business Launch', 'Operational Transformation', 'Market Expansion'],
  Financial: ['Debt Financing', ...debtOptions, 'Equity Advisory', 'Project Finance', 'Investor Readiness', 'Trade Finance', 'Capital Readiness / Funding Strategy'],
  Education: ['Executive Training', 'Leadership Development', 'Entrepreneurship Programs', 'Workforce Development', 'Recruitment Support'],
  Technology: ['Digital Transformation', 'Software Development', 'AI Integration', 'Automation', 'Website / Digital Presence', 'Custom Web Application', 'Mobile Application', 'Product Strategy / PRD Support', 'AssessAcad', 'GadaFunds', 'Logistics Platform', 'CADNA-Mart'],
  Other: ['Strategic Partnerships', 'International Expansion', 'Africa–Asia Market Access', 'CADNA Growth Diagnostic'],
};

export const requestModes = {
  conversation: { label: 'Start a Growth Conversation', heading: 'Your ambition. Our starting point.' },
  quote: { label: 'Get Quote', heading: 'Tell us what you need. Get a tailored quote.' },
  request: { label: 'Make a Request', heading: 'One request. Connected support.' },
  'one-time': { label: 'One-Time Service Request', heading: 'The right expertise for a specific need.' },
  diagnostic: { label: 'Book a Diagnostic', heading: 'Understand your business. Plan your next move.' },
  subscription: { label: 'Explore a Subscription', heading: 'Choose your next stage of growth.' },
};

export function requestLink({ mode = 'request', category, service, plan, interest } = {}) {
  return `/request?${new URLSearchParams(Object.fromEntries(Object.entries({ mode, category, service, plan, interest }).filter(([, value]) => value)))}`;
}

export const requestStages = ['Idea / Pre-launch', 'Startup / Early Stage', 'Growing Business', 'Established Business', 'Scaling / Expansion', 'Corporate / Enterprise'];
export const budgetOptions = ['Not yet determined', 'Under ₦100,000', '₦100,000 – ₦500,000', '₦500,000 – ₦1,000,000', '₦1,000,000 – ₦5,000,000', '₦5,000,000 – ₦15,000,000', '₦15,000,000+', 'Recommend an appropriate budget'];
