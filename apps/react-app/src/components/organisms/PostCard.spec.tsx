import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { PostCard } from './PostCard';
import * as AuthContextModule from '../../contexts';
import { postsService, type Post } from '../../services/posts.service';

const mockPost: Post = {
  id: 'p-1',
  title: 'Dominando React 19',
  description: 'Guia completo de novos hooks e recursos.',
  codeSnippet: 'const x = 1;',
  imageUrl: null, // Tests placeholder!
  sharesCount: 10,
  likesCount: 5,
  commentsCount: 3,
  isLiked: false,
  author: { id: 'u-1', name: 'Ana Silva' },
  tags: [{ id: 't-1', name: 'React' }],
  createdAt: '2026-01-01',
  updatedAt: '2026-01-01',
};

describe('PostCard', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renderiza título, descrição, autor e tags', () => {
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
        <PostCard post={mockPost} />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole('heading', { name: 'Dominando React 19' }),
    ).toBeInTheDocument();
    expect(
      screen.getByText('Guia completo de novos hooks e recursos.'),
    ).toBeInTheDocument();
    expect(screen.getByText('Ana Silva')).toBeInTheDocument();
    expect(screen.getByText('#react')).toBeInTheDocument();
    // Tests thumbnail placeholder is rendered when imageUrl is null
    expect(
      screen.getByRole('img', {
        name: /placeholder para: dominando react 19/i,
      }),
    ).toBeInTheDocument();
  });

  it('renderiza imagem real quando imageUrl estiver presente', () => {
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
        <PostCard
          post={{ ...mockPost, imageUrl: 'https://images.com/cover.jpg' }}
        />
      </MemoryRouter>,
    );

    const img = screen.getByRole('img', { name: 'Dominando React 19' });
    expect(img).toHaveAttribute('src', 'https://images.com/cover.jpg');
  });

  it('permite curtir quando usuário está autenticado', async () => {
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

    vi.spyOn(postsService, 'toggleLike').mockResolvedValueOnce({
      liked: true,
      likesCount: 6,
    });

    render(
      <MemoryRouter>
        <PostCard post={mockPost} />
      </MemoryRouter>,
    );

    const likeButton = screen.getByRole('button', { name: /curtir post/i });
    fireEvent.click(likeButton);

    await waitFor(() => {
      expect(postsService.toggleLike).toHaveBeenCalledWith('p-1');
    });
  });
});
