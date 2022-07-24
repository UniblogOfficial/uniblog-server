import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { PrismaModule } from 'modules/prisma/prisma.module';
import { SocialModule } from 'modules/socials/social.module';
import { FileModule } from 'modules/files/file.module';

import { PostService } from 'modules/posts/post.service';

import { PostController } from 'modules/posts/post.controller';

@Module({
  controllers: [PostController],
  providers: [PostService],
  imports: [PrismaModule, FileModule, HttpModule, SocialModule],
})
export class PostModule {}
