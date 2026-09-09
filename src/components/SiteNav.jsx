import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useMotionValueEvent, useScroll } from 'framer-motion';
import logo from '../assets/cadna-logo-white.png';
import { solutions } from '../data/growth';
import styles from './SiteNav.module.css';

const links = [
  ['capital', 'Capital', '/concierge/financial'],
  ['technology', 'Technology', '/concierge/technology'],
  ['industries', 'Industries', '/#industries'],
  ['case-studies', 'Case Studies', '/#case-studies'],
  ['insights', 'Insights', '/#insights'],
  ['about', 'About', '/about'],
];

export function SiteNav({ active = '' }) {
  const location = useLocation();
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeTimerRef = useRef(null);
  const [scrolled, setScrolled] = useState(() => window.scrollY > 24);
  const scrolledRef = useRef(scrolled);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (position) => {
    const next = position > 24;
    if (next !== scrolledRef.current) {
      scrolledRef.current = next;
      setScrolled(next);
    }
  });

  useEffect(() => () => window.clearTimeout(closeTimerRef.current), []);
  useEffect(() => {
    const query = window.matchMedia('(min-width: 1101px)');
    const reset = () => { setMobileOpen(false); setServicesOpen(false); };
    query.addEventListener('change', reset);
    return () => query.removeEventListener('change', reset);
  }, []);

  function openServices() {
    window.clearTimeout(closeTimerRef.current);
    setServicesOpen(true);
  }

  function scheduleServicesClose() {
    window.clearTimeout(closeTimerRef.current);
    closeTimerRef.current = window.setTimeout(() => setServicesOpen(false), 350);
  }

  function closeMenus() {
    window.clearTimeout(closeTimerRef.current);
    setServicesOpen(false);
    setMobileOpen(false);
  }

  return (
    <header
      className={`${styles.nav} ${scrolled || mobileOpen || servicesOpen ? styles.scrolled : ''}`}
      data-scrolled={scrolled}
      onKeyDown={(event) => {
        if (event.key === 'Escape' && (servicesOpen || mobileOpen)) {
          const control = mobileOpen ? 'primary-navigation' : 'services-navigation';
          closeMenus();
          event.currentTarget.querySelector(`[aria-controls="${control}"]`)?.focus();
        }
      }}
    >
      <div className={styles.inner}>
        <Link to="/" className={styles.logo} onClick={closeMenus} aria-label="CADNA home">
          <img src={logo} alt="CADNA GSL" />
        </Link>

        <Link className={styles.mobileCta} to="/request" onClick={closeMenus} aria-label="Start a Growth Conversation">Let’s talk <span aria-hidden="true">↗</span></Link>
        <button
          className={`${styles.hamburger} ${mobileOpen ? styles.hamburgerOpen : ''}`}
          type="button"
          aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={mobileOpen}
          aria-controls="primary-navigation"
          onClick={() => setMobileOpen((isOpen) => !isOpen)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav
          id="primary-navigation"
          className={`${styles.links} ${mobileOpen ? styles.mobileOpen : ''}`}
          aria-label="Primary navigation"
        >
          <div
            className={styles.services}
            onPointerEnter={(event) => {
              if (event.pointerType === 'mouse' && window.matchMedia('(min-width: 1101px)').matches) openServices();
            }}
            onPointerLeave={(event) => {
              if (event.pointerType === 'mouse' && window.matchMedia('(min-width: 1101px)').matches) scheduleServicesClose();
            }}
          >
            <button
              className={servicesOpen || active === 'services' ? styles.active : ''}
              type="button"
              onClick={() => {
                window.clearTimeout(closeTimerRef.current);
                setServicesOpen((isOpen) => !isOpen);
              }}
              aria-expanded={servicesOpen}
              aria-controls="services-navigation"
            >
              Solutions
              <svg viewBox="0 0 10 6" className={servicesOpen ? styles.rotated : ''}>
                <path d="M1 1.5L5 5 9 1.5" />
              </svg>
            </button>
            {servicesOpen && (
              <div id="services-navigation" className={styles.menu}>
                {solutions.map(solution => (
                  <Link key={solution.key} to={solution.to} onClick={closeMenus}>
                    <b>{solution.number}</b>
                    <span>
                      <strong>{solution.title}</strong>
                      <small>{solution.features.slice(0, 2).join(' · ')}</small>
                    </span>
                  </Link>
                ))}
                <Link className={styles.menuPackages} to="/#solutions" onClick={closeMenus}>
                  Explore all solutions →
                </Link>
              </div>
            )}
          </div>

          {links.map(([key, label, to]) => (
            <Link
              className={active === key || location.pathname + location.hash === to ? styles.active : ''}
              aria-current={location.pathname + location.hash === to ? (to.includes('#') ? 'location' : 'page') : undefined}
              key={key}
              to={to}
              onClick={closeMenus}
            >
              {label}
            </Link>
          ))}
          <Link className={styles.cta} to="/request" onClick={closeMenus}>
            Start a Growth Conversation <span aria-hidden="true">↗</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
