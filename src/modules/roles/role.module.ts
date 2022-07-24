import { Module } from '@nestjs/common';

import { PrismaModule } from 'modules/prisma/prisma.module';

import { RoleService } from 'modules/roles/role.service';

import { RoleController } from 'modules/roles/role.controller';

@Module({
  controllers: [RoleController],
  providers: [RoleService],
  imports: [PrismaModule],
  exports: [RoleService],
})
export class RoleModule {}
