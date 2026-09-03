import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { RegisterForm } from './RegisterForm';

describe('RegisterForm', () => {
  it('renders the form heading and subtitle', () => {
    render(<RegisterForm />);
    expect(screen.getByRole('heading', { name: /^cadastro$/i })).toBeInTheDocument();
    expect(screen.getByText(/olá! preencha seus dados/i)).toBeInTheDocument();
  });

  it('renders all input fields', () => {
    render(<RegisterForm />);
    expect(screen.getByLabelText(/^nome$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^email$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^senha$/i)).toBeInTheDocument();
  });

  it('renders the Lembrar-me checkbox', () => {
    render(<RegisterForm />);
    expect(screen.getByRole('checkbox', { name: /lembrar-me/i })).toBeInTheDocument();
  });

  it('renders the submit button', () => {
    render(<RegisterForm />);
    expect(screen.getByRole('button', { name: /cadastrar/i })).toBeInTheDocument();
  });

  it('renders social login buttons', () => {
    render(<RegisterForm />);
    expect(screen.getByRole('button', { name: /github/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /gmail/i })).toBeInTheDocument();
  });

  it('renders the navigate-to-login link button', () => {
    const handleNavigate = vi.fn();
    render(<RegisterForm onNavigateToLogin={handleNavigate} />);
    expect(screen.getByRole('button', { name: /faça seu login/i })).toBeInTheDocument();
  });
});
