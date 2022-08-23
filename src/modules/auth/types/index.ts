import { Role } from '@prisma/client';

export type TUserTokenData = {
  id: string;
  email: string;
  roles: Role[];
};
