import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module.js';
import { PostsController } from './posts.controller.js';
import { PostsService } from './posts.service.js';
import { TagsController } from './tags.controller.js';

@Module({
  imports: [AuthModule],
  controllers: [PostsController, TagsController],
  providers: [PostsService],
  exports: [PostsService],
})
export class PostsModule {}
