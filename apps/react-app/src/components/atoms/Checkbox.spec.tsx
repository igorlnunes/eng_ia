import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Checkbox } from './Checkbox';

describe('Checkbox', () => {
  it('renders with the provided label', () => {
    render(<Checkbox id="test-cb" label="Lembrar-me" />);
    expect(screen.getByLabelText(/lembrar-me/i)).toBeInTheDocument();
    expect(screen.getByText(/lembrar-me/i)).toBeInTheDocument();
  });

  it('associates label with input via id', () => {
    render(<Checkbox id="my-checkbox" label="Aceito os termos" />);
    const input = screen.getByRole('checkbox');
    expect(input).toHaveAttribute('id', 'my-checkbox');
  });

  it('renders as unchecked by default', () => {
    render(<Checkbox id="cb" label="Check me" />);
    expect(screen.getByRole('checkbox')).not.toBeChecked();
  });

  it('renders as checked when defaultChecked is provided', () => {
    render(<Checkbox id="cb" label="Check me" defaultChecked />);
    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  it('calls onChange handler when clicked', () => {
    const handleChange = vi.fn();
    render(<Checkbox id="cb" label="Click me" onChange={handleChange} />);
    fireEvent.click(screen.getByRole('checkbox'));
    expect(handleChange).toHaveBeenCalledTimes(1);
  });
});
