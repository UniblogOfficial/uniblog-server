import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { RoleService } from 'modules/roles/role.service';

import { RoleController } from 'modules/roles/role.controller';

import { UserRole } from 'modules/roles/user-role.model';
import { User } from 'modules/users/user.model';
import { Role } from 'modules/roles/role.model';

@Module({
  controllers: [RoleController],
  providers: [RoleService],
  imports: [SequelizeModule.forFeature([Role, User, UserRole])],
  exports: [RoleService],
})
export class RoleModule {}
