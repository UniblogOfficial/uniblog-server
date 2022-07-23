import { Role } from 'modules/roles/role.model';

export type TUserTokenData = {
  id: number;
  email: string;
  roles: Role[];
};
