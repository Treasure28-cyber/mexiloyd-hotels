import { lazy, Suspense, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Header } from './components/Header.jsx';
import { Footer } from './components/Footer.jsx';
import { AppLink } from './components/AppLink.jsx';
import { PAGE_DESCRIPTION, SITE_ORIGIN, pageTitle } from './config.js';

const Home = lazy(() => import('./pages/Home.jsx'));
const Rooms = lazy(() => import('./pages/Rooms.jsx'));
const Facilities = lazy(() => import('./pages/Facilities.jsx'));
const Gallery = lazy(() => import('./pages/Gallery.jsx'));
const About = lazy(() => import('./pages/About.jsx'));
const Contact = lazy(() => import('./pages/Contact.jsx'));

function RouteEffects() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    const path = pathname.replace(/\/$/, '') || '/';
    const title = pageTitle(path);
    document.title = title;
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', title);
    document.querySelector('meta[name="description"]')?.setAttribute('content', PAGE_DESCRIPTION);
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', PAGE_DESCRIPTION);
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', SITE_ORIGIN + path);
    document.querySelector('meta[property="og:url"]')?.setAttribute('content', SITE_ORIGIN + path);
    if (!hash) window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname, hash]);
  return null;
}

// Runs after a lazy page commits, including when navigating directly to an anchor.
function Page({ children }) {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) requestAnimationFrame(() => document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView());
  }, [pathname, hash]);
  return children;
}

export default function App() {
  return <><a className="skip" href="#main">Skip to content</a><RouteEffects /><Header />
    <main id="main"><Suspense fallback={<div className="wrap section route-loading" role="status">Loading your next stay…</div>}>
      <Routes>
        <Route path="/" element={<Page><Home /></Page>} />
        <Route path="/rooms" element={<Page><Rooms /></Page>} />
        <Route path="/facilities" element={<Page><Facilities /></Page>} />
        <Route path="/gallery" element={<Page><Gallery /></Page>} />
        <Route path="/about" element={<Page><About /></Page>} />
        <Route path="/contact" element={<Page><Contact /></Page>} />
        <Route path="*" element={<section className="wrap section"><h1>Page not found.</h1><AppLink to="/" className="text-link">Return to Mexiloyd Hotels</AppLink></section>} />
      </Routes>
    </Suspense></main><Footer />
  </>;
}
