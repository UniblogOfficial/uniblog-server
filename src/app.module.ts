// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config({ path: `.${process.env.NODE_ENV}.env` });
import { Module } from '@nestjs/common';
import { DatabaseModule } from './core/database/database.module';
import { UserModule } from './modules/users/user.module';
import { ConfigModule } from '@nestjs/config';
import { RoleModule } from './modules/roles/role.module';
import { AuthModule } from './modules/auth/auth.module';
import { PostModule } from './modules/posts/post.module';
import { FileModule } from './modules/files/file.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { SocialModule } from './modules/socials/social.module';
import { MultilinkModule } from './modules/multilinks/multilink.module';
import * as path from 'path';

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({ envFilePath: `.${process.env.NODE_ENV}.env`, isGlobal: true }),
    // ServeStaticModule.forRoot({ rootPath: path.resolve(__dirname, 'static') }),
    DatabaseModule,
    UserModule,
    RoleModule,
    AuthModule,
    PostModule,
    FileModule,
    SocialModule,
    MultilinkModule,
  ],
})
export class AppModule {}
