import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PlaceholderThumbnail } from './PlaceholderThumbnail';

describe('PlaceholderThumbnail', () => {
  it('renderiza com título padrão e acessibilidade', () => {
    render(<PlaceholderThumbnail />);
    const placeholder = screen.getByRole('img', {
      name: /placeholder para: codeconnect post/i,
    });
    expect(placeholder).toBeInTheDocument();
  });

  it('renderiza título personalizado', () => {
    render(<PlaceholderThumbnail title="Meu Projeto Incrível" />);
    expect(screen.getByText('Meu Projeto Incrível')).toBeInTheDocument();
    expect(
      screen.getByRole('img', {
        name: /placeholder para: meu projeto incrível/i,
      }),
    ).toBeInTheDocument();
  });
});
