import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard.js';
import { CurrentUser, type UserPayload } from '../auth/current-user.decorator.js';
import { OptionalAuthGuard } from '../auth/optional-auth.guard.js';
import { CreateCommentDto } from './dto/create-comment.dto.js';
import { CreatePostDto } from './dto/create-post.dto.js';
import { CommentResponseDto } from './dto/comment-response.dto.js';
import {
  LikeToggleResponseDto,
  PostResponseDto,
} from './dto/post-response.dto.js';
import { QueryPostsDto } from './dto/query-posts.dto.js';
import { PostsService } from './posts.service.js';

@ApiTags('posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  @UseGuards(OptionalAuthGuard)
  @ApiOperation({ summary: 'Listar posts com busca textual, filtro de tag e ordenação' })
  @ApiOkResponse({
    description: 'Lista de posts retornada com sucesso.',
    type: [PostResponseDto],
  })
  async findAll(
    @Query() query: QueryPostsDto,
    @CurrentUser() user?: UserPayload,
  ): Promise<PostResponseDto[]> {
    return this.postsService.findAll(query, user?.sub);
  }

  @Get(':id')
  @UseGuards(OptionalAuthGuard)
  @ApiOperation({ summary: 'Obter detalhes de um post pelo ID' })
  @ApiOkResponse({
    description: 'Detalhes do post retornados com sucesso.',
    type: PostResponseDto,
  })
  @ApiNotFoundResponse({ description: 'Post não encontrado.' })
  async findById(
    @Param('id', ParseUUIDPipe) id: string,
    @CurrentUser() user?: UserPayload,
  ): Promise<PostResponseDto> {
    return this.postsService.findById(id, user?.sub);
  }

  @Post()
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Criar um novo post' })
  @ApiCreatedResponse({
    description: 'Post criado com sucesso.',
    type: PostResponseDto,
  })
  @ApiUnauthorizedResponse({ description: 'Não autorizado.' })
  async create(
    @Body() createPostDto: CreatePostDto,
    @CurrentUser() user: UserPayload,
  ): Promise<PostResponseDto> {
    return this.postsService.create(createPostDto, user.sub);
  }

  @Post(':id/likes')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Alternar curtida em um post (like / unlike)' })
  @ApiOkResponse({
    description: 'Status do like atualizado.',
    type: LikeToggleResponseDto,
  })
  @ApiNotFoundResponse({ description: 'Post não encontrado.' })
  @ApiUnauthorizedResponse({ description: 'Não autorizado.' })
  async toggleLike(
    @Param('id', ParseUUIDPipe) id: string,
    @CurrentUser() user: UserPayload,
  ): Promise<LikeToggleResponseDto> {
    return this.postsService.toggleLike(id, user.sub);
  }

  @Post(':id/comments')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Adicionar um comentário ao post' })
  @ApiCreatedResponse({
    description: 'Comentário adicionado com sucesso.',
    type: CommentResponseDto,
  })
  @ApiNotFoundResponse({ description: 'Post não encontrado.' })
  @ApiUnauthorizedResponse({ description: 'Não autorizado.' })
  async addComment(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() createCommentDto: CreateCommentDto,
    @CurrentUser() user: UserPayload,
  ): Promise<CommentResponseDto> {
    return this.postsService.addComment(id, user.sub, createCommentDto);
  }
}
