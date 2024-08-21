import { Injectable, Logger } from '@nestjs/common';

import { CachingService } from '@/shared/caching/caching.service';

import { UserWalletRepository } from '@/models/user/repositories/user-wallet.repository';

import { JwtUserInfo } from '@/interfaces/auth.interface';
import { UserWalletCacheKey } from '@/constants/cache/user-wallet.constant';

@Injectable()
export class UserWalletService {
  private readonly logger = new Logger(UserWalletService.name);

  constructor(
    private readonly cachingService: CachingService,
    private readonly userWalletRepository: UserWalletRepository,
  ) {}

  async getMyWallets(jwtUserInfo: JwtUserInfo) {
    const { id: userId } = jwtUserInfo;

    const userWallet = await this.userWalletRepository.findOneByUserId(userId);

    const cacheKey = `${UserWalletCacheKey.USER_WALLET}:${userId}`;
    const ttl = 60 * 60 * 24; // 1 day
    await this.cachingService.set(cacheKey, userWallet, ttl);

    return userWallet;
  }
}
