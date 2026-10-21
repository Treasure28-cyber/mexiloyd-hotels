import { fireEvent, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { expect, it } from 'vitest';
import { Header } from '../components/Header.jsx';

async function openMenu(path = '/') {
  const user = userEvent.setup();
  render(<MemoryRouter initialEntries={[path]}><Header /></MemoryRouter>);
  const trigger = screen.getByRole('button', { name: 'Open navigation' });
  await user.click(trigger);
  return { user, trigger, dialog: screen.getByRole('dialog', { name: 'Mexiloyd Hotels' }) };
}

it('identifies the current page and keeps booking separate from navigation', async () => {
  const { dialog } = await openMenu('/rooms');
  const sidebar = within(dialog);
  const navigation = sidebar.getByRole('navigation', { name: 'Mobile navigation' });
  expect(within(navigation).getByRole('link', { name: 'Rooms & rates' }).getAttribute('aria-current')).toBe('page');
  expect(within(navigation).getAllByRole('link')).toHaveLength(6);
  expect(navigation.contains(sidebar.getByRole('link', { name: 'Book Direct' }))).toBe(false);
  expect(sidebar.getByRole('link', { name: 'Call 0803 716 5381' }).getAttribute('href')).toBe('tel:+2348037165381');
});

it('closes after choosing a page and releases the scroll lock', async () => {
  const { user, trigger, dialog } = await openMenu();
  await user.click(within(dialog).getByRole('link', { name: 'Gallery' }));
  expect(dialog.open).toBe(false);
  expect(trigger.getAttribute('aria-expanded')).toBe('false');
  expect(document.body.style.overflow).toBe('');
});

it('dismisses a backdrop click and returns focus to the menu trigger', async () => {
  const { trigger, dialog } = await openMenu();
  fireEvent.click(dialog, { clientX: -10, clientY: 10 });
  expect(dialog.open).toBe(false);
  expect(document.activeElement).toBe(trigger);
});

it('keeps keyboard focus inside the open sidebar', async () => {
  const { user, dialog } = await openMenu();
  const close = within(dialog).getByRole('button', { name: 'Close navigation' });
  const last = within(dialog).getByRole('link', { name: 'Call 0803 716 5381' });
  expect(document.activeElement).toBe(close);
  await user.keyboard('{Shift>}{Tab}{/Shift}');
  expect(document.activeElement).toBe(last);
  await user.tab();
  expect(document.activeElement).toBe(close);
});

it('handles native modal cancellation without leaving the page locked', async () => {
  const { dialog } = await openMenu();
  fireEvent(dialog, new Event('cancel', { cancelable: true }));
  expect(dialog.open).toBe(false);
  expect(document.body.style.overflow).toBe('');
});
