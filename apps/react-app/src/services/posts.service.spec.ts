import { describe, it, expect, vi, beforeEach } from 'vitest';
import { postsService } from './posts.service';
import { api } from './api';

vi.mock('./api', () => ({
  api: {
    get: vi.fn(),
    post: vi.fn(),
  },
}));

describe('postsService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('getPosts deve buscar lista de posts com parâmetros', async () => {
    const mockPosts = [{ id: '1', title: 'Post 1' }];
    vi.mocked(api.get).mockResolvedValueOnce({ data: mockPosts });

    const result = await postsService.getPosts({ search: 'React', tag: 'TS' });
    expect(api.get).toHaveBeenCalledWith('/posts', {
      params: { search: 'React', tag: 'TS' },
    });
    expect(result).toEqual(mockPosts);
  });

  it('getPostById deve buscar post específico pelo id', async () => {
    const mockPost = { id: 'p-1', title: 'Post 1' };
    vi.mocked(api.get).mockResolvedValueOnce({ data: mockPost });

    const result = await postsService.getPostById('p-1');
    expect(api.get).toHaveBeenCalledWith('/posts/p-1');
    expect(result).toEqual(mockPost);
  });

  it('createPost deve enviar requisição de criação de post', async () => {
    const newPost = { id: 'p-2', title: 'Novo' };
    vi.mocked(api.post).mockResolvedValueOnce({ data: newPost });

    const result = await postsService.createPost({
      title: 'Novo',
      description: 'Desc',
    });
    expect(api.post).toHaveBeenCalledWith('/posts', {
      title: 'Novo',
      description: 'Desc',
    });
    expect(result).toEqual(newPost);
  });

  it('toggleLike deve enviar requisição de like', async () => {
    const mockRes = { liked: true, likesCount: 5 };
    vi.mocked(api.post).mockResolvedValueOnce({ data: mockRes });

    const result = await postsService.toggleLike('p-1');
    expect(api.post).toHaveBeenCalledWith('/posts/p-1/likes');
    expect(result).toEqual(mockRes);
  });

  it('addComment deve enviar novo comentário', async () => {
    const mockComment = { id: 'c-1', content: 'Bom!' };
    vi.mocked(api.post).mockResolvedValueOnce({ data: mockComment });

    const result = await postsService.addComment('p-1', 'Bom!');
    expect(api.post).toHaveBeenCalledWith('/posts/p-1/comments', {
      content: 'Bom!',
    });
    expect(result).toEqual(mockComment);
  });

  it('getTags deve listar tags', async () => {
    const mockTags = [{ id: 't-1', name: 'React' }];
    vi.mocked(api.get).mockResolvedValueOnce({ data: mockTags });

    const result = await postsService.getTags();
    expect(api.get).toHaveBeenCalledWith('/tags');
    expect(result).toEqual(mockTags);
  });
});
