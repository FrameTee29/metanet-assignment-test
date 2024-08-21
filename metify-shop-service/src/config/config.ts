import { ConfigModuleOptions } from '@nestjs/config';

import { config as dotEnvConfig } from 'dotenv';

import configuration from '@/config/configuration';

export const getEnvFilePath = () => {
  return '.env';
};

dotEnvConfig({ path: getEnvFilePath() });

export const getConfigModuleOptions = (): ConfigModuleOptions => ({
  cache: true,
  isGlobal: true,
  expandVariables: true,
  envFilePath: getEnvFilePath(),
  load: [configuration],
});
