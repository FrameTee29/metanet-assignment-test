import { Global, Module } from '@nestjs/common';

import { UserWalletController } from '@/modules/user-wallet/user-wallet.controller';

import { UserWalletService } from '@/modules/user-wallet/user-wallet.service';

@Global()
@Module({
  controllers: [UserWalletController],
  providers: [UserWalletService],
  exports: [UserWalletService],
})
export class UserWalletModule {}
