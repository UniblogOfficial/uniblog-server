import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiSecurity } from '@nestjs/swagger';

import { SocialService } from 'modules/socials/social.service';

import { ApiKeyGuard } from 'modules/auth/guards/api-key.guard';

import { BindSocialVkDto } from 'modules/socials/dto/bind-social.dto';

@ApiSecurity('API-KEY', ['API-KEY'])
@UseGuards(ApiKeyGuard)
@Controller('social')
export class SocialController {
  constructor(private socialService: SocialService) {}

  @Post('/vk')
  bindVk(@Body() dto: BindSocialVkDto) {
    return this.socialService.bindVk(dto);
  }
}
