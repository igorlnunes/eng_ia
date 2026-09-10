import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { CreatePostModal } from './CreatePostModal';
import { postsService } from '../../services/posts.service';

describe('CreatePostModal', () => {
  it('não renderiza quando isOpen for false', () => {
    render(
      <CreatePostModal
        isOpen={false}
        onClose={() => {}}
        onSuccess={() => {}}
      />,
    );
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('submete dados e chama onSuccess ao criar post', async () => {
    const handleClose = vi.fn();
    const handleSuccess = vi.fn();

    vi.spyOn(postsService, 'createPost').mockResolvedValueOnce({
      id: 'p-new',
      title: 'Projeto Teste',
      description: 'Descrição do projeto teste',
      codeSnippet: null,
      imageUrl: null,
      sharesCount: 0,
      likesCount: 0,
      commentsCount: 0,
      isLiked: false,
      author: { id: 'u-1', name: 'Ana' },
      tags: [{ id: 't-1', name: 'React' }],
      createdAt: '2026-09-10T12:00:00.000Z',
      updatedAt: '2026-09-10T12:00:00.000Z',
    });

    render(
      <CreatePostModal
        isOpen={true}
        onClose={handleClose}
        onSuccess={handleSuccess}
      />,
    );

    const titleInput = screen.getByLabelText(/título do projeto/i);
    const descInput = screen.getByLabelText(/descrição \*/i);

    fireEvent.change(titleInput, { target: { value: 'Projeto Teste' } });
    fireEvent.change(descInput, {
      target: { value: 'Descrição do projeto teste' },
    });

    const submitBtn = screen.getByRole('button', { name: 'Publicar' });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(postsService.createPost).toHaveBeenCalledWith(
        expect.objectContaining({
          title: 'Projeto Teste',
          description: 'Descrição do projeto teste',
        }),
      );
      expect(handleSuccess).toHaveBeenCalled();
      expect(handleClose).toHaveBeenCalled();
    });
  });
});
