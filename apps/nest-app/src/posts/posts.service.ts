import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateCommentDto } from './dto/create-comment.dto.js';
import { CreatePostDto } from './dto/create-post.dto.js';
import {
  CommentResponseDto,
} from './dto/comment-response.dto.js';
import {
  LikeToggleResponseDto,
  PostResponseDto,
} from './dto/post-response.dto.js';
import { QueryPostsDto } from './dto/query-posts.dto.js';
import { TagResponseDto } from './dto/tag-response.dto.js';

@Injectable()
export class PostsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(
    query: QueryPostsDto,
    currentUserId?: string,
  ): Promise<PostResponseDto[]> {
    const where: Prisma.PostWhereInput = {};
    const conditions: Prisma.PostWhereInput[] = [];

    if (query.search?.trim()) {
      const searchTerm = query.search.trim();
      conditions.push({
        OR: [
          { title: { contains: searchTerm, mode: 'insensitive' } },
          { description: { contains: searchTerm, mode: 'insensitive' } },
        ],
      });
    }

    if (query.tag?.trim()) {
      conditions.push({
        tags: {
          some: {
            name: { equals: query.tag.trim(), mode: 'insensitive' },
          },
        },
      });
    }

    if (conditions.length > 0) {
      where.AND = conditions;
    }

    let orderBy: Prisma.PostOrderByWithRelationInput[];
    if (query.sort === 'popular') {
      orderBy = [{ likes: { _count: 'desc' } }, { createdAt: 'desc' }];
    } else {
      orderBy = [{ createdAt: 'desc' }];
    }

    const posts = await this.prisma.post.findMany({
      where,
      orderBy,
      include: {
        author: { select: { id: true, name: true } },
        tags: { select: { id: true, name: true } },
        _count: { select: { comments: true, likes: true } },
        likes: currentUserId
          ? { where: { userId: currentUserId }, select: { id: true } }
          : false,
      },
    });

    return posts.map((post) => ({
      id: post.id,
      title: post.title,
      description: post.description,
      codeSnippet: post.codeSnippet,
      imageUrl: post.imageUrl,
      sharesCount: post.sharesCount,
      likesCount: post._count.likes,
      commentsCount: post._count.comments,
      isLiked: currentUserId
        ? Array.isArray(post.likes) && post.likes.length > 0
        : false,
      author: post.author,
      tags: post.tags,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
    }));
  }

  async findById(
    id: string,
    currentUserId?: string,
  ): Promise<PostResponseDto> {
    const post = await this.prisma.post.findUnique({
      where: { id },
      include: {
        author: { select: { id: true, name: true } },
        tags: { select: { id: true, name: true } },
        _count: { select: { comments: true, likes: true } },
        likes: currentUserId
          ? { where: { userId: currentUserId }, select: { id: true } }
          : false,
        comments: {
          include: {
            author: { select: { id: true, name: true } },
          },
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    if (!post) {
      throw new NotFoundException('Post não encontrado.');
    }

    return {
      id: post.id,
      title: post.title,
      description: post.description,
      codeSnippet: post.codeSnippet,
      imageUrl: post.imageUrl,
      sharesCount: post.sharesCount,
      likesCount: post._count.likes,
      commentsCount: post._count.comments,
      isLiked: currentUserId
        ? Array.isArray(post.likes) && post.likes.length > 0
        : false,
      author: post.author,
      tags: post.tags,
      comments: post.comments.map((comment) => ({
        id: comment.id,
        content: comment.content,
        postId: comment.postId,
        author: comment.author,
        createdAt: comment.createdAt,
      })),
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
    };
  }

  async create(
    createPostDto: CreatePostDto,
    authorId: string,
  ): Promise<PostResponseDto> {
    const tagConnectOrCreate = createPostDto.tags
      ? createPostDto.tags
          .filter((t) => t.trim().length > 0)
          .map((tagName) => ({
            where: { name: tagName.trim() },
            create: { name: tagName.trim() },
          }))
      : [];

    const post = await this.prisma.post.create({
      data: {
        title: createPostDto.title,
        description: createPostDto.description,
        codeSnippet: createPostDto.codeSnippet ?? null,
        imageUrl: createPostDto.imageUrl ?? null,
        authorId,
        tags: {
          connectOrCreate: tagConnectOrCreate,
        },
      },
      include: {
        author: { select: { id: true, name: true } },
        tags: { select: { id: true, name: true } },
        _count: { select: { comments: true, likes: true } },
      },
    });

    return {
      id: post.id,
      title: post.title,
      description: post.description,
      codeSnippet: post.codeSnippet,
      imageUrl: post.imageUrl,
      sharesCount: post.sharesCount,
      likesCount: post._count.likes,
      commentsCount: post._count.comments,
      isLiked: false,
      author: post.author,
      tags: post.tags,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
    };
  }

  async toggleLike(
    postId: string,
    userId: string,
  ): Promise<LikeToggleResponseDto> {
    const post = await this.prisma.post.findUnique({ where: { id: postId } });
    if (!post) {
      throw new NotFoundException('Post não encontrado.');
    }

    const existingLike = await this.prisma.like.findUnique({
      where: {
        postId_userId: { postId, userId },
      },
    });

    let liked: boolean;
    if (existingLike) {
      await this.prisma.like.delete({
        where: { id: existingLike.id },
      });
      liked = false;
    } else {
      await this.prisma.like.create({
        data: { postId, userId },
      });
      liked = true;
    }

    const likesCount = await this.prisma.like.count({ where: { postId } });
    return { liked, likesCount };
  }

  async addComment(
    postId: string,
    userId: string,
    createCommentDto: CreateCommentDto,
  ): Promise<CommentResponseDto> {
    const post = await this.prisma.post.findUnique({ where: { id: postId } });
    if (!post) {
      throw new NotFoundException('Post não encontrado.');
    }

    const comment = await this.prisma.comment.create({
      data: {
        content: createCommentDto.content,
        postId,
        authorId: userId,
      },
      include: {
        author: { select: { id: true, name: true } },
      },
    });

    return {
      id: comment.id,
      content: comment.content,
      postId: comment.postId,
      author: comment.author,
      createdAt: comment.createdAt,
    };
  }

  async findAllTags(): Promise<TagResponseDto[]> {
    return this.prisma.tag.findMany({
      orderBy: { name: 'asc' },
    });
  }
}
