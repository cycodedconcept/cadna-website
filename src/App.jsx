import { Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { PackagesPage } from './pages/PackagesPage';
import { FaqPage } from './pages/FaqPage';
import { ContactPage } from './pages/ContactPage';
import { RequestPage } from './pages/RequestPage';
import { DivisionPage } from './components/DivisionPage';
import { PageTransition } from './components/PageTransition';
import { PageMetadata } from './components/PageMetadata';
import { MotionProvider } from './components/animations/MotionProvider';
import { ContentDetailPage, NotFoundPage } from './pages/ContentDetailPage';

export function App() {
  return <MotionProvider><PageMetadata /><a className="skipLink" href="#main-content">Skip to content</a><Routes>
    <Route path="/" element={<PageTransition key="home"><HomePage /></PageTransition>} />
    <Route path="/about" element={<PageTransition key="about"><AboutPage /></PageTransition>} />
    <Route path="/packages" element={<PageTransition key="packages"><PackagesPage /></PageTransition>} />
    <Route path="/faq" element={<PageTransition key="faq"><FaqPage /></PageTransition>} />
    <Route path="/contact" element={<PageTransition key="contact"><ContactPage /></PageTransition>} />
    <Route path="/request" element={<PageTransition key="request"><RequestPage /></PageTransition>} />
    <Route path="/concierge/business" element={<PageTransition key="business"><DivisionPage which="business" /></PageTransition>} />
    <Route path="/concierge/financial" element={<PageTransition key="financial"><DivisionPage which="financial" /></PageTransition>} />
    <Route path="/concierge/education" element={<PageTransition key="education"><DivisionPage which="education" /></PageTransition>} />
    <Route path="/concierge/technology" element={<PageTransition key="technology"><DivisionPage which="technology" /></PageTransition>} />
    <Route path="/technology/:slug" element={<PageTransition key="product"><ContentDetailPage kind="product" /></PageTransition>} />
    <Route path="/case-studies/:slug" element={<PageTransition key="case"><ContentDetailPage kind="case" /></PageTransition>} />
    <Route path="/insights/:slug" element={<PageTransition key="insight"><ContentDetailPage kind="insight" /></PageTransition>} />
    <Route path="*" element={<PageTransition key="not-found"><NotFoundPage /></PageTransition>} />
  </Routes></MotionProvider>;
}
