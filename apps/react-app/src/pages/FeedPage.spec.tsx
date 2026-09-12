import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { FeedPage } from './FeedPage';
import * as AuthContextModule from '../contexts';
import { postsService } from '../services/posts.service';

const mockPosts = [
  {
    id: 'p-1',
    title: 'Post Feed 1',
    description: 'Desc 1',
    codeSnippet: null,
    imageUrl: null,
    sharesCount: 0,
    likesCount: 2,
    commentsCount: 1,
    isLiked: false,
    author: { id: 'u-1', name: 'Carlos' },
    tags: [{ id: 't-1', name: 'React' }],
    createdAt: '2026-09-10T12:00:00.000Z',
    updatedAt: '2026-09-10T12:00:00.000Z',
  },
];

describe('FeedPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(AuthContextModule, 'useAuth').mockReturnValue({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      login: vi.fn(),
      logout: vi.fn(),
      refreshUser: vi.fn(),
    });
  });

  it('carrega e renderiza posts da API', async () => {
    vi.spyOn(postsService, 'getTags').mockResolvedValueOnce([
      { id: 't-1', name: 'React' },
    ]);
    vi.spyOn(postsService, 'getPosts').mockResolvedValueOnce(mockPosts);

    render(
      <MemoryRouter>
        <FeedPage />
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(
        screen.getByRole('heading', { name: 'Post Feed 1' }),
      ).toBeInTheDocument();
      expect(screen.getByText('Carlos')).toBeInTheDocument();
    });
  });

  it('exibe estado vazio quando não houver posts', async () => {
    vi.spyOn(postsService, 'getTags').mockResolvedValueOnce([]);
    vi.spyOn(postsService, 'getPosts').mockResolvedValueOnce([]);

    render(
      <MemoryRouter>
        <FeedPage />
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(
        screen.getByText('Nenhuma publicação encontrada'),
      ).toBeInTheDocument();
    });
  });
});
