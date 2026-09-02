import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Label } from './Label';

describe('Label', () => {
  it('renders correctly', () => {
    render(<Label htmlFor="test">My Label</Label>);
    expect(screen.getByText(/my label/i)).toBeInTheDocument();
  });

  it('passes props to label element', () => {
    render(<Label htmlFor="test-input">Test Label</Label>);
    const label = screen.getByText(/test label/i) as HTMLLabelElement;
    expect(label.htmlFor).toBe('test-input');
  });
});
