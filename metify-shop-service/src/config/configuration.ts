import { Config } from '@/interfaces/config.interface';

const configuration = (): Config => ({
  app: {
    nodeEnv: process.env.NODE_ENV || 'development',
    port: Number(process.env.PORT) || 3000,
    appName: process.env.APP_NAME || 'NestJS Starter',
  },
  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: Number(process.env.REDIS_PORT) || 6379,
    password: process.env.REDIS_PASSWORD || '',
    db: Number(process.env.REDIS_DB) || 0,
  },
  database: {
    type: 'mysql',
    host: process.env.DATABASE_HOST || 'localhost',
    port: Number(process.env.DATABASE_PORT) || 3306,
    username: process.env.DATABASE_USERNAME || 'root',
    password: process.env.DATABASE_PASSWORD || '1234',
    database: process.env.DATABASE_NAME || 'paytanet',
    synchronize: process.env.DATABASE_SYNCHRONIZE === 'true' ? true : false,
    logging: process.env.DATABASE_LOGGING === 'true' ? true : false,
  },
  paytanet: {
    url: process.env.PAYTANET_API_URL || '',
  },
});

export default configuration;
