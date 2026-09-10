import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CommentResponseDto } from './comment-response.dto.js';
import { TagResponseDto } from './tag-response.dto.js';

export class PostAuthorDto {
  @ApiProperty({ example: 'b56e6d1e-1234-4a5b-8c9d-e1f2a3b4c5d6' })
  id: string;

  @ApiProperty({ example: 'Carlos Souza' })
  name: string;
}

export class PostResponseDto {
  @ApiProperty({ example: 'b56e6d1e-1234-4a5b-8c9d-e1f2a3b4c5d6' })
  id: string;

  @ApiProperty({ example: 'Dominando useMemo e useCallback no React 19' })
  title: string;

  @ApiProperty({ example: 'Aprenda como evitar re-renderizações...' })
  description: string;

  @ApiPropertyOptional({ example: 'const memo = useMemo(...);' })
  codeSnippet: string | null;

  @ApiPropertyOptional({
    example: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee',
  })
  imageUrl: string | null;

  @ApiProperty({ example: 14 })
  sharesCount: number;

  @ApiProperty({ example: 5 })
  likesCount: number;

  @ApiProperty({ example: 2 })
  commentsCount: number;

  @ApiProperty({ example: false })
  isLiked: boolean;

  @ApiProperty({ type: PostAuthorDto })
  author: PostAuthorDto;

  @ApiProperty({ type: [TagResponseDto] })
  tags: TagResponseDto[];

  @ApiPropertyOptional({ type: [CommentResponseDto] })
  comments?: CommentResponseDto[];

  @ApiProperty({ example: '2026-09-10T12:00:00.000Z' })
  createdAt: Date;

  @ApiProperty({ example: '2026-09-10T12:00:00.000Z' })
  updatedAt: Date;
}

export class LikeToggleResponseDto {
  @ApiProperty({ example: true })
  liked: boolean;

  @ApiProperty({ example: 6 })
  likesCount: number;
}
