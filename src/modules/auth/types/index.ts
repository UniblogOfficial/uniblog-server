import { Role } from 'modules/roles/role.model';

export type TUserTokenData = {
  id: string;
  email: string;
  roles: Role[];
};
