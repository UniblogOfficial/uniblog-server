import { SequelizeOptions } from 'sequelize-typescript';

export type TDatabaseConfigAttributes = {
  database: string;
  username: string;
  password?: string;
  options?: SequelizeOptions;
};
export type TDatabaseWithUriConfigAttributes = { uri: string; options?: SequelizeOptions };

export type TDatabaseWithOptionsConfigAttributes = { options?: SequelizeOptions };

export interface IDatabaseConfig {
  development: TDatabaseWithUriConfigAttributes;
  test: TDatabaseConfigAttributes;
  production: TDatabaseWithUriConfigAttributes;
  // production: TDatabaseWithOptionsConfigAttributes;
}
