import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { RoleType } from '@prisma/client';

import { RoleService } from 'modules/roles/role.service';

import { ApiKeyGuard } from 'modules/auth/guards/api-key.guard';

import { CreateRoleDto } from 'modules/roles/dto/create-role.dto';

@ApiTags('Role')
@ApiSecurity('API-KEY', ['API-KEY'])
@UseGuards(ApiKeyGuard)
@Controller('role')
export class RoleController {
  constructor(private roleService: RoleService) {}

  @Post()
  create(@Body() dto: CreateRoleDto) {
    return this.roleService.createRole(dto);
  }

  @Get('/:value')
  getByValue(@Param('value') value: RoleType) {
    return this.roleService.getRoleByValue(value);
  }
}
