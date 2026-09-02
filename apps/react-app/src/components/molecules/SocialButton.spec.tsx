import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { SocialButton } from './SocialButton';

describe('SocialButton', () => {
  it('renders Google button correctly', () => {
    render(<SocialButton provider="google">Sign in with Google</SocialButton>);
    expect(screen.getByRole('button', { name: /sign in with google/i })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /google logo/i })).toBeInTheDocument();
  });

  it('renders GitHub button correctly', () => {
    render(<SocialButton provider="github">Sign in with GitHub</SocialButton>);
    expect(screen.getByRole('button', { name: /sign in with github/i })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /github logo/i })).toBeInTheDocument();
  });
});
