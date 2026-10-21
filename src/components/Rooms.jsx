import { memo, useState } from 'react';
import { rooms } from '../data.js';
import { whatsappUrl } from '../config.js';
import { Photo } from './Photo.jsx';

export const RoomCard = memo(function RoomCard({ room, index }) {
  const [slide, setSlide] = useState(0);
  return <article className="room-card">
    <div className="room-media">
      <Photo file={room.images[slide]} className="" />
      <span className="ribbon">Book direct</span>
      {room.images.length > 1 && <div className="dots" role="group" aria-label={`${room.name} photos`}>
        {room.images.map((file, i) => <button key={file} type="button" className={`dot ${i === slide ? 'active' : ''}`}
          aria-label={`Show ${room.name} photo ${i + 1}`} aria-pressed={i === slide} onClick={() => setSlide(i)} />)}
      </div>}
    </div>
    <div className="room-body">
      <div className="room-title"><h3>{room.name}</h3><span className="room-number">0{index + 1}</span></div>
      <span className="price">{room.rate ? `₦${room.rate} per night · direct rate` : 'Ask for today’s rate · book direct'}</span>
      <p>{room.desc}</p>
      <div className="features"><span>Air conditioning</span><span>Free WiFi</span><span>Direct booking</span></div>
      <a className="btn" target="_blank" rel="noopener" href={whatsappUrl(`Hello, I'd like to enquire about the ${room.name} at Mexiloyd Hotels. Please confirm the direct rate and availability.`)}>Book this room</a>
    </div>
  </article>;
});

export function RoomGrid() {
  return <div className="room-grid">{rooms.map((room, index) => <RoomCard key={room.name} room={room} index={index} />)}</div>;
}
