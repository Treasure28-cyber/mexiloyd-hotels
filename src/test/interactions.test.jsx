import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import GalleryPage from '../pages/Gallery.jsx';
import { RoomGrid } from '../components/Rooms.jsx';
import { AvailabilityForm, RequestForm } from '../components/BookingForms.jsx';
import { Header } from '../components/Header.jsx';
import { photos } from '../data.js';
import { localDate, nextDate } from '../lib/booking.js';

describe('React interactions',()=>{
  it('shows all 20 photos and filters to bathrooms',async()=>{
    const user=userEvent.setup(); render(<GalleryPage />);
    expect(screen.getAllByRole('button',{name:/Enlarge:/})).toHaveLength(20);
    expect(screen.getAllByRole('img').every(img=>img.loading==='lazy'||img.getAttribute('loading')==='lazy')).toBe(true);
    await user.click(screen.getByRole('button',{name:'Bathrooms',exact:true}));
    expect(screen.getAllByRole('button',{name:/Enlarge:/})).toHaveLength(1);
    expect(screen.getByRole('img').alt).toContain('frosted glass');
  });
  it('navigates a lightbox and closes it with Escape, restoring focus',async()=>{
    const user=userEvent.setup(); render(<GalleryPage />);
    const trigger=screen.getAllByRole('button',{name:/Enlarge:/})[0]; await user.click(trigger);
    const dialog=screen.getByRole('dialog');
    expect(dialog.open).toBe(true);
    await user.click(screen.getByRole('button',{name:'Next photograph'}));
    expect(dialog.querySelector('img').alt).toBe(photos[1].alt);
    fireEvent.keyDown(dialog,{key:'ArrowLeft'});
    expect(dialog.querySelector('img').alt).toBe(photos[0].alt);
    fireEvent(dialog,new Event('cancel',{cancelable:true}));
    await waitFor(()=>expect(dialog.open).toBe(false));
    expect(document.activeElement).toBe(trigger);
  });
  it('changes the bedroom photo through the room carousel',async()=>{
    const user=userEvent.setup(); render(<RoomGrid />);
    const button=screen.getByRole('button',{name:'Show Deluxe Studio photo 2'});
    await user.click(button);
    expect(button.getAttribute('aria-pressed')).toBe('true');
    expect(button.closest('.room-media').querySelector('img').src).toContain('room-deluxe-studio-bed-close');
  });
  it('validates booking fields without opening WhatsApp for invalid data',async()=>{
    const open=vi.spyOn(window,'open').mockImplementation(()=>null); const user=userEvent.setup();
    render(<RequestForm />); await user.click(screen.getByRole('button',{name:'Send Booking Request'}));
    expect(screen.getByText('Please enter your name.')).toBeTruthy(); expect(open).not.toHaveBeenCalled();
  });
  it('prepares a WhatsApp request with the selected room and dates',async()=>{
    const open=vi.spyOn(window,'open').mockImplementation(()=>null); const user=userEvent.setup();
    render(<AvailabilityForm />);
    const checkin=nextDate(localDate()),checkout=nextDate(checkin);
    fireEvent.change(screen.getByLabelText(/Check-in/),{target:{value:checkin}});
    fireEvent.change(screen.getByLabelText(/Check-out/),{target:{value:checkout}});
    await user.selectOptions(screen.getByLabelText(/Room/),'Kings Royal');
    await user.click(screen.getByRole('button',{name:'Check Availability'}));
    expect(open).toHaveBeenCalledTimes(1);
    const url=new URL(open.mock.calls[0][0]);
    expect(url.searchParams.get('text')).toContain('Room: Kings Royal');
    expect(url.searchParams.get('text')).toContain(`Check-in: ${checkin}`);
    expect(screen.getByRole('link',{name:'Continue in WhatsApp'})).toBeTruthy();
    expect(screen.queryByText("Thank you. We'll be in touch shortly.")).toBeNull();
  });
  it('opens and closes the mobile menu with keyboard focus and scroll cleanup',async()=>{
    const user=userEvent.setup(); render(<MemoryRouter><Header /></MemoryRouter>);
    const trigger=screen.getByRole('button',{name:'Open navigation'}); await user.click(trigger);
    expect(trigger.getAttribute('aria-expanded')).toBe('true'); expect(document.body.style.overflow).toBe('hidden');
    await user.keyboard('{Escape}');
    expect(trigger.getAttribute('aria-expanded')).toBe('false'); expect(document.activeElement).toBe(trigger); expect(document.body.style.overflow).toBe('');
  });
});
