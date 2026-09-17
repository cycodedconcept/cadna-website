import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { PageTransition } from './components/PageTransition';
import { PageMetadata } from './components/PageMetadata';
import { MotionProvider } from './components/animations/MotionProvider';

const AboutPage = lazy(() => import('./pages/AboutPage').then(module => ({ default: module.AboutPage })));
const PackagesPage = lazy(() => import('./pages/PackagesPage').then(module => ({ default: module.PackagesPage })));
const FaqPage = lazy(() => import('./pages/FaqPage').then(module => ({ default: module.FaqPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then(module => ({ default: module.ContactPage })));
const RequestPage = lazy(() => import('./pages/RequestPage').then(module => ({ default: module.RequestPage })));
const DivisionPage = lazy(() => import('./components/DivisionPage').then(module => ({ default: module.DivisionPage })));
const LegalPage = lazy(() => import('./pages/LegalPage').then(module => ({ default: module.LegalPage })));
const ContentDetailPage = lazy(() => import('./pages/ContentDetailPage').then(module => ({ default: module.ContentDetailPage })));
const NotFoundPage = lazy(() => import('./pages/ContentDetailPage').then(module => ({ default: module.NotFoundPage })));

export function App() {
  return <Suspense fallback={<main id="main-content" tabIndex={-1} className="routeLoading" aria-busy="true"><p role="status">Loading CADNA…</p></main>}><MotionProvider><PageMetadata /><a className="skipLink" href="#main-content">Skip to content</a><Routes>
    <Route path="/" element={<PageTransition key="home"><HomePage /></PageTransition>} />
    <Route path="/about" element={<PageTransition key="about"><AboutPage /></PageTransition>} />
    <Route path="/packages" element={<PageTransition key="packages"><PackagesPage /></PageTransition>} />
    <Route path="/faq" element={<PageTransition key="faq"><FaqPage /></PageTransition>} />
    <Route path="/contact" element={<PageTransition key="contact"><ContactPage /></PageTransition>} />
    <Route path="/request" element={<PageTransition key="request"><RequestPage /></PageTransition>} />
    <Route path="/terms" element={<PageTransition key="terms"><LegalPage kind="terms" /></PageTransition>} />
    <Route path="/privacy" element={<PageTransition key="privacy"><LegalPage kind="privacy" /></PageTransition>} />
    <Route path="/concierge/business" element={<PageTransition key="business"><DivisionPage which="business" /></PageTransition>} />
    <Route path="/concierge/financial" element={<PageTransition key="financial"><DivisionPage which="financial" /></PageTransition>} />
    <Route path="/concierge/education" element={<PageTransition key="education"><DivisionPage which="education" /></PageTransition>} />
    <Route path="/concierge/technology" element={<PageTransition key="technology"><DivisionPage which="technology" /></PageTransition>} />
    <Route path="/technology/:slug" element={<PageTransition key="product"><ContentDetailPage kind="product" /></PageTransition>} />
    <Route path="/case-studies/:slug" element={<PageTransition key="case"><ContentDetailPage kind="case" /></PageTransition>} />
    <Route path="/insights/:slug" element={<PageTransition key="insight"><ContentDetailPage kind="insight" /></PageTransition>} />
    <Route path="*" element={<PageTransition key="not-found"><NotFoundPage /></PageTransition>} />
  </Routes></MotionProvider></Suspense>;
}
