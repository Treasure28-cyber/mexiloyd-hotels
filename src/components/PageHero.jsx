import { AppLink } from './AppLink.jsx';
import { Photo } from './Photo.jsx';

export function PageHero({ title, description, photo, page }) {
  return <section className="banner page-hero" aria-label={`${page} introduction`}>
    <Photo file={photo} className="banner-image" priority />
    <div className="wrap banner-content">
      <nav className="hero-breadcrumb" aria-label="Breadcrumb">
        <AppLink to="/">Home</AppLink><span aria-hidden="true">/</span><span aria-current="page">{page}</span>
      </nav>
      <h1>{title}</h1>
      <span className="hero-divider" aria-hidden="true" />
      <p>{description}</p>
    </div>
  </section>;
}
