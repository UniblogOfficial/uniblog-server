// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config({ path: `.${process.env.NODE_ENV}.env` });
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
// import { ServeStaticModule } from '@nestjs/serve-static';
// import * as path from 'path';
import config from 'config';

import { UserModule } from 'modules/users/user.module';
import { RoleModule } from 'modules/roles/role.module';
import { AuthModule } from 'modules/auth/auth.module';
import { PostModule } from 'modules/posts/post.module';
import { FileModule } from 'modules/files/file.module';
import { SocialModule } from 'modules/socials/social.module';
import { MultilinkModule } from 'modules/multilinks/multilink.module';
import { ImageModule } from 'modules/images/image.module';

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
      isGlobal: true,
      load: [config],
    }),
    // ServeStaticModule.forRoot({ rootPath: path.resolve(__dirname, 'static') }),
    UserModule,
    RoleModule,
    AuthModule,
    PostModule,
    FileModule,
    ImageModule,
    SocialModule,
    MultilinkModule,
  ],
})
export class AppModule {}
