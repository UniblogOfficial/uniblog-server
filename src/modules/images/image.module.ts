import { ImageController } from './image.controller';
import { SavedImage } from './savedImage.model';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ImageService } from './image.service';
import { HttpModule } from '@nestjs/axios';
import { AuthModule } from '../auth/auth.module';

@Module({
  providers: [ImageService],
  controllers: [ImageController],
  exports: [ImageService],
  imports: [SequelizeModule.forFeature([SavedImage]), HttpModule, AuthModule],
})
export class ImageModule {}
