import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom, map } from 'rxjs';

import { SocialService } from 'modules/socials/social.service';
import { FileService } from 'modules/files/file.service';

import { CreatePostDto } from 'modules/posts/dto/create-post.dto';
import { PublishPostDto } from 'modules/posts/dto/publish-post.dto';
import { Social } from 'modules/socials/social.model';
import { Post } from 'modules/posts/post.model';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Post) private postRepository: typeof Post,
    private fileService: FileService,
    private httpService: HttpService,
    private socialService: SocialService,
  ) {}

  async create(dto: CreatePostDto, image: File) {
    const imageName = this.fileService.create(image);
    const post = await this.postRepository.create({ ...dto, image: imageName });

    return post;
  }

  async publish(dto: PublishPostDto) {
    let userVk: Social;
    try {
      userVk = await this.socialService.getAccountByUserId(dto.userId);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    if (!userVk) throw new HttpException('Vk user not found', HttpStatus.BAD_REQUEST);

    const data = await lastValueFrom(
      this.httpService
        .post(`https://api.vk.com/method/wall.post`, {
          params: {
            access_token: userVk.accessToken,
            owner_id: userVk.socialUserId,
            message: 'Posted via Uniblog',
            attachments: 'https://prnt.sc/umipVPCnvviL',
            v: '5.131',
          },
        })
        .pipe(map(res => res.data)),
    );
    return data;
  }
}
