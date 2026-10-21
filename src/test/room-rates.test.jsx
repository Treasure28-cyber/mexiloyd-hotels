import { expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { RoomCard } from '../components/Rooms.jsx';
import { rooms } from '../data.js';

it('keeps unapproved draft prices out of guest-facing room cards', () => {
  render(<RoomCard room={rooms[0]} index={0} />);
  expect(screen.getByText('Ask for today’s rate · book direct')).toBeTruthy();
  expect(screen.queryByText(/20,000/)).toBeNull();
});

it('shows a nightly price once a room rate has been approved', () => {
  render(<RoomCard room={{...rooms[0],rate:'25,000'}} index={0} />);
  expect(screen.getByText('₦25,000 per night · direct rate')).toBeTruthy();
});
