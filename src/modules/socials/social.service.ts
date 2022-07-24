import {
  HttpException,
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom, map, Observable } from 'rxjs';

import { PrismaService } from 'modules/prisma/prisma.service';

import { BindSocialVkDto } from 'modules/socials/dto/bind-social.dto';

@Injectable()
export class SocialService {
  constructor(private prisma: PrismaService, private httpService: HttpService) {}

  async bindVk(dto: BindSocialVkDto) {
    let authData: any;
    try {
      authData = await this.getVkAuthData(dto.code);
      authData = {
        socialUserId: authData.user_id,
        accessToken: authData.access_token,
        expiresIn: authData.expires_in,
        email: authData.email || null,
      };
    } catch (err) {
      throw new UnprocessableEntityException('Wrong VK code');
    }

    const { socialUserId, accessToken } = authData;
    const account = await this.prisma.social.findUnique({
      where: { socialUserId },
      select: { id: true },
    });

    if (account) {
      throw new HttpException('Account already have bound', HttpStatus.BAD_REQUEST);
    }

    await this.prisma.social.create({
      data: {
        name: 'vk',
        accessToken,
        socialUserId,
        userId: dto.userId,
      },
    });

    return this.getSocialUserData(socialUserId, accessToken);
  }

  private async getVkAuthData(code: string): Promise<Observable<AxiosResponse<any, any>>> {
    const clientId = process.env.CLIENT_ID;
    const clientSecret = process.env.CLIENT_SECRET;
    const host =
      process.env.NODE_ENV === 'production' ? process.env.APP_HOST : process.env.APP_LOCAL;

    const data = await lastValueFrom(
      this.httpService
        .get(`https://oauth.vk.com/access_token`, {
          params: {
            code: code,
            client_id: clientId,
            client_secret: clientSecret,
            redirect_uri: host + '/callback',
          },
        })
        .pipe(map(res => res.data)),
    );

    return data;
  }

  private async getSocialUserData(
    userVkId: number,
    token: string,
  ): Promise<Observable<AxiosResponse<any, any>>> {
    const data = await lastValueFrom(
      this.httpService
        .get(`https://api.vk.com/method/users.get`, {
          params: {
            user_ids: userVkId,
            access_token: token,
            fields: 'screen_name',
            v: '5.131',
          },
        })
        .pipe(map(res => res.data)),
    );

    return data;
  }

  getAccountByUserId(userId: string) {
    return this.prisma.social.findUnique({ where: { id: userId } });
  }
}
