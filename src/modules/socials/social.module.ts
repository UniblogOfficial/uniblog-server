import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SocialController } from './social.controller';
import { Social } from './social.model';
import { SocialService } from './social.service';

@Module({
  controllers: [SocialController],
  providers: [SocialService],
  imports: [SequelizeModule.forFeature([Social]), HttpModule],
  exports: [SocialService],
})
export class SocialModule {}
