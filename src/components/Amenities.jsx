const amenities = [
  { title: 'Breakfast available', description: 'Ask what’s included with your room.', icon: 'breakfast' },
  { title: 'Free parking', description: 'A convenient place to park during your stay.', icon: 'parking' },
  { title: 'Free WiFi', description: 'Stay connected while you settle in.', icon: 'wifi' },
];

function AmenityIcon({ name }) {
  const paths = {
    breakfast: 'M4 3h13v11a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5ZM17 5h2a3 3 0 0 1 0 6h-2M2 22h18',
    parking: 'M6 22V2h7a6 6 0 0 1 0 12H6',
    wifi: 'M2 8a16 16 0 0 1 20 0M5 12a11 11 0 0 1 14 0M9 16a5 5 0 0 1 6 0M12 20h.01',
    star: 'm12 2 3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1Z',
  };
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[name]} /></svg>;
}

export function Amenities() {
  return <section className="amenities" aria-labelledby="amenities-heading">
    <div className="amenities-heading">
      <h2 id="amenities-heading">The little things.<br />A better stay.</h2>
      <a className="amenities-rating" href="https://www.google.com/maps/search/?api=1&query=Mexiloyd+Hotels+Port+Harcourt" target="_blank" rel="noopener" aria-label="Read Mexiloyd Hotels reviews on Google">
        <span className="amenities-rating-icon"><AmenityIcon name="star" /></span>
        <span><strong>4.2 on Google</strong><span className="amenities-review-count">201 guest reviews</span></span>
      </a>
    </div>
    <ul className="amenities-grid">
      {amenities.map(amenity => <li key={amenity.icon} className="amenity-card">
        <span className="amenity-icon"><AmenityIcon name={amenity.icon} /></span>
        <div><h3>{amenity.title}</h3><p>{amenity.description}</p></div>
      </li>)}
    </ul>
  </section>;
}
