import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({
    description: 'Conteúdo do comentário',
    example: 'Excelente post, me ajudou bastante!',
  })
  @IsString()
  @IsNotEmpty({ message: 'O comentário não pode ser vazio.' })
  @MaxLength(1000, { message: 'O comentário pode ter no máximo 1000 caracteres.' })
  content: string;
}
