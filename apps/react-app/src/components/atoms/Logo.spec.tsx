import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Logo } from './Logo';

describe('Logo', () => {
  it('renders image correctly', () => {
    render(<Logo src="/Logo_small.png" alt="Test Logo" />);
    const img = screen.getByRole('img', { name: /test logo/i }) as HTMLImageElement;
    expect(img).toBeInTheDocument();
    expect(img.getAttribute('src')).toBe('/Logo_small.png');
  });
});
