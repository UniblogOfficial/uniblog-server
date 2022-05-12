import { AuthModule } from './../auth/auth.module';
import { MLContent } from './model/mlcontent.model';
import { Multilink } from './model/multilink.model';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { MultilinkController } from './multilink.controller';
import { MultilinkService } from './multilink.service';
import { MulterModule } from '@nestjs/platform-express';
import { MLLogo } from './model/mllogo.model';

@Module({
  controllers: [MultilinkController],
  providers: [MultilinkService],
  imports: [
    MulterModule.register({
      // dest: 'dist/images',
    }),
    SequelizeModule.forFeature([Multilink, MLContent, MLLogo]),
    AuthModule,
  ],
})
export class MultilinkModule {}
