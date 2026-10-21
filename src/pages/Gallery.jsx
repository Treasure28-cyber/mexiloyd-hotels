import { useEffect, useMemo, useRef, useState } from 'react';
import { photos } from '../data.js';
import { Photo } from '../components/Photo.jsx';
import { PageHero } from '../components/PageHero.jsx';

const filters = ['All', 'Rooms', 'Bathrooms', 'Bar & Lounge', 'Conference', 'Exterior'];

export default function GalleryPage() {
  const [filter, setFilter] = useState('All'), [current, setCurrent] = useState(null);
  const items = useMemo(() => filter === 'All' ? photos : photos.filter(photo => photo.category === filter), [filter]);
  const dialog = useRef(null), trigger = useRef(null), closeButton = useRef(null);
  const opened = current !== null;
  useEffect(() => {
    if (!opened) return;
    const node = dialog.current;
    const previousOverflow = document.body.style.overflow;
    node.showModal();
    document.body.style.overflow = 'hidden';
    closeButton.current?.focus();
    return () => { if (node.open) node.close(); document.body.style.overflow = previousOverflow; trigger.current?.focus(); };
  }, [opened]);
  const move = delta => setCurrent(index => (index + delta + items.length) % items.length);
  const onKeyDown = event => {
    if (event.key === 'ArrowRight') { event.preventDefault(); move(1); }
    if (event.key === 'ArrowLeft') { event.preventDefault(); move(-1); }
  };
  return <><PageHero title="Take a look around." description="The rooms, the details, the places to unwind. A closer look at Mexiloyd Hotels." photo="exterior-front" page="Gallery" /><section className="section"><div className="wrap">
    <div className="section-head"><div><h2>Every space, every detail.</h2><p style={{ marginTop: 20 }}>Explore the hotel, one photograph at a time.</p></div><span style={{ fontSize: 14, color: 'var(--muted)' }}>20 photographs · One warm welcome</span></div>
    <div className="chips" role="group" aria-label="Filter gallery">{filters.map(label => <button key={label} className={`chip ${filter === label ? 'active' : ''}`} aria-pressed={filter === label} onClick={() => { setFilter(label); setCurrent(null); }}>{label}</button>)}</div>
    <p className="notice" aria-live="polite" style={{ marginBottom: 20 }}>Showing {filter === 'All' ? 'all ' : ''}{items.length} photographs</p>
    <div className="gallery-grid">{items.map((photo, index) => <button className="gallery-item" key={photo.file} aria-label={`Enlarge: ${photo.alt}`} onClick={event => { trigger.current = event.currentTarget; setCurrent(index); }}>
      <Photo file={photo.file} className="" /><span>{photo.alt}</span>
    </button>)}</div>
  </div></section>
  <dialog ref={dialog} aria-label="Hotel photograph" onCancel={event => { event.preventDefault(); setCurrent(null); }} onClose={() => setCurrent(null)} onKeyDown={onKeyDown}>
    <button ref={closeButton} className="close-dialog" onClick={() => setCurrent(null)}>Close</button>
    {opened && <><img src={items[current].src} alt={items[current].alt} decoding="async" /><div className="lightbox-controls">
      <button onClick={() => move(-1)} aria-label="Previous photograph">Previous</button>
      <p aria-live="polite">{current + 1} / {items.length} · {items[current].alt}</p>
      <button onClick={() => move(1)} aria-label="Next photograph">Next</button>
    </div></>}
  </dialog></>;
}
