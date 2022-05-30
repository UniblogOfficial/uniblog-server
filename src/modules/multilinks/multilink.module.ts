import { MLImageData } from './model/images/ml-imagedata.model';
import { MLVideo } from './model/ml-video.model';
import { MLShop } from './model/ml-shop.model';
import { MLSocial } from './model/ml-social.model';
import { MLImageText } from './model/ml-imagetext.model';
import { MLImage } from './model/ml-image.model';
import { MLLink } from './model/ml-link.model';
import { Avatar } from 'src/modules/users/model/avatar.model';
import { UserModule } from './../users/user.module';
import { AuthModule } from './../auth/auth.module';
import { MLText } from './model/ml-text.model';
import { Multilink } from './model/multilink.model';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { MultilinkController } from './multilink.controller';
import { MultilinkService } from './multilink.service';
import { MulterModule } from '@nestjs/platform-express';
import { MLLogo } from './model/ml-logo.model';
import { MLShopCell } from './model/ml-shop-cell.model';

@Module({
  controllers: [MultilinkController],
  providers: [MultilinkService],
  imports: [
    MulterModule.register({
      // dest: 'dist/images',
    }),
    SequelizeModule.forFeature([
      Multilink,
      // blocks
      MLLogo,
      MLText,
      MLLink,
      MLImage,
      MLImageText,
      MLSocial,
      MLShop,
      MLVideo,
      //
      MLShopCell,
      //
      MLImageData,
      Avatar,
    ]),
    AuthModule,
    UserModule,
  ],
})
export class MultilinkModule {}
