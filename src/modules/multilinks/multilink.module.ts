import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { MulterModule } from '@nestjs/platform-express';

import { UserModule } from 'modules/users/user.module';
import { AuthModule } from 'modules/auth/auth.module';

import { MultilinkService } from './multilink.service';

import { MultilinkController } from 'modules/multilinks/multilink.controller';

import { MLWidget } from 'modules/multilinks/model/blocks/widget.model';
import { MLDivider } from 'modules/multilinks/model/blocks/divider.model';
import { MLButton } from 'modules/multilinks/model/blocks/button.model';
import { MLCarousel } from 'modules/multilinks/model/blocks/carousel.model';
import { MLVote } from 'modules/multilinks/model/blocks/vote/vote.model';
import { MLMap } from 'modules/multilinks/model/blocks/map.model';
import { MLAudio } from 'modules/multilinks/model/blocks/audio.model';
import { MLPost } from 'modules/multilinks/model/blocks/post.model';
import { MLVoteCell } from 'modules/multilinks/model/blocks/vote/vote-cell.model';
import { MLImageData } from 'modules/multilinks/model/images/ml-imagedata.model';
import { MLVideo } from 'modules/multilinks/model/blocks/video.model';
import { MLShop } from 'modules/multilinks/model/blocks/shop/shop.model';
import { MLSocial } from 'modules/multilinks/model/blocks/social.model';
import { MLImage } from 'modules/multilinks/model/blocks/image.model';
import { Avatar } from 'modules/users/model/avatar.model';
import { MLText } from 'modules/multilinks/model/blocks/text.model';
import { Multilink } from 'modules/multilinks/model/multilink.model';
import { MLShopCell } from 'modules/multilinks/model/blocks/shop/shop-cell.model';
import { MLImageText } from 'modules/multilinks/model/blocks/imagetext.model';
import { MLLink } from 'modules/multilinks/model/blocks/link.model';
import { MLLogo } from 'modules/multilinks/model/blocks/logo.model';
import { MLFeedback } from 'modules/multilinks/model/blocks/feedback.model';
import { MLTimer } from 'modules/multilinks/model/blocks/timer.model';

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
      MLFeedback,
      MLDivider,

      MLLogo,
      MLLink,
      MLButton,
      MLImage,
      MLImageText,
      MLCarousel,
      MLShop,
      MLTimer,
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
