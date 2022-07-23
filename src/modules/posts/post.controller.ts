import { Body, Controller, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiSecurity } from '@nestjs/swagger';

import { PostService } from 'modules/posts/post.service';

import { ApiKeyGuard } from 'modules/auth/api-key.guard';

import { CreatePostDto } from 'modules/posts/dto/create-post.dto';
import { PublishPostDto } from 'modules/posts/dto/publish-post.dto';

@ApiSecurity('API-KEY', ['API-KEY'])
@UseGuards(ApiKeyGuard)
@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  create(@Body() dto: CreatePostDto, @UploadedFile() image: any) {
    return this.postService.create(dto, image);
  }

  @Post('publish')
  publish(@Body() dto: PublishPostDto) {
    return this.postService.publish(dto);
  }
}
