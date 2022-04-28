import { Body, Controller, Post } from '@nestjs/common';
import { BindSocialVkDto } from './dto/bind-social.dto';
import { SocialService } from './social.service';

@Controller('social')
export class SocialController {
  constructor(private socialService: SocialService) {}

  @Post('/vk')
  bindVk(@Body() dto: BindSocialVkDto) {
    return this.socialService.bindVk(dto);
  }
}
