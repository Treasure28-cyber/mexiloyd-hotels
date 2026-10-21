import { useEffect, useId, useRef, useState } from 'react';
import { rooms } from '../data.js';
import { FORM_ENDPOINT, whatsappUrl } from '../config.js';
import { bookingMessage, localDate, nextDate, validateBooking } from '../lib/booking.js';

function useBookingForm(kind) {
  // Avoid embedding build-day dates in prerendered HTML or hydration output.
  const [today, setToday] = useState('');
  useEffect(() => { setToday(localDate()); }, []);
  const [values, setValues] = useState(() => ({ ...(kind !== 'availability' ? { name: '', phone: '' } : {}),
    ...(['booking', 'availability'].includes(kind) ? { room: 'Help me choose', checkin: '', checkout: '', guests: '1' } : {}),
    ...(kind === 'conference' ? { eventdate: '', guests: '1' } : {}), ...(kind !== 'availability' ? { message: '' } : {}) }));
  const [errors, setErrors] = useState({}), [status, setStatus] = useState(''), [pending, setPending] = useState(false), [prepared, setPrepared] = useState('');
  const form = useRef(null);
  const change = event => {
    const { name, value } = event.target;
    setValues(previous => ({ ...previous, [name]: value }));
    setErrors(previous => ({ ...previous, [name]: undefined }));
    setStatus(''); setPrepared('');
  };
  const submit = async event => {
    event.preventDefault();
    if (pending) return;
    const problems = validateBooking(values, kind);
    setErrors(problems);
    if (Object.keys(problems).length) { form.current.elements.namedItem(Object.keys(problems)[0])?.focus(); return; }
    const message = bookingMessage(values, kind);
    if (!FORM_ENDPOINT) {
      const url = whatsappUrl(message);
      setPrepared(url);
      window.open(url, '_blank', 'noopener,noreferrer');
      setStatus('Your request is ready. Continue in WhatsApp to send it.');
      return;
    }
    setPending(true); setStatus('Sending your request…');
    try {
      const response = await fetch(FORM_ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ kind, ...values }) });
      if (!response.ok) throw new Error('Request failed');
      setStatus("Thank you. We'll be in touch shortly.");
    } catch {
      setStatus('Your request could not be sent. Please use the WhatsApp link.');
      setPrepared(whatsappUrl(message));
    } finally { setPending(false); }
  };
  return { values, errors, status, pending, prepared, form, change, submit, today };
}

function Field({ label, name, type = 'text', required = true, model, children, min, max, autoComplete }) {
  const prefix = useId(), id = `${prefix}-${name}`, error = model.errors[name];
  const props = { id, name, required, value: model.values[name] || '', onChange: model.change, 'aria-invalid': !!error, 'aria-describedby': error ? `${id}-error` : undefined };
  return <div className="field"><label htmlFor={id}>{label}{required ? ' *' : ''}</label>
    {type === 'select' ? <select {...props}>{children}</select> : type === 'textarea' ? <textarea {...props} /> : <input {...props} type={type} min={min} max={max} autoComplete={autoComplete} />}
    {error && <span className="error" id={`${id}-error`}>{error}</span>}
  </div>;
}

function RoomOptions() {
  return <><option value="Help me choose">Help me choose</option>{rooms.map(room => <option key={room.name}>{room.name}</option>)}</>;
}
function FormStatus({ model }) {
  return <div><p className="status" role="status">{model.status}</p>{model.prepared && <a className="text-link" href={model.prepared} target="_blank" rel="noopener">Continue in WhatsApp</a>}</div>;
}

export function AvailabilityForm() {
  const model = useBookingForm('availability');
  return <form ref={model.form} className="availability request-form" onSubmit={model.submit} noValidate aria-label="Check room availability">
    <Field label="Check-in" name="checkin" type="date" min={model.today} model={model} />
    <Field label="Check-out" name="checkout" type="date" min={model.values.checkin ? nextDate(model.values.checkin) : model.today} model={model} />
    <Field label="Guests" name="guests" type="select" model={model}>{[1,2,3,4].map(n => <option key={n} value={n}>{n} {n === 1 ? 'guest' : 'guests'}</option>)}</Field>
    <Field label="Room" name="room" type="select" model={model}><RoomOptions /></Field>
    <div className="submit-field"><p className="helper">A direct line to your next stay.</p><button className="btn" type="submit" disabled={model.pending}>Check Availability</button><FormStatus model={model} /></div>
  </form>;
}

export function RequestForm({ kind = 'booking' }) {
  const model = useBookingForm(kind);
  const title = kind === 'booking' ? 'Plan your stay' : kind === 'conference' ? 'Let’s plan your event.' : 'We’d love to hear from you.';
  const button = kind === 'booking' ? 'Send Booking Request' : kind === 'conference' ? 'Send Enquiry' : 'Send Message';
  return <form ref={model.form} className="request-form form-panel" onSubmit={model.submit} noValidate aria-label={title}>
    <h3>{title}</h3><div className="form-grid" style={{ marginTop: 28 }}>
      <Field label="Your name" name="name" model={model} autoComplete="name" />
      <Field label="Phone number" name="phone" type="tel" model={model} autoComplete="tel" />
      {kind === 'booking' && <>
        <Field label="Room" name="room" type="select" model={model}><RoomOptions /></Field>
        <Field label="Guests" name="guests" type="number" min="1" max="500" model={model} required={false} />
        <Field label="Check-in" name="checkin" type="date" min={model.today} model={model} />
        <Field label="Check-out" name="checkout" type="date" min={model.values.checkin ? nextDate(model.values.checkin) : model.today} model={model} />
      </>}
      {kind === 'conference' && <>
        <Field label="Event date" name="eventdate" type="date" min={model.today} model={model} />
        <Field label="Guests" name="guests" type="number" min="1" max="500" model={model} />
      </>}
      <div className="full"><Field label="Message" name="message" type="textarea" required={false} model={model} /></div>
      <div className="full"><p className="helper">Your request opens in WhatsApp for the hotel to confirm.</p>
        <button className="btn" type="submit" disabled={model.pending}>{model.pending ? 'Sending…' : button}</button><br />
        <a className="text-link" href={whatsappUrl()} target="_blank" rel="noopener">Send via WhatsApp instead</a>
        <FormStatus model={model} />
      </div>
    </div>
  </form>;
}
