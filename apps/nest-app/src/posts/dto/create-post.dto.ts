import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';

export class CreatePostDto {
  @ApiProperty({
    description: 'Título do post',
    example: 'Dominando useMemo e useCallback no React 19',
  })
  @IsString()
  @IsNotEmpty({ message: 'O título é obrigatório.' })
  title: string;

  @ApiProperty({
    description: 'Descrição resumida do post',
    example: 'Aprenda como evitar re-renderizações desnecessárias...',
  })
  @IsString()
  @IsNotEmpty({ message: 'A descrição é obrigatória.' })
  description: string;

  @ApiPropertyOptional({
    description: 'Trecho de código associado ao post',
    example: 'const memoized = useMemo(() => compute(), []);',
  })
  @IsString()
  @IsOptional()
  codeSnippet?: string;

  @ApiPropertyOptional({
    description: 'URL do thumbnail do post',
    example: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee',
  })
  @IsUrl({}, { message: 'A imagem deve ser uma URL válida.' })
  @IsOptional()
  imageUrl?: string;

  @ApiPropertyOptional({
    description: 'Lista de nomes de tags associadas ao post',
    example: ['React', 'TypeScript'],
    type: [String],
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tags?: string[];
}
