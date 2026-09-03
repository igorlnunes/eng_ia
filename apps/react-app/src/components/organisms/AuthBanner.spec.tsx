import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { AuthBanner } from './AuthBanner';

describe('AuthBanner', () => {
  it('renders with default logo and banner correctly', () => {
    render(<AuthBanner />);
    const img = screen.getByRole('img', { name: /banner|logo/i });
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', '/Group 2087.png');
  });

  it('renders with custom src and alt when provided', () => {
    render(<AuthBanner src="/cadastro-banner.png" alt="Cadastro Banner" />);
    const img = screen.getByRole('img', { name: /cadastro banner/i });
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', '/cadastro-banner.png');
  });
});
