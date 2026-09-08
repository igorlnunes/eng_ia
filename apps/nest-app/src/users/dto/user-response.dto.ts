import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty({ description: 'ID único do usuário', example: '550e8400-e29b-41d4-a716-446655440000' })
  id: string;

  @ApiProperty({ description: 'Nome do usuário', example: 'João Silva' })
  name: string;

  @ApiProperty({ description: 'E-mail do usuário', example: 'joao@example.com' })
  email: string;

  @ApiProperty({ description: 'Data de criação da conta' })
  createdAt: Date;
}
