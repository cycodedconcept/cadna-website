export const site = {
  name: 'CADNA Global Synergy Limited',
  email: 'concierge@cadnagsl.com',
  // Existing company destinations from the supplied legacy website.
  social: [
    { label: 'LinkedIn', href: 'https://linkedin.com/company/cadnagsl' },
    { label: 'X', href: 'https://x.com/CADNAGSL' },
  ],
};

export const navigation = [
  { key: 'about', label: 'About', to: '/about' },
  { key: 'services', label: 'Services', to: '/#solutions', dropdown: true },
  { key: 'solutions', label: 'Solutions', to: '/#technology' },
  { key: 'case-studies', label: 'Case Studies', to: '/#case-studies' },
  { key: 'insights', label: 'Insights', to: '/#insights' },
  { key: 'contact', label: 'Contact', to: '/contact' },
];

export function navigationIsActive(item, pathname, hash) {
  if (pathname + hash === item.to) return true;
  if (item.key === 'services') return pathname.startsWith('/concierge/') || pathname === '/packages';
  if (item.key === 'solutions') return pathname.startsWith('/technology/');
  if (item.key === 'case-studies') return pathname.startsWith('/case-studies/');
  if (item.key === 'insights') return pathname.startsWith('/insights/');
  return false;
}
