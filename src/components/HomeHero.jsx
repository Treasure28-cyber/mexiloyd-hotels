import { PageHero } from './PageHero.jsx';
import { AppLink } from './AppLink.jsx';
import { whatsappUrl } from '../config.js';

export function HomeHero() {
  return <PageHero
    className="home-hero"
    photo="exterior-courtyard"
    eyebrow="A LITTLE MORE COMFORT. A LOT MORE WELCOME."
    title="Luxury rooms and suites in Port Harcourt."
    description="A warm welcome near Golf Estate, Okuruama. Comfortable rooms, a relaxed lounge and space to meet."
  >
    <div className="actions">
      <a className="btn" href={whatsappUrl()} target="_blank" rel="noopener">Book Direct</a>
      <AppLink className="btn outline" to="/rooms">See our rooms</AppLink>
    </div>
  </PageHero>;
}
