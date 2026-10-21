export const PHONE = '2348037165381';
export const ADDRESS = '10 Happyland Close, near Golf Estate, Okuruama, Port Harcourt, Rivers State';
export const SITE_ORIGIN = 'https://mexiloyd-hotels-port-harcourt.violetcabin65.chatgpt.site';
export const FORM_ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT || '';
export const MAP_EMBED_URL = 'https://www.google.com/maps?q=Mexiloyd+Hotels+Happyland+Close+Okuruama+Port+Harcourt+Rivers&output=embed';
export const whatsappUrl = (message = "Hello, I'd like to book a room at Mexiloyd Hotels.") => `https://wa.me/${PHONE}?text=${encodeURIComponent(message)}`;
export const PAGE_DESCRIPTION = 'Luxury rooms and suites near Golf Estate, Okuruama, Port Harcourt. Free breakfast, free parking, bar and conference hall. 4.2 on Google from 201 reviews. Book direct.';
export const pageTitle = path => path === '/' ? 'Mexiloyd Hotels – Luxury Rooms & Suites in Okuruama, Port Harcourt' : `${path.slice(1).replace(/^./, c => c.toUpperCase())} – Mexiloyd Hotels`;
