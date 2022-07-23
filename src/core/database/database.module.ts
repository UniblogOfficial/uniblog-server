// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { Dialect } from 'sequelize/types';

import { url2obj } from 'core/database/dbUrlToObj';

// import { databaseConfig } from 'core/database/database.config';
// import { databaseProviders } from './database.providers';

import { User } from 'modules/users/user.model';
import { Role } from 'modules/roles/role.model';
import { Post } from 'modules/posts/post.model';
import { Social } from 'modules/socials/social.model';
import { Multilink } from 'modules/multilinks/model/multilink.model';
import { MLText } from 'modules/multilinks/model/blocks/text.model';
import { Avatar } from 'modules/users/model/avatar.model';
import { MLImageData } from 'modules/multilinks/model/images/ml-imagedata.model';
import { MLImage } from 'modules/multilinks/model/blocks/image.model';
import { MLShop } from 'modules/multilinks/model/blocks/shop/shop.model';
import { MLSocial } from 'modules/multilinks/model/blocks/social.model';
import { MLVideo } from 'modules/multilinks/model/blocks/video.model';
import { MLImageText } from 'modules/multilinks/model/blocks/imagetext.model';
import { MLLink } from 'modules/multilinks/model/blocks/link.model';
import { MLLogo } from 'modules/multilinks/model/blocks/logo.model';
import { MLAudio } from 'modules/multilinks/model/blocks/audio.model';
import { MLButton } from 'modules/multilinks/model/blocks/button.model';
import { MLCarousel } from 'modules/multilinks/model/blocks/carousel.model';
import { MLDivider } from 'modules/multilinks/model/blocks/divider.model';
import { MLMap } from 'modules/multilinks/model/blocks/map.model';
import { MLPost } from 'modules/multilinks/model/blocks/post.model';
import { MLVoteCell } from 'modules/multilinks/model/blocks/vote/vote-cell.model';
import { MLVote } from 'modules/multilinks/model/blocks/vote/vote.model';
import { MLWidget } from 'modules/multilinks/model/blocks/widget.model';
import { MLTimer } from 'modules/multilinks/model/blocks/timer.model';
import { MLFeedback } from 'modules/multilinks/model/blocks/feedback.model';
import { MLShopCell } from 'modules/multilinks/model/blocks/shop/shop-cell.model';
import { UserRole } from 'modules/roles/user-role.model';

const db = url2obj(process.env.DATABASE_URL);

@Module({
  // providers: [...databaseProviders],
  providers: [],
  // exports: [...databaseProviders],
  exports: [],
  imports: [
    SequelizeModule.forRoot({
      host: db.hostname,
      port: Number(db.port),
      database: db.segments[0],
      username: db.user,
      password: db.password,
      dialect: db.protocol as Dialect,
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
      models: [
        User,
        Role,
        UserRole,
        Avatar,
        Post,
        Social,
        Multilink,
        //
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
      ],
      autoLoadModels: true,
    }),
  ],
})
export class DatabaseModule {}
