import { Module, forwardRef } from '@nestjs/common';

import { AuthModule } from 'modules/auth/auth.module';
import { RoleModule } from 'modules/roles/role.module';
import { PrismaModule } from 'modules/prisma/prisma.module';

import { UserService } from 'modules/users/user.service';

import { UserController } from 'modules/users/user.controller';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [RoleModule, PrismaModule, forwardRef(() => AuthModule)],
  exports: [UserService],
})
export class UserModule {}
