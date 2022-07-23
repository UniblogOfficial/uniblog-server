import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { HttpModule } from '@nestjs/axios';

import { AuthModule } from 'modules/auth/auth.module';

import { ImageService } from 'modules/images/image.service';

import { ImageController } from 'modules/images/image.controller';

import { SavedImage } from 'modules/images/savedImage.model';

@Module({
  providers: [ImageService],
  controllers: [ImageController],
  exports: [ImageService],
  imports: [SequelizeModule.forFeature([SavedImage]), HttpModule, AuthModule],
})
export class ImageModule {}
