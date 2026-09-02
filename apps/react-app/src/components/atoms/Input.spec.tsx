import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Input } from './Input';

describe('Input', () => {
  it('renders correctly', () => {
    render(<Input placeholder="Enter text" />);
    expect(screen.getByPlaceholderText(/enter text/i)).toBeInTheDocument();
  });

  it('updates value on change', () => {
    render(<Input placeholder="Type here" />);
    const input = screen.getByPlaceholderText(/type here/i) as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'Hello' } });
    expect(input.value).toBe('Hello');
  });

  it('applies error styling when error prop is true', () => {
    render(<Input placeholder="Error input" error />);
    const input = screen.getByPlaceholderText(/error input/i);
    expect(input.className).toContain('border-red-500');
  });
});
