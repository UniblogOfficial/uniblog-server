import { AuthModule } from './../auth/auth.module';
import { RoleModule } from '../roles/role.module';
import { UserRole } from '../roles/user-role.model';
import { Role } from 'src/modules/roles/role.model';
import { User } from './user.model';
import { Module, forwardRef } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { Post } from '../posts/post.model';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [
    SequelizeModule.forFeature([User, Role, UserRole, Post]),
    RoleModule,
    forwardRef(() => AuthModule),
  ],
  exports: [UserService],
})
export class UserModule {}
