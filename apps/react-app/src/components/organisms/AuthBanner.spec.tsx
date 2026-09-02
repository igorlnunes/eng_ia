import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { AuthBanner } from './AuthBanner';

describe('AuthBanner', () => {
  it('renders logo and banner correctly', () => {
    render(<AuthBanner />);
    expect(screen.getByRole('img', { name: /banner|logo/i })).toBeInTheDocument();
  });
});

