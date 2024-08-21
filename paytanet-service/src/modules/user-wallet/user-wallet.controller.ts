import { Controller, Get } from '@nestjs/common';

import { GetJwtUser } from '@/shared/decorators/jwt.decorator';

import { UserWallet } from '@/models/user/entities/user-wallet.entity';

import { UserWalletService } from '@/modules/user-wallet/user-wallet.service';

import { JwtUserInfo } from '@/interfaces/auth.interface';

@Controller('user-wallet')
export class UserWalletController {
  constructor(private readonly userWalletService: UserWalletService) {}

  @Get('/my/wallet')
  getMyWallets(@GetJwtUser() jwtUserInfo: JwtUserInfo): Promise<UserWallet[]> {
    return this.userWalletService.getMyWallets(jwtUserInfo);
  }
}
