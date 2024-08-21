import configuration from '@/config/configuration';

export const AuthCacheKey = {
  AUTH_ACCESS_TOKEN: `${configuration().app.appName}:AUTH_ACCESS_TOKEN`,
};
