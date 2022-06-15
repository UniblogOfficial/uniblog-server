import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiSecurity } from '@nestjs/swagger';
import { ApiKeyGuard } from '../auth/api-key.guard';
import { BindSocialVkDto } from './dto/bind-social.dto';
import { SocialService } from './social.service';

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
