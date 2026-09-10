import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsIn, IsOptional, IsString } from 'class-validator';

export class QueryPostsDto {
  @ApiPropertyOptional({
    description: 'Busca textual em título e descrição',
    example: 'react',
  })
  @IsString()
  @IsOptional()
  search?: string;

  @ApiPropertyOptional({
    description: 'Filtrar posts por nome da tag',
    example: 'React',
  })
  @IsString()
  @IsOptional()
  tag?: string;

  @ApiPropertyOptional({
    description: 'Ordenação dos posts',
    enum: ['recent', 'popular'],
    default: 'recent',
  })
  @IsIn(['recent', 'popular'], { message: 'Sort deve ser "recent" ou "popular".' })
  @IsOptional()
  sort?: 'recent' | 'popular';
}
