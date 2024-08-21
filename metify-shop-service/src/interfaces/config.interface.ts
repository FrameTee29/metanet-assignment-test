export interface Config {
  app: AppConfig;
  redis: RedisConfig;
  database: TypeOrmModuleConfig;
  paytanet: PaytanetConfig;
}

export interface AppConfig {
  nodeEnv: string;
  port: number;
  appName: string;
}

export interface RedisConfig {
  host: string;
  port: number;
  password: string;
  db: number;
}

export interface TypeOrmModuleConfig {
  type: 'mysql';
  host?: string;
  port?: number;
  username?: string;
  password?: string;
  database?: string;
  synchronize: boolean;
  logging: boolean;
}

export interface PaytanetConfig {
  url: string;
}
