import { AuthModule } from './../auth/auth.module';
import { MLContent } from './model/mlcontent.model';
import { Multilink } from './model/multilink.model';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { MultilinkController } from './multilink.controller';
import { MultilinkService } from './multilink.service';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  controllers: [MultilinkController],
  providers: [MultilinkService],
  imports: [
    MulterModule.register({
      // dest: 'dist/images',
    }),
    SequelizeModule.forFeature([Multilink, MLContent]),
    AuthModule,
  ],
})
export class MultilinkModule {}
