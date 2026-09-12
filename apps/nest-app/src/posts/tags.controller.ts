import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { TagResponseDto } from './dto/tag-response.dto.js';
import { PostsService } from './posts.service.js';

@ApiTags('tags')
@Controller('tags')
export class TagsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todas as tags disponíveis' })
  @ApiOkResponse({
    description: 'Lista de tags.',
    type: [TagResponseDto],
  })
  async findAll(): Promise<TagResponseDto[]> {
    return this.postsService.findAllTags();
  }
}
