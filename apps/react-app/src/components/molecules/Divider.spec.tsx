import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Divider } from './Divider';

describe('Divider', () => {
  it('renders correctly without children', () => {
    const { container } = render(<Divider />);
    expect(container.querySelector('hr')).toBeInTheDocument();
  });

  it('renders correctly with text', () => {
    render(<Divider>Or continue with</Divider>);
    expect(screen.getByText(/or continue with/i)).toBeInTheDocument();
  });
});
