import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/cadna-logo-white.png';
import { divisions } from '../data/divisions';
import styles from './SiteNav.module.css';

const links = [
  ['about', 'ABOUT', '/about'],
  ['packages', 'PACKAGES', '/packages'],
  ['faq', 'FAQ', '/faq'],
  ['contact', 'CONTACT', '/contact'],
];

export function SiteNav({ active = '' }) {
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeTimerRef = useRef(null);

  useEffect(() => () => window.clearTimeout(closeTimerRef.current), []);

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
    <header className={styles.nav}>
      <div className={styles.inner}>
        <Link to="/" className={styles.logo} onClick={closeMenus}>
          <img src={logo} alt="CADNA GSL" />
        </Link>

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
            onMouseEnter={openServices}
            onMouseLeave={scheduleServicesClose}
          >
            <button
              className={servicesOpen || active === 'services' ? styles.active : ''}
              type="button"
              onClick={() => {
                window.clearTimeout(closeTimerRef.current);
                setServicesOpen((isOpen) => !isOpen);
              }}
              aria-expanded={servicesOpen}
            >
              SERVICES
              <svg viewBox="0 0 10 6" className={servicesOpen ? styles.rotated : ''}>
                <path d="M1 1.5L5 5 9 1.5" />
              </svg>
            </button>
            {servicesOpen && (
              <div className={styles.menu} onMouseEnter={openServices} onMouseLeave={scheduleServicesClose}>
                {Object.entries(divisions).map(([key, division]) => (
                  <Link key={key} to={`/concierge/${key}`} onClick={closeMenus}>
                    <b>{division.number}</b>
                    <span>
                      <strong>{division.name}</strong>
                      <small>{division.description}</small>
                    </span>
                  </Link>
                ))}
                <Link className={styles.menuPackages} to="/packages" onClick={closeMenus}>
                  See packages & pricing →
                </Link>
              </div>
            )}
          </div>

          {links.map(([key, label, to]) => (
            <Link
              className={active === key ? styles.active : ''}
              key={key}
              to={to}
              onClick={closeMenus}
            >
              {label}
            </Link>
          ))}
          <Link className={styles.cta} to="/request" onClick={closeMenus}>
            Make a Request
          </Link>
        </nav>
      </div>
    </header>
  );
}
