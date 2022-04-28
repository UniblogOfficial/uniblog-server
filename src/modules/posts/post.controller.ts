import { PostService } from './post.service';
import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { PublishPostDto } from './dto/publish-post.dto';

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
