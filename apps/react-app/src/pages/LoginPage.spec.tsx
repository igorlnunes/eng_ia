import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { LoginPage } from './LoginPage';

describe('LoginPage', () => {
  it('renders login form and banner', () => {
    render(<LoginPage />);
    expect(screen.getByRole('heading', { name: /^login$/i })).toBeInTheDocument();
    expect(screen.getByAltText(/code connect banner logo/i)).toBeInTheDocument();
  });
});


