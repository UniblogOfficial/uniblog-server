import { Module, forwardRef } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { UserService } from 'modules/users/user.service';

import { UserController } from 'modules/users/user.controller';

import { Avatar } from 'modules/users/model/avatar.model';
import { AuthModule } from 'modules/auth/auth.module';
import { RoleModule } from 'modules/roles/role.module';
import { UserRole } from 'modules/roles/user-role.model';
import { Role } from 'modules/roles/role.model';
import { User } from 'modules/users/user.model';
import { Post } from 'modules/posts/post.model';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [
    SequelizeModule.forFeature([User, Role, UserRole, Avatar, Post]),
    RoleModule,
    forwardRef(() => AuthModule),
  ],
  exports: [UserService],
})
export class UserModule {}
