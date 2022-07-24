import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { PrismaModule } from 'modules/prisma/prisma.module';

import { SocialService } from 'modules/socials/social.service';

import { SocialController } from 'modules/socials/social.controller';

@Module({
  controllers: [SocialController],
  providers: [SocialService],
  imports: [PrismaModule, HttpModule],
  exports: [SocialService],
})
export class SocialModule {}
