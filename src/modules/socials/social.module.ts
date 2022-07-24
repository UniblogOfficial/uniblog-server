import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { SocialService } from 'modules/socials/social.service';

import { SocialController } from 'modules/socials/social.controller';

import { Social } from 'modules/socials/social.model';

@Module({
  controllers: [SocialController],
  providers: [SocialService],
  imports: [SequelizeModule.forFeature([Social]), HttpModule],
  exports: [SocialService],
})
export class SocialModule {}
