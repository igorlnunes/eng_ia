import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CommentItem } from './CommentItem';

describe('CommentItem', () => {
  it('renderiza o autor, conteúdo e data do comentário', () => {
    render(
      <CommentItem
        authorName="Beatriz Lima"
        content="Gostei muito deste post!"
        createdAt="2026-09-10T10:30:00.000Z"
      />,
    );

    expect(screen.getByText('Beatriz Lima')).toBeInTheDocument();
    expect(screen.getByText('Gostei muito deste post!')).toBeInTheDocument();
    expect(screen.getByText(/10/)).toBeInTheDocument();
  });
});
