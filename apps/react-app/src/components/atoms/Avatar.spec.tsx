import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Avatar } from './Avatar';

describe('Avatar', () => {
  it('renderiza as iniciais quando não há imagem', () => {
    render(<Avatar name="Carlos Souza" />);
    const avatar = screen.getByRole('img', { name: /avatar de carlos souza/i });
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveTextContent('CS');
  });

  it('renderiza imagem quando src é informado', () => {
    render(<Avatar name="Ana Silva" src="https://example.com/avatar.jpg" />);
    const img = screen.getByRole('img', { name: /avatar de ana silva/i });
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'https://example.com/avatar.jpg');
  });

  it('aplica classes de tamanho corretamente', () => {
    const { rerender } = render(<Avatar name="Beatriz" size="sm" />);
    expect(screen.getByRole('img')).toHaveClass('w-7', 'h-7');

    rerender(<Avatar name="Beatriz" size="lg" />);
    expect(screen.getByRole('img')).toHaveClass('w-12', 'h-12');
  });
});
