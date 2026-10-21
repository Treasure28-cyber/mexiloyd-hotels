import { PageHero } from '../components/PageHero.jsx';
import { AppLink } from '../components/AppLink.jsx';
import { RoomGrid } from '../components/Rooms.jsx';
import { AvailabilityForm, RequestForm } from '../components/BookingForms.jsx';
import { HotelMap } from '../components/HotelMap.jsx';

export default function RoomsPage(){return <><PageHero title="Rooms & Rates." description="A room for your kind of stay. Air conditioning, free WiFi and a direct line to our team." photo="room-kings-royal-bed" page="Rooms & Rates" /><section className="section"><div className="wrap"><RoomGrid /><p className="notice">{"Contact our team to confirm your preferred room, current nightly rate and any specific requirements before booking."}</p></div></section><section className="sand section"><div className="wrap split"><div className="policy"><h2>{"Good to know."}</h2><p>{"Check-in from "}<strong>{"2:00 pm"}</strong>{" with a valid ID."}<br />{"Check-out by "}<strong>{"12:00 noon"}</strong>{"."}</p><p>{"Pets are not allowed."}</p><p>{"Please ask about accepted payment methods, stays with children and cancellation terms when requesting your room."}</p><p>{"Have a special request? Tell us what would make your stay more comfortable."}</p></div><RequestForm kind="booking" /></div></section></>;}
