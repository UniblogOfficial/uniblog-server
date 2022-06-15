import { CreateRoleDto } from './dto/create-role.dto';
import { RoleService } from './role.service';
import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { ApiKeyGuard } from '../auth/api-key.guard';

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
  getByValue(@Param('value') value: string) {
    return this.roleService.getRoleByValue(value);
  }
}
