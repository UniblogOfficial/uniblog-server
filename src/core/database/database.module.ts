import { MLShopCell } from './../../modules/multilinks/model/ml-shop-cell.model';
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
import { MLText } from 'src/modules/multilinks/model/ml-text.model';
import { MLLogo } from 'src/modules/multilinks/model/ml-logo.model';
import { Avatar } from 'src/modules/users/model/avatar.model';
import { MLImageData } from 'src/modules/multilinks/model/images/ml-imagedata.model';
import { MLImage } from 'src/modules/multilinks/model/ml-image.model';
import { MLImageText } from 'src/modules/multilinks/model/ml-imagetext.model';
import { MLLink } from 'src/modules/multilinks/model/ml-link.model';
import { MLShop } from 'src/modules/multilinks/model/ml-shop.model';
import { MLSocial } from 'src/modules/multilinks/model/ml-social.model';
import { MLVideo } from 'src/modules/multilinks/model/ml-video.model';

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
      ],
      autoLoadModels: true,
    }),
  ],
})
export class DatabaseModule {}
