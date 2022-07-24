import { RoleType } from '@prisma/client';

export class AddRoleDto {
  readonly userId: string;
  readonly value: RoleType;
}
