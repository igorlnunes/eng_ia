import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PostCardMeta } from './PostCardMeta';

describe('PostCardMeta', () => {
  it('renderiza o nome do autor e avatar de iniciais', () => {
    render(<PostCardMeta authorName="Carlos Souza" />);
    expect(screen.getByText('Carlos Souza')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /avatar de carlos souza/i })).toBeInTheDocument();
  });

  it('renderiza data formatada quando fornecida', () => {
    render(
      <PostCardMeta
        authorName="Ana Silva"
        date="2026-09-10T12:00:00.000Z"
      />,
    );
    expect(screen.getByText('Ana Silva')).toBeInTheDocument();
    // In pt-BR format, date will contain 2026 and 10
    expect(screen.getByText(/2026/)).toBeInTheDocument();
  });
});
