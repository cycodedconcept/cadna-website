import { divisions } from '../data/divisions';
import { products, insights, caseStudies } from '../data/growth';

export const siteUrl = (import.meta.env.VITE_SITE_URL || 'https://cadna-website.vercel.app').replace(/\/$/, '');
export const socialImage = `${siteUrl}/images/cadna/cadna-social.jpg`;

const pages = {
  '/': ['The Operating System for African Business Growth', 'CADNA helps entrepreneurs and African businesses strengthen operations, prepare for capital and execute growth plans through strategy, talent and technology.'],
  '/about': ['About CADNA', 'Meet the team and concierge approach connecting business strategy, finance, education and technology through one accountable partner.'],
  '/packages': ['Pricing & Packages', 'Compare annual CADNA growth subscriptions and request a tailored quote for a plan, diagnostic or one-time service.'],
  '/faq': ['Frequently Asked Questions', 'Find answers about CADNA concierge services, annual plans, diagnostics, quotations and how to start a conversation.'],
  '/contact': ['Talk to CADNA', 'Discuss your business goals with CADNA. Start a conversation about growth strategy, funding readiness, team capability or digital operations.'],
  '/request': ['Prepare a Service Request', 'Prepare a detailed service request, explore annual plans and share your priorities with CADNA for a tailored quotation.'],
  '/terms': ['Terms & Conditions', 'Read the CADNA Global Synergy Limited website and service terms.'],
  '/privacy': ['Privacy Policy', 'Read how CADNA handles personal information and service requests.'],
};

export function getPageMetadata(pathname) {
  const path = pathname.replace(/\/$/, '') || '/';
  const division = Object.entries(divisions).find(([key]) => path === `/concierge/${key}`)?.[1];
  const product = products.find(item => path === `/technology/${item.slug}`);
  const insight = insights.find(item => path === `/insights/${item.slug}`);
  const study = caseStudies.find(item => !item.placeholder && path === `/case-studies/${item.slug}`);
  const entry = pages[path] || (division && [division.name, division.description]) || (product && [product.name, product.description]) || (insight && [insight.title, insight.summary]) || (study && [`${study.client} Case Study`, study.headline]);
  const [title, description] = entry || ['Page not found', 'Explore CADNA business growth services or contact our team.'];
  return {
    title: `CADNA — ${title}`,
    description,
    canonical: `${siteUrl}${path === '/' ? '/' : path}`,
    image: socialImage,
    type: insight?.date ? 'article' : 'website',
    robots: !entry || path === '/request' || (insight && !insight.date) ? 'noindex, follow' : 'index, follow',
    found: Boolean(entry),
  };
}

export const pagePaths = [
  ...Object.keys(pages),
  ...Object.keys(divisions).map(key => `/concierge/${key}`),
  ...products.map(item => `/technology/${item.slug}`),
  ...caseStudies.filter(item => !item.placeholder).map(item => `/case-studies/${item.slug}`),
  ...insights.map(item => `/insights/${item.slug}`),
];
