import { SocialModule } from './../socials/social.module';
import { FileModule } from './../files/file.module';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../users/user.model';
import { PostController } from './post.controller';
import { Post } from './post.model';
import { PostService } from './post.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  controllers: [PostController],
  providers: [PostService],
  imports: [SequelizeModule.forFeature([User, Post]), FileModule, HttpModule, SocialModule],
})
export class PostModule {}
