import { Module } from '@nestjs/common';

import { UserModelModule } from '@/models/user/user-model.module';
import { DepositModelModule } from '@/models/deposit/deposit-model.module';
import { CurrencyModelModule } from '@/models/currency/currency-model.module';
import { WithdrawModelModule } from '@/models/withdraw/withdraw-model.module';

@Module({
  imports: [
    UserModelModule,
    CurrencyModelModule,
    DepositModelModule,
    WithdrawModelModule,
  ],
})
export class ModelModule {}
