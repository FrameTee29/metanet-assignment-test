import { Config } from '@/interfaces/config.interface';

const configuration = (): Config => ({
  app: {
    nodeEnv: process.env.NODE_ENV || 'development',
    port: Number(process.env.PORT) || 3000,
    appName: process.env.APP_NAME || 'NestJS Starter',
  },
  security: {
    pepper: process.env.PEPPER || '',
  },
  jwt: {
    secret: process.env.JWT_SECRET || '',
    expiresIn: process.env.JWT_EXPIRES_IN || '1d',
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
  BOT: {
    url: process.env.BOT_API_URL || 'https://www.bot.or.th',
  },
});

export default configuration;
