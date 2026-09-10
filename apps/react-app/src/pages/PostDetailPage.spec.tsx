import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router';
import { PostDetailPage } from './PostDetailPage';
import * as AuthContextModule from '../contexts';
import { postsService } from '../services/posts.service';

const mockPost = {
  id: 'p-123',
  title: 'Post Específico',
  description: 'Detalhes completos',
  codeSnippet: null,
  imageUrl: null,
  sharesCount: 0,
  likesCount: 1,
  commentsCount: 0,
  isLiked: false,
  author: { id: 'u-1', name: 'Beatriz' },
  tags: [{ id: 't-1', name: 'CSS' }],
  comments: [],
  createdAt: '2026-09-10T12:00:00.000Z',
  updatedAt: '2026-09-10T12:00:00.000Z',
};

describe('PostDetailPage', () => {
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

  it('busca post por id e renderiza detalhes', async () => {
    vi.spyOn(postsService, 'getPostById').mockResolvedValueOnce(mockPost);

    render(
      <MemoryRouter initialEntries={['/posts/p-123']}>
        <Routes>
          <Route path="/posts/:id" element={<PostDetailPage />} />
        </Routes>
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(postsService.getPostById).toHaveBeenCalledWith('p-123');
      expect(
        screen.getByRole('heading', { name: 'Post Específico' }),
      ).toBeInTheDocument();
      expect(screen.getByText('Beatriz')).toBeInTheDocument();
    });
  });
});
