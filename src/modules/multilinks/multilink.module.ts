import { MLWidget } from './model/blocks/widget.model';
import { MLDivider } from './model/blocks/divider.model';
import { MLButton } from './model/blocks/button.model';
import { MLCarousel } from './model/blocks/carousel.model';
import { MLVote } from './model/blocks/vote/vote.model';
import { MLMap } from './model/blocks/map.model';
import { MLAudio } from './model/blocks/audio.model';
import { MLPost } from './model/blocks/post.model';
import { MLVoteCell } from './model/blocks/vote/vote-cell.model';
import { MLImageData } from './model/images/ml-imagedata.model';
import { MLVideo } from './model/blocks/video.model';
import { MLShop } from './model/blocks/shop/shop.model';
import { MLSocial } from './model/blocks/social.model';
import { MLImage } from './model/blocks/image.model';
import { Avatar } from 'src/modules/users/model/avatar.model';
import { UserModule } from './../users/user.module';
import { AuthModule } from './../auth/auth.module';
import { MLText } from './model/blocks/text.model';
import { Multilink } from './model/multilink.model';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { MultilinkController } from './multilink.controller';
import { MultilinkService } from './multilink.service';
import { MulterModule } from '@nestjs/platform-express';
import { MLShopCell } from './model/blocks/shop/shop-cell.model';
import { MLImageText } from './model/blocks/imagetext.model';
import { MLLink } from './model/blocks/link.model';
import { MLLogo } from './model/blocks/logo.model';

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
      MLText,
      MLSocial,
      MLPost,
      MLWidget,
      MLVideo,
      MLAudio,
      MLMap,
      MLVote,
      MLDivider,

      MLLogo,
      MLLink,
      MLButton,
      MLImage,
      MLImageText,
      MLCarousel,
      MLShop,
      //
      MLShopCell,
      MLVoteCell,
      //
      MLImageData,
      Avatar,
    ]),
    AuthModule,
    UserModule,
  ],
})
export class MultilinkModule {}
