import { expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { PageHero } from '../components/PageHero.jsx';

it('renders the page title, descriptive photo and accessible home breadcrumb', () => {
  render(<MemoryRouter><PageHero title="Rooms & Rates." description="Find your next stay." photo="room-kings-royal-bed" page="Rooms" /></MemoryRouter>);
  expect(screen.getByRole('heading', { level: 1 }).textContent).toBe('Rooms & Rates.');
  expect(screen.getByRole('img').alt).toContain('king bed');
  expect(screen.getByRole('link', { name: 'Home' }).getAttribute('href')).toBe('/');
  expect(screen.getByText('Rooms').getAttribute('aria-current')).toBe('page');
});
