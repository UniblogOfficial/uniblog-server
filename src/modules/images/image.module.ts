import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { PrismaModule } from 'modules/prisma/prisma.module';
import { AuthModule } from 'modules/auth/auth.module';

import { ImageService } from 'modules/images/image.service';

import { ImageController } from 'modules/images/image.controller';

@Module({
  providers: [ImageService],
  controllers: [ImageController],
  exports: [ImageService],
  imports: [PrismaModule, HttpModule, AuthModule],
})
export class ImageModule {}
