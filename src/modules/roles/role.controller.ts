import { CreateRoleDto } from './dto/create-role.dto';
import { RoleService } from './role.service';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Role')
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
