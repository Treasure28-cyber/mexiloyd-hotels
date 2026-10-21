import { Photo } from './Photo.jsx';

export function PageHero({ title, description, photo, page, eyebrow, className = '', children }) {
  return <section className={`banner page-hero ${className}`.trim()} aria-label={`${page || 'Hotel'} introduction`}>
    <Photo file={photo} className="banner-image" priority />
    <div className="wrap banner-content">
      {eyebrow && <div className="eyebrow">{eyebrow}</div>}
      <h1>{title}</h1>
      <span className="hero-divider" aria-hidden="true" />
      <p>{description}</p>
      {children}
    </div>
  </section>;
}
