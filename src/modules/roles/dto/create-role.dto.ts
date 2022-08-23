import { RoleType } from '@prisma/client';

export class CreateRoleDto {
  readonly value: RoleType;
  readonly description: string;
}
