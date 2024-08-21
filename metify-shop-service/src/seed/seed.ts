import { config as dotEnvConfig } from 'dotenv';

import { getEnvFilePath } from '@/config/config';

import { TypeOrmDataSource } from '@/shared/database/typeorm.config';

import { seedProduct } from '@/seed/seed-product';

dotEnvConfig({ path: getEnvFilePath() });

const main = async () => {
  try {
    await TypeOrmDataSource.initialize();

    await seedProduct(TypeOrmDataSource);

    process.exit(0);
  } catch (error) {
    console.error('Error during seed:', error);
  }
};

main();
