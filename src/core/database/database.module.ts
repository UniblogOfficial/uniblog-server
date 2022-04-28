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

@Module({
  // providers: [...databaseProviders],
  providers: [],
  // exports: [...databaseProviders],
  exports: [],
  imports: [
    SequelizeModule.forRoot({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      database: process.env.DB_NAME_DEVELOPMENT,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      dialect: process.env.DB_DIALECT as Dialect,
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
      models: [User, Role, UserRole, Post, Social],
      autoLoadModels: true,
    }),
  ],
})
export class DatabaseModule {}
