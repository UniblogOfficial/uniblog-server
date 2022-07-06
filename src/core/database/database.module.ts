// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
import { url2obj } from './dbUrlToObj';
import { UserRole } from '../../modules/roles/user-role.model';

import { databaseConfig } from './database.config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';

// import { databaseProviders } from './database.providers';
import { Dialect } from 'sequelize/types';
import { User } from 'src/modules/users/user.model';
import { Role } from 'src/modules/roles/role.model';
import { Post } from 'src/modules/posts/post.model';
import { Social } from 'src/modules/socials/social.model';
import { Multilink } from 'src/modules/multilinks/model/multilink.model';
import { MLText } from 'src/modules/multilinks/model/blocks/text.model';
import { Avatar } from 'src/modules/users/model/avatar.model';
import { MLImageData } from 'src/modules/multilinks/model/images/ml-imagedata.model';
import { MLImage } from 'src/modules/multilinks/model/blocks/image.model';
import { MLShop } from 'src/modules/multilinks/model/blocks/shop/shop.model';
import { MLSocial } from 'src/modules/multilinks/model/blocks/social.model';
import { MLVideo } from 'src/modules/multilinks/model/blocks/video.model';
import { MLImageText } from 'src/modules/multilinks/model/blocks/imagetext.model';
import { MLLink } from 'src/modules/multilinks/model/blocks/link.model';
import { MLLogo } from 'src/modules/multilinks/model/blocks/logo.model';
import { MLAudio } from 'src/modules/multilinks/model/blocks/audio.model';
import { MLButton } from 'src/modules/multilinks/model/blocks/button.model';
import { MLCarousel } from 'src/modules/multilinks/model/blocks/carousel.model';
import { MLDivider } from 'src/modules/multilinks/model/blocks/divider.model';
import { MLMap } from 'src/modules/multilinks/model/blocks/map.model';
import { MLPost } from 'src/modules/multilinks/model/blocks/post.model';
import { MLVoteCell } from 'src/modules/multilinks/model/blocks/vote/vote-cell.model';
import { MLVote } from 'src/modules/multilinks/model/blocks/vote/vote.model';
import { MLWidget } from 'src/modules/multilinks/model/blocks/widget.model';
import { MLTimer } from './../../modules/multilinks/model/blocks/timer.model';
import { MLFeedback } from './../../modules/multilinks/model/blocks/feedback.model';
import { MLShopCell } from '../../modules/multilinks/model/blocks/shop/shop-cell.model';

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
