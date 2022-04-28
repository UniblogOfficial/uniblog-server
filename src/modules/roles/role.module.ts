import { UserRole } from './user-role.model';
import { User } from 'src/modules/users/user.model';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Role } from './role.model';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';

@Module({
  controllers: [RoleController],
  providers: [RoleService],
  imports: [SequelizeModule.forFeature([Role, User, UserRole])],
  exports: [RoleService],
})
export class RoleModule {}
