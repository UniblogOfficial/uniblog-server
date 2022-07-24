import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { HttpModule } from '@nestjs/axios';

import { SocialModule } from 'modules/socials/social.module';
import { FileModule } from 'modules/files/file.module';

import { PostService } from 'modules/posts/post.service';

import { PostController } from './post.controller';

import { User } from 'modules/users/user.model';
import { Post } from 'modules/posts/post.model';

@Module({
  controllers: [PostController],
  providers: [PostService],
  imports: [SequelizeModule.forFeature([User, Post]), FileModule, HttpModule, SocialModule],
})
export class PostModule {}
