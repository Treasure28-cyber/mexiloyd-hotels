import { expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PageHero } from '../components/PageHero.jsx';

it('renders the title, description and photo without hero breadcrumbs', () => {
  render(<PageHero title="Rooms & Rates." description="Find your next stay." photo="room-kings-royal-bed" page="Rooms" />);
  expect(screen.getByRole('heading', { level: 1 }).textContent).toBe('Rooms & Rates.');
  expect(screen.getByRole('img').alt).toContain('king bed');
  expect(screen.getByText('Find your next stay.')).toBeTruthy();
  expect(screen.queryByRole('navigation', { name: 'Breadcrumb' })).toBeNull();
});
