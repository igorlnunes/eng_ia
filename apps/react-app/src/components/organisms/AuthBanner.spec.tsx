import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { AuthBanner } from './AuthBanner';

describe('AuthBanner', () => {
  it('renders logo and text correctly', () => {
    render(<AuthBanner />);
    expect(screen.getByRole('img', { name: /logo/i })).toBeInTheDocument();
    expect(screen.getByText(/inovação ganha vida/i)).toBeInTheDocument();
  });
});
