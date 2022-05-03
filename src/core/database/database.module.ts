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
import { MLContent } from 'src/modules/multilinks/model/mlcontent.model';

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
      models: [User, Role, UserRole, Post, Social, Multilink, MLContent],
      autoLoadModels: true,
    }),
  ],
})
export class DatabaseModule {}
