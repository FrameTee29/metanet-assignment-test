import { Global, Module } from '@nestjs/common';

import { CurrencyController } from '@/modules/currency/currency.controller';

import { CurrencyService } from '@/modules/currency/currency.service';

@Global()
@Module({
  controllers: [CurrencyController],
  providers: [CurrencyService],
  exports: [CurrencyService],
})
export class CurrencyModule {}
