import { SocialService } from './../socials/social.service';
import { FileService } from './../files/file.service';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreatePostDto } from './dto/create-post.dto';
import { Post } from './post.model';
import { PublishPostDto } from './dto/publish-post.dto';
import { lastValueFrom, map } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { Social } from '../socials/social.model';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Post) private postRepository: typeof Post,
    private fileService: FileService,
    private httpService: HttpService,
    private socialService: SocialService,
  ) {}

  async create(dto: CreatePostDto, image: File) {
    const imageName = await this.fileService.create(image);
    const post = await this.postRepository.create({ ...dto, image: imageName });
    return post;
  }

  async publish(dto: PublishPostDto) {
    // const imageName = await this.fileService.create(image);
    // const post = await this.postRepository.create({ ...dto, image: imageName });
    // https://prnt.sc/umipVPCnvviL
    let userVk: Social;
    try {
      userVk = await this.socialService.getAccountByUserId(dto.userId);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    if (!userVk) throw new HttpException('Vk user not found', HttpStatus.BAD_REQUEST);
    console.log(userVk.accessToken);

    const data = await lastValueFrom(
      this.httpService
        .post(`https://api.vk.com/method/wall.post`, {
          params: {
            access_token: userVk.accessToken,
            owner_id: userVk.userVkId,
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
