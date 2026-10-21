import { PageHero } from './PageHero.jsx';
import { AppLink } from './AppLink.jsx';
import { whatsappUrl } from '../config.js';

export function HomeHero() {
  return <PageHero
    className="home-hero"
    photo="exterior-courtyard"
    eyebrow="A LITTLE MORE COMFORT. A LOT MORE WELCOME."
    title="Luxury rooms and suites in Port Harcourt."
    description="Make yourself at home in Okuruama. Air-conditioned rooms, a bar and lounge, and space to come together — all near Golf Estate."
  >
    <div className="actions">
      <a className="btn" href={whatsappUrl()} target="_blank" rel="noopener">Book Direct</a>
      <AppLink className="btn outline" to="/rooms">See our rooms</AppLink>
    </div>
    <p className="home-hero-rate">Rooms from <strong>₦[20,000]</strong><span>[Confirm direct rate]</span></p>
  </PageHero>;
}
