import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { PostDetail } from './PostDetail';
import * as AuthContextModule from '../../contexts';
import { postsService, type Post } from '../../services/posts.service';

const mockPostDetail: Post = {
  id: 'p-1',
  title: 'Post Completo',
  description: 'Descrição completa com código.',
  codeSnippet: 'const message = "Olá";',
  imageUrl: null,
  sharesCount: 2,
  likesCount: 1,
  commentsCount: 1,
  isLiked: false,
  author: { id: 'u-1', name: 'Ana Silva' },
  tags: [{ id: 't-1', name: 'React' }],
  comments: [
    {
      id: 'c-1',
      content: 'Comentário existente',
      postId: 'p-1',
      author: { id: 'u-2', name: 'Carlos' },
      createdAt: '2026-09-10T12:00:00.000Z',
    },
  ],
  createdAt: '2026-09-10T12:00:00.000Z',
  updatedAt: '2026-09-10T12:00:00.000Z',
};

describe('PostDetail', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('exibe prompt de login quando não autenticado para comentários', () => {
    vi.spyOn(AuthContextModule, 'useAuth').mockReturnValue({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      login: vi.fn(),
      logout: vi.fn(),
      refreshUser: vi.fn(),
    });

    render(
      <MemoryRouter>
        <PostDetail post={mockPostDetail} />
      </MemoryRouter>,
    );

    expect(
      screen.getByText(/você precisa estar conectado para curtir e comentar/i),
    ).toBeInTheDocument();
    expect(screen.getByText('Comentário existente')).toBeInTheDocument();
    expect(screen.getByText('Carlos')).toBeInTheDocument();
  });

  it('permite adicionar comentário quando autenticado', async () => {
    vi.spyOn(AuthContextModule, 'useAuth').mockReturnValue({
      user: {
        id: 'u-1',
        name: 'Ana',
        email: 'ana@test.com',
        createdAt: '2026-01-01',
      },
      isAuthenticated: true,
      isLoading: false,
      login: vi.fn(),
      logout: vi.fn(),
      refreshUser: vi.fn(),
    });

    vi.spyOn(postsService, 'addComment').mockResolvedValueOnce({
      id: 'c-new',
      content: 'Novo comentário adicionado',
      postId: 'p-1',
      author: { id: 'u-1', name: 'Ana' },
      createdAt: '2026-09-10T13:00:00.000Z',
    });

    render(
      <MemoryRouter>
        <PostDetail post={mockPostDetail} />
      </MemoryRouter>,
    );

    const textarea = screen.getByPlaceholderText(
      'Escreva um comentário sobre este projeto...',
    );
    fireEvent.change(textarea, {
      target: { value: 'Novo comentário adicionado' },
    });

    const submitBtn = screen.getByRole('button', { name: 'Comentar' });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(postsService.addComment).toHaveBeenCalledWith(
        'p-1',
        'Novo comentário adicionado',
      );
      expect(
        screen.getByText('Novo comentário adicionado'),
      ).toBeInTheDocument();
    });
  });
});
