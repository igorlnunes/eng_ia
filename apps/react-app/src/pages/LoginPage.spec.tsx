import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { LoginPage } from './LoginPage';

describe('LoginPage', () => {
  it('renders login form and banner', () => {
    render(<LoginPage />);
    expect(screen.getByRole('heading', { name: /boas-vindas/i })).toBeInTheDocument();
    expect(screen.getByText(/inovação ganha vida/i)).toBeInTheDocument();
  });
});
