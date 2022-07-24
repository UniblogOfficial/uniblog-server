import { Sequelize } from 'sequelize-typescript';

import {
  TDatabaseConfigAttributes,
  TDatabaseWithUriConfigAttributes,
  TDatabaseWithOptionsConfigAttributes,
} from 'core/database/interfaces/dbConfig.interface';
import { SEQUELIZE, DEVELOPMENT, TEST, PRODUCTION } from 'core/constants';
import { databaseConfig } from 'core/database/database.config';

import { User } from 'modules/users/user.model';

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
