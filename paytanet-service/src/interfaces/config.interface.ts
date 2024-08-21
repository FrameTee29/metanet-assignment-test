export interface Config {
  app: AppConfig;
  security: SecurityConfig;
  jwt: JwtConfig;
  redis: RedisConfig;
  database: TypeOrmModuleConfig;
  BOT: BankOfThailandConfig;
}

export interface AppConfig {
  nodeEnv: string;
  port: number;
  appName: string;
}

export interface SecurityConfig {
  pepper: string;
}

export interface JwtConfig {
  secret: string;
  expiresIn: string;
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

export interface BankOfThailandConfig {
  url: string;
}
