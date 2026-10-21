import { describe, expect, it } from 'vitest';
import { bookingMessage, nextDate, validateBooking } from '../lib/booking.js';

const today='2026-10-21';
const valid={name:'Ada Guest',phone:'+2348030000000',room:'Kings Royal',checkin:'2026-10-22',checkout:'2026-10-24',guests:'2'};
describe('booking validation',()=>{
  it('accepts a valid booking',()=>expect(validateBooking(valid,'booking',today)).toEqual({}));
  it('rejects past check-in and check-out before check-in',()=>{
    const errors=validateBooking({...valid,checkin:'2026-10-20',checkout:'2026-10-19'},'booking',today);
    expect(errors.checkin).toBeTruthy(); expect(errors.checkout).toBeTruthy();
  });
  it('rejects blank names, invalid phone numbers and fractional guest counts',()=>{
    const errors=validateBooking({...valid,name:' ',phone:'abc',guests:'1.5'},'booking',today);
    expect(Object.keys(errors)).toEqual(expect.arrayContaining(['name','phone','guests']));
  });
  it('does not require a name or phone for quick availability',()=>{
    const {name,phone,...availability}=valid;
    expect(validateBooking(availability,'availability',today)).toEqual({});
  });
  it('validates event dates and advances dates across month boundaries',()=>{
    expect(validateBooking({...valid,eventdate:'2026-10-19'},'conference',today).eventdate).toBeTruthy();
    expect(nextDate('2026-10-31')).toBe('2026-11-01');
  });
  it('includes room, dates and guest count in the prepared message',()=>{
    expect(bookingMessage(valid,'booking')).toContain('Room: Kings Royal');
    expect(bookingMessage(valid,'booking')).toContain('Check-in: 2026-10-22');
    expect(bookingMessage(valid,'booking')).toContain('Guests: 2');
  });
});
