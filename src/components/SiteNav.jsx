import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useMotionValueEvent, useScroll } from 'framer-motion';
import logo from '../assets/cadna-logo-white.webp';
import { solutions } from '../data/growth';
import { navigation, navigationIsActive } from '../data/site';
import styles from './SiteNav.module.css';

export function SiteNav() {
  const { pathname, hash } = useLocation();
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeTimer = useRef(null);
  const header = useRef(null);
  const [scrolled, setScrolled] = useState(false);
  const scrolledRef = useRef(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', position => {
    const next = position > 24;
    if (next !== scrolledRef.current) { scrolledRef.current = next; setScrolled(next); }
  });

  function closeMenus() {
    window.clearTimeout(closeTimer.current);
    setServicesOpen(false);
    setMobileOpen(false);
  }

  useEffect(() => {
    const query = window.matchMedia('(min-width: 1101px)');
    const closeOutside = event => { if (!header.current?.contains(event.target)) closeMenus(); };
    query.addEventListener('change', closeMenus);
    document.addEventListener('pointerdown', closeOutside);
    return () => {
      window.clearTimeout(closeTimer.current);
      query.removeEventListener('change', closeMenus);
      document.removeEventListener('pointerdown', closeOutside);
    };
  }, []);

  return <header ref={header} className={`${styles.nav} ${scrolled || mobileOpen || servicesOpen ? styles.scrolled : ''}`} data-scrolled={scrolled}
    onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) closeMenus(); }}
    onKeyDown={event => {
      if (event.key === 'Escape' && (servicesOpen || mobileOpen)) {
        const control = servicesOpen ? 'services-navigation' : 'primary-navigation';
        if (servicesOpen) setServicesOpen(false); else closeMenus();
        window.clearTimeout(closeTimer.current);
        event.currentTarget.querySelector(`[aria-controls="${control}"]`)?.focus();
      }
    }}>
    <div className={styles.inner}>
      <Link to="/" className={styles.logo} onClick={closeMenus} aria-label="CADNA home"><img src={logo} alt="CADNA GSL" width="218" height="60" /></Link>
      <Link className={styles.mobileCta} to="/contact" onClick={closeMenus}>Talk to CADNA <span aria-hidden="true">↗</span></Link>
      <button className={`${styles.hamburger} ${mobileOpen ? styles.hamburgerOpen : ''}`} type="button" aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={mobileOpen} aria-controls="primary-navigation" onClick={() => { setMobileOpen(value => !value); setServicesOpen(false); }}><span /><span /><span /></button>
      <nav id="primary-navigation" className={`${styles.links} ${mobileOpen ? styles.mobileOpen : ''}`} aria-label="Primary navigation">
        {navigation.map(item => item.dropdown ? <div key={item.key} className={styles.services}
          onPointerEnter={event => { if (event.pointerType === 'mouse' && window.matchMedia('(min-width: 1101px)').matches) { window.clearTimeout(closeTimer.current); setServicesOpen(true); } }}
          onPointerLeave={event => { if (event.pointerType === 'mouse' && !event.currentTarget.contains(document.activeElement) && window.matchMedia('(min-width: 1101px)').matches) { window.clearTimeout(closeTimer.current); closeTimer.current = window.setTimeout(() => setServicesOpen(false), 250); } }}
          onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setServicesOpen(false); }}>
          <button className={navigationIsActive(item, pathname, hash) ? styles.active : ''} type="button" aria-expanded={servicesOpen} aria-controls="services-navigation" onClick={() => { window.clearTimeout(closeTimer.current); setServicesOpen(value => !value); }}>{item.label}<svg aria-hidden="true" viewBox="0 0 10 6" className={servicesOpen ? styles.rotated : ''}><path d="M1 1.5L5 5 9 1.5" /></svg></button>
          {servicesOpen && <div id="services-navigation" className={styles.menu}>
            {solutions.map(solution => <Link key={solution.key} to={solution.to} onClick={closeMenus} aria-current={pathname === solution.to ? 'page' : undefined}><b>{solution.number}</b><span><strong>{solution.title}</strong><small>{solution.outcome}</small></span></Link>)}
            <Link className={styles.menuPackages} to="/#solutions" onClick={closeMenus}>Explore all services →</Link>
            <Link to="/packages" onClick={closeMenus}>Pricing & Packages →</Link>
          </div>}
        </div> : <Link key={item.key} to={item.to} onClick={closeMenus} className={navigationIsActive(item, pathname, hash) ? styles.active : ''} aria-current={pathname + hash === item.to ? (hash ? 'location' : 'page') : undefined}>{item.label}</Link>)}
        <Link className={styles.cta} to="/contact" onClick={closeMenus}>Talk to CADNA <span aria-hidden="true">↗</span></Link>
      </nav>
    </div>
  </header>;
}
