import { Injectable } from '@nestjs/common';
import { RoleType } from '@prisma/client';

import { PrismaService } from 'modules/prisma/prisma.service';

import { CreateRoleDto } from 'modules/roles/dto/create-role.dto';

@Injectable()
export class RoleService {
  constructor(private prisma: PrismaService) {}

  createRole(dto: CreateRoleDto) {
    return this.prisma.role.create({ data: dto });
  }

  getRoleByValue(value: RoleType) {
    return this.prisma.role.findUnique({ where: { value } });
  }
}
