import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { FormField } from './FormField';

describe('FormField', () => {
  it('renders label and input correctly', () => {
    render(<FormField id="email" label="Email Address" />);
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
  });

  it('renders error text when provided', () => {
    render(<FormField id="email" label="Email Address" errorText="Invalid email" />);
    expect(screen.getByText(/invalid email/i)).toBeInTheDocument();
  });
});
