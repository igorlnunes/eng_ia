import { ApiProperty } from '@nestjs/swagger';

export class CommentAuthorDto {
  @ApiProperty({ example: 'b56e6d1e-1234-4a5b-8c9d-e1f2a3b4c5d6' })
  id: string;

  @ApiProperty({ example: 'Ana Silva' })
  name: string;
}

export class CommentResponseDto {
  @ApiProperty({ example: 'b56e6d1e-1234-4a5b-8c9d-e1f2a3b4c5d6' })
  id: string;

  @ApiProperty({ example: 'Excelente post!' })
  content: string;

  @ApiProperty({ example: 'b56e6d1e-1234-4a5b-8c9d-e1f2a3b4c5d6' })
  postId: string;

  @ApiProperty({ type: CommentAuthorDto })
  author: CommentAuthorDto;

  @ApiProperty({ example: '2026-09-10T12:00:00.000Z' })
  createdAt: Date;
}
