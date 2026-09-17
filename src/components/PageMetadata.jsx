import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getPageMetadata } from '../utils/metadata';

export function PageMetadata() {
  const { pathname } = useLocation();
  useEffect(() => {
    const page = getPageMetadata(pathname);
    document.title = page.title;
    const values = {
      description: page.description, robots: page.robots,
      'og:title': page.title, 'og:description': page.description, 'og:url': page.canonical,
      'og:type': page.type, 'og:image': page.image,
      'twitter:title': page.title, 'twitter:description': page.description, 'twitter:image': page.image,
    };
    Object.entries(values).forEach(([name, content]) => {
      const attribute = name.startsWith('og:') ? 'property' : 'name';
      let meta = document.head.querySelector(`meta[${attribute}="${name}"]`);
      if (!meta) { meta = document.createElement('meta'); meta.setAttribute(attribute, name); document.head.appendChild(meta); }
      meta.content = content;
    });
    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) { canonical = document.createElement('link'); canonical.rel = 'canonical'; document.head.appendChild(canonical); }
    canonical.href = page.canonical;
  }, [pathname]);
  return null;
}
