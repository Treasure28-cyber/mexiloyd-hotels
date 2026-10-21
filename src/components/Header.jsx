import { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { AppLink } from './AppLink.jsx';
import { PHONE, whatsappUrl } from '../config.js';

const links = [
  { label: 'Home', to: '/', icon: 'home' },
  { label: 'Rooms & rates', desktopLabel: 'Rooms', to: '/rooms', icon: 'bed' },
  { label: 'Facilities', to: '/facilities', icon: 'cup' },
  { label: 'Gallery', to: '/gallery', icon: 'gallery' },
  { label: 'About us', desktopLabel: 'About', to: '/about', icon: 'info' },
  { label: 'Contact & directions', desktopLabel: 'Contact', to: '/contact', icon: 'pin' },
];

function NavigationIcon({ name }) {
  const paths = {
    home: 'm3 10 9-7 9 7v11h-6v-7H9v7H3Z',
    bed: 'M3 18V6M21 18v-8H3M3 14h18M6 10V7h5v3',
    cup: 'M4 3h13v11a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5ZM17 5h2a3 3 0 0 1 0 6h-2M2 22h18',
    gallery: 'M3 3h7v7H3ZM14 3h7v7h-7ZM3 14h7v7H3ZM14 14h7v7h-7Z',
    info: 'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20ZM12 11v6M12 7h.01',
    pin: 'M19 10c0 6-7 12-7 12S5 16 5 10a7 7 0 1 1 14 0ZM15 10a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z',
    menu: 'M4 6h16M4 12h16M4 18h16',
    close: 'm6 6 12 12M18 6 6 18',
  };
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[name]} /></svg>;
}

export function Header() {
  const [open, setOpen] = useState(false);
  const menu = useRef(null), trigger = useRef(null);
  const location = useLocation();
  useEffect(() => { setOpen(false); }, [location.pathname, location.hash]);
  useEffect(() => {
    if (!open) return;
    const dialog = menu.current;
    const previous = document.body.style.overflow;
    if (!dialog.open) dialog.showModal();
    document.body.style.overflow = 'hidden';
    dialog.querySelector('button').focus();
    return () => {
      if (dialog.open) dialog.close();
      document.body.style.overflow = previous;
      trigger.current?.focus();
    };
  }, [open]);
  useEffect(() => {
    if (!window.matchMedia) return;
    const desktop = window.matchMedia('(min-width: 721px)');
    const onResize = event => { if (event.matches) setOpen(false); };
    desktop.addEventListener('change', onResize);
    return () => desktop.removeEventListener('change', onResize);
  }, []);
  const close = () => setOpen(false);
  const onKeyDown = event => {
    if (!open) return;
    if (event.key === 'Escape') { event.preventDefault(); close(); }
    if (event.key === 'Tab') {
      const nodes = menu.current.querySelectorAll('a,button');
      const first = nodes[0], last = nodes[nodes.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
  };
  const onBackdropClick = event => {
    if (event.target !== event.currentTarget) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) close();
  };
  return <header className="header"><div className="wrap header-inner">
    <AppLink to="/" className="brand" aria-label="Mexiloyd Hotels home">MEXILOYD<small>Hotels</small></AppLink>
    <button ref={trigger} className="menu-toggle" aria-label="Open navigation" aria-expanded={open} aria-controls="mobile-navigation" aria-haspopup="dialog" onClick={() => setOpen(true)}><NavigationIcon name="menu" /></button>
    <nav className="nav desktop-nav" aria-label="Main navigation">
      {links.slice(1).map(link => <NavLink key={link.to} to={link.to}>{link.desktopLabel || link.label}</NavLink>)}
      <a className="btn" href={whatsappUrl()} target="_blank" rel="noopener">Book Direct</a>
    </nav>
    <dialog ref={menu} className="mobile-menu" id="mobile-navigation" aria-labelledby="mobile-menu-title" aria-modal="true"
      onKeyDown={onKeyDown} onClick={onBackdropClick} onCancel={event => { event.preventDefault(); close(); }} onClose={close}>
      <div className="drawer-header">
        <div><h2 id="mobile-menu-title">Mexiloyd Hotels</h2><p>Okuruama · Port Harcourt</p></div>
        <button type="button" className="drawer-close" aria-label="Close navigation" onClick={close}><NavigationIcon name="close" /></button>
      </div>
      <nav className="drawer-navigation" aria-label="Mobile navigation">
        <ul>{links.map(link => <li key={link.to}>
          <NavLink to={link.to} end={link.to === '/'} onClick={close} className={({ isActive }) => `drawer-link${isActive ? ' is-active' : ''}`}>
            <span className="drawer-link-icon"><NavigationIcon name={link.icon} /></span>
            <span>{link.label}</span><span className="drawer-current" aria-hidden="true" />
          </NavLink>
        </li>)}</ul>
      </nav>
      <div className="drawer-booking">
        <p>Your next stay starts here.</p>
        <a className="btn" href={whatsappUrl()} target="_blank" rel="noopener" onClick={close}>Book Direct</a>
        <a className="drawer-phone" href={`tel:+${PHONE}`} onClick={close}>Call 0803 716 5381</a>
      </div>
    </dialog>
  </div></header>;
}
