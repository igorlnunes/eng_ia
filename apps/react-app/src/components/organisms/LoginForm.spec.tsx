import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { LoginForm } from './LoginForm';

describe('LoginForm', () => {
  it('renders correctly', () => {
    render(<LoginForm />);
    expect(screen.getByRole('heading', { name: /^login$/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/email ou usuário/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/senha/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  it('renders social buttons', () => {
    render(<LoginForm />);
    expect(screen.getByRole('button', { name: /github/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /gmail/i })).toBeInTheDocument();
  });
});

