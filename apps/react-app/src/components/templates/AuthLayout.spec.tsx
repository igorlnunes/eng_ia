import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { AuthLayout } from './AuthLayout';

describe('AuthLayout', () => {
  it('renders banner and content', () => {
    render(
      <AuthLayout banner={<div data-testid="banner">Banner</div>}>
        <div data-testid="content">Content</div>
      </AuthLayout>
    );
    expect(screen.getByTestId('banner')).toBeInTheDocument();
    expect(screen.getByTestId('content')).toBeInTheDocument();
  });
});
