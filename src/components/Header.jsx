import { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { AppLink } from './AppLink.jsx';
import { whatsappUrl } from '../config.js';

const links = ['Rooms', 'Facilities', 'Gallery', 'About', 'Contact'];
export function Header() {
  const [open, setOpen] = useState(false);
  const menu = useRef(null), trigger = useRef(null);
  const location = useLocation();
  useEffect(() => { setOpen(false); }, [location.pathname]);
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    menu.current.querySelector('button').focus();
    return () => { document.body.style.overflow = previous; };
  }, [open]);
  const close = () => { setOpen(false); trigger.current?.focus(); };
  const onKeyDown = event => {
    if (!open) return;
    if (event.key === 'Escape') close();
    if (event.key === 'Tab') {
      const nodes = menu.current.querySelectorAll('a,button');
      const first = nodes[0], last = nodes[nodes.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
  };
  return <header className="header"><div className="wrap header-inner">
    <AppLink to="/" className="brand" aria-label="Mexiloyd Hotels home">MEXILOYD<small>Hotels</small></AppLink>
    <button ref={trigger} className="menu-toggle" aria-label="Open navigation" aria-expanded={open} aria-controls="navigation" onClick={() => setOpen(true)}>☰</button>
    <nav ref={menu} className={`nav ${open ? 'open' : ''}`} id="navigation" aria-label="Main navigation" onKeyDown={onKeyDown}>
      <button className="mobile-menu-close" aria-label="Close navigation" onClick={close}>✕</button>
      {links.map(label => <NavLink key={label} to={`/${label.toLowerCase()}`}>{label}</NavLink>)}
      <a className="btn" href={whatsappUrl()} target="_blank" rel="noopener">Book Direct</a>
    </nav>
  </div></header>;
}
