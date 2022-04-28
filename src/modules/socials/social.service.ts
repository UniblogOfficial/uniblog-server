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
import { BindSocialVkDto } from './dto/bind-social.dto';
import { Social } from './social.model';

const vktoken = '';

@Injectable()
export class SocialService {
  constructor(
    @InjectModel(Social) private socialRepository: typeof Social,
    private httpService: HttpService,
  ) {}

  async bindVk(dto: BindSocialVkDto) {
    let authData;
    try {
      authData = await this.getVkAuthData(dto.code);
      authData = {
        userVkId: authData.user_id,
        accessToken: authData.access_token,
        expiresIn: authData.expires_in,
        email: authData.email ?? null,
      };
    } catch (err) {
      throw new UnprocessableEntityException('Wrong VK code');
    }
    console.log(authData);

    const { userVkId, accessToken, expiresIn } = authData;
    const account = await this.getAccountByVkUserId(userVkId);
    if (account) {
      throw new HttpException('Account already have bound', HttpStatus.BAD_REQUEST);
    }

    const social = await this.socialRepository.create({
      name: 'vk',
      accessToken,
      userVkId,
      userId: dto.userId,
    });
    const VkData = await this.getVkUserData(userVkId, accessToken);
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
            client_id: clientId,
            client_secret: clientSecret,
            redirect_uri: host + '/callback',
            code: code,
          },
        })
        .pipe(map(res => res.data)),
    );
    return data;
  }

  private async getVkUserData(
    userVkId: number,
    token: string,
  ): Promise<Observable<AxiosResponse<any, any>>> {
    const data = await lastValueFrom(
      this.httpService
        .get(`https://api.vk.com/method/users.get`, {
          params: {
            user_ids: userVkId,
            fields: 'screen_name',
            access_token: token,
            v: '5.131',
          },
        })
        .pipe(map(res => res.data)),
    );
    return data;
  }

  private getAccountByVkUserId(userVkId: number) {
    const account = this.socialRepository.findOne({ where: { userVkId } });
    return account;
  }

  getAccountByUserId(userId: number) {
    const account = this.socialRepository.findOne({ where: { userId } });
    return account;
  }
}
