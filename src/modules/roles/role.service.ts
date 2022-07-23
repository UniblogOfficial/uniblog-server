import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { CreateRoleDto } from 'modules/roles/dto/create-role.dto';
import { Role } from 'modules/roles/role.model';

@Injectable()
export class RoleService {
  constructor(@InjectModel(Role) private roleRepository: typeof Role) {}

  createRole(dto: CreateRoleDto) {
    return this.roleRepository.create(dto);
  }

  getRoleByValue(value: string) {
    return this.roleRepository.findOne({ where: { value } });
  }
}
