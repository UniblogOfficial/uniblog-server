import { User } from './../../modules/users/user.model';
import { Sequelize } from 'sequelize-typescript';
import { SEQUELIZE, DEVELOPMENT, TEST, PRODUCTION } from '../constants';
import { databaseConfig } from './database.config';
import {
  TDatabaseConfigAttributes,
  TDatabaseWithUriConfigAttributes,
  TDatabaseWithOptionsConfigAttributes,
} from './interfaces/dbConfig.interface';

export const databaseProviders = [
  {
    provide: SEQUELIZE,
    useFactory: async () => {
      let config;
      switch (process.env.NODE_ENV) {
        case DEVELOPMENT:
          config = databaseConfig.development as TDatabaseWithUriConfigAttributes;
          break;
        case TEST:
          config = databaseConfig.test as TDatabaseConfigAttributes;
          break;
        case PRODUCTION:
          config = databaseConfig.production as TDatabaseWithOptionsConfigAttributes;
          break;
        default:
          config = databaseConfig.development as TDatabaseWithUriConfigAttributes;
      }
      const sequelize = new Sequelize(config.uri, config.options);
      sequelize.addModels([User]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
