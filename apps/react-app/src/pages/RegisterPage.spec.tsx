import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { RegisterPage } from './RegisterPage';

describe('RegisterPage', () => {
  it('renders the register form and the cadastro banner', () => {
    render(<RegisterPage />);
    expect(screen.getByRole('heading', { name: /^cadastro$/i })).toBeInTheDocument();
    expect(screen.getByAltText(/cadastro banner/i)).toBeInTheDocument();
  });

  it('renders all register form fields', () => {
    render(<RegisterPage />);
    expect(screen.getByLabelText(/^nome$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^email$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^senha$/i)).toBeInTheDocument();
  });
});
