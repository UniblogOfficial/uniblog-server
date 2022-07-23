import { Dialect } from 'sequelize/types';

import { IDatabaseConfig } from 'core/database/interfaces/dbConfig.interface';

export const databaseConfig: IDatabaseConfig = {
  development: {
    uri: process.env.DB_URL,
    options: {
      dialect: process.env.DB_DIALECT as Dialect,
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
      // autoLoadModels: true,
    },
  },
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME_TEST,
    options: {
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      dialect: process.env.DB_DIALECT as Dialect,
    },
  },
  production: {
    uri: process.env.DB_URL,
    options: {
      dialect: process.env.DB_DIALECT as Dialect,
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
    },
  },
  /* production: {
    options: {
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME_PRODUCTION,
      host: process.env.DB_HOST,
      dialect: process.env.DB_DIALECT as Dialect,
    },
  }, */
};
