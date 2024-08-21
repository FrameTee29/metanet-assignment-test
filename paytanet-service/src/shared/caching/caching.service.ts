import { Cache } from 'cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class CachingService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async get(key: string) {
    return await this.cacheManager.get(key);
  }

  async set(key: string, value: any, ttl?: number) {
    await this.cacheManager.set(key, value, { ttl });
  }

  async delete(key: string) {
    return await this.cacheManager.del(key);
  }
}
