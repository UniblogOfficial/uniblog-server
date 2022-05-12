import { Role } from 'src/modules/roles/role.model';

export type TUserTokenData = {
  email: string;
  id: number;
  roles: Role[];
};
