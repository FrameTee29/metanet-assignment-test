import { Injectable } from '@nestjs/common';

import { UserWalletCacheKey } from '@/constants/cache/user-wallet.constant';

import { CachingService } from '@/shared/caching/caching.service';

import { JwtUserInfo } from '@/interfaces/auth.interface';
import { UserWallet } from '@/interfaces/user-wallet.interface';
import { PaytanetGateway } from '@/shared/gateways/paytanet/paytanet.gateway';

@Injectable()
export class UserService {
  constructor(
    private readonly paytanetGateway: PaytanetGateway,
    private readonly cachingService: CachingService,
  ) {}

  async getMyWallets(accessToken: string, jwtUserInfo: JwtUserInfo) {
    try {
      const cacheKey = `${UserWalletCacheKey.USER_WALLET}:${jwtUserInfo.id}`;
      const wallets = (await this.cachingService.get(cacheKey)) as UserWallet[];

      if (wallets && wallets.length) {
        return wallets;
      }

      this.paytanetGateway.setAccessToken(accessToken);

      const result = await this.paytanetGateway.getMyWallets();

      return result;
    } catch (error) {
      throw error;
    }
  }
}
