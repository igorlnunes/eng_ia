import { ApiProperty } from '@nestjs/swagger';

export class TagResponseDto {
  @ApiProperty({ example: 'b56e6d1e-1234-4a5b-8c9d-e1f2a3b4c5d6' })
  id: string;

  @ApiProperty({ example: 'React' })
  name: string;
}
