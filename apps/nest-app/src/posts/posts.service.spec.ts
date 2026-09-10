import { NotFoundException } from '@nestjs/common';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { PrismaService } from '../prisma/prisma.service.js';
import { PostsService } from './posts.service.js';

function makePrismaMock() {
  return {
    post: {
      findMany: vi.fn(),
      findUnique: vi.fn(),
      create: vi.fn(),
    },
    like: {
      findUnique: vi.fn(),
      create: vi.fn(),
      delete: vi.fn(),
      count: vi.fn(),
    },
    comment: {
      create: vi.fn(),
    },
    tag: {
      findMany: vi.fn(),
    },
  };
}

describe('PostsService', () => {
  let service: PostsService;
  let prismaMock: ReturnType<typeof makePrismaMock>;

  beforeEach(() => {
    prismaMock = makePrismaMock();
    service = new PostsService(prismaMock as unknown as PrismaService);
  });

  describe('findAll', () => {
    it('deve listar posts e mapear contagens e flags de curtida', async () => {
      const mockPosts = [
        {
          id: 'post-1',
          title: 'Post 1',
          description: 'Desc 1',
          codeSnippet: null,
          imageUrl: null,
          sharesCount: 5,
          author: { id: 'u-1', name: 'Ana' },
          tags: [{ id: 't-1', name: 'React' }],
          _count: { comments: 2, likes: 3 },
          likes: [{ id: 'like-1' }],
          createdAt: new Date('2026-01-01'),
          updatedAt: new Date('2026-01-01'),
        },
      ];

      prismaMock.post.findMany.mockResolvedValueOnce(mockPosts);

      const result = await service.findAll({ search: 'Post' }, 'u-1');

      expect(result).toHaveLength(1);
      expect(result[0].title).toBe('Post 1');
      expect(result[0].likesCount).toBe(3);
      expect(result[0].commentsCount).toBe(2);
      expect(result[0].isLiked).toBe(true);
      expect(prismaMock.post.findMany).toHaveBeenCalled();
    });

    it('deve ordenar por popularidade se query.sort for popular', async () => {
      prismaMock.post.findMany.mockResolvedValueOnce([]);

      await service.findAll({ sort: 'popular' });

      expect(prismaMock.post.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          orderBy: [{ likes: { _count: 'desc' } }, { createdAt: 'desc' }],
        }),
      );
    });
  });

  describe('findById', () => {
    it('deve retornar detalhes do post com comentários quando existir', async () => {
      const mockPost = {
        id: 'post-1',
        title: 'Post 1',
        description: 'Desc 1',
        codeSnippet: 'console.log()',
        imageUrl: 'http://img.com/1.png',
        sharesCount: 1,
        author: { id: 'u-1', name: 'Ana' },
        tags: [{ id: 't-1', name: 'React' }],
        _count: { comments: 1, likes: 2 },
        likes: [],
        comments: [
          {
            id: 'c-1',
            content: 'Legal!',
            postId: 'post-1',
            author: { id: 'u-2', name: 'Carlos' },
            createdAt: new Date('2026-01-02'),
          },
        ],
        createdAt: new Date('2026-01-01'),
        updatedAt: new Date('2026-01-01'),
      };

      prismaMock.post.findUnique.mockResolvedValueOnce(mockPost);

      const result = await service.findById('post-1', 'u-2');

      expect(result.id).toBe('post-1');
      expect(result.comments).toHaveLength(1);
      expect(result.comments![0].content).toBe('Legal!');
      expect(result.isLiked).toBe(false);
    });

    it('deve lançar NotFoundException se post não existir', async () => {
      prismaMock.post.findUnique.mockResolvedValueOnce(null);

      await expect(service.findById('unknown-id')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('create', () => {
    it('deve criar um post e retornar o DTO formatado', async () => {
      const mockCreated = {
        id: 'post-123',
        title: 'Novo Post',
        description: 'Descrição do novo post',
        codeSnippet: 'const x = 1;',
        imageUrl: null,
        sharesCount: 0,
        author: { id: 'u-1', name: 'Ana' },
        tags: [{ id: 't-1', name: 'Node' }],
        _count: { comments: 0, likes: 0 },
        createdAt: new Date('2026-01-01'),
        updatedAt: new Date('2026-01-01'),
      };

      prismaMock.post.create.mockResolvedValueOnce(mockCreated);

      const result = await service.create(
        {
          title: 'Novo Post',
          description: 'Descrição do novo post',
          codeSnippet: 'const x = 1;',
          tags: ['Node'],
        },
        'u-1',
      );

      expect(result.id).toBe('post-123');
      expect(result.title).toBe('Novo Post');
      expect(result.likesCount).toBe(0);
      expect(result.commentsCount).toBe(0);
    });
  });

  describe('toggleLike', () => {
    it('deve curtir se o usuário ainda não tiver curtido', async () => {
      prismaMock.post.findUnique.mockResolvedValueOnce({ id: 'post-1' });
      prismaMock.like.findUnique.mockResolvedValueOnce(null);
      prismaMock.like.create.mockResolvedValueOnce({ id: 'like-1' });
      prismaMock.like.count.mockResolvedValueOnce(1);

      const result = await service.toggleLike('post-1', 'u-1');

      expect(result.liked).toBe(true);
      expect(result.likesCount).toBe(1);
      expect(prismaMock.like.create).toHaveBeenCalledWith({
        data: { postId: 'post-1', userId: 'u-1' },
      });
    });

    it('deve descurtir se o usuário já tiver curtido', async () => {
      prismaMock.post.findUnique.mockResolvedValueOnce({ id: 'post-1' });
      prismaMock.like.findUnique.mockResolvedValueOnce({ id: 'like-1' });
      prismaMock.like.delete.mockResolvedValueOnce({ id: 'like-1' });
      prismaMock.like.count.mockResolvedValueOnce(0);

      const result = await service.toggleLike('post-1', 'u-1');

      expect(result.liked).toBe(false);
      expect(result.likesCount).toBe(0);
      expect(prismaMock.like.delete).toHaveBeenCalledWith({
        where: { id: 'like-1' },
      });
    });

    it('deve lançar NotFoundException se o post não existir', async () => {
      prismaMock.post.findUnique.mockResolvedValueOnce(null);

      await expect(service.toggleLike('post-99', 'u-1')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('addComment', () => {
    it('deve adicionar um comentário ao post', async () => {
      prismaMock.post.findUnique.mockResolvedValueOnce({ id: 'post-1' });
      prismaMock.comment.create.mockResolvedValueOnce({
        id: 'c-1',
        content: 'Ótimo conteúdo',
        postId: 'post-1',
        authorId: 'u-1',
        author: { id: 'u-1', name: 'Ana' },
        createdAt: new Date('2026-01-01'),
      });

      const result = await service.addComment('post-1', 'u-1', {
        content: 'Ótimo conteúdo',
      });

      expect(result.id).toBe('c-1');
      expect(result.content).toBe('Ótimo conteúdo');
      expect(result.author.name).toBe('Ana');
    });

    it('deve lançar NotFoundException se post não existir ao comentar', async () => {
      prismaMock.post.findUnique.mockResolvedValueOnce(null);

      await expect(
        service.addComment('post-99', 'u-1', { content: 'Oi' }),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('findAllTags', () => {
    it('deve listar tags ordenadas', async () => {
      const tags = [{ id: 't-1', name: 'CSS' }, { id: 't-2', name: 'React' }];
      prismaMock.tag.findMany.mockResolvedValueOnce(tags);

      const result = await service.findAllTags();
      expect(result).toEqual(tags);
    });
  });
});
