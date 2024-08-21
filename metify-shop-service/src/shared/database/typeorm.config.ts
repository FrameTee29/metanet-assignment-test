import { DataSource } from 'typeorm';

import configuration from '@/config/configuration';

const databaseConfig = configuration().database;

export const TypeOrmDataSource = new DataSource({
  ...databaseConfig,
  entities: ['dist/models/**/*.entity{.ts,.js}'],
  migrations: ['dist/migrations/*{.ts,.js}'],
});

TypeOrmDataSource.initialize()
  .then(() => {
    console.log(
      `[${configuration().app.nodeEnv}] - Data Source has been initialized!`,
    );
    console.log(
      `[${configuration().app.nodeEnv}] - Synchronize database: ${
        databaseConfig.synchronize
      }`,
    );
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err);
  });
