import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Typography } from './Typography';

describe('Typography', () => {
  it('renders paragraph by default', () => {
    const { container } = render(<Typography>Default text</Typography>);
    expect(container.querySelector('p')).toBeInTheDocument();
    expect(screen.getByText(/default text/i)).toBeInTheDocument();
  });

  it('renders h1 when variant is h1', () => {
    const { container } = render(<Typography variant="h1">Heading 1</Typography>);
    expect(container.querySelector('h1')).toBeInTheDocument();
    expect(screen.getByText(/heading 1/i)).toBeInTheDocument();
  });
});
