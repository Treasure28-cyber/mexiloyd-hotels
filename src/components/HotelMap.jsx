import { useState } from 'react';
import { MAP_EMBED_URL } from '../config.js';

export function HotelMap() {
  const [active, setActive] = useState(false);
  return <div className="map-wrap">
    <iframe className="map" src={MAP_EMBED_URL} title="Map showing Mexiloyd Hotels, Okuruama, Port Harcourt" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
    {!active && <button className="map-activate" onClick={() => setActive(true)}><span>Tap to explore the map</span></button>}
  </div>;
}
