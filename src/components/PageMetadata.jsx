import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { divisions } from '../data/divisions';
import { products, insights, caseStudies } from '../data/growth';

const pages = {
  '/': ['The Operating System for African Business Growth', 'We help ambitious African businesses transform ideas, opportunities and capital into structured, scalable enterprises. Strategy × Capital × Talent × Technology.'],
  '/about': ['About CADNA', 'Meet the concierge approach that brings business, finance, education and technology together with one accountable owner.'],
  '/packages': ['Packages & Pricing', 'Explore CADNA project packages and ongoing concierge plans, with a clear scope and pricing before commitment.'],
  '/faq': ['Frequently Asked Questions', 'Find answers about CADNA concierge services, response times, pricing and how to make a request.'],
  '/contact': ['Talk to Our Team', 'Start with a complimentary business diagnostic. Talk to the CADNA team about your goals and the support you need.'],
  '/request': ['Start a Growth Conversation', 'Prepare your business brief and start a growth conversation with CADNA.'],
};

export function PageMetadata() {
  const { pathname } = useLocation();

  useEffect(() => {
    const division = divisions[pathname.split('/concierge/')[1]];
    const slug = pathname.split('/')[2];
    const item = pathname.startsWith('/technology/') ? products.find(item => item.slug === slug) : pathname.startsWith('/insights/') ? insights.find(item => item.slug === slug) : pathname.startsWith('/case-studies/') ? caseStudies.find(item => item.slug === slug && !item.placeholder) : null;
    const [title, description] = item ? [item.name || item.title || item.client, item.description || item.summary || item.headline] : division
      ? [division.name, division.description]
      : pages[pathname] || ['Page not found', 'Explore CADNA business growth solutions.'];
    document.title = `${title} | CADNA Global Synergy Limited`;
    const values = {
      description,
      'og:title': document.title,
      'og:description': description,
      'og:image': new URL(`${import.meta.env.BASE_URL}images/cadna/cadna-social.jpg`, window.location.origin).href,
      'twitter:title': document.title,
      'twitter:description': description,
      'twitter:image': new URL(`${import.meta.env.BASE_URL}images/cadna/cadna-social.jpg`, window.location.origin).href,
    };
    Object.entries(values).forEach(([name, content]) => {
      const attribute = name.startsWith('og:') ? 'property' : 'name';
      let meta = document.head.querySelector(`meta[${attribute}="${name}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attribute, name);
        document.head.appendChild(meta);
      }
      meta.content = content;
    });
  }, [pathname]);

  return null;
}
