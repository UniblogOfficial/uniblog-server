import { HttpService } from '@nestjs/axios';
import {
  HttpException,
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { AxiosResponse } from 'axios';
import { lastValueFrom, map, Observable } from 'rxjs';

import { BindSocialVkDto } from 'modules/socials/dto/bind-social.dto';
import { Social } from 'modules/socials/social.model';

@Injectable()
export class SocialService {
  constructor(
    @InjectModel(Social) private socialRepository: typeof Social,
    private httpService: HttpService,
  ) {}

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
    const account = await this.getAccountBySocialUserId(socialUserId);

    if (account) {
      throw new HttpException('Account already have bound', HttpStatus.BAD_REQUEST);
    }

    await this.socialRepository.create({
      name: 'vk',
      accessToken,
      socialUserId,
      userId: dto.userId,
    });

    const VkData = await this.getSocialUserData(socialUserId, accessToken);

    return VkData;
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

  private getAccountBySocialUserId(socialUserId: string) {
    return this.socialRepository.findOne({ where: { socialUserId } });
  }

  getAccountByUserId(userId: number) {
    return this.socialRepository.findOne({ where: { userId } });
  }
}
