export function localDate(date = new Date()) {
  const copy = new Date(date);
  copy.setMinutes(copy.getMinutes() - copy.getTimezoneOffset());
  return copy.toISOString().slice(0, 10);
}

export function nextDate(value) {
  if (!value) return localDate();
  const date = new Date(`${value}T12:00:00`);
  date.setDate(date.getDate() + 1);
  return localDate(date);
}

export function validateBooking(values, kind, today = localDate()) {
  const errors = {};
  if (kind !== 'availability') {
    if (!values.name?.trim()) errors.name = 'Please enter your name.';
    if (!/^[+\d\s()-]{7,20}$/.test(values.phone || '')) errors.phone = 'Enter a valid phone number.';
  }
  if (kind === 'booking' || kind === 'availability') {
    if (!values.room) errors.room = 'Please choose a room.';
    if (!values.checkin) errors.checkin = 'Choose a check-in date.';
    else if (values.checkin < today) errors.checkin = 'Check-in cannot be in the past.';
    if (!values.checkout) errors.checkout = 'Choose a check-out date.';
    else if (values.checkout <= values.checkin) errors.checkout = 'Check-out must be after check-in.';
  }
  if (kind === 'conference') {
    if (!values.eventdate) errors.eventdate = 'Choose an event date.';
    else if (values.eventdate < today) errors.eventdate = 'Your event date cannot be in the past.';
  }
  const guests = Number(values.guests);
  if (values.guests !== undefined && (!Number.isInteger(guests) || guests < 1 || guests > 500)) errors.guests = 'Enter a guest count between 1 and 500.';
  return errors;
}

const labels = { name: 'Name', phone: 'Phone', room: 'Room', guests: 'Guests', checkin: 'Check-in', checkout: 'Check-out', eventdate: 'Event date', message: 'Message' };
export function bookingMessage(values, kind) {
  const intent = kind === 'conference' ? 'I have a conference enquiry' : kind === 'contact' ? 'I have a message' : 'I would like to check room availability';
  return `Hello Mexiloyd Hotels, ${intent}.\n\n` + Object.entries(values).filter(([, value]) => String(value).trim()).map(([key, value]) => `${labels[key] || key}: ${String(value).trim()}`).join('\n');
}
